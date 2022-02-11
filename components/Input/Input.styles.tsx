import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize} from "../../constants";


export const styles = StyleSheet.create({
    inputContainer: {
      height: 62,
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 0.5,
      paddingHorizontal: 20,
      borderRadius: 10,
      backgroundColor: COLORS.white,
    },
    textInput: {
      flex: 1,
      borderColor: COLORS.white,
      color: COLORS.black,
      ...FONTS.light,
      ...fontsize.small,
      paddingLeft: 12.5,
    },
    inputiconwrapper: {
      borderRightWidth: 1,
      borderColor: COLORS.black,
      paddingRight: 12,
    },
  });
  