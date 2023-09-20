import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize } from "../../../constants";

export const FTCustombuttonStyles = StyleSheet.create({
  btnstyle: {
    paddingVertical: 20,
    borderRadius: 10,
  },
  btntextstyle: {
    ...fontsize.xsmallest,
    ...FONTS.semibold,
    textAlign: "center",
    color: COLORS.white,
    textTransform: "capitalize",
  },
});
