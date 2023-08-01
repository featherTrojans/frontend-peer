import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize } from "../../../constants";


export const NotificationScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,

    },
    listContainer: {
        flex: 1,
        backgroundColor: COLORS.white3,
        paddingHorizontal: 15
    },
    notificationContainer: {
        flex: 1,
        // flexDirection: 'row',
        backgroundColor: COLORS.white,
        borderRadius: 15,
        paddingHorizontal: 15,
        paddingVertical: 17,
        // marginBottom: 10
    },
    iconBg: {
        width: 30,
        height: 30,
        borderRadius: 30/2,
        justifyContent: 'center',
        alignItems: 'center'
    },

    titleandtime: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    dateText: {
        ...fontsize.smallest,
        ...FONTS.medium,
        color: COLORS.blue9,
        marginTop: 22,
        marginBottom: 20,
        textAlign: "center"
    },
    titleText: {
        ...fontsize.smallest,
        ...FONTS.regular,
        color: COLORS.black,
        textTransform: 'capitalize',
        marginLeft: 12.5
        
    },
    timeText: {
        ...fontsize.xsmallest,
        ...FONTS.regular,
        color: COLORS.grey2
    },
    messageText:{
        ...fontsize.smallest,
        ...FONTS.regular,
        color: COLORS.black,
        lineHeight: 24
    },
    horizontalLine: {
        marginVertical: 12,
        backgroundColor: COLORS.lineColor2,
        height: .5
    },
    upgradeNow: {
        flexDirection: 'row', 
        alignItems: 'center'
    },
    upgradeNowText: {
        color: COLORS.blue6,
        marginTop: 10,
        lineHeight: 27,
        ...fontsize.smaller,
        ...FONTS.bold,
        marginRight: 6

    },
    emptyListText:{
        ...fontsize.smaller,
        ...FONTS.regular,
        color: COLORS.black,
        marginTop: 32,
        paddingHorizontal: 50,
        textAlign: "center",
        lineHeight: 20
    }
})