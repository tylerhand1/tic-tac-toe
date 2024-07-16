import express, { Express, Request, Response } from 'express';
import { Server } from 'socket.io';
import { createServer } from 'node:http';
import cors from 'cors';

const allowedOrigins = ['http://localhost:4000'];
const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

const app: Express = express();
app.use(cors(options));
app.use(express.json());

app.get('/', (_req: Request, res: Response) => {
  res.send('hello')
})

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:4000'
  }
});

io.listen(4000);

io.on('connection', _socket => {
  
})


const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});