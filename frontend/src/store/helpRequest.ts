import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface IHelpRequest {
  zustandRefreshStart: number;
  setZustandRefreshStart: (newStart: number) => void;
  removeRefreshStart: () => void;
  zustandHelpRequestTime: number;
  setZustandHelpRequestTime: (newRequestTime: number) => void;
  removeHelpRequestTime: () => void;
  requestList: string[];
  addRequestList: (item: string) => void;
  setRequestList: () => void;
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
      requestList: [],
      addRequestList: (item: string) =>
        set(state => ({ requestList: [...state.requestList, item] })),
      setRequestList: () => set({ requestList: [] }),
    }),
    {
      name: 'helpRequest',
    },
  ),
);

export default useHelpRequestStore;
export type { IHelpRequest };
