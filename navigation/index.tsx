import React, { useRef, useContext, useState, useEffect } from "react";
import * as Notification from "expo-notifications";
import { AppState, Platform, Text } from "react-native";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AuthContext } from "../context/AuthContext";

import axiosCustom from "../httpRequests/axiosCustom";
import { usePushNotification } from "../hooks/usePushNotifications";
import { COLORS, FONTS, fontsize, icons } from "../constants";
import { enableFreeze } from "react-native-screens";
enableFreeze(true);

const AppStack = createStackNavigator();

import {
  CardScreen,
  ChatsScreen,
  HomeScreen,
  ProfileScreen,
  TransactionsScreen,
} from "../screens";

const AuthStack = createStackNavigator();
const DashboardTabs = createBottomTabNavigator();

import { authRoutes, transactRoutes } from "./routes";

const {
  Hometabicon,
  Transacttabicon,
  Chatstabicon,
  Cardstabicon,
  Profiletabicon,
} = icons;

Notification.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

let TabIcon = (name: string, focused: boolean) => {
  switch (name) {
    case "Home":
      return <Hometabicon focused={focused} />;
    case "Transact":
      return <Transacttabicon focused={focused} />;
    case "Cards":
      return <Cardstabicon focused={focused} />;
    case "Chats":
      return <Chatstabicon focused={focused} />;
    case "Profile":
      return <Profiletabicon focused={focused} />;
    default:
      break;
  }
};

const NoAuthNavigator = ({ routeName }) => {
  const { token } = useContext(AuthContext);
  if (token == null) {
    routeName = "onboarding_screen";
  }
  return (
    <AuthStack.Navigator
      initialRouteName={routeName}
      screenOptions={{
        headerShown: false,
      }}
    >
      {authRoutes?.map((route: any, index: number) => {
        return (
          <AuthStack.Screen
            component={route.screen}
            key={index}
            name={route.route}
          />
        );
      })}
    </AuthStack.Navigator>
  );
};

const DashboardTabNavigator = ({ routeName }: { routeName: string }) => {
  return (
    <DashboardTabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => TabIcon(route.name, focused),
        tabBarLabel: ({ focused }) => (
          <Text
            style={{
              ...fontsize.xxsmallest,
              ...FONTS.regular,
              color: COLORS.blue9,
              marginTop: 15,
            }}
          >
            {route.name}
          </Text>
        ),
        headerShown: false,
        lazy: true,
        tabBarStyle: {
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: Platform.select({ ios: 15, android: 15 }),
          paddingBottom: Platform.select({ android: 15, ios: 25 }),
          height: 82,
        },
      })}
      initialRouteName="Home"
      backBehavior="initialRoute"
    >
      <DashboardTabs.Screen name="Home" component={HomeScreen} />
      <DashboardTabs.Screen name="Transact" component={TransactionsScreen} />
      <DashboardTabs.Screen name="Cards" component={CardScreen} />
      <DashboardTabs.Screen name="Chats" component={ChatsScreen} />
      <DashboardTabs.Screen name="Profile" component={ProfileScreen} />
    </DashboardTabs.Navigator>
  );
};

const AuthenticatedNavigator = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name="Dashboard" component={DashboardTabNavigator} />
      {/* Transact Screens */}
      {transactRoutes?.map((route: any, index: number) => {
        return (
          <AuthStack.Screen
            component={route.screen}
            key={index}
            name={route.route}
            options={() => ({
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            })}
          />
        );
      })}
    </AuthStack.Navigator>
  );
};

export const NavigatorSelector = ({ routeName }: { routeName: string }) => {
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

  // const authState = false;

  if (!token) {
    return <NoAuthNavigator routeName={routeName} />;
  }

  return <AuthenticatedNavigator />;
};
