import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize } from "../../../constants";

export const FTTransactionhistoryStyles = StyleSheet.create({
  container: {
    borderRadius: 15,
    marginBottom: 35,
  },

  dateText: {
    ...fontsize.xsmallest,
    color: COLORS.blue9,
    ...FONTS.medium,
    lineHeight: 27,
    marginBottom: 18,
  },
  bottomLine: {
    height: 0.5,
    backgroundColor: COLORS.lineColor,
    marginVertical: 13.5,
  },

  //   For the history component
  historyContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  historyDetailsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  arrowBg: {
    width: 31,
    height: 31,
    borderRadius: 31 / 2,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  titleText: {
    ...fontsize.xsmallest,
    ...FONTS.medium,
    marginBottom: 3,
    textTransform: "capitalize",
  },
  transactionTypeText: {
    ...fontsize.xxsmall,
    lineHeight: 27,
    ...FONTS.regular,
    color: COLORS.halfBlack,
    alignItems: "center",
  },
  amountText: {
    ...fontsize.xsmallest,
    ...FONTS.medium,
    lineHeight: 27,
  },
});
