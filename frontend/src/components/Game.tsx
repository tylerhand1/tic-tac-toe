import TicTacToeBoard from '@/components/TicTacToeBoard';
import TurnInfo from '@/components/TurnInfo';
import { useState } from 'react';

const Game = () => {
  const [player, setPlayer] = useState<number>(0);

  return (
    <>
      <TurnInfo
        player={player}
      />
      <TicTacToeBoard
        player={player}
        setPlayer={setPlayer}
      />
    </>
  );
};

export default Game;