import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { FTCustombutton, FTIconwithtitleandinfo } from "../components";
import { TouchableOpacity } from "react-native-gesture-handler";
import { COLORS, icons } from "../constants";
import { navigation } from "../utils";

const { Debitcardicon } = icons;
const WalletfundingScreen = ({ route }) => {
  const action = route?.params?.action;

  return (
    <View style={{ marginTop: 100 }}>
      <Text>WalletfundingScreen</Text>

      <FTIconwithtitleandinfo
        title="Debit card, Bank or USSD"
        info="Secured by Paystack."
        Icon={Debitcardicon}
        onPress={action}
        bG={COLORS.Tblue3}
      />
    </View>
  );
};

export default WalletfundingScreen;

const styles = StyleSheet.create({});
