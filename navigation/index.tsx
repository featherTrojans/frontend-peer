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
  Login,
<<<<<<< HEAD
  Setup,
  Personal,
  Security,
  Securepin,
=======
  Signup,
>>>>>>> 70e4e5d16c26ad404148401043c97db654a7498b
  Verification,
  Setup,
  Welcome,
  Home,
<<<<<<< HEAD

  //Transactions
  Transactions,
  Newtransactions,
  Transactiondetails,
  Transactiondispute,
=======
>>>>>>> 70e4e5d16c26ad404148401043c97db654a7498b
  History,
  Transactions,
  // Chats,
  Settings,
<<<<<<< HEAD
  Pendingrequest, //This screen has changed
  Accepetedrequest, //This screen has changed too

  //Withdraw
  Requestnew,
  Availablelisting,
  Withdraw, ///Requests(pending and accepted)
  Withdrawpreview,
  Editmeetup,
  Pendingwithdraw,
  Acceptedwithdraw,
  Cancelrequest,
  Summary,

  //Wallet funding
=======
  Withdraw,
  Requestnew,
  Availablelisting,
>>>>>>> 70e4e5d16c26ad404148401043c97db654a7498b
  Addcash,
  Transfercash,
  Getdetails,
  Bankaccount,
  Choosewallet,
  Pendingrequest,
  Summary,
  Cancelrequest,
  Accepetedrequest,
  Personal,
  Security,
  Securepin,
  Notifications,
<<<<<<< HEAD

  //Deposit
=======
  Newtransactions,
>>>>>>> 70e4e5d16c26ad404148401043c97db654a7498b
  Deposit, ///Requests(pending and accepted)
  Depositupdate,
  Pendingdeposit,
  Accepteddeposit,
  Depositpin,
  Canceldeposit,

  //Chats
  Chatshome,
  Chatsdm,
  TransferInput,
  Usersearch,
  Transferpin,
} from "../screens";
import { AppState } from "react-native";
import { Loader, Tab  } from "../components";
import { icons } from "../constants";
// import Deposit from "../screens/app/Deposit/Deposit";
const AppStack = createStackNavigator<RootStackParamList>();
const BottomTab = createBottomTabNavigator<RootTabParamList>();
const AuthStack = createStackNavigator<RootAuthStackParamList>();





const { TabHome, Tabhistory, Tabtransactions, Tabchats, Tabsettings } = icons;

const Tabs = () => (
  <BottomTab.Navigator
    initialRouteName="Home"
    screenOptions={{
      headerShown: false,
      
      tabBarStyle:{
        height: 87,
        paddingVertical: 18,
        paddingHorizontal: 18
      }
    }}
  >
    <BottomTab.Screen
      name="Home"
      component={Home}
      options={{
        tabBarButton: (props) => (
          
          <Tab label="Home" {...props} icon={<TabHome focused={props.accessibilityState?.selected}/>} />
        ),
      }}
    />
    <BottomTab.Screen
      name="History"
      component={Availablelisting}
      options={{
        tabBarButton: (props) => (
          <Tab label="History" {...props} icon={<Tabhistory focused={props.accessibilityState?.selected}/>} />
        ),
      }}
    />
    <BottomTab.Screen
      name="Transactions"
      component={Transactions}  
      options={{
        tabBarButton: (props) => (
          <Tab label="Transactions" {...props} icon={<Tabtransactions focused={props.accessibilityState?.selected}/>} />
        ),
      }}
    />
    <BottomTab.Screen
      name="Chats"
      component={Chatshome}
      options={{
        tabBarButton: (props) => (
          <Tab label="Chats" {...props} icon={<Tabchats focused={props.accessibilityState?.selected}/>} />
        ),
      }}
    />
    <BottomTab.Screen
      name="Settings"
      component={Accepetedrequest}
      options={{
        tabBarButton: (props) => (
          <Tab label="Settings" {...props} icon={<Tabsettings focused={props.accessibilityState?.selected}/>} />
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
    initialRouteName="Login"
  >
    {/* SCREEN FOR AUTH */}
    <AppStack.Group screenOptions={{ presentation: 'modal' }}>
      <AppStack.Screen name="Onboarding" component={Tabs} />
      <AppStack.Screen name="Personal" component={Personal} />
      <AppStack.Screen name="Verification" component={Verification} />
      <AppStack.Screen name="Security" component={Security} />
      <AppStack.Screen name="Securepin" component={Securepin} />
      <AppStack.Screen name="Setup" component={Setup} />
      <AppStack.Screen name="Login" component={Login} />
      <AppStack.Screen name="Welcome" component={Welcome} />
      <AppStack.Screen name="Root" component={Tabs} />
    </AppStack.Group>


    {/* Transaction Screens*/}
    <AppStack.Group>
      <AppStack.Screen name="Transactions" component={Transactions} />
      <AppStack.Screen name="Newtransactions" component={Newtransactions} />
      <AppStack.Screen
        name="Transactiondetails"
        component={Transactiondetails}
      />
      <AppStack.Screen
        name="Transactiondispute"
        component={Transactiondispute}
      />
    </AppStack.Group>

    {/* Withdraw Screens */}
    <AppStack.Group>
      <AppStack.Screen name="Requestnew" component={Requestnew} />
      <AppStack.Screen name="Availablelisting" component={Availablelisting} />
      <AppStack.Screen name="Withdraw" component={Withdraw} />
      <AppStack.Screen name="Withdrawpreview" component={Withdrawpreview} />
      <AppStack.Screen name="Editmeetup" component={Editmeetup} />
      <AppStack.Screen name="Pendingwithdraw" component={Pendingwithdraw} />
      <AppStack.Screen name="Acceptedwithdraw" component={Acceptedwithdraw} />
      <AppStack.Screen name="Cancelrequest" component={Cancelrequest} />
      <AppStack.Screen name="Summary" component={Summary} />
    </AppStack.Group>

    {/* Wallet Funding */}
    <AppStack.Group>
      <AppStack.Screen name="Addcash" component={Addcash} />
      <AppStack.Screen name="Choosewallet" component={Choosewallet} />
    </AppStack.Group>

    {/* Transfer funds screens */}
    <AppStack.Group>
      <AppStack.Screen name="Transfercash" component={Transfercash} />
      <AppStack.Screen name="TransferInput" component={TransferInput} />
      <AppStack.Screen name="Getdetails" component={Getdetails} />
      <AppStack.Screen name="Bankaccount" component={Bankaccount} />
      <AppStack.Screen name="Transferpin" component={Transferpin} />
    </AppStack.Group>

    {/* Notification Screen */}
    <AppStack.Screen name="Notifications" component={Notifications} />

    {/* Deposit Screens */}
    <AppStack.Group>
      <AppStack.Screen name="Deposit" component={Deposit} />
      <AppStack.Screen name="Depositupdate" component={Depositupdate} />

      <AppStack.Screen name="Pendingdeposit" component={Pendingdeposit} />
      <AppStack.Screen name="Accepteddeposit" component={Accepteddeposit} />
      <AppStack.Screen name="Depositpin" component={Depositpin} />
      <AppStack.Screen name="Canceldeposit" component={Canceldeposit} />
    </AppStack.Group>

    {/* Chats Screens */}
    <AppStack.Group>
      <AppStack.Screen name="Chatshome" component={Chatshome} />
      <AppStack.Screen name="Chatsdm" component={Chatsdm} />
      <AppStack.Screen name="Usersearch" component={Usersearch} />
    </AppStack.Group>
  </AppStack.Navigator>
);


 
export default function MainNavigation() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}
