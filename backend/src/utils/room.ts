import { Room } from '../types';
import { rooms } from '../app';

export const generateRoomNumber = (): number => {
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

export const addSocketToRoom = (room: string, socket_id: string): void => {
  const roomNumber: number = Number.parseInt(room);
  const foundRoom = rooms.find(room => room.number === roomNumber);
  foundRoom?.sock_ids.push(socket_id);
};

export const removeSocketFromRoom = (roomName: number, socket_id: string): void => {
  const foundRoom = rooms.find(room => room.number === roomName);
  const socketIdx: number | undefined = foundRoom?.sock_ids.indexOf(socket_id);
  if (socketIdx !== undefined) {
    foundRoom?.sock_ids.splice(socketIdx, 1);
  }
};

export const findRoomBySocket = (socket_id: string): Room => {
  const foundRoom = rooms.find(room => room.sock_ids.indexOf(socket_id) > -1)!;
  return foundRoom;
};

export const findRoomByName = (room: string): Room => {
  const roomNumber: number = Number.parseInt(room);
  const foundRoom = rooms.find(room => room.number === roomNumber)!;
  return foundRoom;
};

export const toggleRoomCurrPlayer = (room: Room): void => {
  room.currPlayer = 1 - room.currPlayer;
};