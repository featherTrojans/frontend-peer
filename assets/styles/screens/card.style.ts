import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize } from "../../../constants";

export const CardScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white3,
  },
  contentContainer: {
    flex: 1,
    // paddingHorizontal: 15,
  },
  myCardsText: {
    ...fontsize.bbsmall,
    ...FONTS.bold,
    marginTop: 30,
    marginBottom: 50,
  },
  demoCard: {
    height: 167,
    backgroundColor: COLORS.grey13,
    borderRadius: 17,
  },

  actionsWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 35,
    marginVertical: 30,
  },

  actionIconWrap: {
    justifyContent: "center",
    alignItems: "center",
  },

  actionTitle: {
    ...fontsize.xsmallest,
    ...FONTS.medium,
    color: COLORS.black,
    marginTop: 14,
  },
  sheetHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  sheetHeaderText: {
    marginLeft: 11,
    ...fontsize.xsmallest,
    ...FONTS.semibold,
    color: COLORS.black,
  },

  ///Card details Modal

  cardDetailsModalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardDetailSubHead: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardDetailsHeaderText: {
    ...fontsize.xsmallest,
    ...FONTS.semibold,
    color: COLORS.blue9,
  },
  detailInfoTitle: {
    ...fontsize.xsmallest,
    color: COLORS.grey2,
    ...FONTS.semibold,
  },
  detailInfoValueWrap: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  detailInfoValueText: {
    ...fontsize.smaller,
    ...FONTS.regular,
    color: COLORS.blue9,
  },

  //Card locked modal
  cardLockHeader: {
    textAlign: "center",
    ...fontsize.small,
    ...FONTS.bold,
    color: COLORS.blue9,
  },
  cardLockSvg: {
    width: 300,
    height: 162,
    backgroundColor: COLORS.grey1,
    alignSelf: "center",
    marginBottom: 60,
    marginTop: 50,
  },
  cardLockConfirmtext: {
    ...fontsize.smaller,
    ...FONTS.regular,
    textAlign: "center",
    marginBottom: 20,
  },
  cardLockConfirmSubtext: {
    ...fontsize.smaller,
    ...FONTS.regular,
    textAlign: "center",
    lineHeight: 20,
  },

  emptyCardsWrap: {
    flex: 1,
    alignItems: "center",
  },
  youHaveNoCard: {
    ...fontsize.smaller,
    ...FONTS.regular,
    color: COLORS.black2,
    marginTop: 34,
  },
  shopAndPay: {
    ...fontsize.medium,
    ...FONTS.bold,
    textAlign: "center",
    marginTop: 30,
    marginBottom: 50,
    lineHeight: 31,
    paddingHorizontal: 50
  },
  createVirtualCardWrap: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    backgroundColor: "#F3F5FE",
    borderRadius: 10,
  },
  createVirtualCardText: {
    color: COLORS.blue16,
    ...fontsize.xxsmallest,
    ...FONTS.semibold,
  },
  createVisaCardText: {
    ...fontsize.bmedium,
    ...FONTS.bold,
    color: COLORS.blue9,
  },
  createCardSubInfo: {
    ...fontsize.smallest,
    ...FONTS.regular,
    color: COLORS.blue9,
    marginTop: 20,
    width: "80%",
    lineHeight: 18,
    marginBottom: 50,
  },
  rightComponentBg: {
    paddingHorizontal: 13,
    paddingVertical: 9,
    borderRadius: 15,
  },
  rightComponentText: {
    color: COLORS.white,
    ...fontsize.smallest,
    ...FONTS.bold,
  },
});
