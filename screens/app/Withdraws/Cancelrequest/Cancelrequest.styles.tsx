import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize } from "../../../../constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  headerContainer: {
    marginRight: 45,
  },
  headerText: {
    marginBottom: 30,
    ...fontsize.bsmall,
    ...FONTS.medium,
    color: COLORS.blue6
  },
  subheaderText: {
    marginBottom: 45,
    ...fontsize.xmedium,
    ...FONTS.medium,
    fontSize: 21,
  },

  //   List of reasons
  reasonContainer: {
    marginBottom: 37,
  },
  checkboxText: {
    ...fontsize.bsmall,
    ...FONTS.medium,
    color: COLORS.black,
    textDecorationLine: "none",
  },
  cancelBtnContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  cancelBg: {
    backgroundColor: COLORS.blue6,
    paddingTop: 22,
    paddingBottom: 24,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  cancelText: {
    textTransform: "uppercase",
    color: COLORS.white,
    ...fontsize.smallest,
    ...FONTS.bold,
  },
});
