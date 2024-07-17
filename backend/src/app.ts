import express, { Express, Request, Response } from 'express';
import { Server } from 'socket.io';
import { createServer } from 'node:http';
import cors from 'cors';
import config from './utils/config';

import { Player, Room } from './types';
import * as roomUtil from './utils/room';

export let rooms: Room [] = [];

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

io.on('connection', socket => {
  socket.on('create-room', async (room: string) => {
    await socket.join(room);

    roomUtil.addSocketToRoom(room, socket.id);

    socket.emit('create-success', room);
  });

  socket.on('join-room', async (room: string) => {
    if (io.sockets.adapter.rooms.get(room)) {
      if (io.sockets.adapter.rooms.get(room)!.size < 2) {
        await socket.join(room);
        roomUtil.addSocketToRoom(room, socket.id);
        io.to(room).emit('join-success');
        socket.emit('set-second-player');
        
        // allow game to start
        const roomToUpdate = roomUtil.findRoomByName(room);
        roomToUpdate.canPlay = true;
        return;
      }
    }
    socket.emit('join-fail');
  });

  socket.on('make-move', (index, player) => {
    const room: Room = roomUtil.findRoomBySocket(socket.id);
    if (room !== undefined && room.canPlay) {
      if (player === room.currPlayer) {
        room.sock_ids.forEach(sock_id => {
          const socket = io.sockets.sockets.get(sock_id);
          if (socket !== undefined) {
            socket.emit('move-success', index, player);
          }
        });
        roomUtil.toggleRoomCurrPlayer(room);
      }
    }
  });

  socket.on('disconnect', () => {
    const foundRoom = roomUtil.findRoomBySocket(socket.id);
    if (foundRoom !== undefined) {
      roomUtil.removeSocketFromRoom(foundRoom.number, socket.id);

      if (foundRoom.sock_ids.length === 0) {
        // Remove the room from the rooms ds if no more sockets in sock_ids
        rooms = rooms.filter(room => room.number !== foundRoom.number);
      }

      foundRoom.canPlay = false;
      foundRoom.currPlayer = Player.X;

      const otherSocketName = foundRoom.sock_ids[0];
      const otherSocket = io.sockets.sockets.get(otherSocketName);

      if (otherSocket !== undefined) {
        otherSocket?.emit('player-leave', foundRoom.number);
      }
    }
  });
});

app.get('/ping', (_req: Request, res: Response) => {
  res.send('pong');
});

app.post('/api/create-room', (_req: Request, res: Response) => {
  const roomNumber = roomUtil.generateRoomNumber();

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