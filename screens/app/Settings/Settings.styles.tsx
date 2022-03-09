import { StyleSheet } from "react-native";
import { COLORS, fontsize, FONTS, SIZES } from "../../../constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 15,
  },
  settingText: {
    ...FONTS.bold,
    ...fontsize.bmedium,
    marginTop: 30,
  },
  profileContainer: {
    alignItems: "center",
    marginHorizontal: 25,
    marginTop: 33,
  },
  avatarBg: {
    height: 92,
    width: 92,
    borderRadius: 92 / 2,
    backgroundColor: COLORS.lightBlue,
    justifyContent: "center",
    alignItems: "center",
  },
  profileName: {
    ...fontsize.bmedium,
    ...FONTS.bold,
    marginBottom: 7,
    marginTop: 24,
  },
  profileUsername: {
    ...fontsize.bsmall,
    ...FONTS.regular,
  },
  profileExtraContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 24,
    alignItems: "center",
  },
  alignedContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    ...fontsize.small,
    ...FONTS.bold,
    marginLeft: 6.5,
  },
  levelText: {
    ...FONTS.medium,
    ...fontsize.smallest,
    color: COLORS.grey2,
    textTransform: "uppercase",
    marginLeft: 13,
  },
  upgradeText: {
    ...FONTS.bold,
    ...fontsize.smaller,
    color: COLORS.blue6,
    marginLeft: 8,
  },

  //Icon with title text

  iconWithTitleContainer: {
    justifyContent: "space-between",
    marginLeft: 8,
    marginRight: 22,
    marginBottom: 25,
  },
  iconBg: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
    borderRadius: 50 / 2,
  },
  iconTitle: {
    ...fontsize.small,
    ...FONTS.medium,
    color: COLORS.blue3,
  },
  horizontalLine: {
    height: 0.5,
    backgroundColor: COLORS.borderColor3,
    marginTop: 4,
    marginBottom: 38,
  },
});
