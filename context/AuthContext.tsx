import React, {createContext, FC, useState} from "react";


const AuthContext = createContext<any>({});


const AuthProvider:FC = ({children}) =>{
    const [authdata, setAuthData] = useState({})
    const [token,setToken] = useState("")
    const [pushToken, setPushToken] = useState("")
    return (
        <AuthContext.Provider value={{authdata,setAuthData,token,setToken, pushToken, setPushToken}}>
            
            {children}
        </AuthContext.Provider>
    )
}

export {AuthContext, AuthProvider}
