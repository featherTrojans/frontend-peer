import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { navigation } from "../utils";
import FTIconwithtitleandinfo from "./FTIconwithtitleandinfo";
import { FTHorizontaline } from ".";
import { COLORS, FONTS, fontsize, icons } from "../constants";

const { Walletblueicon, Bankblueicon } = icons;
const FTTransfer = () => {
  const onsubmitToFeatherWallet = async (amount) => {
    navigation.navigate("choosefeatheruser_screen", { amount });
  };
  const onsubmitToBankAccount = async (amount) => {
    navigation.navigate("choosebank_screen", { amount });
  };

  return (
    <View>
      <View style={styles.transferTypeModalHeader}>
        <Text style={styles.transferCashText}>Transfer Cash</Text>

        <View style={{ alignItems: "flex-end" }}>
          <Text style={styles.primaryWalletText}>Primary Wallet Balance</Text>

          <Text style={styles.primaryWalletBalanceText}>N332,500.50</Text>
        </View>
      </View>

      <View style={{ marginTop: 40 }}>
        <FTIconwithtitleandinfo
          title="To Feather Wallet"
          info="Send cash to other feather users."
          Icon={Walletblueicon}
          onPress={() =>
            navigation.navigate("amounttosend_screen", {
              nextScreen: "choosefeatheruser_screen",
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
              nextScreen: "choosefeatheruser_screen",
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
