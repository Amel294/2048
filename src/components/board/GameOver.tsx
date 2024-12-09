
import React from 'react';
import useGameStore from '../../store/useGameStore';

const GameOver: React.FC = () => {
    const {regenerateBoard,resetScore,setGameOver} = useGameStore()
    const handleGameRestart = () =>{
        regenerateBoard()
        resetScore()
        setGameOver(false)
    }
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg text-center">
        <h2 className="text-3xl font-bold mb-4">Game Over</h2>
        <button
          onClick={handleGameRestart}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Retry
        </button>
      </div>
    </div>
  );
};

export default GameOver;
