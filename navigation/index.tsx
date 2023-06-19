import React, { useRef, useContext, useState, useEffect } from "react";
import * as Notification from "expo-notifications";
import { AppState } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { navigationRef } from "../utils/customNavigation";

import { AuthContext } from "../context/AuthContext";

import axiosCustom from "../httpRequests/axiosCustom";
import CustomWebViewSupport from "../screens/shared/CustomWebViewSupport";
import { usePushNotification } from "../hooks/usePushNotifications";

const AppStack = createStackNavigator<RootStackParamList>();

const AuthStack = createStackNavigator<RootAuthStackParamList>();

import { RootStackParamList, RootAuthStackParamList } from "../types";

import {
  Onboarding,

  // Auth Screens
  Login,
  Welcome,
  Home,
  Transactions,
  Notifications,

  //Chats
  Chatshome,
  Chatsdm,
  Usersearch,
  CustomWebView,
  Testings,
  LockScreen,
  Getstarted,
  Transactiondetails,
  Cards,
  Profile,
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
  Banktransfer,
  Feathertransfer,
  Paymerchant,
  Billsandutility,
  Shareandearn,
  Walletlimits,
  Securityandprivacy,
  Verifybvn,
  Verifybvncode,
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
      initialRouteName={false ? "Getstarted" : "Onboarding"}
    >
      {!token ? (
        <AppStack.Group>
          <AppStack.Screen name="Onboarding" component={Onboarding} />
          <AppStack.Screen name="Getstarted" component={Getstarted} />
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


        {/* New screens to tbe moved out after design */}
        {/* <AppStack.Screen name="Notifications" component={Notifications} /> */}



          {/* Notification Screen */}
          <AppStack.Screen name="Notifications" component={Notifications} />

          <AppStack.Screen name="Withdrawlisting" component={Withdrawlisting} />

          <AppStack.Screen name="Accountlevel" component={Accountlevel} />

          <AppStack.Screen name="Verifyemail" component={Verifyemail} />
          <AppStack.Screen name="Verifyemailcode" component={Verifyemailcode} />
          <AppStack.Screen
            name="Verifypersonalinfo"
            component={Verifypersonalinfo}
          />
          <AppStack.Screen name="Personalinfo" component={Personalinfo} />
          <AppStack.Screen name="Paymerchant" component={Paymerchant} />
          <AppStack.Screen
            name="Changeappearance"
            component={Changeappearance}
          />
          <AppStack.Screen name="Billsandutility" component={Billsandutility} />

          <AppStack.Screen name="Shareandearn" component={Shareandearn} />
          <AppStack.Screen name="Walletlimits" component={Walletlimits} />
          <AppStack.Screen
            name="Securityandprivacy"
            component={Securityandprivacy}
          />
          <AppStack.Screen name="Verifybvn" component={Verifybvn} />

          <AppStack.Screen name="Verifybvncode" component={Verifybvncode} />

          <AppStack.Screen name="Changememoji" component={Changememoji} />
          <AppStack.Screen name="Cardtopup" component={Cardtopup} />
          <AppStack.Screen name="Cardwithdraw" component={Cardwithdraw} />

          <AppStack.Screen name="Feathertransfer" component={Feathertransfer} />
          <AppStack.Screen name="Banktransfer" component={Banktransfer} />

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
