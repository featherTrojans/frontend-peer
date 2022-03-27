import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize } from "../../constants";

export const styles = StyleSheet.create({
  container: {
    paddingVertical: 22,
    paddingHorizontal: 15,
    backgroundColor: COLORS.white,
  },
  backArrowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  backArrowIcon: {
    width: 25,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25 / 2,
  },
  backArrowText: {
    ...fontsize.xmedium,
    ...FONTS.bold,
    marginLeft: 16,
  },
});
