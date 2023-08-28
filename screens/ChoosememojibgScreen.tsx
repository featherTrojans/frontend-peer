import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { FTTitlepagewrapper } from "../components";
import * as Haptics from "expo-haptics";
import { FONTS, fontsize, icons } from "../constants";
import { ChoosememojiScreenStyles } from "../assets/styles/screens";
import { navigation } from "../utils";
const { Changememojicheckicon } = icons;
const { memojisWrapper, buttonText, buttonWrap } = ChoosememojiScreenStyles;

const profileColors = [
  {
    color: "#D9D9D9",
  },
  {
    color: "#C8F1CE",
  },
  {
    color: "#CFE9FB",
  },
  {
    color: "#F8EBA7",
  },
  {
    color: "#F5C3BC",
  },
  {
    color: "#DFD2FA",
  },
  {
    color: "#F7CDD7",
  },
  {
    color: "#F6DEAC",
  },
  {
    color: "#F8CDD7",
  },
];
const ColorOption = ({ color, active, setActive }) => {
  return (
    <Pressable
      onPress={() => {
        setActive(color);
        Haptics.selectionAsync();
      }}
    >
      <View
        style={[
          {
            width: 78,
            height: 78,
            borderRadius: 78 / 2,
            // marginRight: 24,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: color,
          },
        ]}
      >
        {active == color && <Changememojicheckicon />}
      </View>
    </Pressable>
  );
};

const ChoosememojibgScreen = () => {
  const [active, setActive] = useState("transparent");
  return (
    <FTTitlepagewrapper title="Background">
      <View style={{ alignItems: "center" }}>
        <Text style={{ marginTop: 15, ...fontsize.smallest, ...FONTS.regular }}>
          Select your preferred background colour
        </Text>
        <View
          style={{
            width: 150,
            height: 150,
            backgroundColor: "#D9D9D9",
            borderRadius: 150 / 2,
            marginTop: 66,
            marginBottom: 50,
          }}
        ></View>
      </View>

      <FlatList
        data={profileColors}
        horizontal={false}
        numColumns={3}
        showsHorizontalScrollIndicator={false}
        columnWrapperStyle={memojisWrapper}
        renderItem={({ item: { color }, index }) => {
          return (
            <ColorOption
              key={index}
              color={color}
              active={active}
              setActive={setActive}
            />
          );
        }}
      />

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate("memojisuccess_screen")}
        style={buttonWrap}
      >
        <Text style={buttonText}>Yay, Save Memoji</Text>
      </TouchableOpacity>
    </FTTitlepagewrapper>
  );
};

export default ChoosememojibgScreen;

const styles = StyleSheet.create({});
