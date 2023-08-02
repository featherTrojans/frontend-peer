import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize } from "../../../constants";

export const FTHeaderandsubheaderStyles = StyleSheet.create({
  headerText: {
    ...fontsize.bmedium,
    ...FONTS.bold,
    color: COLORS.blue9,
  },
  subHeaderText: {
    ...fontsize.smaller,
    ...FONTS.regular,
    color: COLORS.grey16,
    lineHeight: 20,
    marginTop: 20,
  },
});
