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
      style={[btnstyle, { backgroundColor: bg }]}
      disabled={disable}
    >
      <Text style={btntextstyle}>{btntext}</Text>
    </TouchableOpacity>
  );
};

export default Custombutton;

const styles = StyleSheet.create({});
