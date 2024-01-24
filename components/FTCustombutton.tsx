import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS, FONTS, fontsize } from "../constants";
import { FTCustombuttonStyles } from "../assets/styles/components";
const {btnstyle, btntextstyle} = FTCustombuttonStyles

const Custombutton = ({
  onpress,
  disable = false,
  btntext,
  bg = "#342AD5",
  outline=false
}: {
  onpress: () => void;
  disable?: boolean;
  btntext: string;
  bg?: string;
  outline?: boolean
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onpress}
      style={[btnstyle, { backgroundColor: outline ? "transparent" : bg, borderColor: outline ? bg : "transparent", borderWidth: 1 }]}
      disabled={disable}
    >
      <Text style={[btntextstyle, {color: outline ? bg : COLORS.white }]}>{btntext}</Text>
    </TouchableOpacity>
  );
};

export default Custombutton;

const styles = StyleSheet.create({});
