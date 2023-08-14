import React, { useRef, useContext, useState, useEffect } from "react";
import * as Notification from "expo-notifications";
import { AppState, Platform, Text, Animated, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AuthContext } from "../context/AuthContext";

import axiosCustom from "../httpRequests/axiosCustom";
import CustomWebViewSupport from "../screens/shared/CustomWebViewSupport";
import { usePushNotification } from "../hooks/usePushNotifications";
import { COLORS, FONTS, SIZES, fontsize, icons } from "../constants";

const AppStack = createStackNavigator();

import {
  CardScreen,
  ChatsScreen,
  ChatsdmScreen,
  HomeScreen,
  LockScreen,
  ProfileScreen,
  TransactionsScreen,
} from "../screens";

const AuthStack = createStackNavigator();

const DashboardTabs = createBottomTabNavigator();

import {
  authRoutes,
  cardsRoutes,
  chatsRoutes,
  dashboardRoutes,
  profileRoutes,
  transactRoutes,
} from "./routes";
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

function getWidth() {
  let width = SIZES.width;
  return width / 5;
}

function SpringAnimation(distance: any, index: number) {
  Animated.spring(distance, {
    toValue: getWidth() * index,
    useNativeDriver: true,
  }).start();
}

function TabListener(value, offSet) {
  switch (value.name) {
    case "Home":
      SpringAnimation(offSet, 0);
      break;
    case "Transact":
      SpringAnimation(offSet, 1);
      break;
    case "Cards":
      SpringAnimation(offSet, 2);
      break;
    case "Chats":
      SpringAnimation(offSet, 3);
      break;
    case "Profile":
      SpringAnimation(offSet, 4);
      break;
    default:
      break;
  }
}

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



const NoAuthNavigator = () => {
  return (
    <AuthStack.Navigator initialRouteName="onboarding_screen">
      {authRoutes?.map((route: any, index: number) => {
        return (
          <AuthStack.Screen
            component={route.screen}
            key={index}
            name={route.route}
            options={() => ({
              headerTitle: route.title,
              headerShown: route.showHeader,
            })}
          />
        );
      })}
    </AuthStack.Navigator>
  );
};

const DashboardTabNavigator = ({ routeName }: { routeName: string }) => {
  const { getState, reset } = useNavigation();
  const {showTabs} = useContext(AuthContext)
  const tabOffsetValue = useRef(new Animated.Value(0)).current;

  return (
    <>
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
          tabBarStyle: {
            minHeight: Platform.OS === "android" ? 70 : 84,
            // paddingBottom: Platform.OS === "android" ? 10 : 20,
            backgroundColor: COLORS.white,
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 16,
            display: showTabs ? "flex" : "none"
          },
        })}
        screenListeners={({ navigation, route }) => ({
          state: (e) => TabListener(route, tabOffsetValue),
        })}
        initialRouteName="home_screen"
      >
        <DashboardTabs.Screen name="Home" component={HomeScreen} />
        <DashboardTabs.Screen name="Transact" component={TransactionsScreen} />
        <DashboardTabs.Screen name="Cards" component={CardScreen} />
        <DashboardTabs.Screen name="Chats" component={ChatsScreen} />
        <DashboardTabs.Screen name="Profile" component={ProfileScreen} />
      </DashboardTabs.Navigator>
      <Animated.View
        style={[
          {
            height: 1.5,
            backgroundColor: COLORS.blue6,
            position: "absolute",
            bottom: 82,
            width: getWidth(),
            transform: [{ translateX: tabOffsetValue }, { scaleX: 0.3 }],
            display: showTabs ? "flex" : "none"
          },
        ]}
      ></Animated.View>
    </>
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
      <AuthStack.Group>
        {transactRoutes?.map((route: any, index: number) => {
          return (
            <AuthStack.Screen
              component={route.screen}
              key={index}
              name={route.route}
              options={() => ({
                headerTitle: route.title,
                headerShown: route.showHeader,
                cardStyleInterpolator:
                  route?.animateFromBottom &&
                  CardStyleInterpolators.forBottomSheetAndroid,
              })}
            />
          );
        })}
      </AuthStack.Group>

      {/* Chats Screens */}
      <AuthStack.Group>
        {chatsRoutes?.map((route: any, index: number) => {
          return (
            <AuthStack.Screen
              component={route.screen}
              key={index}
              name={route.route}
              options={() => ({
                headerTitle: route.title,
                headerShown: route.showHeader,
                cardStyleInterpolator:
                  route?.animateFromBottom &&
                  CardStyleInterpolators.forBottomSheetAndroid,
              })}
            />
          );
        })}
      </AuthStack.Group>

      {/* Cards Screens */}
      <AuthStack.Group>
        {cardsRoutes?.map((route: any, index: number) => {
          return (
            <AuthStack.Screen
              component={route.screen}
              key={index}
              name={route.route}
              options={() => ({
                headerTitle: route.title,
                headerShown: route.showHeader,
                cardStyleInterpolator:
                  route?.animateFromBottom &&
                  CardStyleInterpolators.forBottomSheetAndroid,
              })}
            />
          );
        })}
      </AuthStack.Group>

      {/* Profile Screens */}
      <AuthStack.Group>
        {profileRoutes?.map((route: any, index: number) => {
          return (
            <AuthStack.Screen
              component={route.screen}
              key={index}
              name={route.route}
              options={() => ({
                headerTitle: route.title,
                headerShown: route.showHeader,
                cardStyleInterpolator:
                  route?.animateFromBottom &&
                  CardStyleInterpolators.forBottomSheetAndroid,
              })}
            />
          );
        })}
      </AuthStack.Group>
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
  console.log(!token, "I am token");

  if (!token) {
    return <NoAuthNavigator />;
  }

  return (
    <>
      {token ? <LockScreen modal={modal} setModal={setModal} /> : null}
      <AuthenticatedNavigator />
    </>
  );
};
