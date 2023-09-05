import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize } from "../../../constants";

export const ProfileScreenStyles = StyleSheet.create({
  profileHeaderWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30
  },
  profileHeaderText: {
    ...fontsize.bbsmall,
    ...FONTS.bold,
    color: COLORS.blue9,
  },
  signoutText: {
    ...fontsize.smallest,
    ...FONTS.semibold,
    color: COLORS.red5,
  },
  profileDetailsWrap: {
    alignSelf: "center",
    marginVertical: 25,
  },
  profileOuterBorder: {
    height: 154,
    width: 154,
    borderWidth: 3,
    borderRadius: 154 / 2,
    borderColor: "#F4F4FF",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  profileInnerBorder: {
    height: 124,
    width: 124,
    borderWidth: 3,
    borderRadius: 124 / 2,
    borderColor: "#DFDDFF",
    alignItems: "center",
    justifyContent: "center",
  },
  userProfileBg: {
    height: 96,
    width: 96,
    borderRadius: 96 / 2,
    backgroundColor: COLORS.blue16,
  },
  userEditiconBg: {
    height: 34,
    width: 34,
    borderRadius: 34 / 2,
    backgroundColor: COLORS.blue9,
    position: "absolute",
    bottom: 0,
    right: 0,
    borderWidth: 4,
    borderColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center"
  },
  profileNameWrap: {
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  profileNameText: {
    ...fontsize.bsmall,
    ...FONTS.bold,
    color: COLORS.blue9,
  },
  profileUsername: {
    ...fontsize.smallest,
    ...FONTS.medium,
    marginTop: 5,
    textTransform: "lowercase"
  },
  upgradeBg: {
    backgroundColor: COLORS.orange2,
    paddingVertical: 12,
    borderRadius: 21,
  },
  upgradeOdogwuText: {
    ...fontsize.smallest,
    ...FONTS.semibold,
    color: COLORS.orange,
    textAlign: "center",
  },
});
