import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { COLORS, FONTS, fontsize, SIZES } from "../../constants";


const btnSize = (SIZES.width-50)/6

export const styles = StyleSheet.create({
  numberBtn: {
    width: RFValue(60),
    height: RFValue(60),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    marginHorizontal: RFValue(20),
    marginVertical: RFValue(10),
    // backgroundColor: "red"
  },
  numberBtnText: {
    ...fontsize.bmedium,
    ...FONTS.medium,
    color: COLORS.grey2,
  },
});
