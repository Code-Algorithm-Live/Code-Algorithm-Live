import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface IHelpRequest {
  zustandRefreshStart: number;
  setZustandRefreshStart: (newStart: number) => void;
  removeRefreshStart: () => void;
  zustandHelpRequestTime: number;
  setZustandHelpRequestTime: (newRequestTime: number) => void;
  removeHelpRequestTime: () => void;
}

const useHelpRequestStore = create<IHelpRequest>()(
  persist(
    set => ({
      zustandRefreshStart: 0,
      setZustandRefreshStart: (newStart: number) =>
        set({ zustandRefreshStart: newStart }),
      removeRefreshStart: () => ({ zustandRefreshStart: 0 }),
      zustandHelpRequestTime: 0,
      setZustandHelpRequestTime: (newRequestTime: number) =>
        set({ zustandHelpRequestTime: newRequestTime }),
      removeHelpRequestTime: () => set({ zustandHelpRequestTime: 0 }),
    }),
    {
      name: 'helpRequest',
    },
  ),
);

export default useHelpRequestStore;
export type { IHelpRequest };
