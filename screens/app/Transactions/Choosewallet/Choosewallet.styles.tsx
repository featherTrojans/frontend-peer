import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize } from "../../../../constants";

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingTop: 20,
    backgroundColor: COLORS.white,
    flex: 1,
  },
  backArrow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 37,
  },
  backArrowText: {
    paddingLeft: 21,
    ...fontsize.bbsmall,
    ...FONTS.regular,
  },
  walletTypeContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 17,
    paddingTop: 15,
    paddingBottom: 17,
    borderRadius: 15,
    marginBottom: 10,
  },
  walletTypeInfoContainer: {
    flex: 1,
    marginLeft: 16,
  },
  walletTopSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  walletTopText: {
    ...fontsize.bmsmall,
    ...FONTS.medium,
  },
  walletBottomTextBg: {
    backgroundColor: COLORS.blue6,
    alignSelf: "flex-start",
    paddingVertical: 5,
    paddingHorizontal: 9,
    borderRadius: 12,
    marginTop: 8,
  },
  walletBottomText: {
    color: COLORS.white,
    ...fontsize.xxsmallest,
    ...FONTS.medium,
  },
  walletBottomText2: {
    color: COLORS.black,
    ...fontsize.xsmallest,
    ...FONTS.regular,
  },
  walletBottomText2sub: {
    color: COLORS.blue6,
    ...FONTS.bold,
  },
});
