import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface HistorybarState {
  HistoryBar: boolean;
  setHistoryBar: (value: boolean) => void;
}

const useHistorybarStore = create<HistorybarState>()(
  persist(
    set => ({
      HistoryBar: true,
      setHistoryBar: value => set({ HistoryBar: value }),
    }),
    {
      name: 'historyBar',
    },
  ),
);

export default useHistorybarStore;
