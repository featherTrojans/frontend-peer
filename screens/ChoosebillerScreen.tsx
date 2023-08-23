import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  ChoosebillerScreenStyles,
  ChoosefeatheruserScreenStyles,
} from "../assets/styles/screens";
import { FTIconwithtitleandinfo, FTTitlepagewrapper } from "../components";
import { redirectTo } from "../utils";
import { COLORS, icons } from "../constants";

const { listHeaderText } = ChoosefeatheruserScreenStyles;

const { Electricityicon } = icons;
const {} = ChoosebillerScreenStyles;

const ChoosebillerScreen = () => {
  const ListHeader = () => {
    return (
      <>
        <FTIconwithtitleandinfo
          bG={COLORS.Tyellow}
          title="Pay a new bill"
          info="Start a new electricity purchase"
          onPress={() => redirectTo("billerstate_screen")}
          Icon={Electricityicon}
          mB={40}
        />

        <Text style={listHeaderText}>Pay recent bills</Text>
      </>
    );
  };

  return (
    <FTTitlepagewrapper title="Choose Biller">
      <FlatList
        data={[1, 1, 1, 1, 1]}
        ListHeaderComponent={ListHeader}
        ItemSeparatorComponent={() => <View style={{ height: 28 }} />}
        renderItem={() => {
          return (
            <FTIconwithtitleandinfo
              bG={COLORS.Tyellow}
              title="Pay a new bill"
              info="Start a new electricity purchase"
              onPress={() => redirectTo("billerstate_screen")}
              Icon={Electricityicon}
            />
          );
        }}
      />
    </FTTitlepagewrapper>
  );
};

export default ChoosebillerScreen;

const styles = StyleSheet.create({});
