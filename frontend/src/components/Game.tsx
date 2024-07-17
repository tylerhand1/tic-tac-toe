import { TicTacToeBoard } from '@/components/TicTacToeBoard';
import TurnInfo from '@/components/TurnInfo';
import InviteFriend from '@/components/InviteFriend';
import { useEffect, useState } from 'react';
import { socket } from '@/socket';

const Game = () => {
  const [player, setPlayer] = useState(0);
  const [inviteFriend, setInviteFriend] = useState(true);
  const [inviteCode, setInviteCode] = useState<number | undefined>(undefined);

  useEffect(() => {
    function onPlayerJoin() {
      setInviteFriend(false);
    }

    function onPlayerLeave() {
      setInviteFriend(true);
    }

    socket.on('join-success', onPlayerJoin);
    socket.on('player-leave', onPlayerLeave);

    return () => {
      socket.off('join-success', onPlayerJoin);
      socket.off('player-leave', onPlayerLeave);
    };
  }, []);

  socket.on('player-leave', (roomNumber: number) => {
    setInviteCode(roomNumber);
  });

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
        <InviteFriend inviteCode={inviteCode} setInviteCode={setInviteCode} />
      }
    </>
  );
};

export default Game;