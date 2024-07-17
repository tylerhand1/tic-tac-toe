import { TicTacToeBoard } from '@/components/TicTacToeBoard';
import TurnInfo from '@/components/ui/TurnInfo';
import InviteFriend from '@/components/ui/InviteFriend';
import { useEffect, useState } from 'react';
import { socket } from '@/socket';
import WinnerMessage from './ui/WinnerMessage';

import { GameProps } from '@/types';
import StartNewGame from './ui/StartNewGame';

const Game = ({inviteCode, setInviteCode}: GameProps) => {
  const [player, setPlayer] = useState(0);
  const [playerTurn, setPlayerTurn] = useState(player);
  const [gameOver, setGameOver] = useState(false);
  const [isTie, setIsTie] = useState(false);
  const [inviteFriend, setInviteFriend] = useState(true);

  useEffect(() => {
    const onPlayerJoin = () => {
      setInviteFriend(false);
    };

    const onPlayerLeave = () => {
      setInviteFriend(true);
    };

    const setSecondPlayer = () => {
      setPlayer(1);
      setInviteFriend(false);
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
  }, [inviteFriend, inviteCode, player, playerTurn, gameOver]);

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
      <div className='invite-container'>
        <InviteFriend inviteCode={inviteCode} setInviteCode={setInviteCode} />
      </div>
      }
      {gameOver &&
        <div className='invite-container'>
          <StartNewGame />
        </div>
      }
    </>
  );
};

export default Game;