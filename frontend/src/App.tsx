import Header from '@/components/ui/Header';
import JoinCreateForm from '@/components/JoinCreateForm';
import Game from '@/components/Game';

import { socket } from '@/socket';
import { useEffect, useState } from 'react';

const App = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [joinFail, setJoinFail] = useState(false);

  useEffect(() => {
    const onDisconnect = () => {
      setIsConnected(false);
    };

    socket.on('disconnect', onDisconnect);

    socket.on('join-success', () => {
      setIsConnected(true);
    });

    socket.on('join-fail', () => {
      onDisconnect();
      socket.disconnect();
      setJoinFail(true);
      setTimeout(() => {
        setJoinFail(false);
      }, 3 * 1000);
    });

    return () => {
      socket.off('disconnect', onDisconnect);
      
      socket.off('join-success');

      socket.off('join-faill');
    };
  }, [joinFail]);

  return (
    <>
      <Header />
      <main>
        {(!isConnected) &&
          <JoinCreateForm
            setIsConnected={setIsConnected}
            joinFail={joinFail}
          />
        }
        {(isConnected) && !joinFail &&
          <Game />
        }
      </main>
    </>
  );
};

export default App;
