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
  history: { board: number[][]; score: number; gameOver: boolean; winner: boolean }[];
  addToHistory: () => void;
  undo: () => void;
  winner: boolean;
  setWinner: (winner: boolean) => void;
}

const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      board: [],
      setBoard: (newBoard) => {
        if (!get().winner) {
          const gameWon = checkGameWon(newBoard);
          set({ board: newBoard, winner: gameWon });
        } else {
          set({ board: newBoard });
        }
      },
      regenerateBoard: () => set({ board: generateRandomBoard(), history: [], score: 0, winner: false }),
      score: 0,
      increaseScore: (value) => set((state) => ({ score: state.score + value })),
      resetScore: () => set({ score: 0 }),
      gameOver: false,
      setGameOver: (gameOver) => set({ gameOver }),
      history: [],
      addToHistory: () => {
        const { board, score, gameOver, winner, history } = get();
        const newHistory = [{ board, score, gameOver, winner }, ...history];
        if (newHistory.length > 20) {
          newHistory.pop();
        }
        set({ history: newHistory });
      },
      undo: () => {
        const { history } = get();
        if (history.length > 0) {
          const lastState = history[0];
          const boardWithout2048 = !checkGameWon(lastState.board); 
          
          set({
            board: lastState.board,
            score: lastState.score,
            gameOver: lastState.gameOver,
            winner: boardWithout2048 ? false : lastState.winner, 
            history: history.slice(1),
          });
        }
      },
      winner: false,
      setWinner: (winner) => set({ winner }),
    }),
    {
      name: "game-state",
      partialize: (state) => ({
        board: state.board,
        score: state.score,
        gameOver: state.gameOver,
        history: state.history,
        winner: state.winner,
      }),
    }
  )
);

const checkGameWon = (board: number[][]) => {
  return board.some((row) => row.includes(2048)); 
};

const initializeBoard = () => {
  const board = useGameStore.getState().board;
  if (board.length === 0) {
    useGameStore.setState({ board: generateRandomBoard() });
  }
};

initializeBoard();

export default useGameStore;
