import React from 'react';
import useGameStore from '../../store/useGameStore';

const Score: React.FC = () => {
  const { score } = useGameStore();
  return (
    <div className="mt-4 text-center text-xl font-bold text-white">
      Score: {score}
    </div>
  );
};

export default Score;
