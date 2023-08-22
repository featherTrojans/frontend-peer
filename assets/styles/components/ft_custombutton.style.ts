import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize } from "../../../constants";

export const FTCustombuttonStyles = StyleSheet.create({
  btnstyle: {
    paddingVertical: 20,
    borderRadius: 10,
  },
  btntextstyle: {
    ...fontsize.xsmallest,
    ...FONTS.regular,
    textAlign: "center",
    color: COLORS.white,
    textTransform: "capitalize",
  },
});
