import React, { useRef, useEffect, useState, useCallback } from "react";
import Toast from "react-native-toast-message";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import {
  Text,
  View,
  LogBox,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { COLORS, FONTS, fontsize, icons } from "./constants";
import { LocationProvider } from "./context/LocationContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { customNavigation } from "./utils/customNavigation";
import { AuthProvider } from "./context/AuthContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import navigationService from "./utils/navigation";
import { NavigatorSelector } from "./navigation";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { AWEEKAFTER, getDataFromStorage, setAuthorizationToken } from "./utils";

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
    <View style={[appStyles.alertWrapper, { backgroundColor: "#8456FF" }]}>
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

  blueToast: ({ text1, props }: { text1: string; props: any }) => (
    <View style={[appStyles.alertWrapper, { backgroundColor: "#5676FF" }]}>
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
  updateToast: ({ text1, props }: { text1: string; props: any }) => (
    <View
      style={[
        appStyles.alertWrapper,
        { backgroundColor: "#fff", height: 54, paddingVertical: 18 },
      ]}
    >
      <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
        {/* <Updateprofileicon /> */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => customNavigation("Settings", {})}
          style={{ marginLeft: 12, flexDirection: "row", alignItems: "center" }}
        >
          <Text
            style={{
              ...fontsize.smallest,
              ...FONTS.medium,
              color: COLORS.blue9,
              marginRight: 12,
            }}
          >
            Update your profile,{" "}
            <Text
              style={{
                color: COLORS.blue6,
                textDecorationColor: COLORS.blue6,
                textDecorationLine: "underline",
                textDecorationStyle: "solid",
              }}
            >
              go to settings
            </Text>
          </Text>
          {/* <Bluearrowrighticon /> */}
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => Toast.hide()}
        style={appStyles.cancelWrapper}
      >
        {/* <Updatealertcancelicon /> */}
      </TouchableOpacity>
    </View>
  ),
};

LogBox.ignoreLogs(["Setting a timer"]);
SplashScreen.preventAutoHideAsync();
export default function App() {
  const [routeName, setRouteName] = useState("onboarding_screen");
  const [onboarded, setOnboarded] = useState<null | boolean>(null);
  // const
  // const {Swipemodal} = useSwipemodal()
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
  // const persistLogin = async () => {
  //   // await AsyncStorage.removeItem('@onboarded')
  //   try {
  //     const value = await AsyncStorage.getItem("@onboarded");

  //     if (value !== null) {
  //       setOnboarded(JSON.parse(value).onboard);
  //     } else {
  //       setOnboarded(false);
  //     }
  //   } catch (err) {
  //     setOnboarded(false);
  //   } finally {
  //   }
  // };
  useEffect(() => {
    // why don't I check here, then set Auth , and set tokem you know
    setAuthorizationToken(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJpcHM5aUtaNWlQIiwidXNlcm5hbWUiOiJkdWRlIiwiZW1haWwiOiJCQU1JQVlPOTBAR01BSUwuQ09NIiwiZnVsbE5hbWUiOiJMQVdBTCBBWU9CQU1JIiwiaWF0IjoxNjkxOTUwMTczLCJleHAiOjE2OTI1NTQ5NzN9.Mj1Af1ayAetpvK-0EIul7VHVXRn8W9yLmLdNm4V6BJI"
    );
    getDataFromStorage("@token").then((response) => {
      if (response !== null) {
        if (Date.now() - response.time > AWEEKAFTER) {
          return null;
        }
        // response.token
        setRouteName("welcome_screen");
        setAuthorizationToken(
          response.token
          // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJpcHM5aUtaNWlQIiwidXNlcm5hbWUiOiJkdWRlIiwiZW1haWwiOiJCQU1JQVlPOTBAR01BSUwuQ09NIiwiZnVsbE5hbWUiOiJMQVdBTCBBWU9CQU1JIiwiaWF0IjoxNjkxOTUwMTczLCJleHAiOjE2OTI1NTQ5NzN9.Mj1Af1ayAetpvK-0EIul7VHVXRn8W9yLmLdNm4V6BJI"
        );
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
      <SafeAreaProvider>
        <View style={{ flex: 1 }}>
          <StatusBar />
          <NavigationContainer
            theme={MyTheme}
            ref={(navigationRef: any) => {
              navigationService.setTopLevelNavigator(navigationRef);
            }}
            onStateChange={async () => {
              getCurrentRoute(navigationService.getNavigator());
            }}
          >
            <AuthProvider>
              <LocationProvider>
                <NavigatorSelector routeName={routeName} />
              </LocationProvider>
            </AuthProvider>
            <Toast
              config={toastConfig}
              topOffset={44}
              onShow={() => console.log("Status shown")}
              onHide={() => console.log("Status hidden")}
            />
          </NavigationContainer>
        </View>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const appStyles = StyleSheet.create({
  alertWrapper: {
    width: "100%",
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 12,
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
  cancelWrapper: {
    padding: 10,
    alignSelf: "flex-start",
    borderRadius: 16,
  },
});
