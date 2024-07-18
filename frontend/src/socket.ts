import { io, Socket } from 'socket.io-client';

const URL = 'https://tictactoe.tylerhand.dev/';

export const socket: Socket = io(URL, {
  autoConnect: false,
  reconnectionDelay: 5 * 1000,
  reconnectionAttempts: 3,
});