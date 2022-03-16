import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize } from "../../constants";



export const styles = StyleSheet.create({
    container: {
        paddingVertical: 22,
        paddingHorizontal: 15,
        backgroundColor: COLORS.white
    },
    backArrow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backArrowText: {
        ...fontsize.xmedium,
        ...FONTS.bold,
        marginLeft: 16
    }
})
