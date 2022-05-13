import { StyleSheet, Text, View, Image, StatusBar, Button, ScrollView,TextInput } from "react-native";
import React, {useState, useEffect, useContext} from "react";
import { styles } from "./Chatsdm.styles";
import { COLORS, FONTS, fontsize, icons, images } from "../../../../constants";
import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, setDoc, query, orderBy  } from "firebase/firestore";
import { db } from "../../../../firebase";
import { AuthContext } from "../../../../context/AuthContext";
// import { StatusBar } from 'expo-status-bar'

const { Backarrow } = icons;
const { Chatimage } = images;

const Chatsdm = ({route}) => {
  // const {id} = route.params
  const {authdata} = useContext(AuthContext);
  const [messages, setMessages] =  useState<any>([]);
  const [chatid, setchatid] = useState("")
  const [chattext, setchattext] = useState("")
  const authId = authdata?.userDetails?.userUid
  

  useEffect(() => {    
    getThisChats()
  }, [])

  useEffect(()=>{
    let unsub = ()=>{}
    if(chatid){ 
      const chatRef = collection(db, "chatstwo",chatid,"messages" )
      const queryref =  query(chatRef, orderBy("createdAt"))
      unsub = onSnapshot(queryref, (docs) => {
        const newdata = []
        docs.forEach((change) => { 
              newdata.push(change.data())
        });
        setMessages(newdata)
      });
    }

    return ()=> {
        unsub()
      }
  },[chatid])


  const getThisChats = async ()=>{
    const id = "123"
    try{
      let document;
      let id1id2 = `${authId}-${id}`
      document = await getDoc(doc(db,"chatstwo",id1id2))
      if(document.exists()){
        setchatid(id1id2)
        return
      }
      const id2id1 = `${id}-${authId}`
      document = await getDoc(doc(db,"chatstwo",id2id1))
      if(document.exists()){
        setchatid(id2id1)
        return
      }
      // create new document
      await setDoc(doc(db,"chatstwo",id1id2),{
        id1: authId,
        id2: id
      })
      setchatid(id1id2)
    }catch(err){
      console.log(err)
    }
  }

  const sendFireBaseMessage = async ()=>{
    console.log("hi theerrerere mesage sending ")
    const messageData = {
      message:chattext,
      sender:authId,
      createdAt: Date.now()
    }
    try{
      await addDoc(collection(db,"chatstwo",chatid,"messages"),messageData)
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
      <ScrollView style={styles.messageAreaContainer}>
      {/* Messages area */}

      
      {/* message input box */}
      </ScrollView>
      <View style={styles.chatTextContainer}>
        <View style={styles.inputarea}>
          <View style={styles.chatTextInput}>
            {/* <TouchableOpacity onPress={handleShowEmoji}>
              <SmileEmoji />
            </TouchableOpacity> */}
            <TextInput  placeholder="Enter Message" style={styles.textinput} value={chattext} onChangeText={text=>setchattext(text)}  />
          </View>
          <Button onPress={sendFireBaseMessage} title="Press me to send" />
        </View>
        {/* {show &&<EmojiBoard containerStyle={{marginBottom: 5, position:"relative"}} showBoard={true} onClick={onClick} />} */}
      </View>
    </View>
  );
};

export default Chatsdm;
