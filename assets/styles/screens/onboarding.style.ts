import { StyleSheet } from "react-native";
import {
    getBottomSpace,
    getStatusBarHeight,
  } from "react-native-iphone-x-helper";
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
        marginVertical: 50,
      },
      eachOnboardingInfoWrap: {
        width: "100%",
        paddingHorizontal: 26,
      },
      eachOnboardingHeader: {
        ...fontsize.big,
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
        marginTop: getStatusBarHeight(true) + 50,
      },
      animatedDots: {
        marginBottom: 10,
        height: 8,
        borderRadius: 8 / 2,
        marginRight: 10,
      },
      onboardingFooterWrap: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 32,
        marginBottom: getBottomSpace() + 20,
      },
      onboardingFooterSubWrap: {
        flex: 1,
        minHeight: 60,
        alignItems: "center",
        justifyContent: "center",
      },
      skipBg: {
        backgroundColor: COLORS.black,
        justifyContent: "center",
        alignSelf: "center",
        borderRadius: 16,
      },
      skipText: {
        color: COLORS.white,
        paddingVertical: 10,
        paddingHorizontal: 21,
        ...fontsize.smallest,
        ...FONTS.bold,
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
})