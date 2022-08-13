import { StyleSheet } from "react-native";
import { FONTS, fontsize } from "../../constants";

export const styles = StyleSheet.create({
    initialText: {
        ...fontsize.smallest, 
        ...FONTS.medium
    }
})