import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize, icons, SIZES } from "../../../constants";

export const BvnErrorStyles = StyleSheet.create({
  textlarge: {
    ...FONTS.regular,
    ...fontsize.bbsmall,
    textAlign: "center",
    marginBottom: 10,
  },
  textsmall: {
    ...FONTS.regular,
    ...fontsize.xsmallest,
    textAlign: "center",
  },
});
