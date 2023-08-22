import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ChoosenetworkScreenStyles } from "../assets/styles/screens";
import {
  FTIconwithtitleandinfo,
  FTSearchinput,
  FTTitlepagewrapper,
} from "../components";
import { icons } from "../constants";
import { navigation, redirectTo } from "../utils";
import { networkLogos } from "../assetdatas";
const {} = ChoosenetworkScreenStyles;
const { Bluecardicon } = icons;

const ChoosenetworkScreen = () => {
  return (
    <FTTitlepagewrapper title="Choose Network">
      <FTSearchinput placeholder="Search network" />

      {networkLogos.map(({ name, logo, network }, index) => {
        return (
          <FTIconwithtitleandinfo
            key={index}
            bG="transparent"
            title={name}
            onPress={() =>
              navigation.navigate("networkreceiver_screen", { network })
            }
            imageUrl={logo}
            mB={28}
            size={35}
          />
        );
      })}
    </FTTitlepagewrapper>
  );
};

export default ChoosenetworkScreen;

const styles = StyleSheet.create({});
