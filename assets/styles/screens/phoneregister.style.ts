import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize, icons, SIZES } from "../../../constants";

export const PhoneRegisterScreenStyles = StyleSheet.create({
  center: {
    textAlign: "center",
    marginBottom: 40,
    marginTop: 50,
  },
  bottomtext: {
    marginTop: 35,
    textAlign: "center",
    ...FONTS.regular,
    lineHeight: 21,
  },
});
