import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize } from "../../../constants";

export const withdrawstyles = StyleSheet.create({
  subcontainer: {
    justifyContent: "space-between",
    flex: 1,
  },
  withdrawOptionWrap: {
    backgroundColor: COLORS.white,
    padding: 25,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
  },
  withdrawOptionText: {
    ...fontsize.smaller,
    ...FONTS.bold,
    color: COLORS.blue9,
  },
  withdrawOptionContain: {
    marginTop: 48,
  },
  withdrawOption: {
    flexDirection: "row",
    alignItems: "center",
  },
  withdrawOptionIconBg: {
    width: 44,
    height: 44,
    borderRadius: 44 / 2,
    backgroundColor: COLORS.lightBlue2,
    justifyContent: "center",
    alignItems: "center",
  },
  withdrawOptionTitle: {
    ...fontsize.smaller,
    ...FONTS.semibold,
    marginBottom: 9,
  },
  withdrawOptionValue: {
    ...fontsize.xsmallest,
    ...FONTS.regular,
  },
  needMoreInfo: {
    textAlign: "center",
    ...fontsize.xsmallest,
    ...FONTS.medium,
    color: COLORS.grey2,
  },
  learnMore: {
    color: COLORS.blue6,
    ...FONTS.bold,
  },

  ///Withdrawal Listing styles

  loadingListingWrap: {
    height: 250,
    padding: 15,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
  },
  loadingListingInfo: {
    textAlign: "center",
    marginTop: 34,
    ...fontsize.small,
    ...FONTS.regular,
    lineHeight: 24,
  },

  durationAway: {
    ...fontsize.xmedium,
    ...FONTS.bold,
    marginBottom: 30,
  },
  listInfoWrap: {
    flexDirection: "row",
    alignItems: "center",
  },
  listUserBg: {
    width: 45,
    height: 45,
    backgroundColor: COLORS.grey1,
    borderRadius: 45 / 2,
  },
  listUserFullname: {
    ...fontsize.small,
    ...FONTS.bold,
    marginBottom: 7,
  },
  noOfTransaction: {
    ...fontsize.xsmallest,
    ...FONTS.medium,
  },
  listActionWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 30,
  },
  listActionBg: {
    width: 45,
    height: 45,
    backgroundColor: COLORS.lightgray,
    borderRadius: 45 / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  listActionTitle: {
    ...fontsize.xsmallest,
    ...FONTS.medium,
    marginTop: 15,
  },

  ///Summarybox

  summaryboxWrap: {
    paddingLeft: 20,
    paddingRight: 18,
    backgroundColor: COLORS.white,
    paddingVertical: 26,
    borderRadius: 16,
  },
  summaryIconTextWrap: {
    flexDirection: "row",
    alignItems: "center",
  },
  summaryText: {
    ...fontsize.xsmallest,
    ...FONTS.medium,
    color: COLORS.grey16,
    marginLeft: 10,
  },
  eachSummaryWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  eachSummaryTitle: {
    ...fontsize.smallest,
    ...FONTS.medium,
  },
  eachSummaryValue: {
    ...fontsize.smaller,
    ...FONTS.bold,
  },
});
