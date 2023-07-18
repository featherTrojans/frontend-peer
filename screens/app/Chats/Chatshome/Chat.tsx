import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useEffect, useState, } from "react";
import { styles } from "./Chatshome.styles";
import { useNavigation } from "@react-navigation/native";
import axiosCustom from "../../../../httpRequests/axiosCustom";
import moment from "moment";
import {  InitialsBg } from "../../../../components";
import { icons } from "../../../../constants";

const { Emptynotification } = icons;

interface chatProps {
  userId: string;
  chatinfo: any;
}

const Chat = ({ userId, chatinfo }: chatProps) => {
  const navigate = useNavigation();
  const [userInfo, setUserInfo] = useState<any>({});
  useEffect(() => {
    getUser();
  }, []);
  const getUser = async () => {
    try {
      const response = await axiosCustom.get(`/user/${userId}`);
      setUserInfo(response.data.data);
    } catch (err) {
      console.log(err.response);
    }
  };
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigate.navigate("Chatsdm", { userInfo })}
      style={styles.chatContainer}
    >
      <InitialsBg sideLength={45} name={userInfo?.fullName || "0 0"} />
      <View style={styles.chatInfo}>
        <View style={styles.chatNameAndTime}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.chatName}>
            {userInfo?.fullName}
          </Text>
          <Text style={styles.chatTime}>
            {moment(chatinfo?.createdAt).format("LT")}
          </Text>
        </View>
        <View>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.chatHintMessage}
          >
            {chatinfo?.lastMessage}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const AllChats = ({ chats, chattwos, authId }) => {
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
  }, [chats, chattwos]);

  return (
    <FlatList
      data={allChats}
      renderItem={({ item: chat, index }) => {
        let userid = chat.id1 !== authId ? chat.id1 : chat.id2;
        return <Chat userId={userid} chatinfo={chat} key={userid} />;
      }}
      ListEmptyComponent={() => {
        return (
          <View style={styles.emptyChatsWrap}>
            <Emptynotification />
            <Text style={styles.emptyChatsTextInfo}>
              Oops, you have no recent conversations here
            </Text>
          </View>
        );
      }}
    />
  );
};

export default AllChats;
