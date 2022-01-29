import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize } from "../../../../constants";

export const styles = StyleSheet.create({
  activeStyles: {
    backgroundColor: COLORS.blue6,
    color: COLORS.white,
    paddingTop: 15,
    paddingBottom: 18,
    paddingLeft: 26,
    paddingRight: 29,
    borderRadius: 14,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingTop: 20,
    paddingHorizontal: 15,
  },
  backArrow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 37,
  },
  backArrowText: {
    ...fontsize.bbsmall,
    ...FONTS.regular,
    marginLeft: 21,
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
  },
  btnContainer: {
    height: 110,
    backgroundColor: COLORS.white,
    paddingHorizontal: 25,
    paddingVertical: 24,
  },
  btnBg: {
    flex: 1,
    backgroundColor: COLORS.blue6,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    ...fontsize.smallest,
    ...FONTS.bold,
    color: COLORS.white,
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
