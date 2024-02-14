import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SidebarState {
  selectedHistory: string;
  setHistory: (value: string) => void;
}

const useSidebarStore = create<SidebarState>()(
  persist(
    set => ({
      selectedHistory: 'question',
      setHistory: value => set({ selectedHistory: value }),
    }),
    {
      name: 'historySelect',
    },
  ),
);

export default useSidebarStore;
