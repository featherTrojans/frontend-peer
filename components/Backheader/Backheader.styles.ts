import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize } from "../../constants";

export const styles = StyleSheet.create({
  container: {
    paddingVertical: 18,
    paddingHorizontal: 15,
    // backgroundColor: COLORS.white,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  backArrowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  backArrowIcon: {
  
    marginRight: 10.5
  },
  backArrowText: {
    ...fontsize.small,
    ...FONTS.medium,
  },
});
