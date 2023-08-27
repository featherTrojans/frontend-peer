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
  chatLastMessage,
  lastMessageTime,
  chatDetailWrap,
  senderNameText,
  SAlign,
  chatWrap,
} = ChatsScreenStyles;

const ChatMessage = ({ search, userId, chatinfo }) => {
  const [userInfo, setUserInfo] = useState({});
  const [show, setshow] = useState(true);
  useEffect(() => {
    console.log(search);
    if (search == "") {
      setshow(true);
    } else {
      let de = false;
      if (userInfo?.fullName) {
        de = userInfo?.fullName.toLowerCase().includes(search.toLowerCase());
      }
      if (userInfo?.username) {
        de =
          de || userInfo?.username.toLowerCase().includes(search.toLowerCase());
      }
      console.log(userInfo?.fullName, search, de);
      setshow(de);
    }
  }, [search]);
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

  if (!show) {
    return null;
  }
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

const FTChatList = ({ chats, chattwos, authId }) => {
  const [allChats, setAllChats] = useState([]);
  const [search, setSearch] = useState("");

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

  const handleSearchChnage = (text) => {
    // allChats
  };
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={allChats}
      renderItem={({ item }) => {
        let userid = item.id1 !== authId ? item.id1 : item.id2;

        return <ChatMessage search={search} userId={userid} chatinfo={item} />;
      }}
      ItemSeparatorComponent={() => {
        return <View style={{ height: 40 }} />;
      }}
      ListHeaderComponent={() => (
        <ListHeader value={search} onchange={setSearch} />
      )}
    />
  );
};

export default FTChatList;
