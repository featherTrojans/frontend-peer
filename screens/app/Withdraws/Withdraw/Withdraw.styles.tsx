import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize } from "../../../../constants";
import { Shadow } from "../../../../constants/theme";

export const styles = StyleSheet.create({
  activeStyles: {
    backgroundColor: COLORS.blue6,
    color: COLORS.white,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
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

  emptyListContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 38
  },
  emptyListText: {
    textAlign: "center",
    paddingHorizontal: 50,
    ...fontsize.bsmall,
    ...FONTS.regular,
  },

  ///Withdraw requestee profile

  withdrawProfileContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 19,
    paddingBottom: 21,
    paddingLeft: 14,
    paddingRight: 17,
    borderRadius: 15,
    marginBottom: 10,
    ...Shadow

  },
  namesContainer: {
    marginLeft: 20,
  },
  withdrawProfileName: {
    ...fontsize.bsmall,
    ...FONTS.medium,
    lineHeight: 27
  },
  withdrawProfileUsername: {
    ...fontsize.bsmall,
    ...FONTS.regular,

  },
  priceAndCheck: {
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  withdrawProfilePrice: {
    ...fontsize.small,
    ...FONTS.bold,
  },

  //Deposit requetee profile
  depositProfileContainer: {
    paddingBottom: 23,
    paddingVertical: 20,
    paddingHorizontal: 14,
    borderRadius: 15,
    marginBottom: 10,
    ...Shadow
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
    ...FONTS.medium 
  },
  depositBasecharge:{ 
    color: COLORS.green1, 
    ...fontsize.smallest 
  }
});
