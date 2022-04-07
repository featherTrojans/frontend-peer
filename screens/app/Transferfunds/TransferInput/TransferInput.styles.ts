import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { COLORS, FONTS, fontsize, SIZES } from "../../../../constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  numberBtn: {
    width: RFValue(60),
    height: RFValue(60),
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: COLORS.grey1,
    borderRadius:  RFValue(30),
    marginHorizontal: RFValue(20),
    marginVertical: RFValue(10),
  },
  numberBtnText: {
    ...fontsize.bmedium,
    ...FONTS.medium,
    color: COLORS.grey2,
  },
  numberBtnContainer: {

    // I commented out this flex property befoe
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    // marginBottom: 30,
  },
  btnBg: {
    paddingTop: RFValue(22),
    paddingBottom: RFValue(24),
    backgroundColor: COLORS.blue6,
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    width: "100%",
  },
  btnText: {
    color: COLORS.white,
    textTransform: "uppercase",
    ...fontsize.smallest,
    ...FONTS.bold,
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
    ...fontsize.big,
    ...FONTS.medium,
  },
});
