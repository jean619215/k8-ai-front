import axios from "axios";

export interface IResponse<T> {
  code: number;
  message: string;
  content?: T;
  pageContent?: T; // BE舊有邏輯
  totalPage?: number;
  totalElements?: number;
}

const instance = axios.create({
  baseURL: "",
});

instance.defaults.headers.common["Content-Type"] = "application/json";

// async function setAuthToken() {
//   const idToken = await AsyncStorage.getItem(LocalStorageKey.ID_TOKEN); // 從 AsyncStorage 取得 idToken
//   if (idToken) {
//     instance.defaults.headers.common["Authorization"] = `Bearer ${idToken}`; // 設定授權令牌
//   }
// }

// instance.interceptors.request.use(
//   async function (config) {
//     // 從 localStorage 取得 token
//     // const storage = getLocalStorage(LocalStorageKey.USER_INFO);
//     // if (storage) {
//     //   const userInfo = storage;
//     //   if (userInfo && userInfo?.state?.user?.token) {
//     //     config.headers["x-auth-token"] = userInfo.state.user.token;
//     //   }
//     // }
//     // return config;
//   },
//   function (error) {
//     // const { setShowingAlert } = commonStore.getState();
//     // Do something with request error
//     console.error(error);
//     // setShowingAlert(true, {
//     //   message: error,
//     //   messageType: 'error'
//     // });
//     // removeLocalStorage(LocalStorageKey.USER_INFO);
//     window.location.href = "/login";
//     return Promise.reject(error);
//   }
// );

instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    if (response.data.code === 4000) {
      // removeLocalStorage(LocalStorageKey.USER_INFO);
      // window.location.href = "/login";
    } else if (response.data.code !== 0) {
      // const { setShowingAlert } = commonStore.getState();
      // const errorI18n = errorMessageTranslateConfig[response.data.code];
      // if (errorI18n) {
      // setShowingAlert(true, {
      //   message: i18n._(errorI18n.header.id),
      //   messageType: 'error'
      // });
      // } else {
      // setShowingAlert(true, {
      //   message: t`錯誤${response.data.code}，請聯繫客服。`,
      //   messageType: 'error'
      // });
      // }
      // const { setShowingAlert } = commonStore.getState();
      // setShowingAlert(true, {
      //   message: response.data.message,
      //   messageType: 'error'
      // });
    }

    return response;
  },
  async function (error) {
    // const { setShowingAlert } = commonStore.getState();
    // Do something with request error
    console.error(error);
    // setShowingAlert(true, {
    //   message: error,
    //   messageType: "error",
    // });
    // removeLocalStorage(LocalStorageKey.USER_INFO);
    // window.location.href = "/login";
    return Promise.reject(error);
  }
);

export default instance;
