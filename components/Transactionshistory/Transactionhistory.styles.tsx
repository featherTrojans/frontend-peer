import { StyleSheet } from "react-native";
import { COLORS, fontsize, FONTS } from "../../constants";

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingTop: 18,
    paddingBottom: 24,
    borderColor: COLORS.borderColor,
    borderWidth: 0.5,
    borderRadius: 15,
    marginBottom: 10,
  },
  dateContainer: {
    marginBottom: 18,
  },
  dateText: {
    ...fontsize.small,
    color: COLORS.blue7,
    ...FONTS.medium,
  },
  bottomLine: {
    height: 0.5,
    backgroundColor: COLORS.lineColor,
    marginVertical: 13.5,
  },

  //   For the history component
  historyContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  historyDetailsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  arrowBg: {
    width: 39,
    height: 39,
    borderRadius: 39,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  title: {
    ...fontsize.small,
    ...FONTS.medium,
    marginBottom: 3,
  },
  transactionType: {
    ...fontsize.smaller,
    ...FONTS.regular,
    color: COLORS.halfBlack,
  },
  amount: {
    ...fontsize.small,
    ...FONTS.medium,
  },
});
