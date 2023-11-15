import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { Image as RNImage } from "expo-image";
import { OnboardingScreenStyles } from "../assets/styles/screens";
import { images } from "../constants";
const { Splashimage1, Splashimage2 } = images;

const {
  eachOnboardingWrap,
  eachOnboardingImage,
  eachOnboardingInfoWrap,
  eachOnboardingHeader,
  eachOnboardingInfo,
  eachOnboardingImageStyle,
} = OnboardingScreenStyles;

export type EachOnboardingTypes = {
  item: {
    image: any;
    header: string;
    information: string;
    imageBg: String;
    page: number;
  };
};

const FTEachOnboarding = ({ item }: EachOnboardingTypes) => {
  const { header, information, image, imageBg, page } = item;
  return (
    <View style={eachOnboardingWrap}>
      <View
        style={[
          eachOnboardingImage,
          {
            backgroundColor: `${imageBg}`,
            borderRadius: 26,
            borderTopLeftRadius: page == 1 ? 100 : 26,
            borderTopRightRadius: page == 1 ? 26 : 100,
          },
        ]}
      >
        <RNImage
          source={image}
          style={eachOnboardingImageStyle}
          contentFit="contain"
        />
      </View>

      <View style={eachOnboardingInfoWrap}>
        <Text style={eachOnboardingHeader}>{header}</Text>
        <Text style={eachOnboardingInfo}>{information}</Text>
      </View>
    </View>
  );
};

export default FTEachOnboarding;

const styles = StyleSheet.create({});
