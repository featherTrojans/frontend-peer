import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { BillerstateScreenStyles } from "../assets/styles/screens";
import {
  FTIconwithtitleandinfo,
  FTSearchinput,
  FTTitlepagewrapper,
} from "../components";
import { icons } from "../constants";
import { electricityLogos } from "../assetdatas";

const {} = BillerstateScreenStyles;
const { Bluecardicon, Electricityicon } = icons;

const BillerstateScreen = ({ navigation }) => {
  const [search, setSearch] = useState("");
  return (
    <FTTitlepagewrapper title="Choose Biller State">
      <FTSearchinput
        value={search}
        onChange={setSearch}
        placeholder="Search Biller"
      />

      {electricityLogos.map(({ name, logo, service }, index) => {
        return (
          <FTIconwithtitleandinfo
            key={index}
            bG="transparent"
            title={name}
            onPress={() => navigation.navigate("meternumber_screen")}
            Icon={Electricityicon}
            mB={28}
            size={35}
          />
        );
      })}
    </FTTitlepagewrapper>
  );
};

export default BillerstateScreen;

const styles = StyleSheet.create({});
