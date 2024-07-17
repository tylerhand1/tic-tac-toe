export interface SquareProps {
  value?: string,
  handleClick?: () => void
}

export interface TicTacToeBoardProps {
  player: number,
  playerTurn: number,
  setPlayerTurn: (value: number | ((prevVar: number) => number)) => void,
  gameOver: boolean,
  setGameOver: (value: boolean | ((prevVar: boolean) => boolean)) => void,
}

export interface TurnInfoProps {
  playerTurn: number,
  player: number,
}

export interface CreateRoomResponse {
  room: number
}

export interface InviteFriendProps {
  inviteCode?: number,
  setInviteCode: (inviteCode?: number | ((prevVar?: number) => number)) => void
}

export interface ErrorMessageProps {
  error: boolean,
  message: string
}