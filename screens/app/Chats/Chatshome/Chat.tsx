import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { ReactElement, useEffect, useState, useContext } from "react";
import { styles } from "./Chatshome.styles";
import { useNavigation } from "@react-navigation/native";
import axiosCustom from "../../../../httpRequests/axiosCustom";
import moment from "moment";
import { Horizontaline, InitialsBg } from "../../../../components";

type chatProps = {
  userId: string;
  chatinfo: any;
};

const Chat = ({ userId, chatinfo }: chatProps) => {
  const navigate = useNavigation();
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
    // <TouchableOpacity onPress={()=>navigate.navigate("Chatsdm")} style={styles.chatContainer}>
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigate.navigate("Chatsdm", { userInfo })}
      style={styles.chatContainer}
    >
      <InitialsBg sideLength={34} name={userInfo?.fullName || "0 0"} />

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
    // console.log(allChats, "list of all chats");
  }, [chats, chattwos]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      bounces={false}
      contentContainerStyle={{ paddingVertical: 30 }}
    >
      {allChats.map((chat, index) => {
        let userid = chat.id1 !== authId ? chat.id1 : chat.id2;
        const isLast = allChats.length === index + 1;
        return (
          <View key={userid}>
            <Chat userId={userid} chatinfo={chat} />
            {!isLast && <Horizontaline marginV={25} />}
          </View>
        );
      })}
    </ScrollView>
  );
};

export default AllChats;

/**
 * {
          chattwos.map((chat)=>{
            let userid = chat.id1 !== authId? chat.id1 : chat.id2 
            return (<Chat key={userid} userId= {userid} chatinfo={chat}/>)
          })
        }
 */
