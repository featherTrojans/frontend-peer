import { useToast } from "react-native-toast-notifications";
function showerror(){
    const toast = useToast()
    if(toast.show !== undefined){
        toast.show("Task finished successfully", {
          type: "normal",
          placement: "top",
          duration: 4000,
          offset: 100,
          animationType: "slide-in",
        }); 
    }
}

export default showerror