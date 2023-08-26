import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import { COLORS, FONTS, fontsize, icons } from "../constants";
import FTSearchinput from "./FTSearchinput";
import axiosCustom from "../httpRequests/axiosCustom";
import { navigation } from "../utils";
import { ChatsScreenStyles } from "../assets/styles/screens";
import FTIconwithbg from "./FTIconwithbg";

const { Blacksendicon } = icons;

const {
  recentChatText,
  numberOfUnread,
  numberOfUnreadBg,
  chatLastMessage,
  lastMessageTime,
  chatDetailWrap,
  senderNameText,
  SAlign,
  chatWrap,
} = ChatsScreenStyles;

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
      activeOpacity={0.8}
      onPress={() => {
        navigation.navigate("chatsdm_screen", { userInfo });
      }}
      style={chatWrap}
    >
      <FTIconwithbg Icon={Blacksendicon} bG={COLORS.Tpurple} />
      {/* userimage here */}
      <View style={chatDetailWrap}>
        <View
          style={[
            SAlign,
            {
              marginBottom: 8,
            },
          ]}
        >
          <Text style={senderNameText}>{userInfo?.fullName}</Text>
          <Text style={lastMessageTime}>Yesterday</Text>
        </View>
        <View style={SAlign}>
          <Text style={chatLastMessage}>{chatinfo?.lastMessage}</Text>
          <View style={numberOfUnreadBg}>
            <Text style={numberOfUnread}>2</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const ListHeader = () => {
  return (
    <>
      <FTSearchinput
        placeholder="Type to search chat"
        bG={COLORS.blue20}
        mB={30}
        mT={30}
      />
      <Text style={recentChatText}>Recent Chats</Text>
    </>
  );
};

const FTChatList = ({ chats, chattwos, authId }) => {
  const [allChats, setAllChats] = useState([]);

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
    <FlatList
      showsVerticalScrollIndicator={false}
      data={allChats}
      renderItem={({ item }) => {
        let userid = item.id1 !== authId ? item.id1 : item.id2;

        return <ChatMessage userId={userid} chatinfo={item} />;
      }}
      ItemSeparatorComponent={() => {
        return <View style={{ height: 40 }} />;
      }}
      ListHeaderComponent={() => <ListHeader />}
    />
  );
};

export default FTChatList;
