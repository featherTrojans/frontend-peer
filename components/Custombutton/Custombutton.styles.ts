import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize } from "../../constants";

export const custombtnstyles = StyleSheet.create({
  btnstyle: {
    paddingVertical: 20,
    borderRadius: 5,
  },
  btntextstyle: {
    ...fontsize.smallest,
    ...FONTS.regular,
    textAlign: "center",
    color: COLORS.white,
    textTransform: "capitalize",
  },
});
