import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { FindmerchantScreenStyles } from "../assets/styles/screens";
import { FTIconwithtitleandinfo, FTSearchinput, FTTitlepagewrapper } from "../components";
import { icons } from "../constants";


const {Searchicon} = icons

const {} = FindmerchantScreenStyles;

const FindmerchantScreen = () => {
  return (
    <FTTitlepagewrapper title="Find Merchant">
      <FTSearchinput placeholder="Search Phone Number" />
      <FTIconwithtitleandinfo 
      Icon = {<Searchicon />}
      bG="blue"
      title= "yes"
      onPress={() => console.log("Pressed")}
      />
    </FTTitlepagewrapper>
  );
};

export default FindmerchantScreen;

const styles = StyleSheet.create({});
