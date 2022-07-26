import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React from "react";
import Customstatusbar from "../../../shared/Customstatusbar";
import { COLORS } from "../../../../constants";
import { Backheader } from "../../../../components";

const Walletmanagement = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <Customstatusbar />

      <View style={{paddingHorizontal: 15}}>
        {/* <Backheader title="Wallet Management" /> */}
        <Text>Wallet management</Text>
      </View>
    </SafeAreaView>
  );
};

export default Walletmanagement;
