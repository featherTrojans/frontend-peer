import React, { useRef, useContext, useState, useEffect } from "react";
import * as Notification from "expo-notifications";
import { View, Animated, AppState } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { navigationRef } from "../utils/customNavigation";
import { COLORS, icons, SIZES } from "../constants";

import { AuthContext } from "../context/AuthContext";

import Negotiate from "../screens/shared/NegotiateFee/Negotiate";
import axiosCustom from "../httpRequests/axiosCustom";
import CustomWebViewSupport from "../screens/shared/CustomWebViewSupport";
import { usePushNotification } from "../hooks/usePushNotifications";

const AppStack = createStackNavigator<RootStackParamList>();

const AuthStack = createStackNavigator<RootAuthStackParamList>();

import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
  RootAuthStackParamList,
} from "../types";

import {
  Onboarding,

  // Auth Screens
  Login,
  Personal,
  Security,
  Securepin,
  Verification,
  Forgetpassword,
  Forgetpasswordotp,
  Setnewpassword,
  Welcome,
  Home,
  Transactions,
  Notifications,

  //Chats
  Chatshome,
  Chatsdm,
  Usersearch,
  SecurepinAgain,
  CustomWebView,
  Testings,
  LockScreen,
  Getstarted,
  Transactiondetails,
  Cards,
  Profile,
  Withdrawal,
  Withdrawlisting,
  Accountlevel,
  Verifyemail,
  Verifyemailcode,
  Verifypersonalinfo,
  Personalinfo,
  Changeappearance,
  Changememoji,
  Cardtopup,
  Cardwithdraw,
} from "../screens";

import Tabs from "./Tabs";

Notification.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const RootNavigator = ({ initialBoarded }) => {
  const { token } = useContext(AuthContext);

  return (
    <AppStack.Navigator
      screenOptions={{ headerShown: false }}
      // initialRouteName="DepositSummary"
      initialRouteName={false ? "Getstarted" : "Onboarding"}
    >
      {/* <AppStack.Screen name="map" component={Map} /> */}
      {/* SCREEN FOR AUTH */}
      {!token ? (
        <AppStack.Group>
          <AppStack.Screen name="Onboarding" component={Onboarding} />
          <AppStack.Screen name="Getstarted" component={Getstarted} />

          {/* <AppStack.Screen name="Onboarding" component={Onboarding} /> */}
          <AppStack.Screen name="Personal" component={Personal} />
          <AppStack.Screen name="Verification" component={Verification} />
          <AppStack.Screen name="Security" component={Security} />
          <AppStack.Screen name="Securepin" component={Securepin} />
          <AppStack.Screen name="Forgetpassword" component={Forgetpassword} />

          <AppStack.Screen
            name="Forgetpasswordotp"
            component={Forgetpasswordotp}
          />
          <AppStack.Screen name="Setnewpassword" component={Setnewpassword} />
          <AppStack.Screen name="SecurepinAgain" component={SecurepinAgain} />
          <AppStack.Screen name="Login" component={Login} />
          <AppStack.Screen name="Welcome" component={Welcome} />
        </AppStack.Group>
      ) : (
        <>
          {/* Transaction Screens*/}
          <AppStack.Group>
            <AppStack.Screen name="Root" component={Tabs} />
            <AppStack.Screen name="Transactions" component={Transactions} />
            <AppStack.Screen
              name="Transactiondetails"
              component={Transactiondetails}
            />
          </AppStack.Group>

          {/* Notification Screen */}
          <AppStack.Screen name="Notifications" component={Notifications} />

          <AppStack.Screen name="Withdrawal" component={Withdrawal} />
          <AppStack.Screen name="Withdrawlisting" component={Withdrawlisting} />

          <AppStack.Screen name="Accountlevel" component={Accountlevel} />

          <AppStack.Screen name="Verifyemail" component={Verifyemail} />
          <AppStack.Screen name="Verifyemailcode" component={Verifyemailcode} />
          <AppStack.Screen
            name="Verifypersonalinfo"
            component={Verifypersonalinfo}
          />
          <AppStack.Screen name="Personalinfo" component={Personalinfo} />

          <AppStack.Screen
            name="Changeappearance"
            component={Changeappearance}
          />
          <AppStack.Screen name="Changememoji" component={Changememoji} />
          <AppStack.Screen name="Cardtopup" component={Cardtopup} />
          <AppStack.Screen name="Cardwithdraw" component={Cardwithdraw} />

          {/* Chats Screens */}
          <AppStack.Group>
            <AppStack.Screen name="Chatshome" component={Chatshome} />
            <AppStack.Screen name="Chatsdm" component={Chatsdm} />
            <AppStack.Screen name="Usersearch" component={Usersearch} />
            <AppStack.Screen name="CustomWebView" component={CustomWebView} />
            <AppStack.Screen
              name="CustomWebViewSupport"
              component={CustomWebViewSupport}
            />
          </AppStack.Group>
        </>
      )}
    </AppStack.Navigator>
  );
};

export default function MainNavigation({ initialBoarded = false }) {
  const [modal, setModal] = useState(false);
  const timer = useRef<number>(Date.now());
  const { token, setToken, setMessageToken } = useContext(AuthContext);
  const appState = useRef(AppState.currentState);
  const { sendPushNotification, expoPushToken } = usePushNotification();

  useEffect(() => {
    setMessageToken(expoPushToken);
  }, [expoPushToken]);

  useEffect(() => {
    axiosCustom.interceptors.response.use((response) => {
      if (response.status === 401) {
        setToken("");
      }
      return response;
    });
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", lockLogic);
    return () => {
      subscription.remove();
    };
  }, [token, modal]);

  const lockLogic = (nextAppState) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      if (!token) {
        return;
      }

      if (Date.now() - timer.current > 900000) {
        setToken("");
        setModal(false);
        return;
      }
      if (Date.now() - timer.current > 300000) {
        return setModal(true);
      }

      timer.current = Date.now();
      return;
    }
    appState.current = nextAppState;
    if (!modal && token) {
      timer.current = Date.now();
      // setModal(false);
    }
  };

  return (
    <NavigationContainer ref={navigationRef}>
      {token ? <LockScreen modal={modal} setModal={setModal} /> : null}
      <RootNavigator initialBoarded={initialBoarded} />
    </NavigationContainer>
  );
}
