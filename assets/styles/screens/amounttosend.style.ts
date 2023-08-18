import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize } from "../../../constants";

export const AmounttosendScreenStyles = StyleSheet.create({
  amountWrap: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    overflow: "hidden",
    marginBottom: 33,
  },
  nairaIconWrap: {
    height: 49,
    width: 49,
    backgroundColor: COLORS.blue9,
    borderRadius: 12,
    marginRight: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  amountValueText: {
    ...fontsize.xbiggest,
    ...FONTS.bold,
    color: COLORS.white,
  },
});
