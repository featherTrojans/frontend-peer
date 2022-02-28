import { StyleSheet } from "react-native";
import styled from "styled-components/native";
import { COLORS, FONTS, fontsize, SIZES } from "../../constants";

export const styles = StyleSheet.create({
  imageBg: {
    flex: 1,
    paddingTop: 20,
  },
  backArrow: {
    width: 50,
    height: 50,
    backgroundColor: COLORS.blue6,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 13,
  },

  //   Inside the bottom sheet
  bottomSheet: {
    borderRadius: 22,
  },
  bottomSheetScroll: {
    paddingHorizontal: 15,
    flex: 1,
  },
  requestSummary: {
    ...fontsize.bsmall,
    ...FONTS.medium,
  },
  detailsContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  amountText: {
    ...fontsize.bxmedium,
    ...FONTS.bold,
  },
  withdrawalChargesBg: {
    backgroundColor: COLORS.lightBlue,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  reasonsContainer: {
    flex: 1,
    marginTop: 37,
  },
  reasonText: {
    ...fontsize.bsmall,
    ...FONTS.regular,
    color: COLORS.black,
  },

  //   Bottom section container

  bottomPartContainer: {
    height: 206,
    // flex: 0.5,
    backgroundColor: COLORS.white,
    // borderTopRightRadius: 22,
    // borderTopLeftRadius: 22,
    // justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 25,
  },
  actionsContainer: {
    flexDirection: "row",
    width: 252,
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 47,
    marginBottom: 28,
  },
  action: {
    justifyContent: "center",
    alignItems: "center",
  },
  actionTitle: {
    marginTop: 11,
    ...fontsize.smallest,
    ...FONTS.regular,
  },
  verticalLine: {
    width: 0.5,
    height: 24,
    backgroundColor: COLORS.lineColor3,
  },
  btnBg: {
    paddingTop: 22,
    paddingBottom: 24,
    backgroundColor: COLORS.blue6,
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  btnText: {
    color: COLORS.white,
    textTransform: "uppercase",
    ...fontsize.smallest,
    ...FONTS.bold,
  },
});
