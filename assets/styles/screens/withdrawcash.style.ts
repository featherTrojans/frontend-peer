import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize } from "../../../constants";

export const WithdrawcashScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 60,
  },
  withdrawalInfoWrap: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  withdrawalProfileWrap: {
    alignSelf: "center",
    alignItems: "center",
  },
  withdrawalProfileName: {
    ...fontsize.bsmall,
    ...FONTS.bold,
    color: COLORS.blue9,
    marginBottom: 13,
    marginTop: 35,
  },
  amountOfTransaction: {
    ...fontsize.smallest,
    ...FONTS.semibold,
    color: COLORS.grey2,
  },
  locationInfoWrap: {
    flex: 1,
    justifyContent: "center",
  },
  locationDistance: {
    ...fontsize.bxmedium,
    ...FONTS.bold,
  },
  locationAddress: {
    ...fontsize.smallest,
    ...FONTS.regular,
    color: COLORS.blue9,
    marginTop: 25,
    marginBottom: 30,
  },
  viewOnMapWrap: {
    backgroundColor: COLORS.Tblue6,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignSelf: "center",
    borderRadius: 10,
  },
  viewOnMapText: {
    ...fontsize.xxsmallest,
    ...FONTS.semibold,
    color: COLORS.blue16,
  },
  withdrawalActionWrap: {
    flexDirection: "row",
    width: 250,
    justifyContent: "space-between",
  },
  withdrawalActionTitle: {
    ...fontsize.xxsmallest,
    ...FONTS.medium,
    color: COLORS.blue9,
    marginTop: 15,
  },
});
