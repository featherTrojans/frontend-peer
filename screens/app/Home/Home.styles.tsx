import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize } from "../../../constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 25,
    backgroundColor: COLORS.white,
  },
  headerContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
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
    ...fontsize.bbsmall,
    ...FONTS.bold,
    marginBottom: 2,
  },
  profileUsername: {
    ...fontsize.bsmall,
    ...FONTS.regular,
  },

  walletBlock: {
    marginTop: 20,
    marginBottom: 31,
    backgroundColor: COLORS.blue6,
    borderRadius: 10,
  },

  walletOptionsContainer: {
    backgroundColor: COLORS.blue6,
    paddingLeft: 20,
    paddingRight: 23,
    paddingBottom: 26,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  optionContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  optionIconBg: {
    marginBottom: 13,
    width: 39,
    height: 39,
    backgroundColor: COLORS.iconBg,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 39,
  },
  optionTitle: {
    ...fontsize.smaller,
    ...FONTS.regular,
    color: COLORS.white,
  },

  //   Transactions history part
  transactionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 22,
  },
  transactionHistory: {
    ...fontsize.bsmall,
    ...FONTS.medium,
  },
  seeAll: {
    ...fontsize.small,
    ...FONTS.bold,
  },

  //   EmptyComponent styling

  emptyContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    color: COLORS.black,
    textAlign: "center",
    ...fontsize.bsmall,
    ...FONTS.regular,
  },
  transactNow: {
    color: COLORS.blue6,
    ...FONTS.bold,
  },

  centerEmptySet: {
    flexGrow: 1,
    height: "100%",
  },
});
