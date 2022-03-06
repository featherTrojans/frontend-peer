import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize } from "../../../../constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 23,
  },
  leftHeader: {
    ...fontsize.small,
    ...FONTS.regular,
    color: COLORS.grey5,
  },
  rightHeader: {
    color: COLORS.blue6,
    ...fontsize.small,
    ...FONTS.medium,
  },
  addAccountContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 16,
    height: 16,
    borderRadius: 5,
    borderColor: COLORS.checkBorder,
    borderWidth: 1.5,
  },
  checkboxText: {
    // marginLeft: 12,
    color: COLORS.blue6,
    ...fontsize.small,
    ...FONTS.medium,
  },
  dropDown: {
    height: 62,
    paddingLeft: 20,
    borderColor: "#E6E6E6",
  },
  dropdowPlaceholder: {
    color: COLORS.black,
    ...fontsize.small,
    ...FONTS.light,
  },
  dropDownText: {
    color: COLORS.black,
    ...fontsize.small,
    ...FONTS.light,
  },
});
