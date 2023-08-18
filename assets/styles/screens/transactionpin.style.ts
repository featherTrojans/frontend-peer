import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize } from "../../../constants";

export const TransactionpinScreenStyles = StyleSheet.create({
  headerSectionWrap: {
    alignSelf: "center",
    alignItems: "center",
  },
  startedInput: {
    ...fontsize.xbiggest,
    ...FONTS.bold,
    textAlign: "center",
    letterSpacing: 12,
  },
  staredInputWrap: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 56,
    marginBottom: 28,
  },
  enterPinText: {
    ...fontsize.smaller,
    color: COLORS.white,
  },
  keyboardWrap: {
    flex: 1,
    justifyContent: "center",
  },
});
