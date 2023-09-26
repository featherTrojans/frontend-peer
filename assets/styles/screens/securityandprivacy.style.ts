import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize } from "../../../constants";

export const SecurityandprivacyScreenStyles = StyleSheet.create({
  sectionHeader: {
    ...fontsize.smallest,
    ...FONTS.medium,
    marginBottom: 30,
    color: COLORS.grey16,
  },
  blockWrap: {
    padding: 24,
    borderRadius: 25,
    backgroundColor: COLORS.white,
    // marginTop: 58,
  },
});
