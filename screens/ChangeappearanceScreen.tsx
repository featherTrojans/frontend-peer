import { StyleSheet, Text, View, Pressable, FlatList } from "react-native";
import React, { useState } from "react";
import {
  ChangeappearanceScreenStyles,
  ProfileScreenStyles,
} from "../assets/styles/screens";
import { FTTitlepagewrapper } from "../components";
import { icons } from "../constants";

const { Changememojicheckicon } = icons;
const { profileOuterBorder, profileInnerBorder, userProfileBg } =
  ProfileScreenStyles;
const { topSectionWrap, customizeText, sectionHeader, colorOptionBg } =
  ChangeappearanceScreenStyles;

const ColorOption = ({ color, active, setActive }) => {
  return (
    <Pressable
      onPress={() => {
        setActive(color);
      }}
    >
      <View style={[colorOptionBg, { backgroundColor: color }]}>
        {active == color && <Changememojicheckicon />}
      </View>
    </Pressable>
  );
};

const ChangeappearanceScreen = () => {
  const [active, setActive] = useState("#342AD5");

  const profileColors = [
    {
      color: "#342AD5",
    },
    {
      color: "#12AD2B",
    },
    {
      color: "#FC8EAC",
    },
    {
      color: "#FDB702",
    },
    {
      color: "#B06C49",
    },
    {
      color: "#11141A",
    },
    {
      color: "#9AD49A",
    },
    {
      color: "#F4C8D5",
    },
    {
      color: "#F8DC8D",
    },
  ];

  return (
    <FTTitlepagewrapper title="Change Appearance">
      <View style={topSectionWrap}>
        <Text style={customizeText}>Customise {`\n`} your avatar</Text>
        <View
          style={[
            profileOuterBorder,
            { alignSelf: "flex-end", height: 140, width: 140 },
          ]}
        >
          <View style={[profileInnerBorder, { width: 112, height: 112 }]}>
            <View style={[userProfileBg, { width: 86, height: 86 }]}></View>
          </View>
        </View>
      </View>

      <View>
        <Text style={sectionHeader}>Background Colour</Text>
        <FlatList
          data={profileColors}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 10 }}
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
      </View>
    </FTTitlepagewrapper>
  );
};

export default ChangeappearanceScreen;

const styles = StyleSheet.create({});
