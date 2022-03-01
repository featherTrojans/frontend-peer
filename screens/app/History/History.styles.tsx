import { StyleSheet } from "react-native";
import { COLORS, fontsize } from "../../../constants";


export const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text:{
        ...fontsize.bmsmall
    }
})