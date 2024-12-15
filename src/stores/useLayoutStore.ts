import { create } from "zustand";
import { persist } from "zustand/middleware";

import { LocalStorageKey } from "@/config/localStorageKey";

export interface ILayoutStoreState {
  isShowingNavigation: boolean;
  setShowingNavigation: (isShowingNavigation: boolean) => void;
}

/**
 * Layout status saved in local storage
 */
export const useLayoutStore = create<ILayoutStoreState>()(
  persist(
    (set) => ({
      isShowingNavigation: true,
      setShowingNavigation: (isShowingNavigation) =>
        set({ isShowingNavigation }),
    }),
    {
      name: LocalStorageKey.LAYOUT_STATE,
    }
  )
);
