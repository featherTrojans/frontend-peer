import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { navigation } from "../utils";
import FTIconwithtitleandinfo from "./FTIconwithtitleandinfo";
import { FTHorizontaline } from ".";
import { COLORS, FONTS, fontsize, icons } from "../constants";
import amountFormatter from "../utils/formatMoney";
import { AuthContext } from "../context/AuthContext";
import { useAlert } from "../hooks";

const { Walletblueicon, Bankblueicon } = icons;
const FTTransfer = () => {
  const { authdata } = useContext(AuthContext);
  const { errorAlert } = useAlert();
  const onsubmitToFeatherWallet = async (amount) => {
    if (amount > authdata?.userDetails?.walletBal) {
      return errorAlert(null, "amount is greater than wallet");
    }
    navigation.navigate("choosefeatheruser_screen", { amount });
  };
  const onsubmitToBankAccount = async (amount) => {
    if (amount > authdata?.userDetails?.walletBal) {
      return errorAlert(null, "amount is greater than wallet");
    }
    navigation.navigate("choosebank_screen", { amount });
  };

  return (
    <View>
      <View style={styles.transferTypeModalHeader}>
        <Text style={styles.transferCashText}>Transfer Cash</Text>

        <View style={{ alignItems: "flex-end" }}>
          <Text style={styles.primaryWalletText}>Primary Wallet Balance</Text>

          <Text style={styles.primaryWalletBalanceText}>
            {" "}
            N{amountFormatter(authdata?.userDetails?.walletBal)}
          </Text>
        </View>
      </View>

      <View style={{ marginTop: 40 }}>
        <FTIconwithtitleandinfo
          title="To Feather Wallet"
          info="Send cash to other feather users."
          Icon={Walletblueicon}
          onPress={() =>
            navigation.navigate("amounttosend_screen", {
              onsubmit: onsubmitToFeatherWallet,
            })
          }
          bG={COLORS.Tblue}
        />

        <FTHorizontaline marginV={15} />
        <FTIconwithtitleandinfo
          title="To Bank Account"
          info="Transfer money to any bank in Nigeria."
          Icon={Bankblueicon}
          onPress={() =>
            navigation.navigate("amounttosend_screen", {
              onsubmit: onsubmitToBankAccount,
            })
          }
          bG={COLORS.Tyellow}
        />
      </View>
    </View>
  );
};

export default FTTransfer;

const styles = StyleSheet.create({
  transferTypeModalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  transferCashText: {
    ...fontsize.xsmallest,
    ...FONTS.semibold,
    color: COLORS.blue9,
  },
  primaryWalletText: {
    ...fontsize.xxsmallest,
    ...FONTS.regular,
    color: COLORS.blue9,
  },
  primaryWalletBalanceText: {
    ...fontsize.smallest,
    ...FONTS.bold,
    color: COLORS.blue6,
    marginTop: 9,
  },
});
