import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize } from "../../../../constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 15,
    paddingTop: 20,
    backgroundColor: COLORS.white,
  },
  backArrow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 38,
    // paddingLeft: 25
    paddingHorizontal: 25
  },
  backArrowTextContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backArrowText: {
    ...fontsize.bsmall,
    ...FONTS.medium,
  },
  notifyingTextContainer: {
    paddingHorizontal: 77,
    marginTop: 40,
    marginBottom: 68,
  },
  notifyingText: {
    lineHeight: 24,
    ...fontsize.bsmall,
    ...FONTS.regular,
    fontSize: 16,
  },
  notifyingSubText: {
    ...FONTS.bold,
  },
  tablesContainer: {
    flex: 1,
    paddingHorizontal: 37,
  },
  tableContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tableTitle: {
    ...fontsize.small,
    ...FONTS.regular,
    color: COLORS.black,
  },
  tableValue: {
    ...fontsize.small,
    ...FONTS.bold,
    color: COLORS.black,
  },
  bottomLine: {
    height: 0.5,
    backgroundColor: COLORS.lineColor2,
    marginVertical: 18,
  },


  btnBg: {
    backgroundColor: COLORS.blue6,
    paddingTop: 22,
    paddingBottom: 24,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    ...fontsize.smallest,
    color: COLORS.white,
    ...FONTS.bold,
  },
});
