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

io.on('connection', _socket => {

});

app.get('/ping', (_req: Request, res: Response) => {
  res.send('pong');
});

app.post('/api/tictactoeroom', (_req: Request, res: Response) => {
  res.status(200).send({
    "create": "success"
  });
});

app.listen(config.CORS_PORT);

export default server;