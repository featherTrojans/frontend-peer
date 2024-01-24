import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { FONTS, fontsize } from "../constants";

const FTQuickActionBtn = ({ icon, text, action, bG, color }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.quickActionBtn, { backgroundColor: bG }]}
      onPress={action}
    >
      {icon}
      <Text style={[styles.quickActionBtnText, { color: color }]}>{text}</Text>
    </TouchableOpacity>
  );
};

export default FTQuickActionBtn;

const styles = StyleSheet.create({
  quickActionBtn: {
    flexDirection: "row",
    alignItems: "center",
    // alignSelf: "flex-start",
    paddingVertical: 11,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  quickActionBtnText: {
    textTransform: "capitalize",
    ...fontsize.xsmallest,
    ...FONTS.semibold,
    marginLeft: 6.7,
  },
});
