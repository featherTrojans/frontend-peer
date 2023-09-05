import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  ChoosecableScreenStyles,
  ChoosefeatheruserScreenStyles,
} from "../assets/styles/screens";
import {
  FTIconwithtitleandinfo,
  FTSearchinput,
  FTTitlepagewrapper,
} from "../components";
import { useNavigation } from "@react-navigation/native";
import { COLORS, icons } from "../constants";

const { Cableicon } = icons;
const {} = ChoosecableScreenStyles;
const { listHeaderText } = ChoosefeatheruserScreenStyles;

const ChoosecableScreen = () => {
  const navigation = useNavigation();
  const ListHeader = () => {
    return (
      <>
        <FTIconwithtitleandinfo
          bG={COLORS.Tgreen2}
          title="Send to new account"
          info="Start a new cable tv subscription purchase"
          onPress={() => navigation.navigate("choosecablereceiver_screen")}
          Icon={Cableicon}
          mB={40}
        />
        <Text style={listHeaderText}>Recent Purchases</Text>
      </>
    );
  };

  return (
    <FTTitlepagewrapper title="Choose Cable">
      <FTSearchinput placeholder="Search Biller" />

      <FlatList
        data={[1, 1, 2]}
        renderItem={() => {
          return (
            <FTIconwithtitleandinfo
              bG={COLORS.Tgreen2}
              title="Send to new account"
              info="Start a new cable tv subscription purchase"
              onPress={() => navigation.navigate("choosecablereceiver_screen")}
              Icon={Cableicon}
            />
          );
        }}
        ListHeaderComponent={ListHeader}
        ItemSeparatorComponent={() => <View style={{ height: 28 }} />}
      />
    </FTTitlepagewrapper>
  );
};

export default ChoosecableScreen;

const styles = StyleSheet.create({});
