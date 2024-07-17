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