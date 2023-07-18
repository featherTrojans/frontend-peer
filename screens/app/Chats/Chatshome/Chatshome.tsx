import { ActivityIndicator, FlatList, Text, TextInput, View } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { styles } from "./Chatshome.styles";
import { COLORS, icons } from "../../../../constants";
import Customstatusbar from "../../../shared/Customstatusbar";
import { db } from "../../../../firebase";
import {
  collection,
  getDocs,
  query,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { AuthContext } from "../../../../context/AuthContext";
import Chat from "./Chat";

import useContact from "../../../../utils/customContact";

const { Emptynotification, Addchatsicon, Blacksendicon } = icons;

const Chatshome = ({ navigation }) => {
  const { authdata } = useContext(AuthContext);

  const [chats, setChats] = useState<any>([]);
  const [chattwos, setChattwos] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { contactsResolved } = useContact();

  // find the detail of the user name by checking the reference
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
      const newdata = [{}];
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
    const chatsRef = collection(db, "chatstwo");
    const chatQuery1 = query(
      chatsRef,
      where("id2", "==", authId),
      orderBy("createdAt", "desc")
    );
    const unsub = onSnapshot(chatQuery1, (docs) => {
      const newdata = [{}];
      docs.forEach((change) => {
        newdata.push(change.data());
      });
      setChats(newdata);
    });

    return () => {
      unsub();
    };
  }, []);

  return (

      <>
    <Customstatusbar />
      <FlatList 
      showsVerticalScrollIndicator={false}
      data={[1,2,2,2,3,3,3]}
      contentContainerStyle={{paddingHorizontal: 15}}
      ListHeaderComponent={() => {
        return (
          <>
      <View style={styles.chatshomeheader}>
        <Text style={styles.chatsheaderText}>Chats.</Text>
        <Addchatsicon />
      </View>

      <TextInput
        style={styles.chatSearchInput}
        placeholder="Type to search chat"
        placeholderTextColor={COLORS.white}
      />

      <Text style={styles.recentChatsText}>Recent Chats</Text>
      </>
        )
      }}
      renderItem={() => {
        return (
          <View style={{height: 0, backgroundColor: 'red', marginBottom: 10}} />

        )
      }}
      
      />

</>

  );
};

export default Chatshome;
