import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize } from "../../../constants";

export const UploadDocScreenStyles = StyleSheet.create({
  optionText: {
    paddingVertical: 15,
    textTransform: "capitalize",
    ...fontsize.smallest,
    ...FONTS.medium,
  },
  uploadDocBtnWrap: {
    backgroundColor: COLORS.green4,
    paddingVertical: 11,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  uploadDocBtnText: {
    ...fontsize.smallest,
    ...FONTS.semibold,
    color: COLORS.white,
  },
});
