import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { COLORS, FONTS, fontsize } from "../../../constants";
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.blue6,
    paddingTop: RFValue(25),
  
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
    marginBottom: RFValue(80),
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
  pinView: {
    width:  RFValue(50),
    height: RFValue(60),
    borderColor: COLORS.blue7,
    borderWidth: 1,
    borderRadius: RFValue(13),
    paddingHorizontal: RFValue(15),
    paddingVertical: RFValue(10),
    justifyContent: "center",
    alignItems: "center",
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
    ...fontsize.big,
    ...FONTS.bold,
    color: COLORS.white,
    textTransform: "capitalize",
  },
});
