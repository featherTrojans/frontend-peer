import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize } from "../../../../../constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 15,
    paddingTop: 20,
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  optionDetails: {
    flexDirection: "row",
  },
  optionTextContainer: {
    marginLeft: 15,
  },
  optionType: {
    ...fontsize.bmsmall,
    ...FONTS.medium,
    color: COLORS.black,
  },
  optionAbout: {
    ...fontsize.smallest,
    ...FONTS.regular,
  },
});
