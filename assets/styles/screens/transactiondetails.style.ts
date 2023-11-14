import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize } from "../../../constants";

export const TransactiondetailsScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  detailsContainer: {
    paddingHorizontal: 26,
  },

  eachDetailContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  eachDetailTitle: {
    ...fontsize.xsmallest,
    ...FONTS.regular,
    color: COLORS.grey16,
    textTransform: "capitalize",
  },
  eachDetailValue: {
    ...fontsize.smallest,
    ...FONTS.medium,
    color: COLORS.blue9,
    textTransform: "capitalize",
  },

  eachOptionWrapper: {
    marginTop: 25,
    backgroundColor: COLORS.white,
    padding: 30,
    borderRadius: 15,
  },
  dateWrapper: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  dateWrap: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
  },
  dateText: {
    ...fontsize.xsmallest,
    ...FONTS.medium,
    color: COLORS.blue9,
  },
  transactionTypeBg: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 18,
  },
  transactionTypeText: {
    ...fontsize.xsmallest,
    ...FONTS.medium,
  },
  transactionArrowBg: {
    width: 28,
    height: 28,
    borderRadius: 28 / 2,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 6.5,
  },
  typeAndIconWrap: {
    flexDirection: "row",
    alignItems: "center",
  },

  amountText: {
    ...fontsize.xxsmallest,
    ...FONTS.medium,
    color: COLORS.blue9,
    marginBottom: 10,
  },
  amountTextValue: {
    ...fontsize.xbigger,
    ...FONTS.bold,
    color: COLORS.blue9,
  },

  headerBlock: {
    justifyContent: "center",
    backgroundColor: COLORS.white,
    padding: 16,
    paddingBottom: 30,
    borderRadius: 15,
  },

  transactionStatusWrap: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusThumpBg: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  statusThumbText: {
    ...fontsize.bsmall,
    ...FONTS.medium,
    lineHeight: 20,
  },
  statusTextBg: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 32,
  },
  statusText: {
    ...fontsize.xsmallest,
    ...FONTS.semibold,
  },
  downloadBtnWrap: {
    paddingVertical: 20.5,
    justifyContent: "center",
    alignItems: "center",
    borderColor: COLORS.blue6,
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: "row",
  },
  downloadPdfText: {
    ...fontsize.smallest,
    ...FONTS.semibold,
    color: COLORS.blue6,
    marginLeft: 10,
  },
});
