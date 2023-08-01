import React, { useRef, useContext, useState, useEffect } from "react";
import * as Notification from "expo-notifications";
import { AppState, Platform, Text, Animated } from "react-native";
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

const AppStack = createStackNavigator();
const AuthStack = createStackNavigator();

import { LockScreen } from "../screens";

const DashboardStack = createStackNavigator();
const TransactStack = createStackNavigator();
const CardsStack = createStackNavigator();
const ChatsStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const AuthenticatedTabs = createBottomTabNavigator();

import {
  authRoutes,
  cardsRoutes,
  chatsRoutes,
  dashboardRoutes,
  profileRoutes,
  transactRoutes,
} from "./routes";
import { COLORS, FONTS, SIZES, fontsize, icons } from "../constants";
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

const DashboardNavigator = () => {
  return (
    <DashboardStack.Navigator initialRouteName="dashboard_screen">
      {dashboardRoutes?.map((route: any, index: number) => {
        return (
          <DashboardStack.Screen
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
    </DashboardStack.Navigator>
  );
};

const TransactNavigator = () => {
  return (
    <TransactStack.Navigator initialRouteName="dashboard_screen">
      {transactRoutes?.map((route: any, index: number) => {
        return (
          <TransactStack.Screen
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
    </TransactStack.Navigator>
  );
};

const CardsNavigator = () => {
  return (
    <CardsStack.Navigator initialRouteName="dashboard_screen">
      {cardsRoutes?.map((route: any, index: number) => {
        return (
          <CardsStack.Screen
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
    </CardsStack.Navigator>
  );
};

const ChatsNavigator = () => {
  return (
    <ChatsStack.Navigator initialRouteName="dashboard_screen">
      {chatsRoutes?.map((route: any, index: number) => {
        return (
          <ChatsStack.Screen
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
    </ChatsStack.Navigator>
  );
};

const ProfileNavigator = () => {
  return (
    <ProfileStack.Navigator initialRouteName="dashboard_screen">
      {profileRoutes?.map((route: any, index: number) => {
        return (
          <ProfileStack.Screen
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
    </ProfileStack.Navigator>
  );
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

const AuthenticatedNavigator = ({ routeName }: { routeName: string }) => {
  const { getState, reset } = useNavigation();
  const tabOffsetValue = useRef(new Animated.Value(0)).current;
  const excluded_routes = [
    "dashboard_screen",
    "transact_screen",
    "cards_screen",
    "chats_screen",
    "profile_screen",
  ];

  React.useEffect(() => {
    const state = getState?.();

    if (state) {
      reset({
        ...state,
        index: 0,
        history: [],
      });
    }
  }, []);
  return (
    <>
      <AuthenticatedTabs.Navigator
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
            display:
              routeName && !excluded_routes.includes(routeName)
                ? "none"
                : "flex",
          },
        })}
        screenListeners={({ navigation, route }) => ({
          state: (e) => TabListener(route, tabOffsetValue),
        })}
        initialRouteName="dashboard_screen"
      >
        <AuthenticatedTabs.Screen name="Home" component={DashboardNavigator} />
        <AuthenticatedTabs.Screen
          name="Transact"
          component={TransactNavigator}
        />
        <AuthenticatedTabs.Screen name="Cards" component={CardsNavigator} />
        <AuthenticatedTabs.Screen name="Chats" component={ChatsNavigator} />
        <AuthenticatedTabs.Screen name="Profile" component={ProfileNavigator} />
      </AuthenticatedTabs.Navigator>
      <Animated.View
        style={[
          {
            height: 1.5,
            backgroundColor: COLORS.blue6,
            position: "absolute",
            bottom: 82,
            width: getWidth(),
            transform: [{ translateX: tabOffsetValue }, { scaleX: 0.3 }],
          },
        ]}
      ></Animated.View>
    </>
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
      <AuthenticatedNavigator routeName={routeName} />
    </>
  );
};
