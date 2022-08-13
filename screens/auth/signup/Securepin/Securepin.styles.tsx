import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { COLORS, FONTS, fontsize, SIZES } from "../../../../constants";




export const securepinstyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 25,
    paddingTop: 30
  },
  header: {
    ...fontsize.big,
    ...FONTS.bold,
    color: COLORS.black,
  },
  topDots: {
    width: RFValue(5),
    height: RFValue(5),
    backgroundColor: COLORS.grey1,
    borderRadius: RFValue(16),
  },
  activeDot: {
    width: RFValue(12),
    height: RFValue(5),
    backgroundColor: COLORS.blue6,
    borderRadius: 4,
  },
  subText: {
    color: COLORS.grey5,
    ...fontsize.medium,
    ...FONTS.regular,
  },





  pinInputContainer: {
    width: RFValue(160),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  pinInput: {
    width: RFValue(50),
    borderColor: COLORS.blue7,
    borderWidth: 1,
    borderRadius: 13,
    ...fontsize.big,
    paddingHorizontal: RFValue(15),
    paddingVertical: RFValue(10),
    justifyContent: "center",
    alignItems: "center",
  },
  pinView:{
    width: RFValue(12), 
    height: RFValue(12),
    borderRadius: RFValue(12/2),
    borderColor: COLORS.blue7,
  },





  pinText:{
    ...fontsize.big,
  },
  proceedBtn: {
    backgroundColor: COLORS.blue6,
    justifyContent: "center",
    alignItems: "center",
    height: RFValue(62),
    borderRadius: RFValue(10),
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
    // marginBottom: RFValue(30),
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
});
