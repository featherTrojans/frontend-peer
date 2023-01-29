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
  TouchableOpacity,
  Alert,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { customNavigation, navigationRef } from "../utils/customNavigation";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  Forgetpassword,
  Forgetpasswordotp,
  Setnewpassword,
  Welcome,
  Welcometochange,

  //Dashboard Screens
  Home,

  //Transactions
  Transactions,
  Newtransactions,
  Transactiondetails,
  Transactiondispute,
  Transactionsrating,
  // Pendingrequest, //This screen has changed
  // Accepetedrequest, //This screen has changed too
  History,

  //User Settings
  Settings,
  Editprofile,
  Securityprivacy,
  Changepassword,
  Changepin,
  Biometrics,
  Walletmanagement,
  Addbvn,

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
  DepositSummary,
  Canceldeposit,
  WalletPin,
  Updatedeposit,

  //Chats
  Chatshome,
  Chatsdm,
  Chatsoon,
  Usersearch,
  TransferpinBank,
  WithdrawPin,
  SecurepinAgain,
  CustomWebView,
  Depositinput,
  Testings,
  LockScreen,

  //Paybills and Airtime
  Paybills,

  Airtimeamount,
  Airtimeanddata,
  Airtimedetails,
  Airtimepurchasepin,
  Electricityamount,
  Electricitydetails,
  Electricitytype,
  Electricitymetertype,
  Dataprovider,
  Dataplan, 
  Airtimeprovider,
  Becomeanagent,
  Sendcash,
  BillContacts,
  Selectbank,
  Meetuppoint,
  Safetycautions,
  Getstarted,
  Verifybvn,
  Requesterinfo,
  Depositstart,
  Agentform
} from "../screens";

import { Loader, Tab } from "../components";
import { COLORS, icons, SIZES } from "../constants";

import { AuthContext } from "../context/AuthContext";

import Map from "../screens/shared/map/Map";
import Negotiate from "../screens/shared/NegotiateFee/Negotiate";
import axiosCustom from "../httpRequests/axiosCustom";
import CustomWebViewSupport from "../screens/shared/CustomWebViewSupport";

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




// Push notification function
export function usePushNotification() {
  const [expoPushToken, setExpoPushToken] = useState<string>();
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      setExpoPushToken(token);
    });

    notificationListener.current = Notification.addNotificationReceivedListener(
      (notification) => {
        setNotification(notification);
      }
    );

    responseListener.current =
      Notification.addNotificationResponseReceivedListener((response) => {
        const { data } = response.notification.request.content;
        // console.log(data, "here is the notification data")
        customNavigation(data.redirectTo, {});
      });

    return () => {
      Notification.removeNotificationSubscription(notificationListener.current);
      Notification.removeNotificationSubscription(responseListener.current);
    };
  }, []);


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
        screenListeners={({ navigation, route }) => ({
          state: (e) => {
            switch (route.name) {
              case "Home":
                Animated.spring(tabOffsetValue, {
                  toValue: 0,
                  useNativeDriver: true,
                }).start();
                break;
              case "History":
                Animated.spring(tabOffsetValue, {
                  toValue: getWidth(),
                  useNativeDriver: true,
                }).start();
                break;
              case "Transactions":
                Animated.spring(tabOffsetValue, {
                  toValue: getWidth() * 2,
                  useNativeDriver: true,
                }).start();
                break;
              case "Chats":
                Animated.spring(tabOffsetValue, {
                  toValue: getWidth() * 3,
                  useNativeDriver: true,
                }).start();
                break;
              case "Settings":
                Animated.spring(tabOffsetValue, {
                  toValue: getWidth() * 4,
                  useNativeDriver: true,
                }).start();
                break;

              default:
                break;
            }
          },
        })}
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
            // unmountOnBlur: true,
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
            // unmountOnBlur: true,
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
            unmountOnBlur: true,
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
            // unmountOnBlur: true,
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

const RootNavigator = ({ initialBoarded }) => {
  const { token } = useContext(AuthContext);

  return (
    <AppStack.Navigator
      screenOptions={{ headerShown: false }}
      // initialRouteName="DepositSummary"
      initialRouteName={initialBoarded ? "Getstarted" : "Onboarding"}
    >
      {/* <AppStack.Screen name="map" component={Map} /> */}
      {/* SCREEN FOR AUTH */}
      {!token ? (
        <AppStack.Group screenOptions={verticalAnimation}>
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
          <AppStack.Screen name="Setup" component={Setup} />
          <AppStack.Screen name="Login" component={Login} />
          <AppStack.Screen name="Welcome" component={Welcome} />
          <AppStack.Screen name="Welcometochange" component={Welcometochange} />
        </AppStack.Group>
      ) : (
        <>
          
          {/* Transaction Screens*/}
          <AppStack.Group>
            <AppStack.Screen
              options={horizontalAnimation}
              name="Root"
              component={Tabs}
            />
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



          {/* Settings Screens */}
          <AppStack.Group>
            <AppStack.Screen name="Editprofile" component={Editprofile} />
            <AppStack.Screen
              name="Securityprivacy"
              component={Securityprivacy}
            />
            <AppStack.Screen name="Changepassword" component={Changepassword} />
            <AppStack.Screen name="Walletmanagement" component={Walletmanagement} />
            <AppStack.Screen name="Becomeanagent" component={Becomeanagent} />
            <AppStack.Screen name="Agentform" component={Agentform} />

            <AppStack.Screen name="Addbvn" component={Addbvn} />
          <AppStack.Screen name="Verifybvn" component={Verifybvn} />



            <AppStack.Screen name="Changepin" component={Changepin} />
            <AppStack.Screen name="Biometrics" component={Biometrics} />
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
            <AppStack.Screen name="Requesterinfo" component={Requesterinfo} />

            {/* To Cancel */}
            {/* cancel requests */}
            <AppStack.Screen
              name="Pendingwithdraw"
              component={Pendingwithdraw}
            />
            <AppStack.Screen name="Negotiate" component={Negotiate} />
            <AppStack.Screen name="Cancelrequest" component={Cancelrequest} />
            {/* TO MaKE AFTER ACCEPTING */}
            <AppStack.Screen
              name="Acceptedwithdraw"
              component={Acceptedwithdraw}
            />
            <AppStack.Screen name="Requestsummary" component={Requestsummary} />
            <AppStack.Screen name="Summary" component={Summary} />
            <AppStack.Screen name="WithdrawPin" component={WithdrawPin} />
            <AppStack.Screen
              name="Transactionsrating"
              component={Transactionsrating}
            />
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
            <AppStack.Screen name="Sendcash" component={Sendcash} />
            <AppStack.Screen name="BillContacts" component={BillContacts} />
            <AppStack.Screen name="Selectbank" component={Selectbank} />

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
          <AppStack.Screen name="Airtimeanddata" component={Airtimeanddata} />
          <AppStack.Screen name="Airtimeamount" component={Airtimeamount} />
          <AppStack.Screen name="Airtimedetails" component={Airtimedetails} />
          <AppStack.Screen name="Airtimeprovider" component={Airtimeprovider} />

          <AppStack.Screen name="Dataprovider" component={Dataprovider} />
          <AppStack.Screen name="Dataplan" component={Dataplan} />

          <AppStack.Screen
            name="Airtimepurchasepin"
            component={Airtimepurchasepin}
          />
          <AppStack.Screen
            name="Electricityamount"
            component={Electricityamount}
          />
          <AppStack.Screen
            name="Electricitydetails"
            component={Electricitydetails}
          />
          <AppStack.Screen
            name="Electricitytype"
            component={Electricitytype}
          />
           <AppStack.Screen
            name="Electricitymetertype"
            component={Electricitymetertype}
          />

          {/* Deposit Screens */}
          <AppStack.Group>
            <AppStack.Screen name="Depositupdate" component={Depositupdate} />
            <AppStack.Screen name="Deposit" component={Deposit} />
            <AppStack.Screen name="Depositinput" component={Depositinput} />
            <AppStack.Screen name="Updatedeposit" component={Updatedeposit} />
            <AppStack.Screen name="Pendingdeposit" component={Pendingdeposit} />
            <AppStack.Screen name="Meetuppoint" component={Meetuppoint} />
            <AppStack.Screen name="Safetycautions" component={Safetycautions} />
            <AppStack.Screen name="Depositstart" component={Depositstart} />



            <AppStack.Screen
              name="Accepteddeposit"
              component={Accepteddeposit}
            />
            <AppStack.Screen name="Depositpin" component={Depositpin} />
            <AppStack.Screen name="DepositSummary" component={DepositSummary} />
            <AppStack.Screen name="Canceldeposit" component={Canceldeposit} />
          </AppStack.Group>
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
    AppState.addEventListener("change", lockLogic);

    return () => {
      // AppState.removeEventListener("change", lockLogic);
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
