import Header from '@/components/Header';
import JoinCreateForm from '@/components/JoinCreateForm';
import Game from '@/components/Game';

import { socket } from '@/socket';
import { useEffect, useState } from 'react';

const App = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);

  return (
    <>
      <Header />
      <main>
        {(!isConnected) &&
          <JoinCreateForm />
        }
        {(isConnected) &&
          <Game />
        }
      </main>
    </>
  );
};

export default App;
