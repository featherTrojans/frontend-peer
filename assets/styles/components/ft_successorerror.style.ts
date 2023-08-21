import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize } from "../../../constants";

export const FTSuccessOrErrorStyles = StyleSheet.create({
  container: {
    alignSelf: "center",
    alignItems: "center",
    marginVertical: 30,
  },
  messageTitleText: {
    ...fontsize.bsmall,
    ...FONTS.semibold,
    color: COLORS.blue9,
    marginTop: 30,
    marginBottom: 10,
  },
  messageInfoText: {
    ...fontsize.smallest,
    ...FONTS.regular,
    color: COLORS.blue9,
  },
});
