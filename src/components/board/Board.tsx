

import React, { useEffect, useCallback, useState } from 'react';
import Tile from './Tile';
import { areBoardsEqual, getTileColor, shiftAndMergeLeft, transpose } from '../../utils/gameUtils';
import useGameStore from '../../store/useGameStore';
import Score from '../score/Score';
import GameOver from './GameOver';

const Board: React.FC = () => {
  const { board, setBoard, regenerateBoard, increaseScore, gameOver, setGameOver, addToHistory, undo } = useGameStore();

  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);

  const spawnNewNumber = useCallback(
    (currentBoard: number[][]) => {
      const emptyTiles: { row: number; col: number }[] = [];

      currentBoard.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
          if (cell === 0) emptyTiles.push({ row: rowIndex, col: colIndex });
        });
      });

      if (emptyTiles.length === 0) {
        return;
      }

      const randomTile = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
      const newNumber = Math.random() < 0.9 ? 2 : 4;

      const updatedBoard = structuredClone(currentBoard);
      updatedBoard[randomTile.row][randomTile.col] = newNumber;

      setBoard(updatedBoard);
      increaseScore(newNumber);

      if (checkGameOver(updatedBoard)) {
        setGameOver(true); 
      }
    },
    [setBoard, increaseScore, setGameOver]
  );

  const handleMove = useCallback(
    (direction: 'left' | 'right' | 'up' | 'down') => {
      let newBoard = structuredClone(board);

      if (direction === 'left') {
        newBoard = newBoard.map(shiftAndMergeLeft);
      } else if (direction === 'right') {
        newBoard = newBoard.map((row) => shiftAndMergeLeft(row.reverse()).reverse());
      } else if (direction === 'up') {
        newBoard = transpose(newBoard).map(shiftAndMergeLeft);
        newBoard = transpose(newBoard);
      } else if (direction === 'down') {
        newBoard = transpose(newBoard).map((row) => shiftAndMergeLeft(row.reverse()).reverse());
        newBoard = transpose(newBoard);
      }

      if (!areBoardsEqual(newBoard, board)) {
        addToHistory()
        spawnNewNumber(newBoard); 

      }
    },
    [board, spawnNewNumber, addToHistory]
  );

  const handleTouchStart = (event: TouchEvent) => {
    const { clientX, clientY } = event.touches[0];
    setTouchStart({ x: clientX, y: clientY });
  };

  const handleTouchEnd = useCallback(
    (event: TouchEvent) => {
      if (!touchStart) return;
  
      const { clientX, clientY } = event.changedTouches[0];
  
      const deltaX = clientX - touchStart.x;
      const deltaY = clientY - touchStart.y;
  
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal swipe
        if (deltaX > 30) handleMove('right'); // Right swipe
        else if (deltaX < -30) handleMove('left'); // Left swipe
      } else {
        // Vertical swipe
        if (deltaY > 30) handleMove('down'); // Down swipe
        else if (deltaY < -30) handleMove('up'); // Up swipe
      }
  
      setTouchStart(null);
    },
    [touchStart, handleMove]
  );
  
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) {
        event.preventDefault();
      }

      switch (event.key) {
        case 'ArrowLeft':
          handleMove('left');
          break;
        case 'ArrowRight':
          handleMove('right');
          break;
        case 'ArrowUp':
          handleMove('up');
          break;
        case 'ArrowDown':
          handleMove('down');
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleMove, handleTouchEnd, touchStart]);

  const checkGameOver = (currentBoard: number[][]): boolean => {
    const directions = ['left', 'right', 'up', 'down'];

    for (const direction of directions) {
      let simulatedBoard = structuredClone(currentBoard);

      if (direction === 'left') {
        simulatedBoard = simulatedBoard.map(shiftAndMergeLeft);
      } else if (direction === 'right') {
        simulatedBoard = simulatedBoard.map((row) => shiftAndMergeLeft(row.reverse()).reverse());
      } else if (direction === 'up') {
        simulatedBoard = transpose(simulatedBoard).map(shiftAndMergeLeft);
        simulatedBoard = transpose(simulatedBoard);
      } else if (direction === 'down') {
        simulatedBoard = transpose(simulatedBoard).map((row) => shiftAndMergeLeft(row.reverse()).reverse());
        simulatedBoard = transpose(simulatedBoard);
      }

      if (!areBoardsEqual(simulatedBoard, currentBoard)) {
        return false; 
      }
    }

    return true; 
  };
  useEffect(() => {
    const preventPullToRefresh = (event: TouchEvent) => {
      // Prevent pull-to-refresh for downward swipes at the top of the page
      if (window.scrollY === 0 && event.touches[0].clientY > 0) {
        event.preventDefault();
      }
    };
  
    window.addEventListener('touchmove', preventPullToRefresh, { passive: false });
  
    return () => {
      window.removeEventListener('touchmove', preventPullToRefresh);
    };
  }, []);
  return (
    <div className="flex flex-col items-center min-h-screen  text-white p-4">
  <div className="w-full max-w-md md:max-w-lg lg:max-w-xl bg-gray-700 p-6 rounded-xl shadow-lg">
    {/* Game Board */}
    <div className="grid grid-cols-4 gap-3 lg:gap-4">
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <Tile
            key={`${rowIndex}-${colIndex}`}
            value={cell}
            colorClass={getTileColor(cell)}
          />
        ))
      )}
    </div>
  </div>

  {/* Controls */}
  <div className="mt-6 flex flex-col w-full max-w-md md:max-w-lg lg:max-w-xl">
    <div className="flex justify-between">
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition flex items-center gap-2"
        onClick={regenerateBoard}
      >
        <span>🔄</span> Restart
      </button>
      <button
        className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition flex items-center gap-2"
        onClick={undo}
      >
        <span>⏪</span> Undo
      </button>
    </div>

    {/* Score & Game Over */}
    <div className="mt-4 flex justify-between items-center">
      <Score />
      {gameOver && <GameOver />}
    </div>
  </div>
</div>

  );
};

export default Board;
