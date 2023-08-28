import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize } from "../../../constants";

export const SetupmfaScreenStyles = StyleSheet.create({ 
    pickQuestionText:{
        ...fontsize.smallest,
        ...FONTS.bold,
        color: COLORS.blue9,
        marginBottom: 40
    },
    questionText:{

        paddingVertical: 15, marginBottom: 2 ,
        ...fontsize.small,
        ...FONTS.regular
    }
})