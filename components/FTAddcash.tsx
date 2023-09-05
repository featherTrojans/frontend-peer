import { StyleSheet, Text, View } from "react-native";
import React from "react";

import axiosCustom from "../httpRequests/axiosCustom";
import FTIconwithtitleandinfo from "./FTIconwithtitleandinfo";
import { FTHorizontaline } from ".";
import { COLORS, FONTS, fontsize, icons } from "../constants";
import { useNavigation } from "@react-navigation/native";
const { Debitcardicon } = icons;


const FTAddcash = () => {
  const navigation = useNavigation();
  const onsubmit = (amount) => {
    const action = async () => {
      const response = await axiosCustom.post("/pay", { amount: amount });
      navigation.navigate("customweb_screen", {
        url: response.data.data.authorization_url,
        reference: response.data.data.reference,
        amount: amount,
      });
    };
    navigation.navigate("walletfunding_screen", action);
  };
  return (
    <View>
      <Text style={styles.transferCashText}>Add Cash</Text>

      <View style={{ marginTop: 40 }}>
        <FTIconwithtitleandinfo
          title="Debit card, Bank or USSD"
          info="Secured by Paystack."
          Icon={Debitcardicon}
          onPress={() =>
            navigation.navigate("amounttosend_screen", {
              nextScreen: "choosefeatheruser_screen",
              onsubmit,
            })
          }
          bG={COLORS.Tblue3}
        />

        <FTHorizontaline marginV={15} />
        <FTIconwithtitleandinfo
          title="Feather Agents"
          info="Coming Soon!"
          Icon={Debitcardicon}
          onPress={() => console.log("Feather agents")}
          bG={COLORS.Tblue3}
        />

        <FTHorizontaline marginV={15} />
        <FTIconwithtitleandinfo
          title="Request from family & friends"
          info="Coming Soon!"
          Icon={Debitcardicon}
          onPress={() => console.log("Feather agents")}
          bG={COLORS.Tblue3}
        />
      </View>
    </View>
  );
};

export default FTAddcash;

const styles = StyleSheet.create({
  transferCashText: {
    ...fontsize.xsmallest,
    ...FONTS.semibold,
    color: COLORS.blue9,
  },
});
