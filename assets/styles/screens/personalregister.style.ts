import { StyleSheet } from "react-native";
import { FONTS, fontsize } from "../../../constants";

export const PersonalRegisterScreenStyles = StyleSheet.create({
  optionText: {
    paddingVertical: 15,
    textTransform: "capitalize",
    ...fontsize.smallest,
    ...FONTS.medium,
  },
});
