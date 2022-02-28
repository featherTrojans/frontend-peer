import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize } from "../../../../constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: COLORS.white,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 22,
  },
  headerText: {
    ...fontsize.bsmall,
    ...FONTS.medium,
    marginLeft: 15,
  },
  textInputContainer: {
    borderColor: COLORS.borderColor3,
    borderWidth: 0.5,
    height: 56,
    borderRadius: 10,
    // flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 14,
    paddingRight: 20,
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 13,
    ...fontsize.smaller,
    ...FONTS.medium,
  },
});
