
import React from "react";
import { View, Text } from "react-native";
import { COLORS, FONTS, fontsize, SIZES } from "../../constants";

export type EachOnboardingTypes = {
  item: {
    icon: JSX.Element;
    header: string;
    information: string;
    imageBg: String;
    page: number
  };
};

const EachOnboarding = ({ item }: EachOnboardingTypes) => {
  const { header, information, icon, imageBg, page } = item;
  return (
    <View style={{flex: 1, width: SIZES.width, paddingHorizontal: 32, alignItems: "flex-start",}}>
      {/* <ImageContainer /> */}
      <View style={{height: 215, backgroundColor: `${imageBg}`, width: "100%", marginVertical: 50, borderRadius: 26, borderTopLeftRadius: page == 1 ? 100 : 26, borderTopRightRadius: page == 1 ? 26 : 100}}>
      {icon}
      </View>
      <View style={{ width: "100%", paddingHorizontal: 26 }}>
        <Text style={{...fontsize.big, ...FONTS.semibold, lineHeight: 35, marginBottom: 35, color: COLORS.blue9, textAlign: "center"}}>{header}</Text>
        <Text style={{...fontsize.small, ...FONTS.regular, lineHeight: 24, color: COLORS.blue9, textAlign: "center"}}>{information}</Text>
      </View>
    </View>
  );
};

export default EachOnboarding;
