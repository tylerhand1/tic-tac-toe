import { MouseEvent, useState } from 'react';
import { socket } from '@/socket';
import { createRoom } from '@/services/tictactoeRoom';
import ErrorMessage from './ui/ErrorMessage';

interface JoinCreateFormProps {
  setInviteCode: (value: number | ((prevVal: number) => number)) => void,
  setIsConnected: (value: boolean | ((prevVal: boolean) => boolean)) => void,
  joinFail: boolean
}

const JoinCreateForm = ({ setInviteCode, setIsConnected, joinFail }: JoinCreateFormProps) => {
  const [lobby, setLobby] = useState<string>('');

  const joinLobby = (e: MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    socket.connect();
    const roomNumber: number = Number.parseInt(lobby);
    socket.emit('join-room', roomNumber);
    setInviteCode(roomNumber);
    setLobby('');
  };

  const createLobby = async (e: MouseEvent<HTMLElement>): Promise<void> => {
    e.preventDefault();
    socket.connect();
    setIsConnected(true);
    const returnedData: { room: number } = await createRoom();
    const roomNumber: number = returnedData.room;
    if (roomNumber !== -1) {
      socket.emit('create-room', roomNumber);
    }
  };

  return (
    <form className='lobby-form'>
      <ErrorMessage error={joinFail} message={'Invalid Code'} />
      <input
        type='tel'
        name='lobby-code'
        id='lobby-code'
        maxLength={5}
        placeholder='Code'
        value={lobby}
        autoFocus
        onChange={e => {
          setLobby(e.target.value);
        }}
      />
      <button type='submit' onClick={e => {
        joinLobby(e);
      }}/>
      <p>or</p>
      <button className='create-lobby-btn' onClick={(e) => {
        void createLobby(e);
      }}>
        Create a lobby
      </button>
    </form>
  );
};

export default JoinCreateForm;