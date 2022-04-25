import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize } from "../../../../constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: "white",
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
    height: 22,
    width: "auto",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 11,
    paddingHorizontal: 6,
  },
  amountOfChats: {
    color: COLORS.white,
    ...fontsize.smaller,
    ...FONTS.medium,
  },

  secondSubHeader: {
    ...fontsize.bsmall,
    ...fontsize.medium,
    color: COLORS.black,
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
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.grey1,
    marginBottom: 14,
  },
  nameAndUsername: {
    justifyContent: "center",
    alignItems: "center",
  },
  eachProfileName: {
    ...fontsize.small,
    ...FONTS.medium,
  },
  eachProfileUsername: {
    ...fontsize.smallest,
    ...FONTS.medium,
    color: COLORS.grey2,
  },

  //   For the chat screen
  chatHeader: {
    marginBottom: 22,
    marginLeft: 9,
  },
  chatHeaderText: {
    ...fontsize.bsmall,
    ...FONTS.medium,
    color: COLORS.blue6
  },
  chatContainer: {
    flexDirection: "row",
    marginHorizontal: 9,
    alignItems: "center",
    marginBottom: 37,
  },
  chatAvatar: {
    width: 56,
    height: 56,
    backgroundColor: COLORS.grey1,
    borderRadius: 30,
    position: "relative",
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
    ...fontsize.bbsmall,
    ...FONTS.medium,
    color: COLORS.grey7,
  },
  chatTime: {
    ...fontsize.small,
    ...FONTS.regular,
    color: COLORS.grey2,
  },
  chatHintMessage: {
    ...fontsize.small,
    ...FONTS.regular,
    color: COLORS.grey2,
  },
});
