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
import { Onboarding, Login, Signup, Verification, Setup, Welcome } from "../screens";
import { AppState } from "react-native";
import { Personal } from "../components";

const AppStack = createStackNavigator<RootStackParamList>();
const BottomTab = createBottomTabNavigator<RootTabParamList>();
const AuthStack = createStackNavigator<RootAuthStackParamList>();

const Tabs = () => (
  <BottomTab.Navigator
    initialRouteName="Home"
    screenOptions={{
      headerShown: false,
    }}
  >
    <BottomTab.Screen name="Settings" component={Onboarding} />
  </BottomTab.Navigator>
);

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

const RootNavigator = () => (
  <AppStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <AppStack.Screen name="Onboarding" component={Welcome} />
    <AppStack.Screen name="Login" component={Login} />
    <AppStack.Screen name="Signup" component={Signup} />
    <AppStack.Screen name="Verification" component={Verification} />
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
