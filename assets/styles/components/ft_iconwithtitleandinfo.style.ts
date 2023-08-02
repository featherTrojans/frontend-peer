import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize } from "../../../constants";

export const FTIconwithtitleandinfoStyles = StyleSheet.create({
  mainWrap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconandinfoWrap: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconBg: {
    width: 45,
    height: 45,
    backgroundColor: "blue",
    borderRadius: 45 / 2,
    marginRight: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  titleText: {
    ...fontsize.xsmallest,
    ...FONTS.semibold,
    color: COLORS.blue9,
  },
  infoText: {
    ...fontsize.xxsmallest,
    ...FONTS.regular,
    color: COLORS.grey16,
    marginTop: 9,
  },
});
