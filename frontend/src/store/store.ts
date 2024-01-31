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

// 양식 2

// 왜 에러남?
// import { create } from 'zustand'

// interface yorestore {
//   yourState : any;
//   yourAction : (val : any) => void;
// }
// export const useyorestore = create<yorestore>((set)=>({
//   yourState : 'VALUE',
//   yourAction : (val) => set( (state) => ({ yourState : state.yourState }) )
// }))
