import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize } from "../../../../../constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 20,
    backgroundColor: COLORS.white,
  },
  backArrow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 37,
  },
  backArrowText: {
    marginLeft: 21,
    ...fontsize.bbsmall,
    ...FONTS.regular,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 23,
  },
  leftHeader: {
    ...fontsize.small,
    ...FONTS.regular,
    color: COLORS.grey5,
  },
  rightHeader: {
    color: COLORS.blue6,
    ...fontsize.small,
    ...FONTS.medium,
  },
  addAccountContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 16,
    height: 16,
    borderRadius: 5,
    borderColor: COLORS.checkBorder,
    borderWidth: 1.5,
  },
  checkText: {
    marginLeft: 12,
    color: COLORS.blue6,
    ...fontsize.small,
    ...FONTS.medium,
  },
  btcSection: {
    height: 92,
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 25,
    paddingTop: 10,
    paddingBottom: 20,
  },
  btnBg: {
    backgroundColor: COLORS.blue6,
    paddingTop: 22,
    paddingBottom: 24,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  btnText: {
    color: COLORS.white,
    ...fontsize.smallest,
    ...FONTS.bold,
  },
});
