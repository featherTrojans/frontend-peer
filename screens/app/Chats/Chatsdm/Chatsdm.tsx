import { StyleSheet, Text, View, Image, StatusBar, Button, ScrollView,  TouchableOpacity, Keyboard } from "react-native";
import React, {useState, useEffect, useContext, useRef} from "react";
import { styles } from "./Chatsdm.styles";
import { COLORS, FONTS, fontsize, icons, images } from "../../../../constants";
import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, setDoc, serverTimestamp, query, orderBy } from "firebase/firestore";
import { db } from "../../../../firebase";
import { AuthContext } from "../../../../context/AuthContext";
import {  TextInput } from "react-native-gesture-handler";
import moment from "moment";
import EmojiBoard from 'react-native-emoji-board'
import { useNavigation } from "@react-navigation/native";
// import { StatusBar } from 'expo-status-bar'

const { Backarrow, SmileEmoji } = icons;
const { Chatimage } = images;

const Chatsdm = ({route}) => {
  const userId = route.params.userId 
  const userInfo = route.params.userInfo 
  const navigation = useNavigation()
  // const userId = "ezeko"
  const {authdata} = useContext(AuthContext);
  const [messages, setMessages] =  useState<any>([]);
  const [chatid, setchatid] = useState("")
  const [show, setShow] = useState(false);
  const [chattext, setchattext] = useState("")
  const textinput = useRef(null)
  const scrollViewRef = useRef();
  useEffect(()=>{
    const keyboardshowinglistener = Keyboard.addListener("keyboardDidShow", () => {
        console.log("it is showing")
        if(show){
          Keyboard.dismiss()
        }
        scrollViewRef.current.scrollToEnd({ animated: true })
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
      const chatRef = collection(db, "chatstwo",chatid,"messages" )
      const queryref =  query(chatRef, orderBy("createdAt"))
      unsub = onSnapshot(queryref, (docs) => {
        console.log("//************************* here we go ***************************//")
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
    const authId = "specc"
    try{
      let document;
      let id1id2 = `${authId}-${userId}`
      document = await getDoc(doc(db,"chatstwo",id1id2))
      
      if(document.exists()){
        // const chatRef = collection(db,"chatstwo",id1id2,"messages")
        // const queryref =  query(chatRef, orderBy("createdAt"))
        // const allmessages = await getDocs(queryref)
        // saveMessagesInStore(allmessages)
        setchatid(id1id2)
        return
      }
      const id2id1 = `${userId}-${authId}`
      document = await getDoc(doc(db,"chatstwo",id2id1))
      if(document.exists()){
        // const chatRef = collection(db,"chatstwo",id2id1,"messages")
        // const queryref =  query(chatRef, orderBy("createdAt"))
        // const allmessages = await getDocs(queryref)
        // saveMessagesInStore(allmessages)
        setchatid(id2id1)
        return
      }
      // create new document
      await setDoc(doc(db,"chatstwo",id1id2),{
        id1: authId,
        id2: userId
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
    const authId = "specc"
    const messageData = {
      message:chattext,
      sender:authId,
      createdAt: Date.now()
    }
    setMessages(messages=>[...messages, messageData])  
    setchattext("")
    try{
      await addDoc(collection(db,"chatstwo",chatid,"messages"),messageData)
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
        <TouchableOpacity onPress={()=>navigation.goBack()}>
          <Backarrow />
        </TouchableOpacity>
        <View style={styles.headerDetailsContainer}>
          {/* Image */}
          {/* <Image source={Chatimage} resizeMode="cover" /> */}
          <View  style={{width: 50, height: 50, backgroundColor: COLORS.grey3, borderRadius: 25}}/>
          <View style={{ marginLeft: 20 }}>
            <Text style={styles.chatName}>{userInfo.fullName}</Text>
            <View style={styles.chatStatusContainer}>
              <View style={styles.chatStatusDot} />
              <Text style={styles.chatStatusText}>Online</Text>
            </View>
          </View>
        </View>
      </View>
      <ScrollView style={styles.messageAreaContainer}  
      ref={scrollViewRef}
      onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}>
      {/* Messages area */}
      {messages.map(mes=>{

        if(mes.sender !== userId){
          return (
            <View key={mes.createdAt} style={styles.chatNotMe}>
              <View>
                <Text style={styles.chatNotMeColor}>{mes.message}</Text>
                <Text>{moment(mes.createdAt).format('LT')}</Text>
              </View>
            </View>  
          )
        }
        return (
          <View key={mes.createdAt} style={styles.chatToMe}>
            <View>
              <Text style={styles.chatToMeColor}>{mes.message}</Text>
              <Text style={styles.chatToMeTime}>{moment(mes.createdAt).format('LT')}</Text>
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
