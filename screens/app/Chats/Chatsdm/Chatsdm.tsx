import { StyleSheet, Text, View, Image, StatusBar, Button, ScrollView, Touchable, TouchableOpacity, Keyboard } from "react-native";
import React, {useState, useEffect, useContext, useRef} from "react";
import { styles } from "./Chatsdm.styles";
import { COLORS, FONTS, fontsize, icons, images } from "../../../../constants";
import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../../../firebase";
import { AuthContext } from "../../../../context/AuthContext";
import {  TextInput } from "react-native-gesture-handler";
import moment from "moment";
import EmojiBoard from 'react-native-emoji-board'
// import { StatusBar } from 'expo-status-bar'

const { Backarrow, SmileEmoji } = icons;
const { Chatimage } = images;

const Chatsdm = ({route}) => {
  // const id = route.params.id || "111"
  const id=111
  // const {authdata} = useContext(AuthContext);
  const [messages, setMessages] =  useState<any>([]);
  const [chatid, setchatid] = useState("")
  const [show, setShow] = useState(false);
  const [chattext, setchattext] = useState("")
  const textinput = useRef(null)

  useEffect(()=>{
    const keyboardshowinglistener = Keyboard.addListener("keyboardDidShow", () => {
        console.log("it is showing")
        if(show){
          Keyboard.dismiss()
        }
    })
    return () => {
      keyboardshowinglistener.remove()
    }
  },[show])


  // console.log(messages)
  useEffect(() => {    
      getThisChats()
  }, [])
  useEffect(()=>{
    let unsub = ()=>{}
    if(chatid){
      unsub = onSnapshot(collection(db, "chatstwo",chatid,"messages" ), (docs) => {
        docs.forEach((doc)=>{ 
          console.log(doc.data())
        }) 
      });
    }

    return ()=> {
        unsub()
      }
  },[chatid])
 
  
  const getThisChats = async ()=>{
    const userId = "456ewf2"
    try{
      let document;
      let id1id2 = `${userId}-${id}`
      document = await getDoc(doc(db,"chatstwo",id1id2))
      if(document.exists()){
        const allmessages = await getDocs(collection(db,"chatstwo",id1id2,"messages"))
        // setMessages(allmessages.docs)
        saveMessagesInStore(allmessages)
        setchatid(id1id2)
        return
      }
      const id2id1 = `${id}-${userId}`
      document = await getDoc(doc(db,"chatstwo",id2id1))
      if(document.exists()){
        const allmessages = await getDocs(collection(db,"chatstwo",id2id1,"messages"))
        // setMessages(allmessages.docs)
        saveMessagesInStore(allmessages)
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

  const saveMessagesInStore = (querySnapshot)=>{
    const allmessages = []
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      allmessages.push(doc.data())
    });
    setMessages(allmessages)
  }
  const sendFireBaseMessage = async ()=>{
    
    try{
      await addDoc(collection(db,"chatstwo",chatid,"messages"),{
        message:chattext,
        sender:"ayobami",
        createdAt: serverTimestamp()
      })
      setchattext("")
    }catch(err){      
      console.log(err)
    }
  }
  const onClick = emoji => {
    setchattext((prevtext)=> `${prevtext}${emoji.code}`)
  };
  const handleShowEmoji = ()=>{
    if(!show){
      setShow(true)
      Keyboard.dismiss()
    }else{
      setShow(false)
      textinput.current.focus()
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
      {messages.map(mes=>{

        if(mes.sender === id){
          return (
            <View style={styles.chatNotMe}>
              <View>
                <Text style={styles.chatNotMeColor}>{mes.message}</Text>
                <Text>{moment(mes.createdAt.seconds * 1000).format('LT')}</Text>
              </View>
            </View>  
          )
        }
        return (
          <View style={styles.chatToMe}>
            <View>
              <Text style={styles.chatToMeColor}>{mes.message}</Text>
              <Text style={styles.chatToMeTime}>10.11am</Text>
            </View>
          </View>
        )
      })}
      
      </ScrollView>
      {/* message input box */}
      <View style={styles.chatTextContainer}>
        <View style={styles.inputarea}>
          <View style={styles.chatTextInput}>
            <TouchableOpacity onPress={handleShowEmoji}>
              <SmileEmoji />
            </TouchableOpacity>
            <TextInput ref={textinput} placeholder="Enter Message" style={styles.textinput} value={chattext} onChangeText={text=>setchattext(text)}  />
          </View>
          <Button onPress={sendFireBaseMessage} title="Press me to send" />
        </View>
        {show &&<EmojiBoard containerStyle={{marginBottom: 5, position:"relative"}} showBoard={true} onClick={onClick} />}
      </View>
    </View>
  );
};

export default Chatsdm;
