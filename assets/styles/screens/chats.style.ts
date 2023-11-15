import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize } from "../../../constants";

export const ChatsScreenStyles = StyleSheet.create({
  recentChatText: {
    marginBottom: 40,
    marginTop: 10,
    ...fontsize.smallest,
    ...FONTS.semibold,
  },
  numberOfUnread: {
    ...fontsize.xxsmallest,
    ...FONTS.bold,
    color: COLORS.white,
  },
  numberOfUnreadBg: {
    backgroundColor: COLORS.blue9,
    padding: 5,
    minHeight: 20,
    minWidth: 20,
    borderRadius: 20 / 2,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
  },
  chatLastMessage: {
    ...fontsize.smallest,
    ...FONTS.medium,
    color: COLORS.grey2,
    flex: 1,
    maxWidth: "90%",
  },
  lastMessageTime: {
    ...fontsize.xsmallest,
    ...FONTS.regular,
    color: COLORS.grey16,
  },
  senderNameText: {
    ...fontsize.smaller,
    ...FONTS.semibold,
    color: COLORS.blue9,
    textTransform: "capitalize",
  },
  SAlign: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  chatDetailWrap: {
    flex: 1,
    marginLeft: 18,
    justifyContent: "space-between",
  },
  chatWrap: {
    flexDirection: "row",
    alignItems: "center",
  },
});
