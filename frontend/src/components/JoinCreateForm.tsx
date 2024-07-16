import { MouseEvent } from 'react';
import { socket } from '@/socket';

const JoinCreateForm = () => {
  const joinLobby = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    socket.connect();
    console.log('Join lobby');
  };

  const createLobby = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    socket.connect();
    console.log('Create lobby');
  };

  return (
    <form className='lobby-form'>
      <input
        type='text'
        name='lobby-code'
        id='lobby-code'
        placeholder='Code'
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