import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize } from "../../../constants";

export const cardstyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white3,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  myCardsText: {
    ...fontsize.big,
    ...FONTS.bold,
    marginTop: 30,
    marginBottom: 50,
  },
  demoCard: {
    width: 297,
    height: 167,
    backgroundColor: COLORS.grey13,
    marginRight: 15,
    borderRadius: 17,
  },
  Vcardactionswrap: {
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
    marginVertical: 20,
    paddingTop: 18,
    paddingBottom: 25,
    borderRadius: 16,
  },
  Vcardtext: {
    marginLeft: 10,
    ...fontsize.xsmallest,
    ...FONTS.medium,
    color: COLORS.grey16,
  },
  actionsWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionIconWrap: {
    justifyContent: "center",
    alignItems: "center",
  },
  actionIconBg: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    backgroundColor: COLORS.grey19,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
  },
  actionTitle: {
    ...fontsize.xsmallest,
    ...FONTS.medium,
    color: COLORS.black,
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
});
