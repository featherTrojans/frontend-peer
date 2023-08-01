import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize } from "../../../constants";



export const FTInputStyles = StyleSheet.create({
    inputContainer: {
        height: 53,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        borderRadius: 5,        
        borderColor: "transparent"
      },
      textInput: {
        flex: 1,
        color: COLORS.blue9,
        ...FONTS.light,
        ...fontsize.smallest,
        paddingLeft: 12.5,
        textTransform: "capitalize"
      },
      inputiconwrapper: {
        borderRightWidth: .5,
        borderColor: COLORS.grey15,
        paddingRight: 12,
      },
})