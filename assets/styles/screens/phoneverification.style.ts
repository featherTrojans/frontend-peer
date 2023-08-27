import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize, icons, SIZES } from "../../../constants";

export const PhoneVerificationScreenStyles = StyleSheet.create({
  enterDigitText: {
    textAlign: "center",
    marginBottom: 40,
    marginTop: 50,
    ...fontsize.smaller,
    ...FONTS.medium,
    lineHeight: 22,
  },
  enterDigitSubText: {
    ...FONTS.semibold,
    color: COLORS.blue6,
  },
  otpInputWrap: {
    width: 49,
    height: 51,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderBottomWidth: 1,
    borderRadius: 10,
  },
  bottomtext: {
    ...FONTS.regular,
    lineHeight: 21,
  },
  buttonWrap: {
    marginTop: 30,
    marginBottom: 60,
  },

  durationWrap: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 25,
    lineHeight: 0,
  },
  changeNumberText: {
    color: COLORS.blue16,
    ...FONTS.bold,
  },
  notReceiveText: {
    ...fontsize.smallest,
    ...FONTS.medium,
  },
});
