import React, { useRef, useContext, useState, useEffect } from "react";
import * as Notification from "expo-notifications";
import { View, Animated, AppState } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {navigationRef } from "../utils/customNavigation";
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
  Home,
  Transactions,
  Newtransactions,
  Transactiondetails,
  Transactiondispute,
  Transactionsrating,
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
  Agentform,
} from "../screens";
import Tabs from "./Tabs";





Notification.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});




// Bottom Tabs navigation


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
        <AppStack.Group >
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
            <AppStack.Screen
              name="Walletmanagement"
              component={Walletmanagement}
            />
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
          <AppStack.Screen name="Electricitytype" component={Electricitytype} />
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
