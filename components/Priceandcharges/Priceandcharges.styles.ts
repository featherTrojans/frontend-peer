
import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize } from "../../constants";


export const styles = StyleSheet.create({
    container:{
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 18
    },
    price:{
        ...fontsize.bxmedium,
        ...FONTS.bold
    },
    charges: {
        ...fontsize.smaller,
        ...FONTS.regular,
        backgroundColor: COLORS.transparentBlue,
        paddingVertical: 11,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginTop: 15
    },
    chargesAmount:{
        ...FONTS.bold
    }
})

