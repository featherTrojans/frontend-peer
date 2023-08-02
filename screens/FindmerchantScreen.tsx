import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { FindmerchantScreenStyles } from "../assets/styles/screens";
import { FTSearchinput, FTTitlepagewrapper } from "../components";

const {} = FindmerchantScreenStyles;

const FindmerchantScreen = () => {
  return (
    <FTTitlepagewrapper title="Find Merchant">
      <FTSearchinput placeholder="Search Phone Number" />
    </FTTitlepagewrapper>
  );
};

export default FindmerchantScreen;

const styles = StyleSheet.create({});
