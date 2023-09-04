import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import { COLORS, FONTS, fontsize, icons } from "../constants";
import FTSearchinput from "./FTSearchinput";
import axiosCustom from "../httpRequests/axiosCustom";
// import { navigation } from "../utils";
import { ChatsScreenStyles } from "../assets/styles/screens";
import FTIconwithbg from "./FTIconwithbg";
import FTUserImage from "./FTUserImage";
import { lastChatDate } from "../utils/fomatTrans";
import FTOtherImage from "./FTOtherImage";
import { useNavigation } from '@react-navigation/native';

const { Blacksendicon } = icons;

const {
  recentChatText,
  chatLastMessage,
  lastMessageTime,
  chatDetailWrap,
  senderNameText,
  SAlign,
  chatWrap,
} = ChatsScreenStyles;

const ChatMessage = ({ chatinfo }) => {
  const userInfo = chatinfo?.userInfo;
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        navigation.navigate("chatsdm_screen", { userInfo });
      }}
      style={chatWrap}
    >
      <FTOtherImage
        imageurl={userInfo?.imageUrl}
        memojiImage={userInfo?.memoji}
        fullname={userInfo?.fullName}
      />
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
          <Text style={lastMessageTime}>
            {lastChatDate(chatinfo?.createdAt)}
          </Text>
        </View>
        <View style={SAlign}>
          <Text style={chatLastMessage}>{chatinfo?.lastMessage}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const ListHeader = ({ value, onchange }) => {
  return (
    <>
      <FTSearchinput
        value={value}
        onChange={onchange}
        placeholder="Type to search chat"
        bG={COLORS.blue20}
        mB={30}
        mT={30}
      />
      <Text style={recentChatText}>Recent Chats</Text>
    </>
  );
};

const FTChatList = ({ allchatdata }) => {
  const [allChats, setAllChats] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setAllChats(allchatdata);
  }, [allchatdata]);
  const handleSearchChange = (text) => {
    // allChats
    setSearch(text);
    const filterchat = allchatdata.filter((item) => {
      const userInfo = item?.userInfo;
      let de = false;
      if (userInfo?.fullName) {
        de = userInfo?.fullName.toLowerCase().includes(search.toLowerCase());
      }
      if (userInfo?.username) {
        de =
          de || userInfo?.username.toLowerCase().includes(search.toLowerCase());
      }

      return de;
    });

    setAllChats(filterchat);
  };
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={allChats}
      renderItem={({ item }) => {
        return <ChatMessage chatinfo={item} />;
      }}
      ItemSeparatorComponent={() => {
        return <View style={{ height: 30 }} />;
      }}
      ListHeaderComponent={() => (
        <ListHeader value={search} onchange={handleSearchChange} />
      )}
    />
  );
};

export default FTChatList;
