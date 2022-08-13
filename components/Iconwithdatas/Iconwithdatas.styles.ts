import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize } from "../../constants";
import { Shadow } from "../../constants/theme";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    // paddingTop: 19,
    // paddingBottom: 22,
    // paddingHorizontal: 17,
    marginBottom: 10,
    backgroundColor: "white"
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
  topSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  titleText: {
    ...fontsize.smallest,
    ...FONTS.medium,
    color: COLORS.black
  },
  detailsText: {
    ...fontsize.xsmallest,
    ...FONTS.regular,
    color: COLORS.grey2,
  },
});
