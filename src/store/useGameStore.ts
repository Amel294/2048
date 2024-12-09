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
  history: { board: number[][]; score: number; gameOver: boolean }[];
  addToHistory: () => void;
  undo: () => void;
  
}

const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      board: [],
      setBoard: (newBoard) => set({ board: newBoard }),
      regenerateBoard: () => set({ board: generateRandomBoard(),history:[],score:0 }),
      score: 0,
      increaseScore: (value) => set((state) => ({ score: state.score + value })),
      resetScore: () => set({ score: 0 }),
      gameOver: false,
      setGameOver: (gameOver) => set({ gameOver }),
      history: [],
      addToHistory: () => {
        const { board, score, gameOver, history } = get();
        const newHistory = [{ board, score, gameOver }, ...history];
        if (newHistory.length > 20) {
          newHistory.pop(); 
        }
        set({ history: newHistory });
      },
      undo: () => {
        const { history } = get();
        if (history.length > 0) {
          const lastState = history[0];
          set({
            board: lastState.board,
            score: lastState.score,
            gameOver: lastState.gameOver,
            history: history.slice(1), 
          });
        }
      },
    }),
    {
      name: "game-state",
      partialize: (state) => ({
        board: state.board,
        score: state.score,
        gameOver: state.gameOver,
        history: state.history,
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
