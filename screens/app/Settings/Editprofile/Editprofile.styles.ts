import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize } from "../../../../constants";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
    // paddingHorizontal: 15
  },
  mainHeaderContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    marginVertical: 25,
    paddingHorizontal: 7,
    alignItems: "center",
  },
  mainHeaderText: {
    ...fontsize.small,
    ...FONTS.regular,
    color: COLORS.grey8,
  },
  subHeaderContainer: {
    flexDirection: "row",
    // paddingVertical: 25,
  },
  name: {
    color: "#0034CB",
    marginLeft: 10,
  },
  subheadersText: {
    ...fontsize.smallest,
    ...FONTS.regular,
    color: COLORS.black,
    textAlign: "center",
  },
  subheaderActive: {
    color: COLORS.blue6,
  },
  avatarFullname: {
    ...fontsize.medium,
    ...FONTS.bold,
    color: COLORS.blue9,
    textTransform: "capitalize",
  },
  avatarProfileWrap: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarUsername: {
    ...fontsize.small,
    ...FONTS.regular,
    color: COLORS.blue9,
    textTransform: "lowercase"
  },
  avatarBg: {
    backgroundColor: COLORS.transparentBlue,
    height: 62,
    width: 62,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 62 / 2,
  },
  avatarText: {
    ...fontsize.smallest,
    ...FONTS.regular,
    color: COLORS.grey5,
    marginTop: 10,
  },
  upgradeBtnWrap: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  upgradeBtnBg: {
    paddingHorizontal: 12,
    backgroundColor: COLORS.blue3,
    paddingVertical: 8,
    borderRadius: 18,
  },
  upgradeBtnText: {
    ...fontsize.smallest,
    ...FONTS.medium,
    color: COLORS.white,
  },

  editInputContainer: {
    paddingHorizontal: 15,
  },
  headerRightwrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerRightmemojibg: {
    marginLeft: 10.5,
    // backgroundColor: COLORS.green2,
    borderRadius: 18,
    paddingHorizontal: 11,
    paddingVertical: 6,
  },
  headerRightUsertype: {
    color: COLORS.white,
    ...fontsize.smallest,
    ...FONTS.regular,
    textTransform: "capitalize",
  },

  becomeandagentwrap: {
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  becomeanagenttext: {
    ...fontsize.small,
    ...FONTS.medium,
    color: COLORS.black,
  },
  becomeagentredbg: {
    marginLeft: 10,
    backgroundColor: COLORS.red3,
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 18,
  },
  becomeagentnewtext: {
    ...fontsize.smallest,
    ...FONTS.bold,
    color: COLORS.white,
  },

  //Document settings

  documentContainer: {
    marginTop: 26,
    marginHorizontal: 22,
    paddingHorizontal: 18,
    paddingTop: 22,
    paddingBottom: 24,
    borderRightColor: COLORS.white,
    borderRadius: 10,
    borderColor: COLORS.lineColor,
    borderWidth: 1,
  },
  identityText: {
    marginBottom: 22,
    ...fontsize.small,
    ...FONTS.medium,
  },
  identitySubText: {
    ...fontsize.smaller,
    ...FONTS.regular,
    color: COLORS.grey2,
  },
  namecont: {
    flexDirection: "row",
    marginLeft: 5,
    alignItems: "center",
    alignSelf: "center",
    // marginBottom: 20
  },
  uploadIdBtn: {
    backgroundColor: COLORS.black,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 15,
    paddingBottom: 18,
    marginTop: 22,
  },
  uploadIdText: {
    color: COLORS.white3,
    ...fontsize.small,
    ...FONTS.medium,
  },
});
