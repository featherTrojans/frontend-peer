import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize } from "../../constants";

export const styles = StyleSheet.create({
  btnSection: {
    height: 110,
    backgroundColor: COLORS.white,
    paddingHorizontal: 25,
    paddingVertical: 24,
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
