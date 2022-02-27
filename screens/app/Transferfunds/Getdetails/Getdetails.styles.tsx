import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize } from "../../../../constants";


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  backArrow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 37,
  },
  backArrowText: {
    ...fontsize.bbsmall,
    marginLeft: 21,
  },
  mainTextContainer: {
    marginLeft: 7,
    width: 295,
    marginBottom: 28,
  },
  mainText: {
    ...fontsize.bsmall,
  },
  btnBg: {
    paddingTop: 22,
    paddingBottom: 24,
    backgroundColor: COLORS.blue6,
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    width:"100%"
  },
  btnText: {
    color: COLORS.white,
    textTransform: "uppercase",
    ...fontsize.smallest,
    ...FONTS.bold,
  },
});
