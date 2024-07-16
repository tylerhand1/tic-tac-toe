import { MouseEventHandler, useState } from 'react';

interface SquareProps {
  value?: string,
  handleClick?: MouseEventHandler<HTMLButtonElement>
}

interface TicTacToeBoardProps {
  player: number,
  setPlayer: (value: number | ((prevVar: number) => number)) => void,
  getPlayerName: () => string
}

const Square = ({value, handleClick} : SquareProps) => {
  return (
    <button className='board-square' onClick={handleClick}>
      {value}
    </button>
  )
}

const TicTacToeBoard = ({ player, setPlayer, getPlayerName } : TicTacToeBoardProps) => {
  const [squares, setSquares] = useState(Array(9).fill(null))

  const handleClick = (index: number) => {
    if (squares[index] === null) {
      const square = getPlayerName();
      const updatedSquares = [...squares]
      updatedSquares[index] = square
      setSquares(updatedSquares);
      togglePlayer();
    }
  }

  const togglePlayer = () => {
    setPlayer(1 - player);
  }

  return (
    <div className='board'>
      <div className='board-row'>
        <Square value={squares[0]} handleClick={() => void handleClick(0)}/>
        <Square value={squares[1]} handleClick={() => void handleClick(1)}/>
        <Square value={squares[2]} handleClick={() => void handleClick(2)}/>
      </div>
      <div className='board-row'>
        <Square value={squares[3]} handleClick={() => void handleClick(3)}/>
        <Square value={squares[4]} handleClick={() => void handleClick(4)}/>
        <Square value={squares[5]} handleClick={() => void handleClick(5)}/>
      </div>
      <div className='board-row'>
        <Square value={squares[6]} handleClick={() => void handleClick(6)}/>
        <Square value={squares[7]} handleClick={() => void handleClick(7)}/>
        <Square value={squares[8]} handleClick={() => void handleClick(8)}/>
      </div>
    </div>
  );
};

export default TicTacToeBoard;