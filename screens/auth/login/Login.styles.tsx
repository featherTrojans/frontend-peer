import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { COLORS, SIZES, FONTS, fontsize,  } from "../../../constants";





export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
  },
  logoWrapper: {
    width: SIZES.width - 50,
    marginVertical: 140,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    height: 53,
    flexDirection: "row",
    alignItems: "center",
    // borderWidth: 0.5,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderColor: "transparent",
    backgroundColor: COLORS.grey1,
  },
  textInput: {
    flex: 1,
    // borderColor: COLORS.white,
    color: COLORS.blue9,
    ...FONTS.light,
    ...fontsize.smallest,
    paddingLeft: 12.5,
  },
  inputiconwrapper: {
    borderRightWidth: .5,
    borderColor: COLORS.grey15,
    paddingRight: 12,
  },
  biometrics: {
    ...fontsize.smallest,
    ...FONTS.regular,
    color: COLORS.blue9,
  },
  forgetPassword: {
    ...fontsize.smallest,
    ...FONTS.medium,
    color: COLORS.blue9,
  },
  loginbtn: {
    backgroundColor: COLORS.blue6,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    // height: 62,
    paddingVertical: 20,
    marginBottom: 38,
  },
  loginbtnText: {
    ...fontsize.smallest,
    ...FONTS.medium,
    color: COLORS.white,
  },
  haveanaccount: {
    marginTop: 32,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: 'row'
  },
  haveaccounttext: {
    color: COLORS.blue9,
    ...fontsize.smallest,
    ...FONTS.regular,
  },
  registerText: { 
    ...fontsize.smallest,
    ...FONTS.bold 
  }
});