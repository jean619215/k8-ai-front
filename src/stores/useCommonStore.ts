import { create } from "zustand";

import { IAlertMessage } from "@/components/Alert";

export type CommonStoreState = {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;

  isShowingAlert: boolean;

  alertMessage: IAlertMessage;
  setShowingAlert: (isShowing: boolean, alertMessage?: IAlertMessage) => void;

  uploadImageFile: File | undefined;
  setUploadImageFile: (uploadImageFile: File | undefined) => void;

  whiteboardImage: string | undefined;
  setWhiteboardImage: (whiteboardImage: string | undefined) => void;
  isNewWhiteboardImage: boolean;
  setIsNewWhiteboardImage: (isNewWhiteboardImage: boolean) => void;
};

const useCommonStore = create<CommonStoreState>((set) => ({
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),

  isShowingAlert: false,
  alertMessage: {
    message: "",
    messageType: "info",
  },
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

  uploadImageFile: undefined,
  setUploadImageFile: (uploadImageFile) => set({ uploadImageFile }),

  whiteboardImage: undefined,
  setWhiteboardImage: (whiteboardImage) =>
    set({
      whiteboardImage,
      isNewWhiteboardImage: !!whiteboardImage,
    }),
  isNewWhiteboardImage: false,
  setIsNewWhiteboardImage: (isNewWhiteboardImage) =>
    set({ isNewWhiteboardImage }),
}));

export default useCommonStore;
