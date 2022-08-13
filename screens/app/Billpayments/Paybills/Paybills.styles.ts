import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize } from "../../../../constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white3,
  },
  mainContainer: {
    flex: 1,
    // backgroundColor: COLORS.white,
    marginTop: 16,
    marginHorizontal: 15,
  },
  eachContainer: {
    paddingLeft: 23,
    paddingRight: 30,
    paddingTop: 34,
    paddingBottom: 32,
    marginBottom: 15,
    borderRadius: 8,
    backgroundColor: COLORS.white
  },
  topRow: {
    marginBottom: 40,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headers: {
    ...fontsize.small,
    ...FONTS.medium,
    lineHeight: 22,
  },
  headerInfo: {
    // flex: 0.5,
    width: "80%",
    ...fontsize.smallest,
    ...FONTS.regular,
    lineHeight: 21,
    color: COLORS.grey2,
  },
});
