import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { COLORS, FONTS, fontsize } from "../../../../constants";
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  animationContainer: {
    marginHorizontal: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: RFValue(22),
  },
  animationText: {
    ...fontsize.bsmall,
    ...FONTS.regular,
    lineHeight: 25,
  },
  supportedStates: {
    textAlign: "center",
    ...fontsize.bsmall,
    ...FONTS.medium,
    lineHeight: 25,
  },
  supportedContainer: {
    flexDirection: "row",
    marginHorizontal: 28,
    marginTop: RFValue(30),
    justifyContent: "space-between",
  },
  eachSupportedContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  eachSupportedView: {
    width: RFValue(62),
    height: RFValue(62),
  },
  eachSupportImage: {
    width: "100%",
    height: "100%",
  },
  eachSupportedTitle: {
    ...fontsize.smallest,
    ...FONTS.medium,
    marginTop: RFValue(18),
  },
  extraText: {
    marginHorizontal: 40,
    textAlign: "center",
    ...fontsize.bsmall,
    ...FONTS.regular,
    lineHeight: 25,
    marginBottom: RFValue(38),
  },
});
