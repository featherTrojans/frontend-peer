import { StyleSheet } from "react-native";
import { COLORS, fontsize, FONTS } from "../../../../constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 15,
    marginTop: 10,
  },
  messageInput: {
    borderColor: COLORS.inputBorderColor,
    borderWidth: 1,
    paddingHorizontal: 14,
    height: 54,
    // paddingVertical: 20,
    paddingVertical: 10,
    ...fontsize.small,
    ...FONTS.light,
    borderRadius: 10,
    marginTop: 25,
  },
  disputeText: {
    color: COLORS.blue6,
    ...fontsize.bsmall,
    ...FONTS.medium,
    marginBottom: 30,
  },
  reasonText: {
    ...FONTS.medium,
    ...fontsize.xmedium,
  },
});
