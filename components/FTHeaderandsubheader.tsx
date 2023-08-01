import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS, FONTS, fontsize } from "../constants";
import { FTHeaderandsubheaderStyles } from "../assets/styles/components";
const { headerText, subHeaderText } = FTHeaderandsubheaderStyles;
const Headerandsubheader = ({ header, subHeader }) => {
  return (
    <View style={{ width: "100%" }}>
      <Text style={headerText}>{header}</Text>
      <Text style={subHeaderText}>{subHeader}</Text>
    </View>
  );
};

export default Headerandsubheader;

const styles = StyleSheet.create({});
