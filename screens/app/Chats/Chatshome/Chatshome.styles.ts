import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize } from "../../../../constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    // backgroundColor: "white",
    // paddingTop: 22,
  },
  topHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',
    marginHorizontal: 9,
    paddingVertical: 22,
    backgroundColor: COLORS.white,
  },
  chatTextContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  chatText: {
    ...fontsize.bmedium,
    ...FONTS.bold,
    color: COLORS.black,
  },
  amountOfChatsContainer: {
    marginLeft: 17,
    backgroundColor: COLORS.blue6,
    minHeight: 22,
    minWidth: 27,
    paddingTop: 5, 
    paddingBottom:  4,
    paddingHorizontal: 6,
    width: "auto",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,

  },
  amountOfChats: {
    color: COLORS.white,
    ...fontsize.smaller,
    ...FONTS.medium,
  },


  seeMoreContainer: {
    width: "auto",
    alignSelf: "flex-start",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 0,
  },
  seeMoreBg: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.blue6,
    marginBottom: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  seeMoreDots: {
    width: 6,
    height: 6,
    backgroundColor: COLORS.white,
    marginRight: 5,
    borderRadius: 3,
  },
  seeMoreText: {
    ...fontsize.small,
    ...FONTS.medium,
  },

  //  For Each Profile
  eachprofileContainer: {
    width: "auto",
    alignSelf: "flex-start",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 31,
  },

  nameAndUsername: {
    marginTop: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  eachProfileName: {
    ...fontsize.smallest,
    ...FONTS.medium,
    opacity: 0.8,
    marginBottom: 7,
    textTransform:"capitalize",
    color: COLORS.blue9
  },
  eachProfileUsername: {
    ...fontsize.xsmallest,
    ...FONTS.regular,
    color: COLORS.grey16,
    opacity: 0.8
  },




  //   For the chat screen

  chatContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  chatStatusDot: {
    width: 16,
    height: 16,
    backgroundColor: COLORS.blue6,
    borderRadius: 8,
    borderWidth: 3,
    borderColor: COLORS.white,
    position: "absolute",
    right: 0,
    bottom: 0,
  },
  chatInfo: {
    flex: 1,
    marginLeft: 15,
  },
  chatNameAndTime: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  chatName: {
    ...fontsize.smaller,
    ...FONTS.regular,
    color: COLORS.grey7,
    textTransform: "capitalize"
  },
  chatTime: {
    ...fontsize.xsmallest,
    ...FONTS.regular,
    color: COLORS.blue9,
    marginLeft: 10
  },
  chatHintMessage: {
    ...fontsize.xsmallest,
    ...FONTS.regular,
    color: COLORS.grey2,
  },
});
