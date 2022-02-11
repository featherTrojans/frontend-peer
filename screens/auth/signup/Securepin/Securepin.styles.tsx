import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize, SIZES } from "../../../../constants";

export const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width: SIZES.width,
    height: SIZES.height,
    backgroundColor: COLORS.white,
    paddingHorizontal: 25,
    paddingTop: 25,
    // paddingBottom:40,
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
  pinContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 80,
  },
  pinInputContainer: {
    width: 252,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  pinInput: {
    width: 50,
    borderColor: COLORS.blue7,
    borderWidth: 1,
    borderRadius: 13,
    ...fontsize.big,
    paddingHorizontal: 15,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  proceedBtn: {
    backgroundColor: COLORS.blue6,
    justifyContent: "center",
    alignItems: "center",
    height: 62,
    borderRadius: 10,
  },
  proceedText: {
    color: COLORS.white,
    ...fontsize.smallest,
    ...FONTS.bold,
  },
  numberBtnContainer: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: 30,
  },
  numberBtn: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: COLORS.grey1,
    borderRadius: 50,
    marginHorizontal: 20,
    marginVertical: 10,
  },
});
