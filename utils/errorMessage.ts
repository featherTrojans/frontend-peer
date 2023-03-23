function showerror(toast:any,err:any,customeerror?:string){  
  let message:string = err?.response?.data?.message
    if(message && typeof message ==="string"){
        message = err.response.data.message
    }else if(customeerror){
      message = customeerror
    }else{
      message = "Padi something went wrong, try again"
    }
    if(toast.show !== undefined){
      toast.show(message); 
    }
}

export default showerror