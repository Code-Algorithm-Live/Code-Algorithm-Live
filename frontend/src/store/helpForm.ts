import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { HelpForm } from '@/types/Help';

interface IHelpFormStore {
  helpForm?: HelpForm;
  setHelpForm: (helpForm?: HelpForm) => void;
}

/**
 * receiver, sender 모두 도움요청 폼 저장
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
