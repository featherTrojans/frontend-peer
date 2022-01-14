import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS, FONTS, SIZES } from "../constants";

export type EachOnboardingTypes = {
  item: {
    icon: JSX.Element;
    header: string;
    information: string;
  };
};

const EachOnboarding = ({ item }: EachOnboardingTypes) => {
  const { header, information } = item;
  return (
    
    <View style={{width: SIZES.width, flex: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: 23}}>
    
      <Text style={{fontSize: 30, ...FONTS.bold, textAlign: "center", marginBottom: 34}}>{header}</Text>
      <Text style={{fontSize: 16, ...FONTS.regular, textAlign: "center",color: "#8d8d8d"}}>{information}</Text>
    </View>
  );
};

export default EachOnboarding;

const styles = StyleSheet.create({});
