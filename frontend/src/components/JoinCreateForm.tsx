import { MouseEvent, useState } from 'react';
import { socket } from '@/socket';
import { requestRoom } from '@/services/tictactoeRoom';

const JoinCreateForm = () => {
  const [lobby, setLobby] = useState<string>('');

  const joinLobby = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (lobby !== '') {
      socket.connect();
      console.log('Join lobby');
      setLobby('');
    } else {
      console.log('You need a code before entering')
    }
  };

  const createLobby = async (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    socket.connect();
    const roomNumber: string | undefined = await requestRoom();
    console.log(roomNumber);
  };

  return (
    <form className='lobby-form'>
      <input
        type='tel'
        name='lobby-code'
        id='lobby-code'
        placeholder='Code'
        value={lobby}
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