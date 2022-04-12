import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { COLORS, FONTS, fontsize } from "../../../../constants";



export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 15,
    paddingTop: RFValue(20),
    backgroundColor: COLORS.white,
  },
  backArrow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: RFValue(38),
    // paddingLeft: 25
    paddingHorizontal: 25
  },
  backArrowTextContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backArrowText: {
    ...fontsize.bsmall,
    ...FONTS.medium,
    color: COLORS.black
  },
  notifyingTextContainer: {
    paddingHorizontal: RFValue(65),
    marginTop: RFValue(10),
    marginBottom: RFValue(40),
  },
  notifyingText: {
    lineHeight: 25,
    ...fontsize.bsmall,
    ...FONTS.regular,
    textAlign:"center"
  },
  notifyingSubText: {
    ...FONTS.bold,
  },
  tablesContainer: {
    flex: 1,
    paddingHorizontal: RFValue(37),
  },
  tableContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tableTitle: {
    ...fontsize.small,
    ...FONTS.regular,
    color: COLORS.black,
  },
  tableValue: {
    ...fontsize.small,
    ...FONTS.bold,
    color: COLORS.black,
  },
  bottomLine: {
    height: 0.5,
    backgroundColor: COLORS.lineColor2,
    marginVertical: RFValue(18),
  },


  btnBg: {
    backgroundColor: COLORS.blue6,
    paddingTop: RFValue(22),
    paddingBottom: RFValue(24),
    borderRadius: RFValue(10),
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    ...fontsize.smallest,
    color: COLORS.white,
    ...FONTS.bold,
  },
  commissions:{
    paddingHorizontal: RFValue(65),
    marginTop: RFValue(30),
    marginBottom: RFValue(30),
},
commissionsText:{
      textAlign:"center",
      lineHeight: 25,
      ...fontsize.small,
      ...FONTS.regular,
      fontStyle:"italic",
      color: COLORS.grey5
  }
});
