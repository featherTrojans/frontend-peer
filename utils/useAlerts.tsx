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

  const blueAlert = (messageText: string) => {
    Toast.show({
      type: "blueToast",
      // And I can pass any custom props I want
      props: { message: messageText, show: false },
    });
  };

  const purpleAlert = (messageText: string) => {
    Toast.show({
      type: "purpleToast",
      // And I can pass any custom props I want
      props: { message: messageText, show: false },
    });
  };

  

  return {
    successAlert, errorAlert, blueAlert, purpleAlert
  }

};

export default useAlert;