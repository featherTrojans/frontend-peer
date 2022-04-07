import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { COLORS, fontsize, FONTS } from "../../constants";
import { Shadow } from "../../constants/theme";
export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: RFValue(15),
    paddingTop: RFValue(18),
    paddingBottom: RFValue(24),
    // borderColor: COLORS.borderColor,
    // borderWidth: 0.5,
    borderRadius: RFValue(15),
    marginBottom:RFValue(10),
    ...Shadow
  },
  dateContainer: {
    marginBottom: RFValue(18),
  },
  dateText: {
    ...fontsize.small,
    color: COLORS.blue7,
    ...FONTS.medium,
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
    width: RFValue(39),
    height: RFValue(39),
    borderRadius: RFValue(39),
    justifyContent: "center",
    alignItems: "center",
    marginRight: RFValue(14),
  },
  title: {
    ...fontsize.small,
    ...FONTS.medium,
    marginBottom: RFValue(3),
    textTransform:  'capitalize'
  },
  transactionType: {
    ...fontsize.smaller,
    ...FONTS.regular,
    color: COLORS.halfBlack,
  },
  amount: {
    ...fontsize.small,
    ...FONTS.medium,
  },
});
