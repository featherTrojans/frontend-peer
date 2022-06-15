import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState , useContext} from "react";
import { styles } from "./Chatshome.styles";
import { COLORS, FONTS, fontsize, icons } from "../../../../constants";
import { ScrollView } from "react-native-gesture-handler";
import Customstatusbar from "../../../shared/Customstatusbar";
import { db } from "../../../../firebase";
import { doc, collection, getDoc, getDocs, collectionGroup, QueryDocumentSnapshot, DocumentData, query, where, onSnapshot, orderBy } from "firebase/firestore";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../../../../context/AuthContext";
import LottieView from "lottie-react-native"
import Chat from "./Chat";

import Contact from "./Contact";
import { RFValue } from "react-native-responsive-fontsize";

const { Chatsearchicon, Cryinganimate } = icons;




const Chatshome = () => {
  const {authdata} = useContext(AuthContext);

  const [chats, setChats] = useState<any>([])
  const [chattwos, setChattwos] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(false)
  
  // find the detail of the user name by checking the reference
  const authId = authdata?.userDetails?.userUid

  console.log(chats, "the chats")
  // console.log(contacts)

  useEffect(()=>{
    // getAllChats()
  },[])

  // snapshot1
  useEffect(()=>{
    setLoading(true)
    const chatsRef = collection(db,"chatstwo")
      const chatQuery1 = query(chatsRef, where("id1","==",authId))
    const unsub = onSnapshot(chatQuery1 , (docs) => {
      const newdata = []
      docs.forEach((change) => { 
            newdata.push(change.data())
      });
      setChattwos(newdata)
    });
    setLoading(false)
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
    setLoading(true);
    try{
      // auery first where 
      const chatsRef = collection(db,"chatstwo")
      const chatQuery1 = query(chatsRef, where("id1","==",authId), orderBy("createdAt"))
      const chatQuery2 = query(chatsRef, where("id2","==",authId), orderBy("createdAt"))
      // console.log(querysnaps.length)
      const [chatdata1, chatdata2 ] = await Promise.all([getDocs(chatQuery1),getDocs(chatQuery2)])
      // const chatdata2 = await getDocs(chatQuery1)
      
      const allchats = []
      const allchatTwo = []
      chatdata2.forEach((document)=>{
        allchatTwo.push(document.data())
      })
      chatdata1.forEach((document)=>{
        allchats.push(document.data())      
      })
      setChattwos(allchatTwo);
      setChats(allchats)
      // console.log(chatsdata.docs)
    }catch(err){
    }finally{
      setLoading(false);
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
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
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
          
        {/* This is for when the recent chat is empty */}
        {
          (!loading && chats.length === 0 && chattwos.length === 0) && 
          (<View style={{justifyContent: "center",  alignItems: "center"}}>
            <LottieView source={Cryinganimate} style={{width: RFValue(190), height: RFValue(190)}}/>
            <Text style={{...fontsize.bsmall, ...FONTS.regular, lineHeight: 25, color: COLORS.black, textAlign: "center"}}>You do not have any recent chats. Start a conversation with a feather user in your contact or search a username</Text>        
          </View>)
        }
        {
          loading?(<View style={{marginTop: 100}}>
            <ActivityIndicator size="large" color="#000" />
          </View>):<Chat authId={authId} chattwos={chattwos} chats={chats} />
        }  
        </View>
      </ScrollView>
    </View>
    </SafeAreaView>
  );
};

export default Chatshome;
