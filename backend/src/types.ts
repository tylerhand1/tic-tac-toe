export enum Player {
  X = 0,
  O = 1
}

export interface Room {
  number: number,
  canPlay: boolean,
  currPlayer: Player
  sock_ids: string []
}