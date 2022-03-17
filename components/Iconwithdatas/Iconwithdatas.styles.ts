import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize } from "../../constants";
import { Shadow } from "../../constants/theme";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingTop: 19,
    paddingBottom: 22,
    paddingHorizontal: 17,
    marginBottom: 10,
    borderRadius: 15,
    ...Shadow
    
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
    ...fontsize.bmsmall,
    ...FONTS.medium,
  },
  detailsText: {
    ...fontsize.xsmallest,
    ...FONTS.regular,
    color: COLORS.grey2,
  },
});
