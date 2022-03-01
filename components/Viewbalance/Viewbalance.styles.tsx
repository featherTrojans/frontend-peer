import { StyleSheet } from "react-native";
import { COLORS, fontsize, FONTS } from "../../constants";

export const styles = StyleSheet.create({
  container: {
    elevation: 3,
    shadowColor: "rgba(0,0,0,.06)",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderRadius: 10,
    backgroundColor: COLORS.blue6,
  },
  //   Top part of the container
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  primaryText: {
    ...fontsize.small,
    ...FONTS.regular,
    color: COLORS.white,
  },
  underLine: {
    width: 183,
    height: 0.5,
    backgroundColor: COLORS.inputBorderColor,
    marginBottom: 13.6,
    marginTop: 13.6,
  },


  
  addCashBg: {
    backgroundColor: COLORS.blue7,
    paddingVertical: 12,
    paddingLeft: 18,
    paddingRight: 11.4,
    borderRadius: 9,
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
  },
  addCashText: {
    color: COLORS.white,
    ...fontsize.small,
    ...FONTS.medium,
    marginRight: 17.6,
  },



  //   Bottom part of the container

  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  balanceText: {
    ...fontsize.smaller,
    ...FONTS.regular,
    marginBottom: 6,
    color: COLORS.yellow2,
  },
  balanceAmount: {
    ...fontsize.bmedium,
    ...FONTS.bold,
    color: COLORS.white,
  },
});
