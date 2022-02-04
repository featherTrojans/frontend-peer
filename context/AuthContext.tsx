import React, {createContext, FC, useState} from "react";
import {View} from "react-native"

const AuthContext = createContext<{data:object} | {}>({});


const AuthProvider:FC = ({children}) =>{
    const [authdata, setAuthData] = useState({})
    return (
        <AuthContext.Provider value={{authdata,setAuthData}}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthContext, AuthProvider}
