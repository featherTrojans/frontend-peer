import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize } from "../../../constants";


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingTop: 22,
        // paddingHorizontal: 15
    },
    listContainer: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingHorizontal: 15
    },
    notificationContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: COLORS.white,
        borderRadius: 15,
        paddingHorizontal: 15,
        paddingVertical: 17,
        // marginBottom: 10
    },
    senderIcon: {
        width: 39,
        height: 39,
        borderRadius: 39,
        backgroundColor: COLORS.green2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    infoContainer: {
        marginLeft: 15.5
    },
    titleandtime: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    date: {
        ...fontsize.small,
        ...FONTS.medium,
        color: COLORS.blue7
    },
    title: {
        ...fontsize.small,
        ...FONTS.medium,
        color: COLORS.black
    },
    time: {
        ...fontsize.smaller,
        ...FONTS.regular,
        color: COLORS.grey2
    },
    message:{
        ...fontsize.small,
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

    }
})