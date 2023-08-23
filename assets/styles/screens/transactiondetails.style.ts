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
    ...fontsize.smaller,
    ...FONTS.medium,
    color: COLORS.blue9,
    textTransform: "capitalize",
  },

  optionWrapper: {
    flexDirection: "row",
    width: 242,
    alignSelf: "center",
    justifyContent: "space-between",
  },
  optionBlock: {
    justifyContent: "center",
    alignItems: "center",
  },
  eachOptionWrapper: {
    marginTop: 10,
    backgroundColor: COLORS.white,
    // paddingHorizontal: 18,
    paddingVertical: 30,
    borderRadius: 15,
  },

  eachOptionTitle: {
    marginTop: 13,
    ...fontsize.xxsmall,
    ...FONTS.medium,
    color: COLORS.blue9,
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
  transactionRefText: {
    ...fontsize.xsmallest,
    ...FONTS.regular,
    color: COLORS.blue9
  },
  refAndCopyWrap: {
    justifyContent: "center",
    alignItems: "center",
  },
  refText: {
    ...fontsize.xmedium,
    ...FONTS.bold,
    lineHeight: 39,
    color: COLORS.blue7,
    marginTop: 16,
    marginBottom: 8,
    textTransform: "uppercase",
    textAlign: "center",
  },
  tapAndCopy: {
    ...fontsize.smallest,
    ...FONTS.regular,
    color: COLORS.grey16,
  },
  headerBlock: {
    justifyContent: "center",
    backgroundColor: COLORS.white,
    padding: 16,
    paddingBottom: 30,
    borderRadius: 15,
  },

});
