import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize } from "../../../../../constants";

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
});
