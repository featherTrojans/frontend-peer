import { StyleSheet, Text, View, Pressable, FlatList } from "react-native";
import React, { useState } from "react";
import {
  ChangeappearanceScreenStyles,
  ProfileScreenStyles,
} from "../assets/styles/screens";
import { FTIconwithtitleandinfo, FTTitlepagewrapper } from "../components";
import { icons } from "../constants";
import { redirectTo } from "../utils";
redirectTo
const { Changememojicheckicon } = icons;

const {  } = ChangeappearanceScreenStyles;



const ChangeappearanceScreen = () => {
 

  return (
    <FTTitlepagewrapper title="Change Appearance">
      <FTIconwithtitleandinfo 
      Icon={Changememojicheckicon}
      title="Choose Memoji"
      onPress={() => redirectTo("choosememoji_screen")}
      bG="blue"
      mB={20}
      />
        <FTIconwithtitleandinfo 
      Icon={Changememojicheckicon}
      title="Choose Photo"
      onPress={() => console.log("herw")}
      bG="blue"
      
      />
      
    </FTTitlepagewrapper>
  );
};

export default ChangeappearanceScreen;

const styles = StyleSheet.create({});
