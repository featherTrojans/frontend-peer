import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { COLORS, FONTS, fontsize, SIZES } from "../../../../constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: COLORS.white,

  },
 
  topDots: {
    width: 5,
    height: 5,
    backgroundColor: COLORS.grey1,
    borderRadius: 16,
  },
  activeDot: {
    width: 12,
    height: 5,
    backgroundColor: COLORS.blue6,
    borderRadius: 4,
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


});
