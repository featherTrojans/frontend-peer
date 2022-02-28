import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize } from "../../constants";


export const styles = StyleSheet.create({
  numberBtn: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: COLORS.grey1,
    borderRadius: 30,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  numberBtnText: {
    ...fontsize.bmedium,
    ...FONTS.medium,
    color: COLORS.grey2,
  },
});
