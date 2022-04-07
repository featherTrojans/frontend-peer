import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { COLORS, FONTS, fontsize } from "../../constants";

export const styles = StyleSheet.create({
  btnSection: {
    height: RFValue(110),
    backgroundColor: COLORS.white,
    paddingHorizontal: 25,
    paddingVertical: RFValue(24),
  },
  btnBg: {
    flex: 1,
    backgroundColor: COLORS.blue6,
    borderRadius: 10,
    // alignSelf: 'center',

    justifyContent: "center",
    // justifySelf: "center",
    alignItems: "center",
  },
  btnText: {
    ...fontsize.smallest,
    ...FONTS.bold,
    color: COLORS.white,
    textTransform: "uppercase",
  },
});
