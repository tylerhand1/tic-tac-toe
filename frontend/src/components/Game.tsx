import { TicTacToeBoard } from '@/components/TicTacToeBoard';
import TurnInfo from '@/components/ui/TurnInfo';
import InviteFriend from '@/components/ui/InviteFriend';
import { useEffect, useState } from 'react';
import { socket } from '@/socket';
import WinnerMessage from './ui/WinnerMessage';

import { GameProps } from '@/types';
import StartNewGame from './ui/StartNewGame';

const Game = ({ player, setPlayer,
  playerTurn, setPlayerTurn,
  inviteFriend, setInviteFriend,
  inviteCode, setInviteCode }:
  GameProps) => {

  const [gameOver, setGameOver] = useState(false);
  const [isTie, setIsTie] = useState(false);

  useEffect(() => {
    const onPlayerLeave = () => {
      setInviteFriend(true);
    };

    socket.on('player-leave', (roomNumber: number) => {
      onPlayerLeave();
      setInviteCode(roomNumber);
      setPlayer(0);
      setPlayerTurn(0);
      setGameOver(false);
      setIsTie(false);
    });

    return () => {
      socket.off('player-leave');
    };
  }, [inviteFriend, setInviteFriend, inviteCode, setInviteCode, player, setPlayer, playerTurn, setPlayerTurn, gameOver]);

  useEffect(() => {
    socket.on('set-second-player', () => {
      setPlayer(1);
      setInviteFriend(false);
    });
    return () => {
      socket.off('set-second-player');
    };
  }, [player, setPlayer, inviteFriend, setInviteFriend]);
  console.log(socket);
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