import React, { useEffect, useState, useCallback } from "react";
import Toast from "react-native-toast-message";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Text, View, LogBox, TouchableOpacity, StyleSheet } from "react-native";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { COLORS, FONTS, fontsize } from "./constants";
import { LocationProvider } from "./context/LocationContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthProvider } from "./context/AuthContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigatorSelector } from "./navigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { getStatusBarHeight } from "react-native-iphone-screen-helper";
import { enableFreeze } from "react-native-screens";

// enableFreeze(true);

import { AWEEKAFTER, getDataFromStorage, setAuthorizationToken } from "./utils";
import { getCurrentLocation } from "./utils/customLocation";
import { requestTrackingPermissionsAsync, getTrackingPermissionsAsync } from "expo-tracking-transparency";



const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "white",
  },
};

export const toastConfig = {
  errorToast: ({ text1, props }: { text1: string; props: any }) => (
    <View style={[appStyles.alertWrapper, { backgroundColor: "#E00000" }]}>
      <View style={{ flex: 1 }}>
        <Text style={appStyles.alertText}>{props.message}</Text>
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => Toast.hide()}
        style={appStyles.cancelWrapper}
      >
        {/* <Alertcancelicon /> */}
      </TouchableOpacity>
    </View>
  ),

  successToast: ({ text1, props }: { text1: string; props: any }) => (
    <View style={[appStyles.alertWrapper, { backgroundColor: "#25DBA3" }]}>
      <View style={{ flex: 1 }}>
        <Text style={appStyles.alertText}>{props.message} </Text>
      </View>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => Toast.hide()}
        style={appStyles.cancelWrapper}
      >
        {/* <Alertcancelicon /> */}
      </TouchableOpacity>
    </View>
  ),

  purpleToast: ({ text1, props }: { text1: string; props: any }) => (
    <View style={[appStyles.alertWrapper, { backgroundColor: "#f80000" }]}>
      <View style={{ flex: 1 }}>
        <Text style={appStyles.alertText}>{props.message} </Text>
      </View>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => Toast.hide()}
        style={appStyles.cancelWrapper}
      >
        {/* <Alertcancelicon /> */}
      </TouchableOpacity>
    </View>
  ),
};

LogBox.ignoreLogs(["Setting a timer"]);
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [routeName, setRouteName] = useState("onboarding_screen");
  const [onboarded, setOnboarded] = useState<null | boolean>(null);
  let alertOffset = 0;


  useEffect(() => {
    (async () => {
      await getCurrentLocation()

      const { granted } = await getTrackingPermissionsAsync();
      if (!granted) {
        await requestTrackingPermissionsAsync()
        console.log('Yay! I have user permission to track data');
      }
      
    })();
  }, []);


  

  // check for new updates as early as possible and update the app based on platform
  // useExpoUpdate();

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
    getDataFromStorage("@token").then((response) => {
      if (response !== null) {
        if (Date.now() - response.time > AWEEKAFTER) {
          return null;
        }
        setRouteName("welcome_screen");
        setAuthorizationToken(response.token);
      }
    });
  }, []);

  useEffect(() => {
    checkOnboarding();
  }, []);

  let [fontsLoaded] = useFonts({
    BRlight: require("./assets/fonts/BRFirma-Light.otf"),
    BRregular: require("./assets/fonts/BRFirma-Regular.otf"),
    BRmedium: require("./assets/fonts/BRFirma-Medium.otf"),
    BRsemibold: require("./assets/fonts/BRFirma-Semibold.otf"),
    BRbold: require("./assets/fonts/BRFirma-Bold.otf"),
  });

  async function getCurrentRoute(state: any) {
    let _getCurrentRoute = await state?.getCurrentRoute()?.name;
    setRouteName(_getCurrentRoute);
    return _getCurrentRoute;
  }

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded || onboarded === null) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <AuthProvider>
        <LocationProvider>
          <SafeAreaProvider>
            <NavigationContainer>
              <NavigatorSelector routeName={routeName} />
            </NavigationContainer>
          </SafeAreaProvider>
        </LocationProvider>
      </AuthProvider>
      <Toast config={toastConfig} topOffset={0} />
    </GestureHandlerRootView>
  );
}

const appStyles = StyleSheet.create({
  alertWrapper: {
    width: "100%",
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingTop: getStatusBarHeight(true) + 15,
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
    lineHeight: 27,
  },
  cancelWrapper: {
    padding: 10,
    alignSelf: "flex-start",
    borderRadius: 16,
  },
});
