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
    alignItems: 'center'
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
  name:{
    color: "#0034CB",
    marginLeft: 10
  },
  subheadersText: {
    ...fontsize.smallest,
    ...FONTS.regular,
    color: COLORS.black,
    textAlign: 'center'
  },
  subheaderActive: {
    color: COLORS.blue6,
  },
  avatarContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 36,
  },
  avatarBg: {
    backgroundColor: COLORS.transparentBlue,
    height: 92,
    width: 92,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 92 / 2,
    marginBottom: 23,
  },
  avatarText: {
    ...fontsize.smaller,
    ...FONTS.regular,
    color: COLORS.grey5,
  },
  editInputContainer: {
    marginTop: 55,
    paddingHorizontal: 22,
  },

  // Editinput box
  labelText: {
    ...fontsize.small,
    ...FONTS.medium,
    marginBottom: 5,
    textTransform: "capitalize",
  },
  textInput: {
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.borderColor3,
    paddingVertical: 12,
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
  namecont:{
    flexDirection: "row",
    marginLeft: 5,
    alignItems:"center",
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
