import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";

const useAlert = () => {

  const successAlert = (messageText: string, hide=true) => {
    Toast.show({
      type: "successToast",
      // And I can pass any custom props I want
      props: { message: messageText },
      autoHide: hide
    });
  };


  const errorAlert = (err: any, customeerror?:string, hide=true) => {
    console.log(err)
    console.log(err?.response)
  
    let message:string = err?.response?.data?.message
      if(message && typeof message ==="string"){
          message = err.response.data.message
      }else if(customeerror){
        message = customeerror
      }else{
        message = "Padi something went wrong, try again"
      }
    Toast.show({
      type: "errorToast",
      // And I can pass any custom props I want
      props: { message: message},
      autoHide: hide,
      
    });
  };

  const blueAlert = (messageText: string, hide=false) => {
    Toast.show({
      type: "blueToast",
      // And I can pass any custom props I want
      props: { message: messageText, show: false },
      autoHide: hide
    });
  };

  const purpleAlert = (messageText: string, hide= false) => {
    Toast.show({
      type: "purpleToast",
      // And I can pass any custom props I want
      props: { message: messageText, show: false },
      autoHide: hide
    });
  };
  
  const updateAlert = (messageText: string, hide= false) => {
    Toast.show({
      type: "updateToast",
      // And I can pass any custom props I want
      props: { message: messageText, show: false },
      autoHide: hide,
      position: "bottom",
      bottomOffset: 84
    });
  };
  

  return {
    successAlert, errorAlert, blueAlert, purpleAlert,updateAlert
  }

};

export default useAlert;