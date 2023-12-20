import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize } from "../../../constants";

export const negotiationChargeScreenStyles = StyleSheet.create({
  amountWrap: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    overflow: "hidden",
    marginBottom: 33,
  },
  ngnText: {
    textTransform: "uppercase",
    color: COLORS.black,
    ...fontsize.small,
    ...FONTS.regular,
    // marginRight: 0
  },
  amountValueText: {
    ...fontsize.xbiggest,
    ...FONTS.bold,
    color: COLORS.black,
  },
});
