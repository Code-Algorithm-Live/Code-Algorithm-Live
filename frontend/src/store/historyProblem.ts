import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface IHistoryProblem {
  zustandHistorySender: string;
  setZustandHistorySender: (newSender: string) => void;
  zustandHistoryNumber: number;
  setZustandHistoryNumber: (newNumber: number) => void;
  zustandHistoryTitle: string;
  setZustandHistoryTitle: (newTitle: string) => void;
  zustandHistoryContent: string;
  setZustandHistoryContent: (newContent: string) => void;
  zustandHistoryProblemName: string;
  setZustandHistoryProblemName: (newName: string) => void;
}

const useHistoryProblemStore = create<IHistoryProblem>()(
  persist(
    set => ({
      zustandHistoryProblemName: '',
      setZustandHistoryProblemName: (newName: string) =>
        set({ zustandHistoryProblemName: newName }),
      zustandHistorySender: '',
      setZustandHistorySender: (newSender: string) =>
        set({ zustandHistorySender: newSender }),
      zustandHistoryNumber: 0,
      setZustandHistoryNumber: (newNumber: number) =>
        set({ zustandHistoryNumber: newNumber }),
      zustandHistoryTitle: '',
      setZustandHistoryTitle: (newTitle: string) =>
        set({ zustandHistoryTitle: newTitle }),
      zustandHistoryContent: '',
      setZustandHistoryContent: (newContent: string) =>
        set({ zustandHistoryContent: newContent }),
    }),
    {
      name: 'historyProblem',
    },
  ),
);

export default useHistoryProblemStore;
export type { IHistoryProblem };
