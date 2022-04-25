import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { COLORS, FONTS, fontsize, SIZES } from "../../../../constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // width: SIZES.width,
    // height: SIZES.height,
    backgroundColor: COLORS.white,
    // paddingHorizontal: 25,
    // paddingTop: 25,
  },
  header: {
    ...fontsize.big,
    ...FONTS.bold,
    color: COLORS.black,
  },
  topDots: {
    width: 8,
    height: 8,
    backgroundColor: COLORS.grey1,
    borderRadius: 16,
  },
  activeDot: {
    width: 19,
    height: 8,
    backgroundColor: COLORS.blue6,
    borderRadius: 4,
  },
  subText: {
    color: COLORS.grey5,
    ...fontsize.medium,
    ...FONTS.regular,
  },
  proceedBtn: {
    backgroundColor: COLORS.blue6,
    justifyContent: "center",
    alignItems: "center",
    height: RFValue(62),
    borderRadius: RFValue(10),
  },
  proceedText: {
    color: COLORS.white,
    ...fontsize.smallest,
    ...FONTS.bold,
  },
  bottomContainer: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: RFValue(20),
    // backgroundColor: 'red'
  },
  bottomTextContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: RFValue(28),
  },
  bottomText: {
    ...fontsize.small,
    ...FONTS.regular,
    color: COLORS.black,
    alignItems: "center",
    justifyContent: "center",
  },
});
