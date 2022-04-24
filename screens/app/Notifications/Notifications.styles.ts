import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { COLORS, FONTS, fontsize } from "../../../constants";


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        // paddingTop: 22,
        // paddingHorizontal: 15
    },
    listContainer: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingHorizontal: RFValue(15)
    },
    notificationContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: COLORS.white,
        borderRadius: RFValue(15),
        paddingHorizontal: RFValue(15),
        paddingVertical: RFValue(17),
        // marginBottom: 10
    },
    creditIcon: {
        width: RFValue(39),
        height: RFValue(39),
        borderRadius: RFValue(39),
        backgroundColor: COLORS.green2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    debitIcon: {
        width: RFValue(39),
        height: RFValue(39),
        borderRadius: RFValue(39),
        backgroundColor: COLORS.pink1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    infoContainer: {
        marginLeft: RFValue(15.5)
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
        color: COLORS.black,
        textTransform: 'capitalize'
        
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
        marginVertical: RFValue(12),
        backgroundColor: COLORS.lineColor2,
        height: .5
    },
    upgradeNow: {
        flexDirection: 'row', 
        alignItems: 'center'
    },
    upgradeNowText: {
        color: COLORS.blue6,
        marginTop: RFValue(10),
        lineHeight: 27,
        ...fontsize.smaller,
        ...FONTS.bold,
        marginRight: RFValue(6)

    },
    emptyListText:{
        ...fontsize.small,
        ...FONTS.regular,
        color: COLORS.black
    }
})