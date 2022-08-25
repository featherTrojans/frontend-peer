import React, {useRef, useEffect, useState} from "react";
import { StatusBar } from 'expo-status-bar';
// import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ToastProvider } from 'react-native-toast-notifications'
import Toast from "react-native-toast-message";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { AuthProvider } from './context/AuthContext';
import MainNavigation from './navigation';
import { Text , View, LogBox, TouchableOpacity} from 'react-native';
import {icons} from "./constants"
import { LocationProvider } from "./context/LocationContext";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getStatusBarHeight } from "react-native-iphone-x-helper";


const { Cancelicon } = icons;

let show = false;
const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */


  errorToast: ({ text1, props }: { text1: string; props: any }) => (
    <View
      style={{
        // height: 60,
        width: "100%",
        backgroundColor: "#E00000",
        paddingHorizontal: 25,
        minHeight: 66,
        // borderRadius: 4,
        // borderColor: "#ff5757",
        // borderWidth: 1,
        // paddingVertical: 20
      }}
    >
      <TouchableOpacity 
      style={{backgroundColor: 'blue', padding: 8}}
      
      >
        <Text>X</Text>
        </TouchableOpacity>
      {props.show && <StatusBar style="light" backgroundColor="red"/>}
      <Text >{props.message}</Text>
    </View>
  ),
  /*
    Or create a completely new type - `tomatoToast`,
    building the layout from scratch.

    I can consume any custom `props` I want.
    They will be passed when calling the `show` method (see below)
  */
  successToast: ({ text1, props }: { text1: string; props: any }) => (
    <View>
      <Text>{props.message}</Text>
    </View>
  ),
};


LogBox.ignoreLogs(['Setting a timer']);

export default function App() {
  const [onboarded, setOnboarded] = useState<null | boolean>(null)

  const checkOnboarding = async () => {
    // await AsyncStorage.removeItem('@onboarded')
    try {
        const value = await AsyncStorage.getItem('@onboarded')
        
        if (value !== null) {
            setOnboarded(JSON.parse(value).onboard)
            
        }else{
          setOnboarded(false)
        }
    } catch (err) {
          setOnboarded(false)
    } finally {
    }
  }
  useEffect(() => {
      checkOnboarding() 
  }, [])
  


  let [fontsLoaded] = useFonts({
    GTlight: require("./assets/fonts/GTWalsheimPro-Light.ttf"),
    GTregular: require("./assets/fonts/GTWalsheimPro-Regular.ttf"),
    GTmedium: require("./assets/fonts/GTWalsheimPro-Medium.ttf"),
    GTbold: require("./assets/fonts/GTWalsheimPro-Bold.ttf"),
  });


  if (!fontsLoaded || onboarded === null ) {
    return <AppLoading />;
  } else {
    return (
      <>
      <ToastProvider 
      placement="top" 
      duration={3000} 
      type="normal"  
      animationType="slide-in"
      renderToast={(props)=><View style={{
        backgroundColor:"#E00000",
        paddingVertical: 18,
        paddingHorizontal: 24,
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "90%",
        marginTop: getStatusBarHeight(true),
        marginHorizontal:25,}}>
        <Text style={{color: "#fff",fontSize: 14,lineHeight:20}}>{props.message}</Text>    
        <TouchableOpacity onPress={props.onHide}>
            <Cancelicon />
        </TouchableOpacity>
        </View>}>
        <AuthProvider>
          <LocationProvider>
            <MainNavigation initialBoarded={onboarded} />
          </LocationProvider>
        </AuthProvider>
      </ToastProvider>
      <Toast 
      config={toastConfig} 
      topOffset={getStatusBarHeight(true)} 
       />
      </>
    );
  }
}