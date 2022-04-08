import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { COLORS, fontsize, FONTS } from "../../constants";

export const styles = StyleSheet.create({
  container: {
    // elevation: 3,
    // shadowColor: "rgba(0,0,0,.06)",
    // shadowOffset: { width: 0, height: 3 },
    // shadowOpacity: 0.2,
    // shadowRadius: 20,
    paddingHorizontal: RFValue(20),
    paddingVertical: RFValue(18),
    borderRadius: 10,
    backgroundColor: COLORS.blue6,
  },
  //   Top part of the container
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  primaryText: {
    ...fontsize.small,
    ...FONTS.regular,
    color: COLORS.white,
  },
  underLine: {
    // width: RFValue(183),
    flex: 1,
    height: 0.5,
    backgroundColor: COLORS.inputBorderColor,
    marginBottom: RFValue(13.6),
    marginTop: RFValue(13.6),
  },


  
  addCashBg: {
    backgroundColor: COLORS.blue7,
    paddingVertical: RFValue(12),
    paddingLeft: RFValue(18),
    paddingRight: RFValue(11.4),
    borderRadius: RFValue(9),
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
  },
  addCashText: {
    color: COLORS.white,
    ...fontsize.small,
    ...FONTS.medium,
    marginRight: RFValue(17.6),
  },



  //   Bottom part of the container

  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  balanceText: {
    ...fontsize.smaller,
    ...FONTS.regular,
    marginBottom: RFValue(6),
    color: COLORS.yellow2,
  },
  balanceAmount: {
    ...fontsize.bmedium,
    ...FONTS.bold,
    color: COLORS.white,
  },
});
