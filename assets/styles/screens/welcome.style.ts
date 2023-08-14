import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize } from "../../../constants";

export const WelcomeScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 25,
    paddingTop: 25,
  },
  welcomeTextContainer: {
    justifyContent: "center",
    alignItems: "center",
    // marginHorizontal: 58,
    flex: 0.2,
  },
  welcomeText: {
    color: COLORS.black,
    ...FONTS.bold,
    ...fontsize.bmedium,
    textAlign: "center",
    lineHeight: 30,
  },
  welcomeTextSub: {
    textAlign: "center",
    color: COLORS.black,
    ...FONTS.regular,
    ...fontsize.bbsmall,
  },
  lineBg: {
    marginHorizontal: 82,
    backgroundColor: COLORS.animatedLine,
    height: 3.5,
    borderRadius: 3.5,
    // marginBottom: RFValue(127),
    // marginTop: RFValue(127),
  },
  line: {
    backgroundColor: COLORS.blue6,
    height: 3.5,
    borderRadius: 3.5,
  },
  getStartedContainer: {
    // paddingHorizontal: 30,
    // marginBottom: RFValue(112),
    flex: 0.1,
  },
  getStartedText: {
    ...fontsize.xsmallest,
    ...FONTS.regular,
    textAlign: "center",
    lineHeight: 20,
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  infotext: {
    ...FONTS.regular,
    ...fontsize.xsmallest,
  },
  link: {
    ...FONTS.bold,
    ...fontsize.xsmallest,
  },
});
