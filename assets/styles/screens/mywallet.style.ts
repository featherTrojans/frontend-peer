import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize } from "../../../constants";

export const MywalletScreenStyles = StyleSheet.create({
  accountLevelWrap: {
    alignSelf: "center",
    alignItems: "center",
  },
  accountLeveltext: {
    ...fontsize.smallest,
    ...FONTS.regular,
    color: COLORS.blue9,
  },
  levelTypeWrap: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  levelTypeText: {
    ...fontsize.bmedium,
    ...FONTS.bold,
    marginRight: 10,
  },
  blockWrap: {
    padding: 24,
    borderRadius: 25,
    backgroundColor: COLORS.white,
    marginTop: 58,
  },
  BAlign: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  receiveMoneyText: {
    ...fontsize.smallest,
    ...FONTS.regular,
    color: COLORS.blue9,
  },
  vfgLogo: {
    width: 42,
    height: 42,
    backgroundColor: COLORS.grey1,
    borderRadius: 42 / 2,
  },
  tableKey: {
    ...fontsize.smallest,
    ...FONTS.regular,
    color: COLORS.grey16,
  },
  tableValue: {
    marginRight: 11,
    ...fontsize.smallest,
    ...FONTS.semibold,
  },
  fundingLimitText: {
    ...fontsize.smallest,
    ...FONTS.regular,
    color: COLORS.grey16,
  },
  unlimitedText: {
    ...fontsize.smallest,
    ...FONTS.bold,
    color: COLORS.green4,
  },
  dashedLine: {
    // borderWidth: 1,
    // borderStyle: "dashed",
    // borderColor: COLORS.grey2,
    marginVertical: 32,
  },
  limitTitleText: {
    ...fontsize.smallest,
    ...FONTS.regular,
    color: COLORS.grey16,
  },
  limitValueText: {
    ...fontsize.xsmallest,
    ...FONTS.semibold,
    color: COLORS.blue9,
  },
  limitProgressBg: {
    width: 118,
    height: 3,
    backgroundColor: COLORS.blue21,
    borderRadius: 3,
  },
  limitProgress: {
    backgroundColor: COLORS.blue6,
    height: "100%",
    borderRadius: 3,
  },
});
