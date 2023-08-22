import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { ChoosecablereceiverScreenStyles } from "../assets/styles/screens";
import {
  FTIconwithtitleandinfo,
  FTSearchinput,
  FTTitlepagewrapper,
} from "../components";
import { redirectTo } from "../utils";
import { icons } from "../constants";

const { Bluecardicon } = icons;

const {} = ChoosecablereceiverScreenStyles;
const ChoosecablereceiverScreen = () => {
  const cableTypes = [
    {
      name: "DSTV",
    },
    {
      name: "GOTV",
    },
    {
      name: "Startimes",
    },
  ];

  return (
    <FTTitlepagewrapper title="Choose Cable Type">
      <FTSearchinput placeholder="Search Biller" />

      <FlatList
        data={cableTypes}
        ItemSeparatorComponent={() => <View style={{ height: 28 }} />}
        renderItem={({ item }) => {
          const { name } = item;
          return (
            <FTIconwithtitleandinfo
              bG="red"
              title={name}
              onPress={() => redirectTo("choosecableamount_screen")}
              Icon={Bluecardicon}
            />
          );
        }}
      />
    </FTTitlepagewrapper>
  );
};

export default ChoosecablereceiverScreen;

const styles = StyleSheet.create({});
