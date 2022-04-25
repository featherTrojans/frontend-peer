import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { COLORS, FONTS, fontsize } from "../../../../constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    // paddingTop: 20,
  },
  dropDown: {
    height: RFValue(62),
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
  balanceContainer: {
    marginTop: 13,
    flexDirection: "row",
  },
  balanceText: {
    ...fontsize.smaller,
    ...FONTS.regular,
    color: COLORS.blue6,
  },
  balanceAmount: {
    ...fontsize.smaller,
    ...FONTS.bold,
  },
});
