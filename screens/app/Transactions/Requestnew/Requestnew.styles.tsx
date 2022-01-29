import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize } from "../../../../constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  backArrow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 37,
  },
  backArrowText: {
    marginLeft: 20,
    ...fontsize.bbsmall,
    ...FONTS.regular,
  },
  btnSection: {
    height: 92,
    paddingHorizontal: 25,
    paddingBottom: 20,
    paddingTop: 10,
  },
  btnBg: {
    backgroundColor: COLORS.blue6,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    borderRadius: 10,
  },
  btnText: {
    color: COLORS.white,
    ...fontsize.smallest,
    ...FONTS.bold,
  },
});
