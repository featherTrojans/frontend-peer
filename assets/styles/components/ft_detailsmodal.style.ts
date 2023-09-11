import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize } from "../../../constants";

export const FTDetailsModalStyles = StyleSheet.create({
  modalTitleText: {
    ...fontsize.smallest,
    ...FONTS.bold,
    color: COLORS.blue9,
  },
  detailsWrap: {
    flexDirection: "row",
    alignItems: "center",
    // marginVertical: 30,
    marginTop: 30
  },
  dataTitle: {
    ...fontsize.smaller,
    ...FONTS.bold,
    marginBottom: 7,
    color: COLORS.blue9,
  },
  dataSubtitle: {
    ...fontsize.xxsmallest,
    ...FONTS.medium,
    color: COLORS.grey2,
  },
  
});
