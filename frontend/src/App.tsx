import Header from '@/components/ui/Header';
import JoinCreateForm from '@/components/JoinCreateForm';
import Game from '@/components/Game';

import { socket } from '@/socket';
import { useEffect, useState } from 'react';

const App = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [joinFail, setJoinFail] = useState(false);
  const [inviteCode, setInviteCode] = useState<number>(0);

  useEffect(() => {
    // const onDisconnect = () => {
    //   setIsConnected(false);
    // };

    // socket.on('disconnect', onDisconnect);

    socket.on('join-success', () => {
      setIsConnected(true);
      setJoinFail(false);
    });

    socket.on('join-fail', () => {
      // onDisconnect();
      // socket.disconnect();
      setJoinFail(true);
      setTimeout(() => {
        setJoinFail(false);
      }, 3 * 1000);
    });

    return () => {
      // socket.off('disconnect', onDisconnect);
      
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
            setInviteCode={setInviteCode}
            setIsConnected={setIsConnected}
            joinFail={joinFail}
          />
        }
        {(isConnected) && !joinFail &&
          <Game
            inviteCode={inviteCode}
            setInviteCode={setInviteCode}
          />
        }
      </main>
    </>
  );
};

export default App;
