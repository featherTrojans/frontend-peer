import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import {
  ChatsScreenStyles,
  ProfileScreenStyles,
} from "../assets/styles/screens";
import {
  FTChatList,
  FTSearchinput,
  FTTabWrapper,
  FTTitlepagewrapper,
} from "../components";
import { navigation } from "../utils";
import { COLORS, FONTS, fontsize, icons } from "../constants";
import { db } from "../utils/firebase";
import {
  collection,
  getDocs,
  query,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";

const { Startnewchaticon } = icons;
const {} = ChatsScreenStyles;
const { profileHeaderWrap, profileHeaderText } = ProfileScreenStyles;

const ChatsScreen = () => {
  const { authdata } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [chats, setChats] = useState<any>([]);
  const [chattwos, setChattwos] = useState<any>([]);
  const authId = authdata?.userDetails?.userUid;

  // snapshot1
  useEffect(() => {
    setLoading(true);
    const chatsRef = collection(db, "chatstwo");
    const chatQuery1 = query(
      chatsRef,
      where("id1", "==", authId),
      orderBy("createdAt", "desc")
    );
    const unsub = onSnapshot(chatQuery1, (docs) => {
      const newdata = [];
      docs.forEach((change) => {
        newdata.push(change.data());
      });
      setChattwos(newdata);
    });
    setLoading(false);
    return () => {
      unsub();
    };
  }, []);

  // snapshot2
  useEffect(() => {
    setLoading(true);
    const chatsRef = collection(db, "chatstwo");
    const chatQuery1 = query(
      chatsRef,
      where("id2", "==", authId),
      orderBy("createdAt", "desc")
    );
    const unsub = onSnapshot(chatQuery1, (docs) => {
      const newdata = [];
      docs.forEach((change) => {
        newdata.push(change.data());
      });
      setChats(newdata);
    });
    setLoading(false);
    return () => {
      unsub();
    };
  }, []);

  return (
    <FTTabWrapper>
      <View style={profileHeaderWrap}>
        <Text style={profileHeaderText}>Conversations</Text>
        <View>
          <Startnewchaticon />
        </View>
      </View>

      <FTChatList chats={chats} chattwos={chattwos} authId={authId} />
    </FTTabWrapper>
  );
};

export default ChatsScreen;

const styles = StyleSheet.create({});
