import { useEffect, useState, useCallback } from 'react';
import { SquareProps, TicTacToeBoardProps } from '@/types';
import { getPlayerName } from '@/utils/playerInfo';
import { socket } from '@/socket';

export const Square = ({ value, handleClick, isDisabled } : SquareProps) => {
  if (isDisabled) {
    return (
      <button className='board-square' onClick={handleClick} disabled>
        {value}
      </button>
    );
  }
  return (
    <button className='board-square' onClick={handleClick}>
      {value}
    </button>
  );
};

export const TicTacToeBoard = ({
  player,
  playerTurn,
  setPlayerTurn,
  gameOver,
  setGameOver,
  setIsTie
} : TicTacToeBoardProps) => {
  const [squares, setSquares] = useState<(string) []>(Array(9).fill(''));
  const [isDisabled, setIsDisabled] = useState(false);

  const checkWin = useCallback((updatedSquares: string []): boolean => {
    if (gameOver) {
      return true;
    }
    let updatedGameOver = false;
    // Check each row
    for (let i = 0; i < 9; i += 3) {
      if (updatedSquares[i] === '') {
        continue;
      }
      if (updatedSquares[i] === updatedSquares[i + 1] && updatedSquares[i + 1] === updatedSquares[i + 2]) {
        updatedGameOver = true;
        return(updatedGameOver);
      }
    }
    // Check each column
    for (let i = 0; i < 3; i++) {
      if (updatedSquares[i] === '') {
        continue;
      }
      if (updatedSquares[i] === updatedSquares[i + 3] && updatedSquares[i + 3] === updatedSquares[i + 6]) {
        updatedGameOver = true;
        return(updatedGameOver);
      }
    }
    // Check diagonals
    if (updatedSquares[0] === '') {
      return false;
    }
    if (updatedSquares[0] === updatedSquares[4] && updatedSquares[4] === updatedSquares[8]) {
      updatedGameOver = true;
      return(updatedGameOver);
    }
    if (updatedSquares[2] === '') {
      return false;
    }
    if (updatedSquares[2] === updatedSquares[4] && updatedSquares[4] === updatedSquares[6]) {
      updatedGameOver = true;
      return(updatedGameOver);
    }

    const foundEmpty = updatedSquares.filter(square => square.length === 0);
    if (foundEmpty.length === 0) {
      updatedGameOver = true;
      setIsTie(true);
    }
    setGameOver(updatedGameOver);
    return updatedGameOver;
  }, [gameOver, setGameOver, setIsTie]);

  useEffect(() => {
    if(checkWin(squares)) {
      setIsDisabled(true);
      setGameOver(true);
    }
  }, [squares, isDisabled, checkWin, gameOver, setGameOver]);

  useEffect(() => {
    const resetGame = (): void => {
      setSquares(Array(9).fill(''));
    };

    const updateSquares = (index: number, player: number): void => {
      const square = getPlayerName(player);
      const updatedSquares = [...squares];
      updatedSquares[index] = square;
      setSquares(updatedSquares);
    };

    socket.on('player-leave', () => {
      resetGame();
    });

    socket.on('move-success', (index: number, player: number) => {
      updateSquares(index, player);
      const newPlayerTurn = 1 - playerTurn;
      setPlayerTurn(newPlayerTurn);
    });

    return () => {
      socket.off('player-leave');
      socket.off('move-success');
    };
  }, [squares, playerTurn, setPlayerTurn, gameOver, setGameOver, setIsTie]);

  const handleClick = (index: number) => {
    if (!gameOver) {
      if (squares[index] === '' && player === playerTurn) {
        socket.emit('make-move', index, player);
      }
    }
  };

  return (
    <div className='board'>
      <div className='board-row'>
        <Square value={squares[0]} handleClick={() => {
          handleClick(0);
        }} isDisabled={isDisabled}/>
        <Square value={squares[1]} handleClick={() => {
          handleClick(1);
        }} isDisabled={isDisabled}/>
        <Square value={squares[2]} handleClick={() => {
          handleClick(2);
        }} isDisabled={isDisabled}/>
      </div>
      <div className='board-row'>
        <Square value={squares[3]} handleClick={() => {
          handleClick(3);
        }} isDisabled={isDisabled}/>
        <Square value={squares[4]} handleClick={() => {
          handleClick(4);
        }} isDisabled={isDisabled}/>
        <Square value={squares[5]} handleClick={() => {
          handleClick(5);
        }} isDisabled={isDisabled}/>
      </div>
      <div className='board-row'>
        <Square value={squares[6]} handleClick={() => {
          handleClick(6);
        }} isDisabled={isDisabled}/>
        <Square value={squares[7]} handleClick={() => {
          handleClick(7);
        }} isDisabled={isDisabled}/>
        <Square value={squares[8]} handleClick={() => {
          handleClick(8);
        }} isDisabled={isDisabled}/>
      </div>
    </div>
  );
};