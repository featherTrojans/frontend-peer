import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { COLORS, FONTS, fontsize} from "../../constants";


export const styles = StyleSheet.create({
    inputContainer: {
      height: 53,
      flexDirection: "row",
      alignItems: "center",
      // borderWidth: 0.5,
      paddingHorizontal: 20,
      borderRadius: 5,
      backgroundColor: COLORS.grey1,
      borderColor: "transparent"
    },
    textInput: {
      flex: 1,
      color: COLORS.blue9,
      ...FONTS.light,
      ...fontsize.smallest,
      paddingLeft: 12.5,
    },
    inputiconwrapper: {
      borderRightWidth: .5,
      borderColor: COLORS.grey15,
      paddingRight: 12,
    },
  });
  