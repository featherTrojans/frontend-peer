import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";

const useAlert = () => {

  const successAlert = (messageText: string) => {
    Toast.show({
      type: "successToast",
      // And I can pass any custom props I want
      props: { message: messageText },
    });
  };


  const errorAlert = (messageText: string) => {
    Toast.show({
      type: "errorToast",
      // And I can pass any custom props I want
      props: { message: messageText, show: false },
    });
  };

  

  return {
    successAlert, errorAlert
  }

};

export default useAlert;