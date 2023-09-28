import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { ChoosecablereceiverScreenStyles } from "../assets/styles/screens";
import {
  FTIconwithtitleandinfo,
  FTSearchinput,
  FTTitlepagewrapper,
} from "../components";
// import { redirectTo } from "../utils";
import { useNavigation } from "@react-navigation/native";
import { icons } from "../constants";

const { Bluecardicon } = icons;

const {} = ChoosecablereceiverScreenStyles;
const cableTypes = [
  {
    name: "DSTV",
    value: "dstv",
  },
  {
    name: "GOTV",
    value: "gotv",
  },
  {
    name: "Startimes",
    value: "startimes",
  },
  {
    name: "WAEC",
    value: "waec",
  },
  {
    name: "NECO",
    value: "neco",
  },
  {
    name: "Spectranet",
    value: "spectranet",
  },
  {
    name: "Jamb",
    value: "jamb",
  },
];

const ChoosecablereceiverScreen = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState("");
  const [filteredcabletype, setfilteredcabletype] = useState(cableTypes);

  const handlesearch = (val) => {
    setfilteredcabletype(
      cableTypes?.filter((el) => el?.value?.includes(val?.toLowerCase()))
    );
    setSearch(val);
  };
  return (
    <FTTitlepagewrapper title="Choose Cable Type">
      <FTSearchinput
        value={search}
        onChange={handlesearch}
        placeholder="Search Biller"
      />

      <FlatList
        data={filteredcabletype}
        ItemSeparatorComponent={() => <View style={{ height: 28 }} />}
        renderItem={({ item }) => {
          const { name, value } = item;
          return (
            <FTIconwithtitleandinfo
              bG=""
              title={name}
              onPress={() =>
                navigation.navigate("choosecableamount_screen", {
                  biller: value,
                })
              }
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
