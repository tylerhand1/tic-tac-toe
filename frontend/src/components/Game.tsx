import { TicTacToeBoard } from '@/components/TicTacToeBoard';
import TurnInfo from '@/components/TurnInfo';
import InviteFriend from '@/components/InviteFriend';
import { useEffect, useState } from 'react';
import { socket } from '@/socket';

const Game = () => {
  const [player, setPlayer] = useState(0);
  const [playerTurn, setPlayerTurn] = useState(player);
  const [inviteFriend, setInviteFriend] = useState(true);
  const [inviteCode, setInviteCode] = useState<number | undefined>(undefined);

  useEffect(() => {
    function onPlayerJoin() {
      setInviteFriend(false);
    }

    function onPlayerLeave() {
      setInviteFriend(true);
    }

    function setSecondPlayer() {
      setPlayer(1);
    }

    function togglePlayerTurn() {
      const newPlayerTurn = 1 - playerTurn;
      setPlayerTurn(newPlayerTurn);
      console.log('toggled player to', playerTurn);
    }

    socket.on('join-success', onPlayerJoin);
    socket.on('set-second-player', setSecondPlayer);
    socket.on('move-success', togglePlayerTurn);
    socket.on('player-leave', onPlayerLeave);

    return () => {
      socket.off('join-success', onPlayerJoin);
      socket.off('set-second-player', setSecondPlayer);
      socket.off('move-success', togglePlayerTurn);
      socket.off('player-leave', onPlayerLeave);
    };
  }, []);

  socket.on('player-leave', (roomNumber: number) => {
    setInviteCode(roomNumber);
  });

  return (
    <>
      <TurnInfo
        playerTurn={playerTurn}
        player={player}
      />
      <TicTacToeBoard
        player={player}
        setPlayer={setPlayer}
        playerTurn={playerTurn}
      />
      {inviteFriend &&
        <InviteFriend inviteCode={inviteCode} setInviteCode={setInviteCode} />
      }
    </>
  );
};

export default Game;