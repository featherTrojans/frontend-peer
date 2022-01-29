import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize } from "../../constants";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginRight: 10,
    paddingTop: 21,
    paddingBottom: 24,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 13,
    alignSelf: "center",
    paddingHorizontal: 22,
  },
  titleText: {
    marginLeft: 11,
    ...fontsize.bmsmall,
    ...FONTS.regular,
    color: COLORS.white,
  }
});
