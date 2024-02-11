import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { HelpForm } from '@/types/Help';

interface IHelpFormStore {
  helpForm?: HelpForm;
  setHelpForm: (helpForm?: HelpForm) => void;
}

/**
 * 도움요청 폼
 */
const useHelpFromStore = create<IHelpFormStore>()(
  persist(
    set => ({
      helpForm: undefined,
      setHelpForm: (helpForm?: HelpForm) => set({ helpForm }),
    }),
    {
      name: 'helpForm',
    },
  ),
);

export default useHelpFromStore;
