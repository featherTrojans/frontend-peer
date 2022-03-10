import { StyleSheet } from "react-native";
import { FONTS, fontsize, COLORS } from "../../constants";

export const styles = StyleSheet.create({
  container: {
    marginBottom: 42,
  },
  inputLabel: {
    marginBottom: 5,
    ...fontsize.small,
    ...FONTS.medium,
  },
  inputBox: {
    borderBottomColor: COLORS.borderColor3,
    borderBottomWidth: 0.5,
    flexDirection: "row",
    alignItems: "center",
  },
  textInput: {
    height: 50,
    flex: 1,
    ...fontsize.small,
    ...FONTS.light,
  },
  showOrHide: {
    ...fontsize.smallest,
    ...FONTS.medium,
    color: COLORS.blue6,
  },
});
