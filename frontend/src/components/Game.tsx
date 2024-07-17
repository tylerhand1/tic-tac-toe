import { TicTacToeBoard } from '@/components/TicTacToeBoard';
import TurnInfo from '@/components/TurnInfo';
import InviteFriend from '@/components/InviteFriend';
import { useEffect, useState } from 'react';
import { socket } from '@/socket';

const Game = () => {
  const [player, setPlayer] = useState(0);
  const [inviteFriend, setInviteFriend] = useState(true);

  useEffect(() => {
    function onPlayerJoin() {
      setInviteFriend(false);
    }

    socket.on('join-success', onPlayerJoin);

    return () => {
      socket.off('join-success', onPlayerJoin);
    };
  }, []);

  return (
    <>
      <TurnInfo
        player={player}
      />
      <TicTacToeBoard
        player={player}
        setPlayer={setPlayer}
      />
      {inviteFriend &&
        <InviteFriend />
      }
    </>
  );
};

export default Game;