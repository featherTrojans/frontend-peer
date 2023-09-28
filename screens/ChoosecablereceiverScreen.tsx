import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { ChoosecablereceiverScreenStyles } from "../assets/styles/screens";
import {
  FTIconwithtitleandinfo,
  FTIconwithtitleandinfoCustom,
  FTSearchinput,
  FTTitlepagewrapper,
} from "../components";
import { useNavigation } from "@react-navigation/native";
import { icons, images } from "../constants";


const { gotvlogo, dstvlogo, startimeslogo } = images;
const { Bluecardicon } = icons;

const {} = ChoosecablereceiverScreenStyles;
const cableTypes = [
  {
    name: "DSTV",
    value: "dstv",
    logo: dstvlogo,
  },
  {
    name: "GOTV",
    value: "gotv",
    logo: gotvlogo,
  },
  {
    name: "Startimes",
    value: "startimes",
    logo: startimeslogo,
  },
  {
    name: "Spectranet",
    value: "spectranet",
    logo: startimeslogo,
  },
  // {
  //   name: "WAEC",
  //   value: "waec",
  // },
  // {
  //   name: "NECO",
  //   value: "neco",
  // },
  // {
  //   name: "Jamb",
  //   value: "jamb",
  // },
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
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        renderItem={({ item }) => {
          const { name, value, logo } = item;
          return (
            <FTIconwithtitleandinfoCustom
              bG="transparent"
              title={name}
              onPress={() =>
                navigation.navigate("choosecableamount_screen", {
                  biller: value,
                  logo: logo
                })
              }
              imageUrl={logo}
              // Icon={Electricityicon}
              mB={28}
              size={35}
            />
          );
        }}
      />
    </FTTitlepagewrapper>
  );
};

export default ChoosecablereceiverScreen;

const styles = StyleSheet.create({});
