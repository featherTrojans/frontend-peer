import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize } from "../../../../constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white
  },
  mainHeaderContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    marginVertical: 20,
    alignItems: 'center',
    paddingHorizontal: 7,
    
    // backgroundColor: 'red'
  },
  mainHeaderText: {
    ...fontsize.small,
    ...FONTS.regular,
    color: COLORS.grey8,
  },
});
