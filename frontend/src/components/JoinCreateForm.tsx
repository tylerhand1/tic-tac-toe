import { MouseEvent, useState } from 'react';
import { socket } from '@/socket';
import { createRoom } from '@/services/tictactoeRoom';
import ErrorMessage from './ErrorMessage';

const JoinCreateForm = () => {
  const [lobby, setLobby] = useState<string>('');
  const [joinFail, setJoinFail] = useState<boolean>(false);

  const joinLobby = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    socket.connect();
    const roomNumber: number = Number.parseInt(lobby);
    socket.emit('join-room', roomNumber)
    setLobby('');
  };

  const createLobby = async (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    socket.connect();
    const returnedData = await createRoom();
    const roomNumber: number = returnedData.room;
    if (roomNumber !== -1) {
      socket.emit('create-room', roomNumber)
    }
  };

  socket.on('join-fail', () => {
    socket.disconnect();
    setJoinFail(true);
    setTimeout(() => {
      setJoinFail(false);
    }, 2 * 1000);
  });

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
      <button className='create-lobby-btn' onClick={e => {
        createLobby(e);
      }}>
        Create a lobby
      </button>
    </form>
  );
};

export default JoinCreateForm;