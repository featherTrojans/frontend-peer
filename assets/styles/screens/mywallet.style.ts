import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize } from "../../../constants";

export const MywalletScreenStyles = StyleSheet.create({
  accountLeveltext: {
    ...fontsize.smallest,
    ...FONTS.regular,
    color: COLORS.blue9,
  },
  levelTypeText: {
    ...fontsize.bmedium,
    ...FONTS.bold,
  },
});
