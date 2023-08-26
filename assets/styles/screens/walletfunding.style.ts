import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize } from "../../../constants";

export const WalletfundingScreenStyles = StyleSheet.create({
  blockWrap: {
    backgroundColor: COLORS.white,
    marginTop: 20,
    padding: 25,
    borderRadius: 30,
  },
  blockHeader: {
    ...fontsize.xsmallest,
    ...FONTS.semibold,
    color: COLORS.blue9,
    marginBottom: 42,
  },
  bankNameText: {
    marginTop: 20,
    marginBottom: 25,
    ...fontsize.xxsmallest,
    ...FONTS.semibold,
    color: COLORS.blue9,
  },
  accountNoText: {
    ...fontsize.bxmedium,
    ...FONTS.bold,
    color: COLORS.blue9,
    letterSpacing: 4,
  },
  tapToCopyText: {
    ...fontsize.xxsmallest,
    ...FONTS.medium,
    marginTop: 10,
    color: COLORS.grey16,
    textAlign: "center"
  },
  extraInfotext: {
    ...fontsize.xxsmallest,
    ...FONTS.semibold,
    marginVertical: 35,
    color: COLORS.blue9,
    textAlign: "center",
    lineHeight: 18,
  },
  accountDetailWrap: {
    alignSelf: "center",
    alignItems: "center",
  },
  accountNameText: {
    ...fontsize.xxsmallest,
    ...FONTS.regular,
    color: COLORS.grey2,
    marginBottom: 10,
  },
  accountNameValue: {
    ...fontsize.xxsmallest,
    ...FONTS.semibold,
    color: COLORS.blue9,
  },
  upgradeAccountBg: {
    backgroundColor: COLORS.Tblue6,
    paddingHorizontal: 30,
    paddingVertical: 11,
    borderRadius: 10,
  },
  upgradeAccountText: {
    ...fontsize.xxsmallest,
    ...FONTS.semibold,
    color: COLORS.blue16,
  },
});
