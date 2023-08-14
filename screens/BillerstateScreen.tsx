import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { BillerstateScreenStyles } from "../assets/styles/screens";
import {
  FTIconwithtitleandinfo,
  FTSearchinput,
  FTTitlepagewrapper,
} from "../components";
import { icons } from "../constants";
import { redirectTo } from "../utils";
import { electricityLogos } from "../assetdatas";

const {} = BillerstateScreenStyles;
const { Bluecardicon } = icons;

const BillerstateScreen = () => {
  return (
    <FTTitlepagewrapper title="Choose Biller State">
      <FTSearchinput placeholder="Search Biller" />

      {electricityLogos.map(({ name, logo }, index) => {
        return (
          <FTIconwithtitleandinfo
            key={index}
            bG="transparent"
            title={name}
            onPress={() => redirectTo("meternumber_screen")}
            imageUrl={logo}
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
