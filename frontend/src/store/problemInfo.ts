import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface IProblemInfo {
  zustandTitle: string;
  setZustandTitle: (newTitle: string) => void;
  removeTitle: () => void;
  zustandContent: string;
  setZustandContent: (newContent: string) => void;
  removeContent: () => void;
}

const useProblemInfoStore = create<IProblemInfo>()(
  persist(
    set => ({
      zustandTitle: '',
      setZustandTitle: (newTitle: string) => set({ zustandTitle: newTitle }),
      removeTitle: () => set({ zustandTitle: '' }),
      zustandContent: '',
      setZustandContent: (newContent: string) =>
        set({ zustandContent: newContent }),
      removeContent: () => set({ zustandContent: '' }),
    }),
    {
      name: 'problemInfo',
    },
  ),
);

export default useProblemInfoStore;
export type { IProblemInfo };
