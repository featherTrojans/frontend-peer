import { useToast } from "react-native-toast-notifications";
function showerror(toast:any,err:any){
  console.log(err?.response)
  let message:string = err?.response?.data?.message
    if(message && typeof message ==="string"){
        message = err.response.data.message
    }else{
      message = "unable to perform request, please try again"
    }
    if(toast.show !== undefined){
      toast.show(message); 
    }
}

export default showerror