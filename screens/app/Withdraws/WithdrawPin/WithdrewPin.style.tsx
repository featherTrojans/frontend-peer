import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { COLORS, fontsize, FONTS } from "../../../../constants";
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    // paddingHorizontal: 25,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    // paddingHorizontal: RFValue(25),
  },
  backArrowConteiner: {
    marginVertical: RFValue(20),
  },
  descriptionContainer: {
    marginHorizontal: RFValue(25),
    justifyContent: "center",
    alignItems: "center",
  },
  descriptionText: {
    textAlign: "center",
    ...fontsize.bsmall,
    ...FONTS.medium,
    lineHeight: 25,
    color: COLORS.black,
    marginBottom: RFValue(30),
  },
  descriptionSubText: {
    ...FONTS.bold,
    color: COLORS.blue6,
  },
  enterPinText: {
    ...fontsize.bsmall,
    ...FONTS.medium,
    color: COLORS.blue6,
  },

  numberBtnContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    // backgroundColor:"blue"
  },
  pinContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: RFValue(48),
    marginBottom: RFValue(65),
  },
  pinInputContainer: {
    width: RFValue(252),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  pinView: {
    width: RFValue(50),
    height: RFValue(60),
    borderColor: COLORS.blue7,
    borderWidth: 1,
    borderRadius: RFValue(13),
    paddingHorizontal: RFValue(15),
    paddingVertical: RFValue(10),
    justifyContent: "center",
    alignItems: "center",
  },
  amountcont: {
    borderBottomColor: COLORS.lineColor2,
    borderBottomWidth: 1,
    paddingVertical: RFValue(15),
    width: "70%",
    textAlign: "center",
    alignItems: "center",
  },
  amountTxt: {
    textAlign:"center",
    ...fontsize.big,
    ...FONTS.medium,
  },
});
