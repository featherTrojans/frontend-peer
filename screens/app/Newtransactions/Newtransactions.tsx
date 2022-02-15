import { StyleSheet, Text, View, ScrollView, StatusBar } from "react-native";
import React from "react";
import { styles } from "./Newtransactions.styles";
import { Backheader, Iconwithdatas } from "../../../components";
import { icons } from "../../../constants";

const { Withdrawicon, Depositicon } = icons;

const Newtransactions = () => {
  return (
    <View style={styles.container}>
      <StatusBar />
      <Backheader title="New Transactions" />
      <View style={{ flex: 1, paddingHorizontal: 15 }}>
        <ScrollView style={{ flex: 1 }}>
          {/* Header title */}
          <View style={{ marginBottom: 30 }}>
            <Text style={styles.subHeader}>Perform a transaction</Text>
          </View>

          <Iconwithdatas
            icon={<Withdrawicon />}
            title="Withdraw"
            details="Get cash from feather users near you."
          />
          <Iconwithdatas
            icon={<Depositicon />}
            title="Deposit"
            details="Supply cash and earn cashback!"
          />
          <Iconwithdatas
            icon={<Withdrawicon />}
            title="Transfer"
            details="Send cash to feather wallets and bank accounts."
          />
          <Iconwithdatas
            icon={<Withdrawicon />}
            title="Fund Wallet"
            details="Add Cash to your wallets easily"
          />
          <Iconwithdatas
            icon={<Withdrawicon />}
            title="Paybills"
            details="Purchase airtime & data, PayTV Subscriptions…"
          />
        </ScrollView>

        {/* List of options */}
      </View>
    </View>
  );
};

export default Newtransactions;
