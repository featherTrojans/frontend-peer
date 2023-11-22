import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize } from "../../../constants";

export const WithdrawcashScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingBottom: 60,
  },
  withdrawalInfoWrap: {
    // alignSelf: "center",
    // justifyContent: "center",
    // alignItems: "center",
  },
  withdrawalProfileWrap: {
    alignSelf: "center",
    alignItems: "center",
    marginBottom: 35,
  },
  withdrawalProfileName: {
    ...fontsize.bsmall,
    ...FONTS.bold,
    color: COLORS.blue9,
    marginBottom: 15,
    marginTop: 40,
  },
  detailsBlock: {
    backgroundColor: COLORS.white,
    alignItems: "center",
    paddingBottom: 50,
    paddingTop: 40,
    borderRadius: 20,
  },
  amountOfTransaction: {
    ...fontsize.smallest,
    ...FONTS.regular,
    color: COLORS.grey2,
  },
  locationInfoWrap: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "red"
  },
  locationDistance: {
    ...fontsize.bsmall,
    ...FONTS.bold,
    // backgroundColor: COLORS.blue6
  },
  locationAddress: {
    ...fontsize.smallest,
    ...FONTS.regular,
    color: COLORS.blue9,
    marginTop: 15,
    // marginBottom: 48,
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
  loadingWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  searchingNearbyText: {
    ...fontsize.smallest,
    ...FONTS.semibold,
    textAlign: "center",
    marginBottom: 20,
  },
});
