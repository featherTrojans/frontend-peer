import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize } from "../../../constants";

export const TransactionsummaryScreenStyles = StyleSheet.create({
  amountText: {
    ...fontsize.xxsmallest,
    ...FONTS.medium,
    marginTop: 33,
    marginBottom: 15,
    color: COLORS.grey16,
  },
  amountValueText: {
    ...fontsize.xbig,
    ...FONTS.semibold,
    color: COLORS.blue9,
  },
  summaryWrap: {
    paddingHorizontal: 30,
    paddingTop: 30,
    borderRadius: 25,
    borderColor: COLORS.grey1,
    borderWidth: 0.5,
    marginBottom: 26
  },
  eachSummaryWrap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  eachSummaryKey: {
    ...fontsize.smallest,
    ...FONTS.regular,
    color: COLORS.grey16,
  },
  eachSummaryValue: {
    ...fontsize.smallest,
    ...FONTS.semibold,
    // textTransform: "capitalize",
  },
  dashedLine: {
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: COLORS.grey1,
    marginVertical: 32,
  },
});
