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
      chatTextContainer:{
        position: "relative",
      },
      inputarea:{
        paddingHorizontal: 20,
      },
      chatTextInput:{
          padding: 10, 
          backgroundColor:"#fff", 
          borderRadius: 10, 
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,
          elevation: 3,
          flexDirection:"row",
          alignItems: "center",
          marginBottom: 20
      },
      textinput:{
        flex: 1,
        paddingHorizontal: 10 
      },
      chatToMe:{
        flexDirection: "row-reverse",
        marginBottom: 15,
        alignItems: "flex-end",
      },
      chatToMeColor:{
        padding: 20,
        backgroundColor: "#003AD6",
        borderBottomRightRadius: 0,
        marginBottom: 10,
        borderRadius: 20,
      },
      chatToMeTime:{
        color: COLORS.black2,
        ...fontsize.smallest,
        ...FONTS.regular
      },
      chatNotMe:{
        flexDirection: "row",
        marginBottom: 15
      },
      chatNotMeColor:{
        padding: 20,
        backgroundColor: "#F7F8FA",
        marginBottom: 10,
        borderRadius: 20,
        borderBottomLeftRadius: 0,
      }, 

      chatTextStyle: {
        ...fontsize.smallest, 
        ...FONTS.regular, 
        lineHeight: 21
      }
})