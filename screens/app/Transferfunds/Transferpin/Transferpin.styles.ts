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
    paddingHorizontal: RFValue(25),
  },
  backArrowConteiner: {
    marginVertical: RFValue(10),
  },
  descriptionContainer: {
    marginHorizontal: RFValue(15),
    justifyContent: "center",
    alignItems: "center",
  },
  descriptionText: {
    textAlign: "center",
    ...fontsize.bsmall,
    ...FONTS.medium,
    lineHeight: RFValue(25),
    color: COLORS.black,
    marginBottom: RFValue(15),
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
  },
  pinContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: RFValue(35),
    marginBottom: RFValue(30),
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

  ///Deposit pin screen

  transactionSubHeader: {
    textAlign: "center",
    marginHorizontal: RFValue(40),
    //  marginVertical: 40,
    marginTop: RFValue(24),
    marginBottom: RFValue(45),
    ...fontsize.bsmall,
    ...FONTS.medium,
  },
});
