import React,{useState, useCallback} from 'react'
import axiosCustom from '../httpRequests/axiosCustom';

const debounce = (func,time = 500)=>{
    let timer;
    return (...args)=>{
        clearTimeout(timer);
        timer = setTimeout(()=>{
            func.apply(this,args)
        },time)
    }
  }

function useDebounce(){

    const [userinfo, setUserInfo] = useState({})
    const [loading, setLoading] = useState(false)
    const handlegetuser = async (name)=>{
        console.log(name)
        setLoading(true)
        try{
            const response = await axiosCustom.get(`/user/${name}`);
            setUserInfo(response?.data?.data)
        }catch(err){
            console.log(err.response)
            setUserInfo({})
        }finally{
            setLoading(false)
        }
    }
    const debouncesave = useCallback(
        debounce(handlegetuser),     
        [],
    )
    return [userinfo, debouncesave, loading]
}

export default useDebounce