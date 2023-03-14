import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { ReactElement, ReactHTML } from "react";
import { profilestyles } from "../../screens/app/Profile/Profile.styles";
import { icons } from "../../constants";

const { Greaterthanicon } = icons;

interface IconandInfo {
  action: () => void;
  Icon: any;
  title: string;
  info: string;
}

const Iconandinfo = ({ action, Icon, title, info }: IconandInfo) => {
  return (
    <Pressable onPress={action} style={profilestyles.settingOptionsWrap}>
      <View style={profilestyles.settingAction}>
        <View style={profilestyles.settingActionIconBg}>
          <Icon />
        </View>
        <View style={{ marginLeft: 14 }}>
          <Text style={profilestyles.settingActionTitle}>{title}</Text>
          <Text style={profilestyles.settingActionInfo}>{info}</Text>
        </View>
      </View>
      <Greaterthanicon />
    </Pressable>
  );
};

export default Iconandinfo;

const styles = StyleSheet.create({});
