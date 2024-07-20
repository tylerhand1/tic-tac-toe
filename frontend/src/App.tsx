import Header from '@/components/ui/Header';
import JoinCreateForm from '@/components/JoinCreateForm';
import Game from '@/components/Game';

import { socket } from '@/socket';
import { useEffect, useState } from 'react';

const App = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [joinFail, setJoinFail] = useState(false);
  const [inviteFriend, setInviteFriend] = useState(true);
  const [inviteCode, setInviteCode] = useState<number>(0);
  const [player, setPlayer] = useState(0);
  const [playerTurn, setPlayerTurn] = useState(player);

  useEffect(() => {
    socket.on('join-success', () => {
      setIsConnected(true);
      setJoinFail(false);
      setInviteFriend(false);
    });
    socket.on('join-fail', () => {
      setJoinFail(true);
      setIsConnected(false);
      setTimeout(() => {
        setJoinFail(false);
      }, 3 * 1000);
    });

    socket.on('set-second-player', () => {
      setPlayer(1);
      setInviteFriend(false);
    });

    return () => {
      socket.off('join-success');
      socket.off('join-fail');
      socket.off('set-second-player');
    };
  }, [joinFail, player]);

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
            player={player}
            setPlayer={setPlayer}
            playerTurn={playerTurn}
            setPlayerTurn={setPlayerTurn}
            inviteFriend={inviteFriend}
            setInviteFriend={setInviteFriend}
            inviteCode={inviteCode}
            setInviteCode={setInviteCode}
          />
        }
      </main>
    </>
  );
};

export default App;
