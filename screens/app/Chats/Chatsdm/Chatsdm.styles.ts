import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize } from "../../../../constants";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
  
    chatHeader: {
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 17,
        paddingBottom: 12,
        paddingHorizontal: 22,
      },
      headerDetailsContainer: { 
          flexDirection: "row", 
          marginLeft: 20, 
          alignItems: "center" 
    },
    chatName:{
        ...fontsize.bsmall,
        ...FONTS.medium,
        color: COLORS.grey7,
        lineHeight: 21,
      },
      chatStatusContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 3,
      },
      chatStatusDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: COLORS.blue6,
        marginRight: 6,
      }, 
      chatStatusText: {
        color: COLORS.blue6,
        ...fontsize.small,
        ...FONTS.regular,
      },
      messageAreaContainer: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingHorizontal: 15
    },
})