import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { COLORS, fontsize, FONTS } from "../../constants";

export const viewbalancestyles = StyleSheet.create({
  container: {
 
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
    ...fontsize.xsmallest,
    ...FONTS.regular,
    color: COLORS.white,
  },
  underLine: {
    height: 0.5,
    backgroundColor: COLORS.inputBorderColor,
    marginBottom: RFValue(13.6),
    marginTop: RFValue(13.6),
  },

  addCashBg: {
    backgroundColor: COLORS.blue7,
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    paddingVertical: RFValue(14),
    paddingLeft: RFValue(16),
    paddingRight: RFValue(12),
    borderRadius: RFValue(22),
  },
  addCashText: {
    color: COLORS.white,
    ...fontsize.small,
    ...FONTS.medium,
  },

  //   Bottom part of the container

  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  balanceText: {
    ...fontsize.smaller,
    ...FONTS.medium,
    marginBottom: RFValue(6),
    color: COLORS.yellow2,
  },
  balanceAmount: {
    ...fontsize.bmedium,
    ...FONTS.bold,
    color: COLORS.white,
  },
});
