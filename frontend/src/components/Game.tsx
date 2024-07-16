import TicTacToeBoard from '@/components/TicTacToeBoard';
import TurnInfo from '@/components/TurnInfo';
import { useState } from 'react';

const Game = () => {
  const [player, setPlayer] = useState<number>(0);

  const getPlayerName = (): string => {
    return player === 0 ? 'X' : 'O';
  };

  return (
    <>
      <TurnInfo
        getPlayerName={getPlayerName}
      />
      <TicTacToeBoard
        player={player}
        setPlayer={setPlayer}
        getPlayerName={getPlayerName}
      />
    </>
  );
};

export default Game;