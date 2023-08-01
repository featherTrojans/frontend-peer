import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { ReactElement, ReactHTML } from "react";
import { icons } from "../constants";

const { Greaterthanicon } = icons;

interface IconandInfo {
  action: () => void;
  Icon: any;
  title: string;
  info: string;
}

const Iconandinfo = ({ action, Icon, title, info }: IconandInfo) => {
  return (
    <Pressable onPress={action}>
      <View >
        <View >
          <Icon />
        </View>
        <View style={{ marginLeft: 14 }}>
          <Text >{title}</Text>
          <Text >{info}</Text>
        </View>
      </View>
      <Greaterthanicon />
    </Pressable>
  );
};

export default Iconandinfo;

const styles = StyleSheet.create({});
