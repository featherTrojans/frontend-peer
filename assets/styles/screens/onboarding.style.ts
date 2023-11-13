import { StyleSheet } from "react-native";

import { COLORS, FONTS, SIZES, fontsize } from "../../../constants";

export const OnboardingScreenStyles = StyleSheet.create({
  eachOnboardingWrap: {
    flex: 1,
    width: SIZES.width,
    paddingHorizontal: 32,
    alignItems: "flex-start",
  },
  eachOnboardingImage: {
    height: 215,
    width: "100%",
    marginVertical: 55,
  },
  eachOnboardingImageStyle: {
    width: "100%",
    height: 268,
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
  },
  eachOnboardingInfoWrap: {
    width: "100%",
    // paddingHorizontal: 26,
  },
  eachOnboardingHeader: {
    ...fontsize.bxmedium,
    ...FONTS.semibold,
    lineHeight: 35,
    marginBottom: 35,
    color: COLORS.blue9,
    textAlign: "center",
  },
  eachOnboardingInfo: {
    ...fontsize.small,
    ...FONTS.regular,
    lineHeight: 24,
    color: COLORS.blue9,
    textAlign: "center",
  },

  //Onboarding
  animatedDotsWrap: {
    flexDirection: "row",
    justifyContent: "center",
  },
  animatedDots: {
    height: 8,
    borderRadius: 8 / 2,
    marginRight: 10,
  },
  dotAndSkipWrap: {
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 32,
    paddingVertical: 20,
    alignItems: "center",
    // backgroundColor: "red"
  },
  skipWrap: {
    flexDirection: "row",
    alignItems: "center",
  },
  skipText: {
    marginLeft: 8,
    ...fontsize.smallest,
    ...FONTS.semibold,
    color: COLORS.blue9,
  },
  registerWrap: {
    paddingHorizontal: 41,
    paddingVertical: 21,
    backgroundColor: COLORS.black,
    borderRadius: 10,
    alignSelf: "stretch",
  },
  registerText: {
    color: COLORS.white,
    textAlign: "center",
    textTransform: "uppercase",
    ...fontsize.smallest,
    ...FONTS.bold,
  },
});
