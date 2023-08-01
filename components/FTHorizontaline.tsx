import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../constants";

const Horizontaline = ({marginV}) => {
  return (
    <View
    style={{
      marginVertical: marginV,
      backgroundColor: COLORS.borderColor2,
      height: 0.5,
    }}
  />
  )
  };

export default Horizontaline;

const styles = StyleSheet.create({});
