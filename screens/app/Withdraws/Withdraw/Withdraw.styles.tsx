import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize } from "../../../../constants";

export const styles = StyleSheet.create({
  activeStyles: {
    backgroundColor: COLORS.blue6,
    color: COLORS.white,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    // paddingHorizontal: 15,
  },
  requestContainer: {
    flex: 1,
  },
  listHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 30,
  },
  listHeaderText: {
    ...fontsize.bsmall,
    color: COLORS.grey2,
    borderRadius: 14,
    paddingVertical: 18,
    paddingHorizontal: 26
  },

  emptyListContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  emptyListText: {
    textAlign: "center",
    paddingHorizontal: 50,
    ...fontsize.bsmall,
    ...FONTS.regular,
  },
});
