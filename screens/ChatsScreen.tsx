import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  ChatsScreenStyles,
  ProfileScreenStyles,
} from "../assets/styles/screens";
import { FTSearchinput, FTTabWrapper, FTTitlepagewrapper } from "../components";
import { navigation } from "../utils";
import { COLORS, FONTS, fontsize, icons } from "../constants";


const { Startnewchaticon } = icons;
const {} = ChatsScreenStyles;
const { profileHeaderWrap, profileHeaderText } = ProfileScreenStyles;

const ChatMessage = () => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <View
        style={{
          width: 45,
          height: 45,
          backgroundColor: COLORS.Tpurple,
          borderRadius: 45 / 2,
        }}
      ></View>
      <View
        style={{ flex: 1, marginLeft: 18, justifyContent: "space-between" }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 8,
          }}
        >
          <Text
            style={{
              ...fontsize.smaller,
              ...FONTS.semibold,
              color: COLORS.blue9,
            }}
          >
            Fisayo Jegede
          </Text>
          <Text
            style={{
              ...fontsize.xsmallest,
              ...FONTS.regular,
              color: COLORS.grey16,
            }}
          >
            Yesterday
          </Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text
            style={{
              ...fontsize.smallest,
              ...FONTS.medium,
              color: COLORS.grey2,
            }}
          >
            Hey Enny, I got him the gift xoxo
          </Text>
          <View
            style={{
              backgroundColor: COLORS.blue9,
              padding: 5,
              minHeight: 20,
              minWidth: 20,
              borderRadius: 20 / 2,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                ...fontsize.xxsmallest,
                ...FONTS.bold,
                color: COLORS.white,
              }}
            >
              2
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const ChatsScreen = () => {
  return (
    <FTTabWrapper>
      <View style={profileHeaderWrap}>
        <Text style={profileHeaderText}>Conversations</Text>
        <View>
          <Startnewchaticon />
        </View>
      </View>

      <FlatList
        data={[1, 1, 1, 1]}
        renderItem={() => {
          return <ChatMessage />;
        }}
        ItemSeparatorComponent={() => {
          return <View style={{ height: 40 }} />;
        }}
        ListHeaderComponent={() => {
          return (
            <>
              <FTSearchinput
                placeholder="Type to search chat"
                bG={COLORS.blue20}
                mB={30}
                mT={30}
              />
              <Text
                style={{
                  marginBottom: 40,
                  marginTop: 10,
                  ...fontsize.smallest,
                  ...FONTS.semibold,
                }}
              >
                Recent Chats
              </Text>
            </>
          );
        }}
      />
    </FTTabWrapper>
  );
};

export default ChatsScreen;

const styles = StyleSheet.create({});
