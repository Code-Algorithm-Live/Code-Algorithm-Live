import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface IProblemNumber {
  zustandProblemNumber: string;
  setZustandProblemNumber: (newNumber: string) => void;
  removeNumber: () => void;
}

const useProblemNumberStore = create<IProblemNumber>()(
  persist(
    set => ({
      zustandProblemNumber: '',
      setZustandProblemNumber: (newNumber: string) =>
        set({ zustandProblemNumber: newNumber }),
      removeNumber: () => set({ zustandProblemNumber: '' }),
    }),
    {
      name: 'problemNumber',
    },
  ),
);

export default useProblemNumberStore;
export type { IProblemNumber };
