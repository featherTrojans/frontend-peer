import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { COLORS, FONTS, fontsize } from "../../../constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: COLORS.white3,
  },
  headerContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileNameContainer: {
    marginLeft: 13,
    justifyContent: "space-between",
  },
  profileName: {
    ...fontsize.smaller,
    ...FONTS.regular,
    marginBottom: 2,
    textTransform: "capitalize",
  },
  profileUsername: {
    ...fontsize.xsmallest,
    ...FONTS.regular,
    alignItems: "center",
    textTransform: "lowercase",
  },
  notificationBell: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: COLORS.grey17,
    justifyContent: "center",
    alignItems: "center",
  },

  walletBlock: {
    marginTop: 20,
    marginBottom: 12,
    borderRadius: 10,
  },

  walletOptionsContainer: {
    backgroundColor: COLORS.white,
    marginTop: 12,
    borderRadius: 15,
    padding: 20,
  },
  optionContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  optionIconBg: {
    marginBottom: 13,
    width: 39,
    height: 39,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 39,
  },
  optionTitle: {
    ...fontsize.xsmallest,
    ...FONTS.regular,
    color: COLORS.blue9,
  },

  //Transfer modal styles

  headerWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 35,
  },
  addcashheadertext: {
    ...fontsize.smaller,
    ...FONTS.medium,
    color: COLORS.blue9,
  },
  primarywallettext: {
    ...fontsize.smallest,
    ...FONTS.regular,
    marginBottom: 11,
  },
  availablebalancetext: {
    ...fontsize.small,
    ...FONTS.bold,
    textAlign: "right",
    color: COLORS.purple2,
  },

  // Horizontal information styles

  informationblockwrap: {
    width: RFValue(252),
    marginRight: 20,
    borderRadius: 7,
    paddingHorizontal: 20,
    paddingVertical: 12,
    paddingBottom: 24,
    overflow: "hidden",
  },
  informationiconswrap: {
    marginBottom: 10,
    height: 18,
    flexDirection: "row",
  },
  informationblocktext: {
    ...fontsize.smallest,
    ...FONTS.regular,
    lineHeight: 18,
    color: COLORS.white,
  },

  // transactionHistory: {
  //   ...fontsize.smallest,
  //   ...FONTS.medium,
  // },

  //Transactions

  transactionWrap: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 18,
    paddingVertical: 24,
    borderRadius: 15,
  },
  transactionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  transactionIconWrap: {
    flexDirection: "row",
    alignItems: "center",
  },
  transactionText: {
    marginLeft: 11,
    ...fontsize.xsmallest,
    ...FONTS.medium,
  },
  viewAll: {
    ...fontsize.xsmallest,
    ...FONTS.medium,
  },

  //Conversations

  conversationWrap: {
    backgroundColor: COLORS.white,
    marginVertical: 15,
    padding: 18,
    borderRadius: 16,
  },
  conversationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  recentIconWrap: {
    flexDirection: "row",
    alignItems: "center",
  },
  recentconvText: {
    ...fontsize.xsmallest,
    ...FONTS.medium,
    color: COLORS.blue9,
    marginLeft: 8.6,
  },
  numberOfUnread: {
    ...fontsize.xsmallest,
    ...FONTS.medium,
    color: COLORS.blue9,
  },

  setupProfile: {
    backgroundColor: COLORS.white,
    marginVertical: 15,
    padding: 18,
    borderRadius: 16,
  },
  setupText: {
    ...fontsize.xsmallest,
    ...FONTS.medium,
    color: COLORS.blue9,
    marginLeft: 8.6,
  },
  setupInfoText: {
    ...fontsize.xsmallest,
    ...FONTS.medium,
    color: COLORS.grey16,
    lineHeight: 18,
  },
  setupIconWrap: {
    flexDirection: "row",
    alignItems: "center",
  },
  setupHeadSection: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
