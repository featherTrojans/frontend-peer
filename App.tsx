import {useRef, useEffect, useState} from "react";
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ToastProvider } from 'react-native-toast-notifications'
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { AuthProvider } from './context/AuthContext';
import MainNavigation from './navigation';
import { Text , View} from 'react-native';
import { TouchableOpacity } from '@gorhom/bottom-sheet';
import {icons} from "./constants"
import { LocationProvider } from "./context/LocationContext";

const { Cancelicon } = icons;


export default function App() {


  let [fontsLoaded] = useFonts({
    GTlight: require("./assets/fonts/GTWalsheimPro-Light.ttf"),
    GTregular: require("./assets/fonts/GTWalsheimPro-Regular.ttf"),
    GTmedium: require("./assets/fonts/GTWalsheimPro-Medium.ttf"),
    GTbold: require("./assets/fonts/GTWalsheimPro-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
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
        marginHorizontal:25,}}>
        <Text style={{color: "#fff",fontSize: 14,lineHeight:20}}>{props.message}</Text>    
        <TouchableOpacity onPress={props.onHide}>
            <Cancelicon />
        </TouchableOpacity>
        </View>}>
        <AuthProvider>
          <LocationProvider>
            <MainNavigation />
          </LocationProvider>
        </AuthProvider>
      </ToastProvider>
    );
  }
}