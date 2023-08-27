import { StyleSheet, Text, View, Pressable, FlatList } from "react-native";
import React, { useState } from "react";
import {
  ChangeappearanceScreenStyles,
  ProfileScreenStyles,
} from "../assets/styles/screens";
import { FTIconwithtitleandinfo, FTTitlepagewrapper } from "../components";
import { COLORS, icons } from "../constants";
import { redirectTo } from "../utils";
redirectTo
const { Changememojicheckicon, Choosememojiicon } = icons;

const {  } = ChangeappearanceScreenStyles;



const ChangeappearanceScreen = () => {
 

  return (
    <FTTitlepagewrapper title="Change Appearance">
      <FTIconwithtitleandinfo 
      Icon={Choosememojiicon}
      title="Choose Memoji"
      onPress={() => redirectTo("choosememoji_screen")}
      bG={COLORS.Tyellow3}
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
