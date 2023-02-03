import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { COLORS, fontsize, FONTS } from "../../constants";
import { Shadow } from "../../constants/theme";
export const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: RFValue(15),
    // paddingTop: RFValue(18),
    // paddingBottom: RFValue(24),
    // borderColor: COLORS.borderColor,
    // borderWidth: 0.5,
    borderRadius: RFValue(15),
    marginBottom:RFValue(35),
    // ...Shadow
  },

  dateText: {
    ...fontsize.xsmallest,
    color: COLORS.blue9,
    ...FONTS.medium,
    lineHeight: 27,
    marginBottom: RFValue(18),

  },
  bottomLine: {
    height: 0.5,
    backgroundColor: COLORS.lineColor,
    marginVertical: RFValue(13.5),
  },

  //   For the history component
  historyContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  historyDetailsContainer: {
    flexDirection: "row",
    alignItems: "center",

  },
  arrowBg: {
    width: 31,
    height: 31,
    borderRadius: 31/2,
    justifyContent: "center",
    alignItems: "center",
    marginRight: RFValue(14),
  },
  title: {
    ...fontsize.xsmallest,
    ...FONTS.medium,
    marginBottom: RFValue(3),
    textTransform:  'capitalize'
  },
  transactionType: {
    ...fontsize.xxsmall,
    lineHeight: 27,
    ...FONTS.regular,
    color: COLORS.halfBlack,
    alignItems: "center"
  },
  amount: {
    ...fontsize.xsmallest,
    ...FONTS.medium,
    lineHeight: 27
  },
});
