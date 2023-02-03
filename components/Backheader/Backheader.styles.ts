import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize } from "../../constants";

export const styles = StyleSheet.create({
  container: {
    paddingVertical: 18,
    // paddingHorizontal: 15,
    paddingRight: 15,
    // backgroundColor: COLORS.white,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  backArrowContainer: {
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "red",
    borderRadius: 15
  },
  backArrowIcon: {
    // marginRight: 10.5,
    // backgroundColor: "red",
    // padding: 8,
    // paddingRight: 15
  },
  backArrowText: {
    ...fontsize.smallest,
    ...FONTS.medium,
    color: COLORS.blue9
  },
});
