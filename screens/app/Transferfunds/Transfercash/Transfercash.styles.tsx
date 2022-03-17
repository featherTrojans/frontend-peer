import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize } from "../../../../constants";
import { Shadow } from "../../../../constants/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    // paddingHorizontal: 15,
    // paddingTop: 20,
  },
  backArrow: {
    flexDirection: "row",
    alignItems: "center",
  },
  backArrowText: {
    marginLeft: 21,
    ...fontsize.bbsmall,
  },
  optionContainer: {
    paddingVertical: 16,
    paddingHorizontal: 15,
    // marginHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    ...Shadow
  },
  optionDetails: {
    flexDirection: "row",
    alignItems: 'center'
  },
  optionTextContainer: {
    marginLeft: 15,
  },
  optionType: {
    ...fontsize.bmsmall,
    ...FONTS.medium,
    color: COLORS.black,
    lineHeight: 27
  },
  optionAbout: {
    ...fontsize.smallest,
    ...FONTS.regular,
    // lineHeight: 27

  },
});
