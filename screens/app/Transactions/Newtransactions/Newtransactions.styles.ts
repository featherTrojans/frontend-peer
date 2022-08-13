import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize } from "../../../../constants";



export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white3,
    },
    subHeader: {
        ...fontsize.bsmall,
        ...FONTS.medium
    }
})
