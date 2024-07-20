export interface GameProps {
  player: number,
  setPlayer: (value: number | ((prevVar: number) => number)) => void
  playerTurn: number,
  setPlayerTurn: (value: number | ((prevVar: number) => number)) => void
  inviteFriend: boolean,
  setInviteFriend: (value: boolean | ((prevVar: boolean) => boolean)) => void
  inviteCode: number,
  setInviteCode: (value: number | ((prevVar: number) => number)) => void
}

export interface SquareProps {
  value?: string,
  handleClick?: () => void,
  isDisabled: boolean,
}

export interface TicTacToeBoardProps {
  player: number,
  playerTurn: number,
  setPlayerTurn: (value: number | ((prevVar: number) => number)) => void,
  gameOver: boolean,
  setGameOver: (value: boolean | ((prevVar: boolean) => boolean)) => void,
  setIsTie: (value: boolean | ((prevVar: boolean) => boolean)) => void,
}

export interface TurnInfoProps {
  playerTurn: number,
  player: number,
}

export interface CreateRoomResponse {
  room: number
}

export interface InviteFriendProps {
  inviteCode: number,
  setInviteCode: (value: number | ((prevVar: number) => number)) => void
}

export interface ErrorMessageProps {
  error: boolean,
  message: string
}