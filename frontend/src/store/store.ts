// 양식 1
import { create } from 'zustand';

interface UserInfoType {
  bears: number;
  increasePopulation: (by: number) => void;
  removeAllBears: (by: number) => void;
}

const useStore = create<UserInfoType>(set => ({
  bears: 0,
  increasePopulation: () => set(state => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}));

export default useStore;
export type { UserInfoType };
