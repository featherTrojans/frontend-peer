import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize } from "../../../constants";
fontsize;
FONTS;
COLORS;

export const LockScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.blue6,
    paddingTop: 25,
  },
  lockScreenContainer: {
    flex: 1,
    paddingBottom: 20,
    backgroundColor: COLORS.white3,
  },
  lockScreenSubcontainer: {
    paddingHorizontal: 15,
    flex: 1,
    paddingTop: 30,
  },
  header: {
    ...fontsize.big,
    ...FONTS.bold,
    color: COLORS.black,
  },
  topDots: {
    width: 8,
    height: 8,
    backgroundColor: COLORS.grey1,
    borderRadius: 16,
  },
  activeDot: {
    width: 19,
    height: 8,
    backgroundColor: COLORS.blue6,
    borderRadius: 4,
  },
  subText: {
    color: COLORS.grey5,
    ...fontsize.medium,
    ...FONTS.regular,
  },
  pinContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 60,
  },
  pinInputContainer: {
    width: 252,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  pinInput: {
    width: 50,
    borderColor: COLORS.blue7,
    borderWidth: 1,
    borderRadius: 13,
    ...fontsize.big,
    paddingHorizontal: 15,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  pinViewWrap: {
    width: 160,
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
  },
  pinView: {
    width: 12,
    height: 12,
    borderRadius: 12 / 2,
    borderColor: COLORS.blue7,
  },
  pinText: {
    ...fontsize.big,
  },
  proceedBtn: {
    backgroundColor: COLORS.blue6,
    justifyContent: "center",
    alignItems: "center",
    height: 62,
    borderRadius: 10,
  },
  proceedText: {
    color: COLORS.white,
    ...fontsize.smallest,
    ...FONTS.bold,
  },
  numberBtnContainer: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: 30,
  },
  numberBtn: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: COLORS.grey1,
    borderRadius: 50,
    marginHorizontal: 20,
    marginVertical: 10,
  },

  ///Lock screen

  headerText: {
    ...fontsize.bbsmall,
    ...FONTS.medium,
    color: COLORS.blue9,
    textTransform: "capitalize",
    marginTop: 36,
  },
  headerNameText: {
    ...FONTS.bold,
    color: COLORS.blue6,
  },
  subHeaderText: {
    marginTop: 10,
    ...fontsize.smaller,
    ...FONTS.regular,
    color: COLORS.grey2,
    lineHeight: 20,
  },
  numberOfTrials: {
    ...fontsize.small,
    ...FONTS.medium,
    color: COLORS.grey16,
    alignSelf: "center",
  },
  enterPinText: {
    textAlign: "center",
    ...fontsize.smaller,
    ...FONTS.regular,
    color: COLORS.blue9,
    marginTop: 40,
    marginBottom: 60,
  },
});
