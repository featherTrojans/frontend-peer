import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NetworkreceiverScreenStyles } from "../assets/styles/screens";
import {
  FTIconwithtitleandinfo,
  FTSearchinput,
  FTTitlepagewrapper,
} from "../components";
import { redirectTo } from "../utils";
import { COLORS, icons } from "../constants";

const { Sendtoselficon } = icons;

const {} = NetworkreceiverScreenStyles;

const NetworkreceiverScreen = () => {
  return (
    <FTTitlepagewrapper title="Choose Receiver">
      <FTSearchinput placeholder="Search Phone Number" />
      <FTIconwithtitleandinfo
        bG={COLORS.green2}
        title="Send to self"
        info="08133211658"
        onPress={() => redirectTo("airtimeordata_screen")}
        Icon={Sendtoselficon}
      />


      
    </FTTitlepagewrapper>
  );
};

export default NetworkreceiverScreen;

const styles = StyleSheet.create({});
