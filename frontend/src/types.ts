export interface SquareProps {
  value?: string,
  handleClick?: () => void
}

export interface TicTacToeBoardProps {
  player: number,
  setPlayer: (value: number | ((prevVar: number) => number)) => void,
  getPlayerName: () => string
}

export interface TurnInfoProps {
  getPlayerName: () => string
}