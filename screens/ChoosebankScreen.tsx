import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { ChoosebankScreenStyles } from "../assets/styles/screens";
import {
  FTIconwithtitleandinfo,
  FTSearchinput,
  FTTitlepagewrapper,
} from "../components";
import { icons } from "../constants";
import { bankDatas } from "../assetdatas";
const { Smallphoneicon } = icons;
const {} = ChoosebankScreenStyles;

const ChoosebankScreen = ({ route, navigation }) => {
  const amount = route?.params?.amount;
  const [search, setsearch] = useState("");

  return (
    <FTTitlepagewrapper title="Choose bank">
      <FTSearchinput
        value={search}
        onChange={setsearch}
        placeholder="Search bank"
      />
      <FlatList
        data={bankDatas.filter((bank) => bank.name.includes(search))}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ height: 28 }} />}
        renderItem={({ item }) => {
          const { name, logo, value } = item;
          return (
            <FTIconwithtitleandinfo
              title={name}
              onPress={() =>
                navigation.navigate("bankaccountinformation_screen", {
                  amount,
                  bankvalue: value,
                  bankimage: logo,
                })
              }
              bG={""}
              imageUrl={logo}
            />
          );
        }}
      />
    </FTTitlepagewrapper>
  );
};

export default ChoosebankScreen;

const styles = StyleSheet.create({});
