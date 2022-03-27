import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize } from "../../constants";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  imageBorder: {
    width: 55,
    height: 55,
    borderColor: COLORS.black,
    borderWidth: 1,
    borderRadius: 30,
    padding: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  profileName: {
    ...fontsize.bsmall,
    ...FONTS.medium,
    color: COLORS.black,
    marginBottom: 3,
  },
  distanceDuration: {
    ...fontsize.small,
    ...FONTS.regular,
  },
});
