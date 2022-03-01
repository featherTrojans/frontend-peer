import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize } from "../../../../constants";

export const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: COLORS.white,
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    saferulesContainer:{
        flex: 1,
        marginTop: 40, 
        marginHorizontal: 40
    },
    saferuleText:{
        marginBottom: 30, 
        ...fontsize.bsmall, 
        ...FONTS.regular
    }
})
