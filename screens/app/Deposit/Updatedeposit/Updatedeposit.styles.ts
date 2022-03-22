import { StyleSheet } from "react-native";
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
    marginTop: 22,
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
    marginTop: 30,
    justifyContent: "space-between",
  },
  eachSupportedContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  eachSupportedTitle: {
    ...fontsize.smallest,
    ...FONTS.medium,
    marginTop: 18
  },
});
