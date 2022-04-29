import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize } from "../../../../../constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  mainHeaderContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    marginVertical: 25,
    paddingHorizontal: 7,
  },
  mainHeaderText: {
    ...fontsize.small,
    ...FONTS.regular,
    color: COLORS.grey8,
  },
  changePasswordText: {
    ...fontsize.bbsmall,
    ...FONTS.medium,
  },
});
