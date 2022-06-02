import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState , useContext} from "react";
import { styles } from "./Chatshome.styles";
import { COLORS, FONTS, fontsize, icons } from "../../../../constants";
import { ScrollView } from "react-native-gesture-handler";
import Customstatusbar from "../../../shared/Customstatusbar";
import { db } from "../../../../firebase";
import { doc, collection, getDoc, getDocs, collectionGroup, QueryDocumentSnapshot, DocumentData, query, where, onSnapshot } from "firebase/firestore";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../../../../context/AuthContext";
import Chat from "./Chat";

import Contact from "./Contact";

const { Chatsearchicon } = icons;




const Chatshome = () => {
  const {authdata} = useContext(AuthContext);

  const [chats, setChats] = useState<any>([])
  const [chattwos, setChattwos] = useState<any>([])
  
  // find the detail of the user name by checking the reference
  const authId = authdata?.userDetails?.userUid

  // console.log(contacts)

  useEffect(()=>{
    getAllChats()
  },[])

  // snapshot1
  useEffect(()=>{
    const chatsRef = collection(db,"chatstwo")
      const chatQuery1 = query(chatsRef, where("id1","==",authId))
    const unsub = onSnapshot(chatQuery1 , (docs) => {
      const newdata = []
      docs.forEach((change) => { 
            newdata.push(change.data())
      });
      setChattwos(newdata)
    });

    return ()=>{
      unsub()
    }
  },[])

  // snapshot2
  useEffect(()=>{
    const chatsRef = collection(db,"chatstwo")
    const chatQuery1 = query(chatsRef, where("id2","==",authId))
    const unsub = onSnapshot(chatQuery1 , (docs) => {
      const newdata = []
      docs.forEach((change) => { 
            newdata.push(change.data())
      });
      setChats(newdata)
    });

    return ()=>{
      unsub()
    }
  },[])
  
  

  const getAllChats = async ()=>{
    try{
      // auery first where 
      const chatsRef = collection(db,"chatstwo")
      const chatQuery1 = query(chatsRef, where("id1","==",authId))
      const chatQuery2 = query(chatsRef, where("id2","==",authId))
      // console.log(querysnaps.length)
      const [chatdata1, chatdata2 ] = await Promise.all([getDocs(chatQuery1),getDocs(chatQuery2)])
      // const chatdata2 = await getDocs(chatQuery1)
      
      const allchats = []
      chatdata2.forEach((document)=>{
        allchats.push(document.data())
      })
      chatdata1.forEach((document)=>{
        allchats.push(document.data())      
      })
      setChats(allchats)
      // console.log(chatsdata.docs)
    }catch(err){

    }
  }
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
    <View style={styles.container}>
      <Customstatusbar />
      {/* Header texts and search icon */}
      <View style={styles.topHeader}>
        <View style={styles.chatTextContainer}>
          <Text style={styles.chatText}>Chats</Text>
          <View style={styles.amountOfChatsContainer}>
            <Text style={styles.amountOfChats}>{chats.length + chattwos.length}</Text>
          </View>
        </View>
        <View>
          <Chatsearchicon />
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginTop: 5, marginBottom: 37 }}>
          <View>
            <Text style={styles.secondSubHeader}>
              Feather Users In Your Contact
            </Text>
          </View>
         
            
            <Contact />

            
        </View>
        <View>
          <View style={styles.chatHeader}>
            <Text style={styles.chatHeaderText}>Recent Chats</Text>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* {chats.map(chat=>(<Chat
              name={chat.id}
              time="09:34am"
              message={chat.data().lastchat}
              online={true}
            />))} */}
           {
              chats.map((chat)=>{
                let userid = chat.id1 !== authId? chat.id1 : chat.id2 
                return (<Chat key={userid} userId= {userid} chatinfo={chat}/>)
              })
            }
            {
              chattwos.map((chat)=>{
                let userid = chat.id1 !== authId? chat.id1 : chat.id2 
                return (<Chat key={userid} userId= {userid} chatinfo={chat}/>)
              })
            }
          </ScrollView>
        </View>
      </ScrollView>
    </View>
    </SafeAreaView>
  );
};

export default Chatshome;
