import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize } from "../../../constants";

export const FTViewbalanceStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    marginTop: 25,
    marginHorizontal: 15

  },
  //   Top part of the container
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  primaryText: {
    ...fontsize.xsmallest,
    ...FONTS.regular,
    color: COLORS.grey16,
    marginLeft: 8.6,
  },
  underLine: {
    height: 0.5,
    backgroundColor: COLORS.inputBorderColor,
    marginBottom: 13.6,
    marginTop: 13.6,
  },

  addCashBg: {
    backgroundColor: COLORS.blue9,
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 22,
  },
  addCashText: {
    color: COLORS.white,
    ...fontsize.xxsmallest,
    ...FONTS.semibold,
  },

  //   Bottom part of the container

  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  balanceText: {
    ...fontsize.xsmallest,
    ...FONTS.medium,
    color: COLORS.blue9,
    marginRight: 16,
  },
  balanceAmount: {
    ...fontsize.bmedium,
    ...FONTS.bold,
    color: COLORS.blue9,
  },
});
