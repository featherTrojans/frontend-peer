import { StyleSheet, Text, View, Animated } from "react-native";
import React, { useRef } from "react";
import { icons, SIZES, COLORS } from "../constants";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Chatshome,
  Home,
  Newtransactions,
  Settings,
  Transactions,
} from "../screens";
import { RootTabParamList } from "../types";

const BottomTab = createBottomTabNavigator<RootTabParamList>();

const { TabHome, Tabhistory, Tabchats, Tabuser, Tabplusicon } = icons;

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
    case "History":
      SpringAnimation(offSet, 1);
      break;
    case "Transactions":
      SpringAnimation(offSet, 2);
      break;
    case "Chats":
      SpringAnimation(offSet, 3);
      break;
    case "Settings":
      SpringAnimation(offSet, 4);
      break;
    default:
      break;
  }
}

const Tabscreens = [
  {
    name: "Home",
    component: Home,
    Icon: TabHome,
  },
  {
    name: "History",
    component: Transactions,
    Icon: Tabchats,
  },
  {
    name: "Transactions",
    component: Newtransactions,
    Icon: Tabhistory,
  },
  {
    name: "Chats",
    component: Chatshome,
    Icon: Tabchats,
  },
  {
    name: "Settings",
    component: Settings,
    Icon: Tabuser,
  },
];

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
            ...styles.tabBar
          },
        }}
        screenListeners={({ navigation, route }) => ({
          state: (e) => TabListener(route, tabOffsetValue),
        })}
      >
        {Tabscreens.map(({ name, component, Icon }, index) => {
          return (
            <BottomTab.Screen
              key={index}
              name={name}
              component={component}
              options={{
                tabBarIcon: ({ focused, color, size }) => {
                  return (
                    <View
                      style={{ justifyContent: "center", alignItems: "center" }}
                    >
                      <Icon focused={focused} />
                      <Text style={{ fontSize: 10 }}>{name}</Text>
                    </View>
                  );
                },
              }}
            />
          );
        })}
      </BottomTab.Navigator>

      <Animated.View
        style={[
          styles.animatedLine,
          {
            width: getWidth(),
            transform: [{ translateX: tabOffsetValue }, { scaleX: 0.3 }],
          },
        ]}
      ></Animated.View>
    </>
  );
};
export default Tabs;

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: COLORS.white,
    height: 82,
    alignItems: "center",
    justifyContent: "center",
  },
  animatedLine: {
    height: 1.5,
    backgroundColor: COLORS.blue6,
    position: "absolute",
    bottom: 82,
  },
});
