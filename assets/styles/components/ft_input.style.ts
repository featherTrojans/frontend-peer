import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize } from "../../../constants";

export const FTInputStyles = StyleSheet.create({
  inputContainer: {
    height: 53,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    borderRadius: 5,
    borderColor: "transparent",
  },
  inputLabel: {
    ...fontsize.smallest,
    ...FONTS.medium,
    color: COLORS.blue9,
    marginBottom: 15,
  },
  textInput: {
    borderWidth: 1,
    height: 52,
    borderRadius: 10,
    borderColor: COLORS.grey15,
    paddingHorizontal: 15,
    ...fontsize.smallest,
    ...FONTS.regular,
    color: COLORS.blue9,
  },
  inputiconwrapper: {
    borderRightWidth: 0.5,
    borderColor: COLORS.grey15,
    paddingRight: 12,
  },
});
