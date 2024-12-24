import { create } from "zustand";

import { IAlertMessage } from "@/components/Alert";

export type CommonStoreState = {
  isLoading: boolean;
  isShowingAlert: boolean;
  alertMessage: IAlertMessage; // Add 'alertMessage' property

  userSavedData: File | undefined; // use saved data (image or file)
  isNewData: boolean; // Add 'isNewData' property

  setIsLoading: (isLoading: boolean) => void;
  setShowingAlert: (isShowing: boolean, alertMessage?: IAlertMessage) => void;
  setUserSavedData: (userSavedData: any) => void; // set saved data (image or file)
  setIsNewData: (isNewData: boolean) => void; // Add 'setIsNewData' method
};

const useCommonStore = create<CommonStoreState>((set) => ({
  isLoading: false,
  isShowingAlert: false,
  alertMessage: {
    message: "",
    messageType: "info",
  },
  userSavedData: undefined,
  isNewData: false,
  setIsLoading: (isLoading) => set({ isLoading }),
  setShowingAlert: (isShowing, alertMessage) => {
    set({
      isShowingAlert: isShowing,
    });

    if (alertMessage) {
      set({
        alertMessage,
      });
    }
  },
  setUserSavedData: (userSavedData) =>
    set({
      userSavedData,
      isNewData: true,
    }),
  setIsNewData: (isNewData) => set({ isNewData }),
}));

export default useCommonStore;
