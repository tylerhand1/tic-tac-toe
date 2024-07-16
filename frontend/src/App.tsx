import Header from '@/components/Header';
import TicTacToeBoard from '@/components/TicTacToeBoard';
import TurnInfo from '@/components/TurnInfo';
import { useState } from 'react';

const App = () => {
  const [player, setPlayer] = useState<number>(0)

  const getPlayerName = (): string => {
    return player === 0 ? 'X' : 'O';
  }

  return (
    <>
      <Header />
      <main>
        <TurnInfo
          player={player}
          getPlayerName={getPlayerName}
        />
        <TicTacToeBoard
          player={player}
          setPlayer={setPlayer}
          getPlayerName={getPlayerName}
        />
      </main>
    </>
  );
};

export default App;
