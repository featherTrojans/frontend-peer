import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize } from "../../../../constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  headerSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 22,
    alignItems: "center",
    backgroundColor: COLORS.white,
  },
  searchText: {
    ...fontsize.bsmall,
    ...FONTS.medium,
    marginLeft: 15,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 15,
  },
  typeBtn: {
    paddingVertical: 17,
    paddingHorizontal: 40,
    borderRadius: 14,
  },
  typeBtnText: {
    ...fontsize.small,
    ...FONTS.regular,
    color: COLORS.grey2,
  },
  activeTypeBtn: {
    backgroundColor: COLORS.blue6,
  },
  activeTypeBtnText: {
    color: COLORS.white,
  },
  textInput: {
    height: 56,
    borderColor: COLORS.borderColor2,
    borderWidth: 0.5,
    borderRadius: 10,
    paddingLeft: 20,
    paddingRight: 10,
    ...fontsize.smaller,
    ...FONTS.regular,
  },
  listHeader: {
    ...fontsize.small,
    ...FONTS.medium,
    color: COLORS.grey2,
    marginBottom: 30,
  },

  // User Search component

  userSearchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 21,
  },
  userSearchData: {
    flexDirection: "row",
    alignItems: "center",
  },
  userSearchImage: {
    width: 56,
    height: 56,
    backgroundColor: COLORS.grey3,
    borderRadius: 30,
  },
  userSearchName: {
    ...fontsize.bsmall,
    ...FONTS.medium,
    color: `rgba(0,0,0, .8)`,
    textTransform:"capitalize"
  },
  userSearchUsername: {
    ...fontsize.small,
    ...FONTS.medium,
    color: `rgba(112, 112,112, .8)`,
  },
});
