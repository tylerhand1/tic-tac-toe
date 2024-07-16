export interface SquareProps {
  value?: string,
  handleClick?: () => void
}

export interface TicTacToeBoardProps {
  player: number,
  setPlayer: (value: number | ((prevVar: number) => number)) => void,
}

export interface TurnInfoProps {
  player: number,
}