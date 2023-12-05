import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize } from "../../../constants";

export const FTInputStyles = StyleSheet.create({
  inputContainer: {
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    borderRadius: 5,
    borderColor: "transparent",
  },
  passwordInputWrap: {
    height: 52,
    borderWidth: 0.5,
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 15,
  },
  passwordInput: {
    flex: 1,
    height: "100%",
    ...fontsize.smallest,
    ...FONTS.regular,
    color: COLORS.blue9,
  },
  inputLabel: {
    ...fontsize.smallest,
    ...FONTS.medium,
    color: COLORS.blue9,
    marginBottom: 15,
  },
  textInput: {
    borderWidth: 0.5,
    height: 52,
    flex: 1,
    borderRadius: 10,
    borderColor: COLORS.grey15,
    paddingHorizontal: 15,
    ...fontsize.smallest,
    ...FONTS.regular,
    color: COLORS.blue9,
  },

  errorMessageText: {
    color: COLORS.pink1,
    ...fontsize.xxsmallest,
    fontStyle: "italic",
  },
  dropdownWrap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dropdownPlaceholder: {
    // textTransform: "capitalize",
    ...fontsize.smallest,
    ...FONTS.medium,
  },
});
