import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize } from "../../../constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: 25,
    
    backgroundColor: COLORS.white3,
  },
  cancelIcon: {
    marginBottom: 36,
  },
  
  otpInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    // marginBottom: 28,
    marginVertical: 40
  },
  otpInput: {
    width: 51,
    height: 66,
    borderRadius: 13,
    borderColor: COLORS.grey6,
    borderWidth: 1,
    backgroundColor: COLORS.white,
    textAlign: "center",
    ...fontsize.bxmedium,
    ...FONTS.regular,
    color: COLORS.black,
  },
  otpInputActive: {
    borderColor: COLORS.blue6,
  },
  resendAndDuration: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  resendText: {
    ...fontsize.smallest,
    ...FONTS.medium,
    color: COLORS.black,
    lineHeight: 20
  },
  duration: {
    ...fontsize.smallest,
    ...FONTS.regular,
    color: COLORS.black,
    lineHeight: 20
  },
  dashedLine: {
    height: 0.5,
    backgroundColor: COLORS.grey2,
    marginBottom: 19,
    marginTop: 24,
  },
  changeNumber: {
    color: COLORS.grey16,
    ...fontsize.smallest,
    ...FONTS.medium,
  },

  btnBg: {
    height: 62,
    backgroundColor: COLORS.blue6,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 80,
  },
  btnText: {
    ...fontsize.smallest,
    ...FONTS.bold,
    color: COLORS.white,
  },




  // The textinput replacing the otp input for now
  cutstomOtpInput: {
    width: "100%",
    height: 62,
    borderColor: COLORS.grey2,
    borderWidth: .5,
    borderRadius: 10,
    padding: 10,
    ...FONTS.light,
    ...fontsize.small,
    paddingLeft: 12.5,
    color: COLORS.black
  }



});
