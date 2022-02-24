import { StyleSheet } from "react-native";
import { COLORS } from "../../constants";


export const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoBg: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: COLORS.blue6,
        justifyContent: "center",
        alignItems: "center",
      }

})