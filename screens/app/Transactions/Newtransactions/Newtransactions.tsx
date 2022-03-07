import { StyleSheet, Text, View, ScrollView, StatusBar } from "react-native";
import React from "react";
import { styles } from "./Newtransactions.styles";
import { Backheader, Iconwithdatas } from "../../../../components";
import { icons } from "../../../../constants";


const { Withdrawicon, Depositicon, Eyecrossed, TransferIcon, Newtransfericon,Fundwalleticon, Paybillicon } = icons;



const Newtransactions = ({navigation}: any) => {
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
            iconBg="#E0EDD8"
            title="Withdraw"
            details="Get cash from feather users near you."
            onpress={() => navigation.navigate("Withdraw")}
          />
          <Iconwithdatas
            icon={<Depositicon />}
            iconBg="#D2EAFD"
            title="Deposit"
            details="Supply cash and earn cashback!"
            onpress={() => navigation.navigate("Deposit")}
          />
          <Iconwithdatas
            icon={<Newtransfericon />}
            iconBg="#FCF3D1"
            title="Transfer"
            details="Send cash to feather wallets and bank accounts."
            onpress={() => navigation.navigate("Transfercash")}
          />
          <Iconwithdatas
            icon={<Fundwalleticon />}
            iconBg="#DEE0E5"
            title="Fund Wallet"
            details="Add Cash to your wallets easily"
            onpress={() => console.log("Redirect to Fund Transfer")}
          />
          <Iconwithdatas
            icon={<Paybillicon />}
            iconBg="#E3CCFF"
            title="Paybills"
            details="Purchase airtime & data, PayTV Subscriptions…"
            onpress={() => console.log("Redirect to Paybills")}
          />
        </ScrollView>

        {/* List of options */}
      </View>
    </View>
  );
};

export default Newtransactions;
