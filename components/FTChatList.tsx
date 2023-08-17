import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import { COLORS, FONTS, fontsize } from "../constants";
import FTSearchinput from "./FTSearchinput";
import axiosCustom from "../httpRequests/axiosCustom";
import { navigation } from "../utils";

const ChatMessage = ({ userId, chatinfo }) => {
  const [userInfo, setUserInfo] = useState({});
  useEffect(() => {
    getUser();
  }, []);
  const getUser = async () => {
    try {
      const response = await axiosCustom.get(`/user/${userId}`);
      setUserInfo(response.data.data);
    } catch (err) {
      const response = await axiosCustom.get(`/merchant/detail/${userId}`);
      setUserInfo(response.data.data);
    }
  };
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("chatsdm_screen");
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View
          style={{
            width: 45,
            height: 45,
            backgroundColor: COLORS.Tpurple,
            borderRadius: 45 / 2,
          }}
        ></View>
        {/* userimage here */}
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
              {userInfo?.fullName}
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
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text
              style={{
                ...fontsize.smallest,
                ...FONTS.medium,
                color: COLORS.grey2,
              }}
            >
              {chatinfo?.lastMessage}
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
    </TouchableOpacity>
  );
};

const FTChatList = ({ chats, chattwos, authId }) => {
  const [allChats, setAllChats] = useState([]);

  console.log(allChats[0]);
  useEffect(() => {
    //algorithm
    const arranged = [];
    let i = 0;
    let j = 0;

    while (i < chats.length && j < chattwos.length) {
      if (chats[i].createdAt > chattwos[j].createdAt) {
        arranged.push(chats[i]);
        i++;
      } else {
        arranged.push(chattwos[j]);
        j++;
      }
    }
    while (i < chats.length) {
      arranged.push(chats[i]);
      i++;
    }
    while (j < chattwos.length) {
      arranged.push(chattwos[j]);
      j++;
    }

    setAllChats(arranged);
    // console.log(allChats, "list of all chats");
  }, [chats, chattwos]);

  return (
    <View>
      <FlatList
        data={allChats}
        renderItem={({ item }) => {
          let userid = item.id1 !== authId ? item.id1 : item.id2;

          return <ChatMessage userId={userid} chatinfo={item} />;
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
    </View>
  );
};

export default FTChatList;
