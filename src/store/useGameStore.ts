import {create} from 'zustand';

interface GameState {
  score: number;
  increaseScore: (value: number) => void;
  resetScore: () => void;
}

const useGameStore = create<GameState>((set) => ({
  score: 0,
  increaseScore: (value) => set((state) => ({ score: state.score + value })),
  resetScore: () => set({ score: 0 }),
}));

export default useGameStore;
