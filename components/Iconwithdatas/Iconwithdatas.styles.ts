import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize } from "../../constants";
import { Shadow } from "../../constants/theme";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "white",
    alignItems: "center"
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 39,
    height: 39,
    borderRadius: 20,
  },
  dataContainer: {
    flex: 1,
    marginLeft: 16,
  },

  titleText: {
    ...fontsize.smallest,
    ...FONTS.medium,
    color: COLORS.black,
    marginBottom: 6
  },
  detailsText: {
    ...fontsize.xsmallest,
    ...FONTS.regular,
    color: COLORS.grey2,
  },
});
