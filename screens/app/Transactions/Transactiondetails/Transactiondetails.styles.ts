import { StyleSheet } from "react-native";
import { COLORS, fontsize, FONTS } from "../../../../constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  detailsContainer: {
    paddingHorizontal: 26,
    paddingTop: 20,
    marginTop: 25,
  },

  eachDetailContainer: {
    //   height: 50,
    justifyContent: "space-between",
    paddingBottom: 12,
    borderColor: COLORS.lineColor2,
    marginBottom: 10,
    borderBottomWidth: 0.5,
  },
  eachDetailTitle: {
    marginBottom: 12,
    ...fontsize.small,
    ...FONTS.bold,
  },
  eachDetailValue: {
    ...fontsize.small,
    ...FONTS.regular,
    textTransform: "capitalize",
  },
  copyClipboardContainer: {
    marginLeft: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  copyClipboardText: {
    ...fontsize.xsmallest,
    ...FONTS.medium,
    color: COLORS.grey2,
    marginLeft: 5,
  },
});
