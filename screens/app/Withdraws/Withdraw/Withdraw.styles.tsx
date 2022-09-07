import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize } from "../../../../constants";
import { Shadow, SIZES } from "../../../../constants/theme";

export const withdrawstyles = StyleSheet.create({
  activeStyles: {
    backgroundColor: COLORS.blue6,
    color: COLORS.white,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white3,
    // paddingHorizontal: 15,
  },
  requestContainer: {
    flex: 1,
  },

  listHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 30,
  },
  listHeaderText: {
    ...fontsize.bsmall,
    color: COLORS.grey2,
    borderRadius: 14,
    paddingVertical: 18,
    paddingHorizontal: 26,
  },
  requesteeblock: {
    backgroundColor: COLORS.white,
    width: SIZES.width - 30,
    height: "auto",

    borderRadius: 15,
    paddingHorizontal: 16,
    paddingVertical: 22,
    alignSelf: "flex-start",
  },
  requesteeblocktitle: {
    ...fontsize.smaller,
    ...FONTS.regular,
    color: COLORS.blue9,
    marginBottom: 42,
  },
  emptyListContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 50,
    paddingTop: 15,
    paddingHorizontal: 30,
  },
  emptyListText: {
    textAlign: "center",
    ...fontsize.smaller,
    ...FONTS.regular,
  },

  ///Withdraw requestee profile
  requesteeprofilewrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  requesteedetailswrap: {
    flexDirection: "row",
    alignItems: "center",
  },

  requesteeinitialsbg: {
    width: 34,
    height: 34,
    backgroundColor: "#8456FF",
    borderRadius: 34 / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  requesteeinitialtext: {
    color: COLORS.white,
    ...fontsize.smaller,
    ...FONTS.medium,
  },
  requesteename: {
    ...fontsize.smaller,
    ...FONTS.medium,
    color: COLORS.blue9,
    lineHeight: 27,
    textTransform: "capitalize"
  },
  requesteedistance: {
    ...fontsize.smallest,
    color: COLORS.halfBlack,
    ...FONTS.medium,
  },
  requestedamount: {
    ...fontsize.smallest,
    ...FONTS.medium,
    lineHeight: 27,
  },
  statusdotwrap: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  statusdotwrapinner: {
    flexDirection: "row",
    width: 37,
    justifyContent: "space-between",
  },
  bottombtnwrap: {
    flex: 1,
    paddingHorizontal: 15,
    justifyContent: "flex-end",
    marginBottom: 20,
  },

  //Deposit requetee profile
  depositProfileContainer: {
    paddingBottom: 23,
    paddingVertical: 20,
    paddingHorizontal: 14,
    borderRadius: 15,
    marginBottom: 10,
    ...Shadow,
  },
  depositProfileDetails: {
    flexDirection: "row",
    alignItems: "center",
  },
  depositProfileName: {
    ...fontsize.bsmall,
    ...FONTS.medium,
    marginBottom: 3,
    lineHeight: 27,
  },
  depositAmount: {
    ...fontsize.small,
    ...FONTS.medium,
  },
  depositBasecharge: {
    color: COLORS.green1,
    ...fontsize.smallest,
  },
});
