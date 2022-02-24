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
  Signup,
  Verification,
  Setup,
  Welcome,
  Home,
  History,
  Transactions,
  // Chats,
  Settings,
  Withdraw,
  Requestnew,
  Availablelisting,
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
  Newtransactions,
  Chatshome,
  Chatsdm,
  Usersearch,
} from "../screens";
import { AppState } from "react-native";
import { Loader, Tab  } from "../components";
import { icons } from "../constants";
import Deposit from "../screens/app/Deposit/Deposit";
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
      component={Summary}
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
    // initialRouteName="Welcome"
    >
    <AppStack.Screen name="Onboarding" component={Onboarding} />
    <AppStack.Screen name="Personal" component={Personal} />
    <AppStack.Screen name="Deposit" component={Deposit} />
    <AppStack.Screen name="Login" component={Login} />
    <AppStack.Screen name="Verification" component={Verification} />
    <AppStack.Screen name="Security" component={Security} />
    <AppStack.Screen name="Securepin" component={Securepin} />
    <AppStack.Screen name="Setup" component={Setup} />
    <AppStack.Screen name="Welcome" component={Welcome} />
    <AppStack.Screen name="Root" component={Tabs} />
  </AppStack.Navigator>
);


 
export default function MainNavigation() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}
