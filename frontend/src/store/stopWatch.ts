import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface IStopWatch {
  zustandStartTime: number;
  setZustandStartTime: (newTime: number) => void;
  removeStartTime: () => void;
}

const useStopwatchStore = create<IStopWatch>()(
  persist(
    set => ({
      zustandStartTime: 0,
      setZustandStartTime: (newTime: number) =>
        set({ zustandStartTime: newTime }),
      removeStartTime: () => set({ zustandStartTime: 0 }),
    }),
    {
      name: 'stopWatch',
    },
  ),
);

export default useStopwatchStore;
export type { IStopWatch };
