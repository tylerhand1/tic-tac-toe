import { useState } from 'react';
import { SquareProps, TicTacToeBoardProps } from '@/types';
import { getPlayerName } from '@/utils/playerInfo';
import { socket } from '@/socket';

export const Square = ({ value, handleClick } : SquareProps) => {
  return (
    <button className='board-square' onClick={handleClick}>
      {value}
    </button>
  );
};

export const TicTacToeBoard = ({
  player,
  setPlayer,
  playerTurn,
} : TicTacToeBoardProps) => {
  const [squares, setSquares] = useState<(string | undefined) []>(Array(9).fill(undefined));

  const handleClick = (index: number) => {
    if (squares[index] === undefined && player === playerTurn) {
      socket.emit('make-move', index, player);
    }
  };

  const updateSquares = (index: number, player: number): void => {
    const square = getPlayerName(player);
    const updatedSquares = [...squares];
    updatedSquares[index] = square;
    setSquares(updatedSquares);
  }

  const resetBoard = (): void => {
    setSquares(Array(9).fill(undefined));
  }

  const resetPlayer = (): void => {
    setPlayer(0);
  }

  socket.on('player-leave', () => {
    resetBoard();
    resetPlayer();
  })

  socket.on('move-success', (index, player) => {
    updateSquares(index, player);
  })

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