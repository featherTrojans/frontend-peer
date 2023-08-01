import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize } from "../../../constants";



export const TransactionScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white3,
      },
      contentContainer: {
        flex: 1,
        paddingHorizontal: 15,
      },
    
      listContainer: {
        flex: 1,
      },
      optionsContainer: {
        backgroundColor: COLORS.white,
        marginVertical: 15,
        borderRadius: 16,
        paddingHorizontal: 18,
        paddingTop: 18,
        paddingBottom: 26,
      },
      leftheaderWrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
      },
      leftHeader: {
        flexDirection: "row",
        alignItems: "center",
      },
      walletActions: {
        marginLeft: 12,
        ...fontsize.xsmallest,
        ...FONTS.medium,
        color: COLORS.grey16,
      },
      balance: {
        ...fontsize.xsmallest,
        ...FONTS.medium,
        color: COLORS.grey16,
      },
      balanceAmount: {
        ...fontsize.smallest,
        color: COLORS.black,
      },
      optionWrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 12,
      },
      optionBlock: {
        justifyContent: "center",
        alignItems: "center",
      },
      eachOption: {
        width: 45.5,
        height: 45.5,
        borderRadius: 45.5 / 2,
        justifyContent: "center",
        alignItems: "center",
      },
      eachOptionTitle: {
        marginTop: 13,
        ...fontsize.xxsmallest,
        ...FONTS.medium,
        color: COLORS.blue9,
      },
      bottomsheetHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
        alignItems: "center",
      },
      historyIconWrap: {
        flexDirection: "row",
        alignItems: "center",
      },
      historyText: {
        marginLeft: 12,
        ...fontsize.xsmallest,
        ...FONTS.medium,
        color: COLORS.grey16,
      },
      viewAll: {
        ...fontsize.xxsmallest,
        ...FONTS.medium,
        color: COLORS.grey16,
      },
      loaderWrapper: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      },
    
      //Transfer type modal
      transferTypeModalHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
      },
      transferCashText: {
        ...fontsize.smaller,
        ...FONTS.semibold,
        color: COLORS.blue9,
      },
      primaryWalletText: {
        ...fontsize.xsmallest,
        ...FONTS.regular,
        color: COLORS.blue9,
      },
      primaryWalletBalanceText: {
        ...fontsize.smaller,
        ...FONTS.bold,
        color: COLORS.blue6,
        marginTop: 9,
      },
})