import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { BillerstateScreenStyles } from "../assets/styles/screens";
import {
  FTIconwithtitleandinfo,
  FTIconwithtitleandinfoCustom,
  FTSearchinput,
  FTTitlepagewrapper,
} from "../components";
import { icons } from "../constants";
import { electricityLogos } from "../assetdatas";
import joselectric from "../assets/images/jos_electric_logo.png";
import { FlatList } from "react-native-gesture-handler";

const {} = BillerstateScreenStyles;
const { Bluecardicon, Electricityicon } = icons;

const BillerstateScreen = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const onsubmitToMeterScreen = (amount) => {
    navigation.navigate("meternumber_screen", { amount });
  };

  return (
    <FTTitlepagewrapper title="Choose Biller State">
      <FTSearchinput
        value={search}
        onChange={setSearch}
        placeholder="Search Biller"
      />

      <FlatList
        data={electricityLogos}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        renderItem={({ item }) => {
          const { name, logo, service } = item;
          return (
            <FTIconwithtitleandinfoCustom
              bG="transparent"
              title={name}
              onPress={() =>
                navigation.navigate("amounttosend_screen", {
                  onsubmit: onsubmitToMeterScreen,
                })
              }
              imageUrl={logo}
              mB={28}
              size={35}
            />
          );
        }}
      />
    </FTTitlepagewrapper>
  );
};

export default BillerstateScreen;

const styles = StyleSheet.create({});
