import { TicTacToeBoard } from '@/components/TicTacToeBoard';
import TurnInfo from '@/components/TurnInfo';
import InviteFriend from '@/components/InviteFriend';
import { useEffect, useState } from 'react';
import { socket } from '@/socket';
import WinnerMessage from './ui/WinnerMessage';

const Game = () => {
  const [player, setPlayer] = useState(0);
  const [playerTurn, setPlayerTurn] = useState(player);
  const [gameOver, setGameOver] = useState(false);
  const [isTie, setIsTie] = useState(false);
  const [inviteFriend, setInviteFriend] = useState(true);
  const [inviteCode, setInviteCode] = useState<number | undefined>(undefined);

  useEffect(() => {
    const onPlayerJoin = () => {
      setInviteFriend(false);
    };

    const onPlayerLeave = () => {
      setInviteFriend(true);
    };

    const setSecondPlayer = () => {
      setPlayer(1);
    };

    socket.on('join-success', onPlayerJoin);
    socket.on('set-second-player', setSecondPlayer);

    socket.on('player-leave', (roomNumber: number) => {
      onPlayerLeave();
      setInviteCode(roomNumber);
      setPlayer(0);
      setPlayerTurn(0);
      setGameOver(false);
    });

    return () => {
      socket.off('join-success', onPlayerJoin);
      socket.off('set-second-player', setSecondPlayer);

      socket.off('player-leave');
    };
  }, [inviteCode, player, playerTurn, gameOver]);

  return (
    <>
      {!gameOver
        ? <TurnInfo
          playerTurn={playerTurn}
          player={player}
        />
        : <WinnerMessage
          isTie={isTie}
          winner={1 - playerTurn}
        />
      }
      <TicTacToeBoard
        player={player}
        playerTurn={playerTurn}
        setPlayerTurn={setPlayerTurn}
        gameOver={gameOver}
        setGameOver={setGameOver}
        setIsTie={setIsTie}
      />
      {inviteFriend &&
        <InviteFriend inviteCode={inviteCode} setInviteCode={setInviteCode} />
      }
    </>
  );
};

export default Game;