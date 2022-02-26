import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize, SIZES } from "../../../../constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingTop: 22,
    // paddingHorizontal: 15,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  headerText: {
    ...fontsize.xmedium,
    ...FONTS.bold,
  },
  listContainer: {
    flex: 1,
    marginTop: 23,
  },
  listHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  leftsideHeader: {
    ...fontsize.bsmall,
    ...FONTS.medium,
  },
  rightsideHeader: {
    ...fontsize.small,
    ...FONTS.bold,
  },
  emptyListContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 52,
  },
  textContainer: {
    marginHorizontal: 50,
  },
  emptyContainerText: {
    color: COLORS.black,
    textAlign: "center",
    ...fontsize.bsmall,
    ...FONTS.regular,
  },
  emptyContainerSubText: {
    color: COLORS.blue6,
    ...FONTS.bold,
  },
});
