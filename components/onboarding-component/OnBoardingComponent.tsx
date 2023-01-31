import {
  HeaderText,
  ImageContainer,
  InformationText,
  OnboardingComponentContainer,
} from "./OnBoardingComponent.styles";
import React from "react";
import { View, Text } from "react-native";
import { COLORS, FONTS, fontsize, SIZES } from "../../constants";

export type EachOnboardingTypes = {
  item: {
    icon: JSX.Element;
    header: string;
    information: string;
  };
};

const OnboardingComponent = ({ item }: EachOnboardingTypes) => {
  const { header, information, icon } = item;
  return (
    <View style={{flex: 1, width: SIZES.width, paddingHorizontal: 30, alignItems: "flex-start"}}>
      {/* <ImageContainer /> */}
      <View style={{flex: 0.7,}}>
      {icon}
      </View>
      <View style={{ }}>
        <Text style={{...fontsize.big, ...FONTS.medium, lineHeight: 35, marginBottom: 35, color: COLORS.blue9, textAlign: "center"}}>{header}</Text>
        <Text style={{...fontsize.small, ...FONTS.regular, lineHeight: 24, color: COLORS.blue9, textAlign: "center"}}>{information}</Text>
      </View>
    </View>
  );
};

export default OnboardingComponent;
