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
    overflow: "hidden"
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

  //   Transactions history part
  transactionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 22,
    marginBottom: 20,
  },
  transactionHistory: {
    ...fontsize.smallest,
    ...FONTS.medium,
  },
  seeAll: {
    ...fontsize.xsmallest,
    ...FONTS.bold,
    color: COLORS.blue6,
  },


});
