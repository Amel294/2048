import { create } from "zustand";
import { persist } from "zustand/middleware"; 
import { generateRandomBoard } from "../utils/gameUtils"; 

interface GameState {
  board: number[][];
  setBoard: (newBoard: number[][]) => void;
  regenerateBoard: () => void; 
  score: number;
  increaseScore: (value: number) => void;
  resetScore: () => void;
  gameOver: boolean;
  setGameOver: (gameOver: boolean) => void;
}

const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      board: [], 
      setBoard: (newBoard) => set({ board: newBoard }), 
      regenerateBoard: () => set({ board: generateRandomBoard() }), 
      score: 0,
      increaseScore: (value) => set((state) => ({ score: state.score + value })),
      resetScore: () => set({ score: 0 }),
      gameOver: false,
      setGameOver: (gameOver) => set({ gameOver }),
    }),
    {
      name: "game-state", 
      partialize: (state) => ({ 
        board: state.board, 
        score: state.score, 
        gameOver: state.gameOver 
      }), 
    }
  )
);

const initializeBoard = () => {
  const board = useGameStore.getState().board; 
  if (board.length === 0) {
    useGameStore.setState({ board: generateRandomBoard() }); 
  }
};

initializeBoard();

export default useGameStore;