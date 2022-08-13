import { StyleSheet } from "react-native";
import { COLORS, fontsize, FONTS, SIZES } from "../../../constants";
import { Shadow } from "../../../constants/theme";



export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 15,
  },
  settingText: {
    ...FONTS.bold,
    ...fontsize.bmedium,
    // marginTop: 30,
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
    ...fontsize.xmedium,
    ...FONTS.bold,
    textTransform: 'capitalize',
    marginBottom: 6
  },
  profileUsername: {
    ...fontsize.small,
    ...FONTS.regular,
    color: COLORS.grey8,
    textTransform: "lowercase",
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
    paddingLeft: 8,
    paddingRight: 20,
    paddingVertical: 5,
    marginBottom: 20,
    
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
