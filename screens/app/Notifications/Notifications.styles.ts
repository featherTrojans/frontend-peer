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
        backgroundColor: COLORS.white3,
        paddingHorizontal: RFValue(15)
    },
    notificationContainer: {
        flex: 1,
        // flexDirection: 'row',
        backgroundColor: COLORS.white,
        borderRadius: RFValue(15),
        paddingHorizontal: RFValue(15),
        paddingVertical: RFValue(17),
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
    date: {
        ...fontsize.smallest,
        ...FONTS.medium,
        color: COLORS.blue9,
        marginTop: 22,
        marginBottom: 20,
        textAlign: "center"
    },
    title: {
        ...fontsize.smallest,
        ...FONTS.regular,
        color: COLORS.black,
        textTransform: 'capitalize',
        marginLeft: 12.5
        
    },
    time: {
        ...fontsize.xsmallest,
        ...FONTS.regular,
        color: COLORS.grey2
    },
    message:{
        ...fontsize.smallest,
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
        ...fontsize.smaller,
        ...FONTS.regular,
        color: COLORS.black,
        marginTop: 32,
        paddingHorizontal: 50,
        textAlign: "center",
        lineHeight: 20
    }
})