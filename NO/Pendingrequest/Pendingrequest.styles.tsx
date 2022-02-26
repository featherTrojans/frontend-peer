import { StyleSheet } from "react-native";
import { COLORS, fontsize, FONTS } from "../../constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  backArrow: {
    marginBottom: 38,
  },
  detailsContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  detailsPrice: {
    ...fontsize.bxmedium,
    ...FONTS.bold,
  },
  withdrawalChargeBg: {
    backgroundColor: COLORS.lightBlue,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  withdrawalChargeText: {
    ...fontsize.smaller,
  },
  withdrawalChargeSubText: {
    ...FONTS.bold,
  },
  actionsHeaderText: {
    ...fontsize.bsmall,
    ...FONTS.medium,
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 21,
    paddingVertical: 22,
    borderRadius: 15,
    alignItems: "center",
    marginBottom: 10,
  },
  actionData: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionText: {
    marginLeft: 24,
    ...fontsize.bmsmall,
    ...FONTS.regular,
    color: COLORS.black,
  },
});
