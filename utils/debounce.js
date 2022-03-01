import React,{useState} from 'react'
import axiosCustom from '../httpRequests/axiosCustom';

function useDebounce() {
    const [userinfo, setUserinfo] = useState("")
    
    const debounce = (func,time = 300)=>{
        let timer;
        return ()=>{
            clearTimeout(timer);
            setTimeout(func,time)
        }
    }
    const getUserInfo = async () =>{
        try{
            const response = axiosCustom.get("/");
        }catch(err){
            console.log(err.response)
        }
    }

    return {userinfo, checkUserInfo = debounce(getUserInfo)}
}

export default useDebounce
