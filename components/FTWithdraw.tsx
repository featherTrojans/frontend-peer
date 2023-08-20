import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { navigation } from "../utils";
import { Pressable } from "react-native";
import { COLORS, FONTS, fontsize, icons } from "../constants";
import FTIconwithtitleandinfo from "./FTIconwithtitleandinfo";
import { FTHorizontaline } from ".";

const { Withdrawicon, Searchmerchanticon, Paymerchanticon } = icons;

const FTWithdraw = () => {
  const onsubmitfindmerchant = (amount) => {
    navigation.navigate("withdrawcash_screen", amount);
  };

  const onsubmitpaymerchant = (amount) => {
    navigation.navigate("searchmerchantid_screen", { amount });
  };
  return (
    <View>
      <Text style={styles.transferCashText}>Withdraw Options</Text>

      <View style={{ marginTop: 40 }}>
        <FTIconwithtitleandinfo
          title="Pay Known Merchant"
          info="Withdraw from feather verified merchants"
          Icon={Paymerchanticon}
          onPress={() =>
            navigation.navigate("amounttosend_screen", {
              nextScreen: "choosefeatheruser_screen",
              onsubmit: onsubmitpaymerchant,
            })
          }
          bG={COLORS.Tyellow}
        />

        <FTHorizontaline marginV={15} />
        <FTIconwithtitleandinfo
          title="Find Merchants"
          info="Find merchants around you to withdraw."
          Icon={Searchmerchanticon}
          onPress={() =>
            navigation.navigate("amounttosend_screen", {
              nextScreen: "choosefeatheruser_screen",
              onsubmit: onsubmitfindmerchant,
            })
          }
          bG={COLORS.Tpurple}
        />
      </View>
    </View>
  );
};

export default FTWithdraw;

const styles = StyleSheet.create({
  transferCashText: {
    ...fontsize.xsmallest,
    ...FONTS.semibold,
    color: COLORS.blue9,
  },
});
