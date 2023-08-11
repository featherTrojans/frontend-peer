import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize, icons, SIZES } from "../../../constants";

export const PhoneVerificationScreenStyles = StyleSheet.create({
  center: {
    textAlign: "center",
    marginBottom: 40,
    marginTop: 50,
  },
  bottomtext: {
    ...FONTS.regular,
    lineHeight: 21,
  },
  margin: {
    marginTop: 30,
    marginBottom: 60,
  },
  flex: {
    flexDirection: "row",
  },
  flexspace: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 25,
    lineHeight: 0,
  },
  backlink: {
    color: COLORS.blue1,
    marginLeft: 5,
  },
});
