import React from "react";
import { View, Text } from "react-native";
import { COLORS, FONTS, fontsize, SIZES } from "../../constants";
import { onboardingstyles } from "./Onboarding.styles";

export type EachOnboardingTypes = {
  item: {
    icon: JSX.Element;
    header: string;
    information: string;
    imageBg: String;
    page: number;
  };
};

const EachOnboarding = ({ item }: EachOnboardingTypes) => {
  const { header, information, icon, imageBg, page } = item;
  return (
    <View style={onboardingstyles.eachOnboardingWrap}>
      <View
        style={[
          onboardingstyles.eachOnboardingImage,
          {
            backgroundColor: `${imageBg}`,
            borderRadius: 26,
            borderTopLeftRadius: page == 1 ? 100 : 26,
            borderTopRightRadius: page == 1 ? 26 : 100,
          },
        ]}
      >
        {icon}
      </View>

      <View style={onboardingstyles.eachOnboardingInfoWrap}>
        <Text style={onboardingstyles.eachOnboardingHeader}>{header}</Text>
        <Text style={onboardingstyles.eachOnboardingInfo}>{information}</Text>
      </View>
    </View>
  );
};

export default EachOnboarding;
