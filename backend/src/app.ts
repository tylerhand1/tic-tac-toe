import express, { Express, Request, Response } from 'express';
import { Server } from 'socket.io';
import { createServer } from 'node:http';
import cors from 'cors';
import config from './utils/config';

const allowedOrigins = 'http://localhost:3000';
const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

const app: Express = express();
app.use(cors(options));
app.use(express.json());

app.get('/', (_req: Request, res: Response) => {
  res.send('hello');
});

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:4000'
  }
});

io.listen(config.CORS_PORT);

io.on('connection', _socket => {
  
});

export default server;