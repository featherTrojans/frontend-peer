import {
  ActivityIndicator,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { styles } from "./Chatshome.styles";
import { COLORS, FONTS, fontsize, icons } from "../../../../constants";
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

import Contact from "./Contact";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
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

  useEffect(() => {
    // getAllChats()
  }, []);

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

  // const getAllChats = async () => {
  //   setLoading(true);
  //   try {
  //     // auery first where
  //     const chatsRef = collection(db, "chatstwo");
  //     const chatQuery1 = query(
  //       chatsRef,
  //       where("id1", "==", authId),
  //       orderBy("createdAt")
  //     );
  //     const chatQuery2 = query(
  //       chatsRef,
  //       where("id2", "==", authId),
  //       orderBy("createdAt")
  //     );
  //     // console.log(querysnaps.length)
  //     const [chatdata1, chatdata2] = await Promise.all([
  //       getDocs(chatQuery1),
  //       getDocs(chatQuery2),
  //     ]);
  //     // const chatdata2 = await getDocs(chatQuery1)

  //     const allchats = [];
  //     const allchatTwo = [];
  //     chatdata2.forEach((document) => {
  //       allchatTwo.push(document.data());
  //     });
  //     chatdata1.forEach((document) => {
  //       allchats.push(document.data());
  //     });
  //     setChattwos(allchatTwo);
  //     setChats(allchats);

  //     // console.log(chatsdata.docs)
  //   } catch (err) {
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <View style={styles.container}>
      <Customstatusbar />

      <View style={styles.subcontainer}>
        <ScrollView
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {/* <Contact /> */}

          <View style={styles.chatshomeheader}>
            <Text style={styles.chatsheaderText}>Chats.</Text>

            {/* add chat icons */}
            <Addchatsicon />
          </View>

          <TextInput
            style={styles.chatSearchInput}
            placeholder="Type to search chat"
            placeholderTextColor={COLORS.white}
          />

          <View style={{ marginBottom: 20 }}>
            <Text style={styles.recentChatsText}>Recent Chats</Text>
          </View>
          {!loading && chats.length === 0 && chattwos.length === 0 && (
            <View style={styles.emptyChatsWrap}>
              <Emptynotification />
              <Text style={styles.emptyChatsTextInfo}>
                Oops, you have no recent conversations here
              </Text>
            </View>
          )}
          {loading ? (
            <View style={{ marginTop: 100 }}>
              <ActivityIndicator size="large" color="#000" />
            </View>
          ) : (
            <Chat authId={authId} chattwos={chattwos} chats={chats} />
          )}
        </ScrollView>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate("Usersearch", contactsResolved)}
          style={styles.exploreBtnBg}
        >
          {/* <Startnewchaticon /> */}
          <Blacksendicon />
          <Text style={styles.explorebtnText}>Explore</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Chatshome;
