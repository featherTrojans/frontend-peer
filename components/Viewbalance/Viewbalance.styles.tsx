import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { COLORS, fontsize, FONTS } from "../../constants";

export const viewbalancestyles = StyleSheet.create({
  container: {
 
    paddingHorizontal: 20,
    paddingVertical: RFValue(20),
    borderRadius: 10,
    backgroundColor: COLORS.white,
    marginTop: 20,
    marginBottom: 15
  },
  //   Top part of the container
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  primaryText: {
    ...fontsize.xsmallest,
    ...FONTS.regular,
    color: COLORS.grey16,
    marginLeft: 8.6
  },
  underLine: {
    height: 0.5,
    backgroundColor: COLORS.inputBorderColor,
    marginBottom: RFValue(13.6),
    marginTop: RFValue(13.6),
  },

  addCashBg: {
    backgroundColor: COLORS.blue10,
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    paddingVertical: 12,
    paddingLeft: 16,
    paddingRight: 12,
    borderRadius: RFValue(22),
  },
  addCashText: {
    color: COLORS.white,
    ...fontsize.smallest,
    ...FONTS.medium,
  },

  //   Bottom part of the container

  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  balanceText: {
    ...fontsize.xsmallest,
    ...FONTS.medium,
    color: COLORS.blue9,
    marginRight: 16
  },
  balanceAmount: {
    ...fontsize.bmedium,
    ...FONTS.bold,
    color: COLORS.blue9,
  },
});
