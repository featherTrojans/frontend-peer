import React, { useRef, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
// import { SafeAreaProvider } from 'react-native-safe-area-context';
// import { ToastProvider } from "react-native-toast-notifications";
import Toast from "react-native-toast-message";

import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { AuthProvider } from "./context/AuthContext";
import MainNavigation from "./navigation";
import { Text, View, LogBox, TouchableOpacity, StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize, icons } from "./constants";
import { LocationProvider } from "./context/LocationContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { customNavigation } from "./utils/customNavigation";
import { TextInput } from "react-native-gesture-handler";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
const { Cancelicon, Alertcancelicon, Updateprofileicon, Bluearrowrighticon, Updatealertcancelicon } = icons;

export const toastConfig = {
  errorToast: ({ text1, props }: { text1: string; props: any }) => (
    <View style={[appStyles.alertWrapper, {backgroundColor: "#E00000"}]}>
      <View style={{ flex: 1 }}>
        <Text style={appStyles.alertText}>{props.message}</Text>
      </View>
      <TouchableOpacity activeOpacity={0.8} onPress={() => Toast.hide()} style={appStyles.cancelWrapper}>
        <Alertcancelicon />
      </TouchableOpacity>
    </View>
  ),

  successToast: ({ text1, props }: { text1: string; props: any }) => (
    <View style={[appStyles.alertWrapper, {backgroundColor: "#25DBA3"}]}>
      <View style={{ flex: 1 }}>
        <Text style={appStyles.alertText}>{props.message} </Text>
      </View>

      <TouchableOpacity activeOpacity={0.8} onPress={() => Toast.hide()} style={appStyles.cancelWrapper}>
        <Alertcancelicon />
      </TouchableOpacity>
    </View>
  ),

  purpleToast: ({ text1, props }: { text1: string; props: any }) => (
    <View style={[appStyles.alertWrapper, {backgroundColor: "#8456FF"}]}>
      <View style={{ flex: 1 }}>
        <Text style={appStyles.alertText}>{props.message} </Text>
      </View>

      <TouchableOpacity activeOpacity={0.8} onPress={() => Toast.hide()} style={appStyles.cancelWrapper}>
        <Alertcancelicon />
      </TouchableOpacity>
    </View>
  ),

  blueToast: ({ text1, props }: { text1: string; props: any }) => (
    <View style={[appStyles.alertWrapper, {backgroundColor: "#5676FF"}]}>
      <View style={{ flex: 1 }}>
        <Text style={appStyles.alertText}>{props.message} </Text>
      </View>

      <TouchableOpacity activeOpacity={0.8} onPress={() => Toast.hide()} style={appStyles.cancelWrapper}>
        <Alertcancelicon />
      </TouchableOpacity>
    </View>
  ),
  updateToast: ({ text1, props }: { text1: string; props: any }) => (
    <View style={[appStyles.alertWrapper, {backgroundColor: "#fff", height: 54, paddingVertical: 18}]}>
      <View style={{ flex: 1, flexDirection: "row", alignItems: "center"}}>
        <Updateprofileicon />
        <TouchableOpacity activeOpacity={0.8} onPress={() => customNavigation("Settings", {})} style={{marginLeft: 12, flexDirection: 'row', alignItems: "center"}}>
          <Text style={{...fontsize.smallest, ...FONTS.medium, color: COLORS.blue9, marginRight: 12}}>Update your profile, <Text style={{color: COLORS.blue6, textDecorationColor: COLORS.blue6, textDecorationLine: "underline", textDecorationStyle: "solid"}}>go to settings</Text></Text>
          <Bluearrowrighticon />
        </TouchableOpacity>
      </View>

      <TouchableOpacity activeOpacity={0.8} onPress={() => Toast.hide()} style={appStyles.cancelWrapper}>
        <Updatealertcancelicon />
      </TouchableOpacity>
    </View>
  ),
};


LogBox.ignoreLogs(["Setting a timer"]);

export default function App() {
  const [onboarded, setOnboarded] = useState<null | boolean>(null);

  const checkOnboarding = async () => {
    // await AsyncStorage.removeItem('@onboarded')
    try {
      const value = await AsyncStorage.getItem("@onboarded");

      if (value !== null) {
        setOnboarded(JSON.parse(value).onboard);
      } else {
        setOnboarded(false);
      }
    } catch (err) {
      setOnboarded(false);
    } finally {
    }
  };
  useEffect(() => {
    checkOnboarding();
  }, []);

  let [fontsLoaded] = useFonts({
    GTlight: require("./assets/fonts/GTWalsheimPro-Light.ttf"),
    GTregular: require("./assets/fonts/GTWalsheimPro-Regular.ttf"),
    GTmedium: require("./assets/fonts/GTWalsheimPro-Medium.ttf"),
    GTbold: require("./assets/fonts/GTWalsheimPro-Bold.ttf"),
  });



  if (!fontsLoaded || onboarded === null) {
    return <AppLoading />;
  } else {
    return (
      <>

          <AuthProvider>
            <LocationProvider>
              <MainNavigation initialBoarded={onboarded} />
            </LocationProvider>
          </AuthProvider>
        <Toast
          config={toastConfig}
          topOffset={getStatusBarHeight(true)}
          onShow={() => console.log("Status shown")}
          onHide={() => console.log("Status hidden")}
        />
        
      </>
    );
  }
}

const appStyles = StyleSheet.create({
  alertWrapper: {
    width: "100%",
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  updateAlertWrapper: {
    width: "100%",
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  alertText: {
    flex: 0.98,
    ...fontsize.small,
    ...FONTS.regular,
    color: COLORS.white3,
  },
  cancelWrapper:{
    padding: 10,  alignSelf: "flex-start", borderRadius: 16
  }
});
