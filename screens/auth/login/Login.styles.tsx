import { StyleSheet } from "react-native";
import styled from "styled-components/native";
import { COLORS, SIZES, FONTS, fontsize,  } from "../../../constants";





export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    backgroundColor: COLORS.blue6,
  },
  logoWrapper: {
    width: SIZES.width - 50,
    marginVertical: 140,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputContainer: {
    height: 62,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.5,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderColor: COLORS.inputBorderColor,
    backgroundColor: COLORS.blue6,
  },
  textInput: {
    flex: 1,
    borderColor: COLORS.white,
    color: COLORS.white,
    ...FONTS.light,
    ...fontsize.small,
    paddingLeft: 12.5,
  },
  inputiconwrapper: {
    borderRightWidth: 1,
    borderColor: COLORS.white,
    paddingRight: 12,
  },
  biometrics: {
    ...fontsize.smaller,
    ...FONTS.regular,
    color: COLORS.white,
  },
  forgetPassword: {
    ...fontsize.smaller,
    ...FONTS.bold,
    color: COLORS.white,
  },
  loginbtn: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    height: 62,
    marginBottom: 38,
  },
  loginbtnText: {
    ...fontsize.small,
    ...FONTS.bold,
    color: COLORS.blue6,
  },
  haveanaccount: {
    marginBottom: 81,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: 'row'
  },
  haveaccounttext: {
    color: COLORS.white,
    ...fontsize.small,
    ...FONTS.regular,
  },
  registerText: { 
    color: COLORS.yellow1, 
    ...FONTS.bold 
  }
});

