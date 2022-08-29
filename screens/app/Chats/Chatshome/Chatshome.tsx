import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { styles } from "./Chatshome.styles";
import { COLORS, FONTS, fontsize, icons } from "../../../../constants";
import { ScrollView } from "react-native-gesture-handler";
import Customstatusbar from "../../../shared/Customstatusbar";
import { db } from "../../../../firebase";
import {
  doc,
  collection,
  getDoc,
  getDocs,
  collectionGroup,
  QueryDocumentSnapshot,
  DocumentData,
  query,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../../../../context/AuthContext";
import LottieView from "lottie-react-native";
import Chat from "./Chat";

import Contact from "./Contact";
import { RFValue } from "react-native-responsive-fontsize";
import axiosCustom from "../../../../httpRequests/axiosCustom";
import useContact from "../../../../utils/customContact";
import { Backheader, Mainwrapper } from "../../../../components";


const { Chatsearchicon, Cryinganimate, Emptynotification } = icons;

const Chatshome = ({ navigation }) => {
  const { authdata } = useContext(AuthContext);

  const [chats, setChats] = useState<any>([]);
  const [chattwos, setChattwos] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // find the detail of the user name by checking the reference
  const authId = authdata?.userDetails?.userUid;

  const [contactsResolved, setContactResolved] = useState([]);
  const { contacts } = useContact();

  useEffect(() => {
    const allcontacts = [];
    contacts.forEach((contact) => {
      const numbersArr = [];
      contact?.phoneNumbers?.forEach((phone) => {
        const number = phone.number.replace(/\s+/g, "");
        if (!numbersArr.includes(number)) {
          numbersArr.push(number);
        }
      });
      for (let num of numbersArr) {
        if (num) {
          allcontacts.push(num);
        }
      }
    });
    getAllContactInFeather(allcontacts);
  }, [contacts]);

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

    return () => {
      unsub();
    };
  }, []);

  const getAllContactInFeather = async (allcontacts) => {
    try {
      const response = await axiosCustom.post("/user/multiple", {
        numbers: allcontacts,
      });
      setContactResolved(response.data.data);
    } catch (err) {
      // console.log(err.response)
    }
  };

  const getAllChats = async () => {
    setLoading(true);
    try {
      // auery first where
      const chatsRef = collection(db, "chatstwo");
      const chatQuery1 = query(
        chatsRef,
        where("id1", "==", authId),
        orderBy("createdAt")
      );
      const chatQuery2 = query(
        chatsRef,
        where("id2", "==", authId),
        orderBy("createdAt")
      );
      // console.log(querysnaps.length)
      const [chatdata1, chatdata2] = await Promise.all([
        getDocs(chatQuery1),
        getDocs(chatQuery2),
      ]);
      // const chatdata2 = await getDocs(chatQuery1)

      const allchats = [];
      const allchatTwo = [];
      chatdata2.forEach((document) => {
        allchatTwo.push(document.data());
      });
      chatdata1.forEach((document) => {
        allchats.push(document.data());
      });
      setChattwos(allchatTwo);
      setChats(allchats);
      // console.log(chatsdata.docs)
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <Mainwrapper>
      <Backheader title="Chats" showArrow={false} />

      <View style={styles.container}>
        {/* <TouchableOpacity  onPress={()=>navigation.navigate("Usersearch",{phoneContact:contactsResolved})} > */}

        <View style={{ flex: 1 }}>
        
          <Contact contactsResolved={contactsResolved} />

          <View
            style={{
              flex: 1,
              backgroundColor: COLORS.white,
              marginTop: 15,
              borderRadius: 15,
             paddingHorizontal: 16, 
             paddingVertical: 20
            }}
          >
            {/* <Text>The an</Text> */}
            <View style={{marginBottom: 50}}>
              <Text style={{...fontsize.smaller, ...FONTS.medium}}>Recent Chats</Text>
              {/* icons */}
            </View>
            {/* This is for when the recent chat is empty */}
            {!loading && chats.length === 0 && chattwos.length === 0 && (
              <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
                <Emptynotification />
                <Text style={{...fontsize.smaller, ...FONTS.regular, marginTop: 30, paddingHorizontal: 35, textAlign: "center"}}>Oops, you have no recent conversations here</Text>
              </View>
            )}
            {loading ? (
              <View style={{ marginTop: 100 }}>
                <ActivityIndicator size="large" color="#000" />
              </View>
            ) : (
              <Chat authId={authId} chattwos={chattwos} chats={chats} />
            )}
          </View>
        </View>
      </View>
    </Mainwrapper>
  );
};

export default Chatshome;
