import { StyleSheet, Text, View, Image, StatusBar, Button } from "react-native";
import React, {useState, useEffect, useContext} from "react";
import { styles } from "./Chatsdm.styles";
import { COLORS, FONTS, fontsize, icons, images } from "../../../../constants";
import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "../../../../firebase";
import { AuthContext } from "../../../../context/AuthContext";
// import { StatusBar } from 'expo-status-bar'

const { Backarrow } = icons;
const { Chatimage } = images;

const Chatsdm = ({route}) => {
  // const {id} = route.params
  // const {authdata} = useContext(AuthContext);
  const [messages, setMessages] =  useState<any>([]);
  const [chatid, setchatid] = useState("")
  
  useEffect(() => {
    (async ()=>{
      await getThisChats()
      firestoreListener()
    })()  
  }, [])
  const firestoreListener = async ()=>{
    try {
      const unsub = onSnapshot(collection(db, "chatstwo",chatid,"messages" ), (docs) => {
        docs.forEach((doc)=>{
          console.log(doc.data())
        })
    });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  const getThisChats = async ()=>{
    const id = "123"
    const userId = "456"
    try{
      let document;
      let id1id2 = `${userId}-${id}`
      document = await getDoc(doc(db,"chatstwo",id1id2))
      if(document.exists()){
        const allmessages = await getDocs(collection(db,"chatstwo",id1id2,"messages"))
        setMessages(allmessages.docs)
        setchatid(id1id2)
        return
      }
      const id2id1 = `${id}-${userId}`
      document = await getDoc(doc(db,"chatstwo",id2id1))
      if(document.exists()){
        const allmessages = await getDocs(collection(db,"chatstwo",id2id1,"messages"))
        setMessages(allmessages.docs)
        setchatid(id2id1)
        return
      }
      // create new document
      await setDoc(doc(db,"chatstwo",id1id2),{
        id1: userId,
        id2: id
      })
      setchatid(id1id2)
    }catch(err){
      console.log(err)
    }
  }

  const sendFireBaseMessage = async ()=>{
    console.log("hi theerrerere mesage sending ")
    try{
      await addDoc(collection(db,"chatstwo",chatid,"messages"),{
        message:"Hi there",
        receiver:"idfromme"
      })
    }catch(err){      
      console.log(err)
    }
  }
  return (
    <View style={styles.container}>
      {/* header section */}
      <StatusBar />      
      <View style={styles.chatHeader}>
        <Backarrow />
        <View style={styles.headerDetailsContainer}>
          {/* Image */}
          {/* <Image source={Chatimage} resizeMode="cover" /> */}
          <View  style={{width: 50, height: 50, backgroundColor: COLORS.grey3, borderRadius: 25}}/>
          <View style={{ marginLeft: 20 }}>
            <Text style={styles.chatName}>Stephene Adegoke</Text>
            <View style={styles.chatStatusContainer}>
              <View style={styles.chatStatusDot} />
              <Text style={styles.chatStatusText}>Online</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.messageAreaContainer}>
      {/* Messages area */}

      <Button onPress={sendFireBaseMessage} title="Press me to send" />
      {/* message input box */}
      </View>
    </View>
  );
};

export default Chatsdm;
