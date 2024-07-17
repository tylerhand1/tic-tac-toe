import express, { Express, Request, Response } from 'express';
import { Server } from 'socket.io';
import { createServer } from 'node:http';
import cors from 'cors';
import config from './utils/config';

const allowedOrigins = ['http://localhost:4000'];
const options: cors.CorsOptions = {
  origin: allowedOrigins,
  methods: ["GET", "POST"],
};

const app: Express = express();
app.use(cors(options));
app.use(express.json());

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:4000',
    methods: ["GET", "POST"],
  }
});

enum Player {
  X = 0,
  O = 1
}

interface room {
  number: number,
  canPlay: boolean,
  currPlayer: Player
  sock_ids: string []
}

const rooms: room [] = [];

const generateRoomNumber = (): number => {
  if (rooms.length < 90000) {
    let roomNumber: number = -1;
    let generatedUniqueNumber: boolean = false;
    while (!generatedUniqueNumber) {
      roomNumber = Math.floor(10000 + Math.random() * 90000);
      const roomsWithSameNumber = rooms.filter(room => room.number === roomNumber);
      if (roomsWithSameNumber.length === 0) {
        generatedUniqueNumber = true;
      }
    }
    return roomNumber;
  }
  return -1;
};

const addSocketToRoom = (room: string, socket_id: string): void => {
  const roomNumber: number = Number.parseInt(room);
  const foundRoom = rooms.find(room => room.number === roomNumber);
  foundRoom?.sock_ids.push(socket_id);
};

const removeSocketFromRoom = (roomName: number, socket_id: string): void => {
  const foundRoom = rooms.find(room => room.number === roomName);
  const socketIdx: number | undefined = foundRoom?.sock_ids.indexOf(socket_id);
  if (socketIdx !== undefined) {
    foundRoom?.sock_ids.splice(socketIdx, 1);
  }
};

const findRoomBySocket = (socket_id: string): room => {
  const foundRoom = rooms.find(room => room.sock_ids.indexOf(socket_id) > -1)!;
  return foundRoom;
};

const findRoomByName = (room: string): room => {
  const roomNumber: number = Number.parseInt(room);
  const foundRoom = rooms.find(room => room.number === roomNumber)!;
  return foundRoom;
}

const toggleRoomCurrPlayer = (room: room): void => {
  room.currPlayer = 1 - room.currPlayer;
}

io.on('connection', socket => {
  socket.on('create-room', async (room: string) => {
    await socket.join(room);

    addSocketToRoom(room, socket.id);

    socket.emit('create-success', room);
  });

  socket.on('join-room', async (room: string) => {
    if (io.sockets.adapter.rooms.get(room)) {
      if (io.sockets.adapter.rooms.get(room)!.size < 2) {
        await socket.join(room);
        addSocketToRoom(room, socket.id);
        io.to(room).emit('join-success');
        socket.emit('set-second-player');
        
        // allow game to start
        const roomToUpdate = findRoomByName(room);
        roomToUpdate.canPlay = true;
        return;
      }
    }
    socket.emit('join-fail');
  });

  socket.on('make-move', (_idx, player) => {
    const room: room = findRoomBySocket(socket.id);
    if (room !== undefined && room.canPlay) {
      if (player === room.currPlayer) {
        room.sock_ids.forEach(sock_id => {
          const socket = io.sockets.sockets.get(sock_id);
          if (socket !== undefined) {
            socket.emit('move-success')
          }
        });
        toggleRoomCurrPlayer(room);
        console.log('here', room)
      }
    }
  })

  socket.on('disconnect', () => {
    const room = findRoomBySocket(socket.id);
    if (room !== undefined) {
      removeSocketFromRoom(room.number, socket.id);
      room.canPlay = false;

      const otherSocketName = room.sock_ids[0];
      const otherSocket = io.sockets.sockets.get(otherSocketName);

      if (otherSocket !== undefined) {
        otherSocket?.emit('player-leave', room.number);
      }
    }
  });
});

app.get('/ping', (_req: Request, res: Response) => {
  res.send('pong');
});

app.post('/api/create-room', (_req: Request, res: Response) => {
  const roomNumber = generateRoomNumber();
  const newRoom = {
    number: roomNumber,
    canPlay: false,
    currPlayer: Player.X,
    sock_ids: [],
  };
  rooms.push(newRoom);

  res.status(200).send({
    'room': newRoom.number,
  });
});

app.listen(config.CORS_PORT);

export default server;