import { StyleSheet, Text, View, Animated, SafeAreaView } from "react-native";
import React, { useRef } from "react";
import { icons, SIZES, COLORS, fontsize, FONTS } from "../constants";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {  Home, Transactions,  BlankScreen } from "../screens";
import { RootTabParamList } from "../types";



const BottomTab = createBottomTabNavigator<RootTabParamList>();


const {
  Hometabicon,
  Transacttabicon,
  Chatstabicon,
  Cardstabicon,
  Profiletabicon,
} = icons;

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
    case "Chats":
      SpringAnimation(offSet, 2);
      break;
    case "Cards":
      SpringAnimation(offSet, 3);
      break;
    case "Profile":
      SpringAnimation(offSet, 4);
      break;
    default:
      break;
  }
}

const Tabscreens = [
  {
    name: "Home",
    component: BlankScreen,
    Icon: Hometabicon,
  },
  {
    name: "Transact",
    component: BlankScreen,
    Icon: Transacttabicon,
  },
  {
    name: "Chats",
    component: BlankScreen,
    Icon: Chatstabicon,
  },
  {
    name: "Cards",
    component: BlankScreen,
    Icon: Cardstabicon,
  },
  {
    name: "Profile",
    component: BlankScreen,
    Icon: Profiletabicon,
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
          tabBarShowLabel: true,
          
          tabBarLabelStyle: {
            ...styles.tabBariconText,
          },
          tabBarStyle: {
            ...styles.tabBar,
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
                tabBarIcon: ({ focused }) => {
                  return (
                      <Icon focused={focused} />
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

  tabBariconText: {
    ...fontsize.xxsmallest,
    ...FONTS.regular,
    color: COLORS.blue9,
  },
  animatedLine: {
    height: 1.5,
    backgroundColor: COLORS.blue6,
    position: "absolute",
    bottom: 82,
  },
});
