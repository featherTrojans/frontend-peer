import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

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

  History,
  Settings,
  Pendingrequest, //This screen has changed
  Accepetedrequest, //This screen has changed too
  
  //Withdraw
  Requestnew, 
  Availablelisting,
  Withdraw,   ///Requests(pending and accepted)
  Withdrawpreview,
  Editmeetup,
  Pendingwithdraw,
  Acceptedwithdraw,
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

  Deposit, ///Requests(pending and accepted)
  Depositupdate,
  Pendingdeposit,
  Accepteddeposit,
  Depositpin,
  Canceldeposit,



  //Chats
  Chatshome,
  Chatsdm,
  Usersearch,
} from "../screens";



import { AppState } from "react-native";
import { Loader, Tab } from "../components";
import { icons } from "../constants";
const AppStack = createStackNavigator<RootStackParamList>();
const BottomTab = createBottomTabNavigator<RootTabParamList>();
const AuthStack = createStackNavigator<RootAuthStackParamList>();

const { TabHome, Tabhistory, Tabtransactions, Tabchats, Tabsettings } = icons;

// const Auth = () => {
//   <AuthStack.Navigator
//   initialRouteName="Login"
//   screenOptions={{
//     headerShown: false
//   }}
//   >
//     <AuthStack.Screen name="Login" component={Login} />
//     <AuthStack.Screen name="Signup" component={Signup} />
//     <AuthStack.Screen name="Verification" component={Verification} />
//   </AuthStack.Navigator>;
// };

const Tabs = () => (
  <BottomTab.Navigator
    initialRouteName="Home"
    screenOptions={{
      headerShown: false,

      tabBarStyle: {
        height: 87,
        paddingVertical: 18,
        paddingHorizontal: 18,
      },
    }}
  >
    <BottomTab.Screen
      name="Home"
      component={Home}
      options={{
        tabBarButton: (props) => (
          <Tab
            label="Home"
            {...props}
            icon={<TabHome focused={props.accessibilityState?.selected} />}
          />
        ),
      }}
    />
    <BottomTab.Screen
      name="History"
      component={Availablelisting}
      options={{
        tabBarButton: (props) => (
          <Tab
            label="History"
            {...props}
            icon={<Tabhistory focused={props.accessibilityState?.selected} />}
          />
        ),
      }}
    />
    <BottomTab.Screen
      name="Transactions"
      component={Transactions}
      options={{
        tabBarButton: (props) => (
          <Tab
            label="Transactions"
            {...props}
            icon={
              <Tabtransactions focused={props.accessibilityState?.selected} />
            }
          />
        ),
      }}
    />
    <BottomTab.Screen
      name="Chats"
      component={Chatshome}
      options={{
        tabBarButton: (props) => (
          <Tab
            label="Chats"
            {...props}
            icon={<Tabchats focused={props.accessibilityState?.selected} />}
          />
        ),
      }}
    />
    <BottomTab.Screen
      name="Settings"
      component={Settings}
      options={{
        tabBarButton: (props) => (
          <Tab
            label="Settings"
            {...props}
            icon={<Tabsettings focused={props.accessibilityState?.selected} />}
          />
        ),
      }}
    />
  </BottomTab.Navigator>
);
      
const RootNavigator = () => (
  <AppStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
    // initialRouteName="Root"
  >
    <AppStack.Screen name="Onboarding" component={Depositupdate} />
    <AppStack.Screen name="Personal" component={Personal} />
    <AppStack.Screen name="Verification" component={Verification} />
    <AppStack.Screen name="Security" component={Security} />
    <AppStack.Screen name="Securepin" component={Securepin} />
    <AppStack.Screen name="Setup" component={Setup} />
    <AppStack.Screen name="Login" component={Login} />
    <AppStack.Screen name="Welcome" component={Welcome} />
    <AppStack.Screen name="Root" component={Tabs} />

    {/* SCREEN FOR AUTH */}
    <AppStack.Screen name="Withdraw" component={Withdraw} />
    <AppStack.Screen name="Transfercash" component={Transfercash} />
    {/* <AppStack.Screen name="Deposit" component={Deposit} /> */}

    {/* Transfer FLOW */}
    <AppStack.Screen name="Getdetails" component={Getdetails} />
    <AppStack.Screen name="Bankaccount" component={Bankaccount} />

    {/* TRANSACTIONS */}
    <AppStack.Screen name="Newtransactions" component={Newtransactions} />
    {/* WITHDRAW */}
    <AppStack.Screen name="Summary" component={Summary} />

    {/* HOME NOTIFICATIONS */}
    <AppStack.Screen name="Notifications" component={Notifications} />
    {/* WALLET FUNDING */}
    <AppStack.Screen name="Addcash" component={Addcash} />
    <AppStack.Screen name="Choosewallet" component={Choosewallet} />

    <AppStack.Screen name="Pendingrequest" component={Pendingrequest} />
    <AppStack.Screen name="Cancelrequest" component={Cancelrequest} />
    <AppStack.Screen name="TransferInput" component={TransferInput} />
  </AppStack.Navigator>
);

export default function MainNavigation() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}
