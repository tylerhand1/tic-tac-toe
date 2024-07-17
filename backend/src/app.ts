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

interface room {
  number: number,
  count: number,
}

const rooms: room [] = [];

const generateRoomNumber = (): number => {
  if (rooms.length < 90000) {
    let roomNumber: number;
    while (true) {
      roomNumber = Math.floor(10000 + Math.random() * 90000);
      const roomsWithSameNumber = rooms.filter(room => room.number === roomNumber);
      if (roomsWithSameNumber.length === 0) break;
    }
    return roomNumber;
  }
  return -1;
};

io.on('connection', socket => {
  socket.on('create-room', async (room) => {
    await socket.join(room);
    socket.emit('create-success', room);
  });

  socket.on('join-room', async (room) => {
    if (io.sockets.adapter.rooms.get(room)) {
      if (io.sockets.adapter.rooms.get(room)!.size < 2) {
        await socket.join(room);
        io.to(room).emit('join-success');
        return;
      }
    }
    socket.emit('join-fail');
  });
});

app.get('/ping', (_req: Request, res: Response) => {
  res.send('pong');
});

app.post('/api/create-room', (_req: Request, res: Response) => {
  const roomNumber = generateRoomNumber()
  const newRoom = {
    number: roomNumber,
    count: 0,
  }
  rooms.push(newRoom);

  res.status(200).send({
    'room': newRoom.number,
  });
});

app.listen(config.CORS_PORT);

export default server;