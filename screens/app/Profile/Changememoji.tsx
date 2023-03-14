import { StyleSheet, Text, View, FlatList, Pressable } from "react-native";
import React, { useState } from "react";
import { Backheader, Mainwrapper } from "../../../components";
import { COLORS, FONTS, fontsize } from "../../../constants";
import { profilestyles } from "./Profile.styles";

const ColorOption = ({ title, color, active, setActive }) => {
  return (
    <Pressable
      onPress={() => {
        setActive(title);
      }}
      style={profilestyles.changeMemojiColorOptionWrap}
    >
      <View
        style={[
          profilestyles.changeMemojiBgBorder,
          {
            borderWidth: active == title ? 1 : 0,
            borderColor: active == title ? "#696969" : "red",
          },
        ]}
      >
        <View
          style={[
            profilestyles.changeMemojiOptionBg,
            { backgroundColor: color },
          ]}
        />
      </View>
      <Text style={profilestyles.changeMemojiOptionTitle}>{title}</Text>
    </Pressable>
  );
};

const Changememoji = () => {
  const [active, setActive] = useState(false);

  const profileColors = [
    {
      title: "Black",
      color: "#000",
    },
    {
      title: "Mint",
      color: "#DFEDD8",
    },
    {
      title: "Sea",
      color: "#E6ECFF",
    },
    {
      title: "Mustard",
      color: "#FCF3D2",
    },
    {
      title: "Grey",
      color: "#DBDCDD",
    },
    {
      title: "Fusia",
      color: "#F1E5FF",
    },
  ];

  return (
    <Mainwrapper>
      <Backheader />

      <View style={{ paddingHorizontal: 15 }}>
        <View style={profilestyles.changeMemojiHeaderWrap}>
          <Text style={profilestyles.changeMemojiHeaderText}>
            Choose Memoji
          </Text>

          <View style={profilestyles.changeMemojiImageBorder}>
            <View style={profilestyles.changeMemojiImageBg}>{/* icons */}</View>
          </View>
        </View>

        <FlatList
          data={profileColors}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item: { title, color } }) => {
            return (
              <ColorOption
                title={title}
                color={color}
                active={active}
                setActive={setActive}
              />
            );
          }}
        />
      </View>
    </Mainwrapper>
  );
};

export default Changememoji;

const styles = StyleSheet.create({});
