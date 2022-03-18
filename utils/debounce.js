import React,{useState, useCallback} from 'react'
import axiosCustom from '../httpRequests/axiosCustom';



function useDebounce(token = null){

    const [userinfo, setUserInfo] = useState({})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false);

    const debounce = (func,time = 1000)=>{
        let timer;
        return (...args)=>{
            setError(false)
            clearTimeout(timer);
            timer = setTimeout(()=>{
                func.apply(this,args)
            },time)
        }
    }

    const handlegetuser = async (name)=>{
        setLoading(true)
        setError(false)
        let config = {}
        if(token){
            config = {headers:{token:token}}
        }
        try{
            const response = await axiosCustom.get(`/user/${name}`,config);
            setUserInfo(response?.data?.data)
        }catch(err){
            // console.log(err.response)
            setUserInfo("")
            setError(true)
        }finally{
            setLoading(false)
        }
    }
    const debouncesave = useCallback(
        debounce(handlegetuser),     
        [],
    )
    return [userinfo, debouncesave, loading, error]
}

export default useDebounce