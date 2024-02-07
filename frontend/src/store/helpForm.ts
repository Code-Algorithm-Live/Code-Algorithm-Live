import { create } from 'zustand';
import { HelpForm } from '@/types/Help';

interface IHelpFormStore {
  helpForm?: HelpForm;
  setHelpForm: (helpForm?: HelpForm) => void;
}

/**
 * receiver, sender 모두 도움요청 폼 저장
 */
const useHelpFromStore = create<IHelpFormStore>(set => ({
  helpForm: undefined,
  setHelpForm: (helpForm?: HelpForm) => set({ helpForm }),
}));

export default useHelpFromStore;
