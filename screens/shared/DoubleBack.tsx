import React, {useState, useEffect, useContext} from 'react'
import { View, Text ,Platform, BackHandler, ToastAndroid} from 'react-native'
import { AuthContext } from '../../context/AuthContext'

const DoubleBack = () => {
    const {setToken} = useContext(AuthContext)
    const [exitApp, setExitApp] = useState(0)
    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress',backAction);
        return () => backHandler.remove();
    });
        
    const backAction = ()=>{
        setTimeout(() => { setExitApp(0);}, 2000);   
        if (exitApp === 0) {
            setExitApp(exit=>exit + 1);
            ToastAndroid.show('tap back again to exit the App', ToastAndroid.SHORT);
        } else if (exitApp === 1) {
            setToken("")
            BackHandler.exitApp();
        }
        return true;
    }

    
    return (
        <></>
    )
}

// if(Platform.OS !== 'ios'){
// }else{
//     export default <></>
// }

export default function DoubleTapToClose() {
    return Platform.OS !== 'ios' ? (
      <DoubleBack/>
    ) : (
      <></>
    );
  }


