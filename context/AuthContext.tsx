import React, {createContext, FC, useState} from "react";
import {View, Text} from "react-native"

const AuthContext = createContext<{authdata:any,setAuthData:any}|{}>({});


const AuthProvider:FC = ({children}) =>{
    const [authdata, setAuthData] = useState({})
    return (
        <AuthContext.Provider value={{authdata,setAuthData}}>
            
            {children}
        </AuthContext.Provider>
    )
}

export {AuthContext, AuthProvider}

// <View style={{
//                 backgroundColor:"#E00000",
//                 paddingVertical: 18,
//                 paddingHorizontal: 24,
//                 borderRadius: 10,
//                 flexDirection: "row",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 position: "absolute",
//                 top:20,
//                 left:0,
//                 // width: Dimensions.get("screen").width,
//                 width: "100%",
//                 marginHorizontal:25,
//                 zIndex:1
//             }}>
//                 <Text style={{
//                 color: "#fff",
//                 fontSize: 14,
//                 maxWidth: 240,
//                 lineHeight:20
//                 }}>Oops, error creating your account, email already in use</Text>
//                     {/* <Cancelicon /> */}
//             </View>