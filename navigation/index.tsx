import React, { useRef, useContext, useState, useEffect } from "react";
import * as Notification from "expo-notifications";
import Constants from "expo-constants";
import {
  View,
  Animated,
  AppState,
  Platform,
  Button,
  Image,
  Text,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { customNavigation, navigationRef } from "../utils/customNavigation";
import AsyncStorage from '@react-native-async-storage/async-storage'

import { registerForPushNotificationsAsync } from "../utils/pushNotifications";
// import axiosCustom from "../httpRequests/axiosCustom";÷
// import Animated from "react-native-reanimated";

const AppStack = createStackNavigator<RootStackParamList>();
const BottomTab = createBottomTabNavigator<RootTabParamList>();
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
  Setup,
  Personal,
  Security,
  Securepin,
  Verification,
  Welcome,

  //Dashboard Screens
  Home,

  //Transactions
  Transactions,
  Newtransactions,
  Transactiondetails,
  Transactiondispute,
  Pendingrequest, //This screen has changed
  Accepetedrequest, //This screen has changed too
  History,
  Settings,
  Editprofile,
  Securityprivacy,
  Changepassword,
  Changepin,

  //Withdraw
  Requestnew,
  Availablelisting,
  Withdraw, ///Requests(pending and accepted)
  Withdrawpreview,
  Editmeetup,
  Pendingwithdraw,
  Acceptedwithdraw,
  Requestsummary,
  Cancelrequest,
  Summary,

  //Wallet funding
  Addcash,
  Choosewallet,

  //Transfer funds
  Transfercash,
  TransferInput,
  Getdetails, //If Feather
  Bankaccount, //If Bank accout
  Transferpin,

  //Notification
  Notifications,

  //Deposit
  Deposit, ///Requests(pending and accepted)
  Depositupdate, ///
  Pendingdeposit,
  Accepteddeposit,
  Depositpin,
  Canceldeposit,
  WalletPin,
  //Chats
  Chatshome,
  Chatsdm,
  Usersearch,
  TransferpinBank,
  WithdrawPin,
  SecurepinAgain,
  CustomWebView,
  Depositinput,
  LockScreen,
  Testings,
  Paybills,
} from "../screens";
import { Loader, Tab } from "../components";
import { COLORS, icons, SIZES } from "../constants";

import { AuthContext } from "../context/AuthContext";

// import App from "../App";
import Map from "../screens/shared/map/Map";
import Negotiate from "../screens/shared/NegotiateFee/Negotiate";

const {
  TabHome,
  Tabhistory,
  Tabtransactions,
  Tabchats,
  Tabsettings,
  Tabuser,
  Tabplusicon,
} = icons;

Notification.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export function usePushNotification() {
  const [expoPushToken, setExpoPushToken] = useState<string>();
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      setExpoPushToken(token);
      console.log(token, "From the index");
    });

    // console.log(expoPushToken, "This is the token")

    notificationListener.current = Notification.addNotificationReceivedListener(
      (notification) => {
        setNotification(notification);
      }
    );

    responseListener.current =
      Notification.addNotificationResponseReceivedListener((response) => {
        //   console.log(response);
        console.log("I just tapped the note", response);
        const { data } = response.notification.request.content;
        console.log(data);
        //   console.log("Here is the data", data.data.takeTo)
        customNavigation(data.redirectTo, {});
      });

    return () => {
      Notification.removeNotificationSubscription(notificationListener.current);
      Notification.removeNotificationSubscription(responseListener.current);
    };
  }, []);

    // const sendSchedulePushNotification = async () => {
    //   await Notifications.scheduleNotificationAsync({
    //     content: {
    //       title: "You've got mail! 📬",
    //       body: "Here is the notification body",
    //       data: { data: "goes here", takeTo: "Newtransactions" },
    //     },
    //     trigger: { seconds: 5 },
    //   });
    // };

  //Instant Notifications
  const sendPushNotification = async (
    receiverMsgToken: string,
    title: string,
    body: string,
    redirectTo: string,
    channelId?: string
  ) => {
    const message = {
      to: receiverMsgToken,
      sound: "default",
      title: title,
      body: body,
      data: { someData: "here is the data", redirectTo: redirectTo },
      channelId: channelId ? channelId : "default",
    };

    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
  };

  return {
    sendPushNotification: sendPushNotification,
    expoPushToken: expoPushToken,
  };
}

function getWidth() {
  let width = SIZES.width;

  return width / 5;
}

const horizontalAnimation = {
  gestureDirection: "horizontal",
  cardStyleInterpolator: ({ current, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
        ],
      },
    };
  },
};

const verticalAnimation = {
  gestureDirection: "vertical",
  cardStyleInterpolator: ({ current, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateY: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.height, 0],
            }),
          },
        ],
      },
    };
  },
};

const Tabs = () => {
  const tabOffsetValue = useRef(new Animated.Value(0)).current;

  return (
    <>
      <BottomTab.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "white",
            height: 82,
            // paddingHorizontal: 36.5,
            // paddingVertical: 20,
            alignItems: "center",
            justifyContent: "center",
          },
        }}
      >
        <BottomTab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ focused, color, size }) => {
              return (
                <View
                  style={
                    {
                      // position: "absolute",
                    }
                  }
                >
                  <TabHome focused={focused} />
                </View>
              );
            },
            unmountOnBlur: true
          }}
          listeners={({ navigation, route }) => ({
            tabPress: (e) => {
              Animated.spring(tabOffsetValue, {
                toValue: 0,
                useNativeDriver: true,
              }).start();
            },
          })}
        />

        <BottomTab.Screen
          name="History"
          component={Transactions}
          options={{
            tabBarIcon: ({ focused, color, size }) => {
              return (
                <View
                  style={{
                    position: "absolute",
                    // top: "50%"
                  }}
                >
                  <Tabhistory focused={focused} />
                </View>
              );
            },
            
          }}
          listeners={({ navigation, route }) => ({
            tabPress: (e) => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth(),
                useNativeDriver: true,
              }).start();
            },
          })}
        />

        <BottomTab.Screen
          name="Transactions"
          component={Newtransactions}
          options={{
            tabBarIcon: ({ focused, color, size }) => {
              return (
                <View
                  style={{
                    // position: "absolute",
                    // top: "50%"
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: COLORS.blue6,
                    padding: 13.4,
                    borderRadius: 50,
                    shadowColor: COLORS.blue6,
                    shadowOpacity: 0.3,
                    shadowOffset: { width: -5, height: -5 },
                    shadowRadius: 10,
                    elevation: 10,
                  }}
                >
                  <Tabplusicon />
                </View>
              );
            },
            unmountOnBlur: true
          }}
          listeners={({ navigation, route }) => ({
            tabPress: (e) => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 2,
                useNativeDriver: true,
              }).start();
            },
          })}
        />
        <BottomTab.Screen
          name="Chats"
          component={Chatshome}
          options={{
            tabBarIcon: ({ focused, color, size }) => {
              return (
                <View
                  style={{
                    position: "absolute",
                    // top: "50%"
                  }}
                >
                  <Tabchats focused={focused} />
                </View>
              );
            },
          }}
          listeners={({ navigation, route }) => ({
            tabPress: (e) => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 3,
                useNativeDriver: true,
              }).start();
            },
          })}
        />
        <BottomTab.Screen
          name="Settings"
          component={Settings}
          options={{
            tabBarIcon: ({ focused, color, size }) => {
              return (
                <View
                  style={{
                    position: "absolute",
                    // top: "50%"
                  }}
                >
                  <Tabuser focused={focused} />
                </View>
              );
            },
          }}
          listeners={({ navigation, route }) => ({
            tabPress: (e) => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 4,
                useNativeDriver: true,
              }).start();
            },
          })}
        />
      </BottomTab.Navigator>

      <Animated.View
        style={{
          width: getWidth(),
          height: 1.5,
          backgroundColor: COLORS.blue6,
          position: "absolute",
          bottom: 82,
          transform: [{ translateX: tabOffsetValue }, { scaleX: 0.3 }],
        }}
      ></Animated.View>
    </>
  );
};



const RootNavigator = ({initialBoarded}) => {
  const { token } = useContext(AuthContext);

  return (
    <AppStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={initialBoarded ?  "Login" : "Onboarding"}
    >
      {/* <AppStack.Screen name="map" component={Map} /> */}
      {/* SCREEN FOR AUTH */}
      {!token ? (
        <AppStack.Group screenOptions={verticalAnimation}>
          <AppStack.Screen name="Onboarding" component={Onboarding} />
          <AppStack.Screen name="Personal" component={Personal} />
          <AppStack.Screen name="Verification" component={Verification} />
          <AppStack.Screen name="Security" component={Security} />
          <AppStack.Screen name="Securepin" component={Securepin} />
          <AppStack.Screen name="SecurepinAgain" component={SecurepinAgain} />
          <AppStack.Screen name="Setup" component={Setup} />
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
              name="Newtransactions"
              component={Newtransactions}
            />
            <AppStack.Screen
              name="Transactiondetails"
              component={Transactiondetails}
            />
            <AppStack.Screen
              name="Transactiondispute"
              component={Transactiondispute}
            />
          </AppStack.Group>

          {/* Settings,
  Editprofile,
  Securityprivacy,
  Changepassword,
  Changepin, */}

          {/* Settings Screens */}
          <AppStack.Group>
            <AppStack.Screen name="Editprofile" component={Editprofile} />
            <AppStack.Screen
              name="Securityprivacy"
              component={Securityprivacy}
            />
            <AppStack.Screen name="Changepassword" component={Changepassword} />
            <AppStack.Screen name="Changepin" component={Changepin} />
          </AppStack.Group>
          {/* Withdraw Screens */}
          <AppStack.Group>
            <AppStack.Screen name="Withdraw" component={Withdraw} />
            <AppStack.Screen name="Requestnew" component={Requestnew} />
            <AppStack.Screen
              name="Availablelisting"
              component={Availablelisting}
            />
            <AppStack.Screen
              name="Withdrawpreview"
              component={Withdrawpreview}
            />
            <AppStack.Screen name="Editmeetup" component={Editmeetup} />
            {/* To Cancel */}
            {/* cancel requests */}
            <AppStack.Screen
              name="Pendingwithdraw"
              component={Pendingwithdraw}
            />
            <AppStack.Screen
              name="Negotiate"
              component={Negotiate}
            />
            <AppStack.Screen name="Cancelrequest" component={Cancelrequest} />
            {/* TO MaKE AFTER ACCEPTING */}
            <AppStack.Screen
              name="Acceptedwithdraw"
              component={Acceptedwithdraw}
            />
            <AppStack.Screen name="Requestsummary" component={Requestsummary} />
            <AppStack.Screen name="Summary" component={Summary} />
            <AppStack.Screen name="WithdrawPin" component={WithdrawPin} />
          </AppStack.Group>

          {/* Wallet Funding */}
          <AppStack.Group>
            <AppStack.Screen name="Addcash" component={Addcash} />
            <AppStack.Screen name="Choosewallet" component={Choosewallet} />
            <AppStack.Screen name="WalletPin" component={WalletPin} />
          </AppStack.Group>

          {/* Transfer funds screens */}
          <AppStack.Group>
            <AppStack.Screen name="Transfercash" component={Transfercash} />
            <AppStack.Screen name="TransferInput" component={TransferInput} />
            <AppStack.Screen name="Getdetails" component={Getdetails} />
            <AppStack.Screen name="Bankaccount" component={Bankaccount} />
            <AppStack.Screen name="Transferpin" component={Transferpin} />
            <AppStack.Screen
              name="TransferpinBank"
              component={TransferpinBank}
            />
          </AppStack.Group>

          {/* Notification Screen */}
          <AppStack.Screen
            name="Notifications"
            component={Notifications}
            options={horizontalAnimation}
          />

          {/* Paybills Screen */}
          <AppStack.Screen name="Paybills" component={Paybills} />

          {/* Deposit Screens */}
          <AppStack.Group>
            <AppStack.Screen name="Depositupdate" component={Depositupdate} />
            <AppStack.Screen name="Deposit" component={true ? Deposit : Depositupdate} />
            <AppStack.Screen name="Depositinput" component={Depositinput} />
            <AppStack.Screen name="Pendingdeposit" component={Pendingdeposit} />
            <AppStack.Screen
              name="Accepteddeposit"
              component={Accepteddeposit}
            />
            <AppStack.Screen name="Depositpin" component={Depositpin} />
            <AppStack.Screen name="Canceldeposit" component={Canceldeposit} />
          </AppStack.Group>

          {/* Chats Screens */}
          <AppStack.Group>
            <AppStack.Screen name="Chatshome" component={Chatshome} />
            <AppStack.Screen name="Chatsdm" component={Chatsdm} />
            <AppStack.Screen name="Usersearch" component={Usersearch} />
          </AppStack.Group>
          <AppStack.Screen name="CustomWebView" component={CustomWebView} />
        </>
      )}
    </AppStack.Navigator>
  );
};

export default function MainNavigation({initialBoarded = false}) {
  const [modal, setModal] = useState(false);
  const timer = useRef<number>(Date.now());
  const { token, setMessageToken } = useContext(AuthContext);
  const appState = useRef(AppState.currentState);
  const { sendPushNotification, expoPushToken } = usePushNotification();
  const [onboarded, setOnboarded] = useState(false)




  useEffect(() => {
    setMessageToken(expoPushToken);
  }, [token]);

  useEffect(() => {
    const subscription: any = AppState.addEventListener(
      "change",
      (nextAppState) => {
        if (
          appState.current.match(/inactive|background/) &&
          nextAppState === "active"
        ) {
          if (Date.now() - timer.current > 300000) return setModal(true);
          return;
        }
        appState.current = nextAppState;
        if (!modal || !token) timer.current = Date.now();
      }
    );
    return () => {
      // subscription.remove();
    };
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      {/* {token ? <LockScreen modal={modal} setModal={setModal} /> : null} */}
      <RootNavigator initialBoarded={initialBoarded} />
    </NavigationContainer>
  );
}
