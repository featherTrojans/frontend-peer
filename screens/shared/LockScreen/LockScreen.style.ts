import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { COLORS, FONTS, fontsize } from "../../../constants";
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.blue6,
    paddingTop: RFValue(25),
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
    width: RFValue(8),
    height: RFValue(8),
    backgroundColor: COLORS.grey1,
    borderRadius: RFValue(16),
  },
  activeDot: {
    width: RFValue(19),
    height: RFValue(8),
    backgroundColor: COLORS.blue6,
    borderRadius: RFValue(4),
  },
  subText: {
    color: COLORS.grey5,
    ...fontsize.medium,
    ...FONTS.regular,
  },
  pinContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: RFValue(60),
  },
  pinInputContainer: {
    width: RFValue(252),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  pinInput: {
    width: RFValue(50),
    borderColor: COLORS.blue7,
    borderWidth: 1,
    borderRadius: RFValue(13),
    ...fontsize.big,
    paddingHorizontal: RFValue(15),
    paddingVertical: RFValue(10),
    justifyContent: "center",
    alignItems: "center",
  },
  pinViewWrap: {
    width: RFValue(160),
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
  },
  pinView: {
    width: RFValue(12),
    height: RFValue(12),
    borderRadius: RFValue(12 / 2),
    borderColor: COLORS.blue7,
  },
  pinText: {
    ...fontsize.big,
  },
  proceedBtn: {
    backgroundColor: COLORS.blue6,
    justifyContent: "center",
    alignItems: "center",
    height: RFValue(62),
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
    marginBottom: RFValue(30),
  },
  numberBtn: {
    width: RFValue(60),
    height: RFValue(60),
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: COLORS.grey1,
    borderRadius: RFValue(50),
    marginHorizontal: RFValue(20),
    marginVertical: RFValue(10),
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
