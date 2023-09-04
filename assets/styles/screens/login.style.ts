import { StyleSheet } from "react-native";
import { COLORS, FONTS, SIZES, fontsize } from "../../../constants";

export const LoginScreenStyles = StyleSheet.create({
  center: {
    textAlign: "center",
    marginBottom: 40,
    marginTop: 50,
    ...fontsize.small,
    ...FONTS.semibold,
  },
  bottomtext: {
    marginTop: 35,
    textAlign: "center",
    ...FONTS.regular,
    ...fontsize.smallest,
    lineHeight: 21,
  },
  loginInputWrap: {
    height: 53,
    borderColor: COLORS.grey15,
    borderWidth: 0.5,
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: 15,
    // marginBottom: 20
  },
  logoAndInitialWrap: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoStyle: {
    width: 20,
    height: 20,
    backgroundColor: COLORS.Tblue,
    borderRadius: 20 / 2,
  },
  initialStyle: {
    ...fontsize.xsmallest,
    ...FONTS.semibold,
    marginLeft: 8,
  },
  lineSeparator: {
    width: 0.5,
    height: 18,
    backgroundColor: COLORS.blue9,
    marginLeft: 15,
  },
  textInputStyles: {
    height: "100%",
    flex: 1,
    paddingHorizontal: 15,
    ...fontsize.smallest,
    ...FONTS.regular,
    color: COLORS.blue9,
  },
  errorMessageText: {
    color: COLORS.pink1,
    ...fontsize.xxsmallest,
    fontStyle: "italic",
  },
});
