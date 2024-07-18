import { io, Socket } from 'socket.io-client';

const URL = 'http://52.91.164.162:3000';

export const socket: Socket = io(URL, {
  autoConnect: false,
  reconnectionDelay: 5 * 1000,
  reconnectionAttempts: 3,
});