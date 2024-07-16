import { useState } from 'react';

interface SquareProps {
  value?: string,
  handleClick?: () => void
}

interface TicTacToeBoardProps {
  player: number,
  setPlayer: (value: number | ((prevVar: number) => number)) => void,
  getPlayerName: () => string
}

const Square = ({ value, handleClick } : SquareProps) => {
  return (
    <button className='board-square' onClick={handleClick}>
      {value}
    </button>
  );
};

const TicTacToeBoard = ({ player, setPlayer, getPlayerName } : TicTacToeBoardProps) => {
  const [squares, setSquares] = useState<(string | undefined) []>(Array(9).fill(undefined));

  const handleClick = (index: number) => {
    if (squares[index] === undefined) {
      const square = getPlayerName();
      const updatedSquares = [...squares];
      updatedSquares[index] = square;
      setSquares(updatedSquares);
      togglePlayer();
    }
  };

  const togglePlayer = () => {
    setPlayer(1 - player);
  };

  return (
    <div className='board'>
      <div className='board-row'>
        <Square value={squares[0]} handleClick={() => {
          handleClick(0);
        }}/>
        <Square value={squares[1]} handleClick={() => {
          handleClick(1);
        }}/>
        <Square value={squares[2]} handleClick={() => {
          handleClick(2);
        }}/>
      </div>
      <div className='board-row'>
        <Square value={squares[3]} handleClick={() => {
          handleClick(3);
        }}/>
        <Square value={squares[4]} handleClick={() => {
          handleClick(4);
        }}/>
        <Square value={squares[5]} handleClick={() => {
          handleClick(5);
        }}/>
      </div>
      <div className='board-row'>
        <Square value={squares[6]} handleClick={() => {
          handleClick(6);
        }}/>
        <Square value={squares[7]} handleClick={() => {
          handleClick(7);
        }}/>
        <Square value={squares[8]} handleClick={() => {
          handleClick(8);
        }}/>
      </div>
    </div>
  );
};

export default TicTacToeBoard;