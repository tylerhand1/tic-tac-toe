import { MouseEvent, useEffect, useState } from 'react';
import { socket } from '@/socket';
import { createRoom } from '@/services/tictactoeRoom';
import ErrorMessage from './ui/ErrorMessage';

const JoinCreateForm = () => {
  const [lobby, setLobby] = useState<string>('');
  const [joinFail, setJoinFail] = useState<boolean>(false);

  useEffect(() => {
    socket.on('join-fail', () => {
      socket.disconnect();
      setJoinFail(true);
      setTimeout(() => {
        setJoinFail(false);
      }, 2 * 1000);
    });

    return () => {
      socket.off('join-fail');
    };
  }, [joinFail]);

  const joinLobby = (e: MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    socket.connect();
    const roomNumber: number = Number.parseInt(lobby);
    socket.emit('join-room', roomNumber);
    setLobby('');
  };

  const createLobby = async (e: MouseEvent<HTMLElement>): Promise<void> => {
    e.preventDefault();
    socket.connect();
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