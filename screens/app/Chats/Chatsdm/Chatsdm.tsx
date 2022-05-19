import { TouchableOpacity, Text, View, Image, StatusBar, Button, ScrollView,TextInput } from "react-native";
import React, {useState, useEffect, useContext, useRef} from "react";
import { styles } from "./Chatsdm.styles";
import { COLORS, FONTS, fontsize, icons, images } from "../../../../constants";
import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, setDoc, query, orderBy, updateDoc  } from "firebase/firestore";
import { db } from "../../../../firebase";
import { AuthContext } from "../../../../context/AuthContext";
// import {  TextInput } from "react-native-gesture-handler";
import moment from "moment";
import EmojiBoard from 'react-native-emoji-board'
import { useNavigation } from "@react-navigation/native";
// import { StatusBar } from 'expo-status-bar'
// import moment from "moment";
import { InitialsBg } from "../../../../components";


const { Backarrow, SendIcon } = icons;
const { Chatimage } = images;

const Chatsdm = ({route}) => {
  const {userInfo} = route.params
  const {authdata} = useContext(AuthContext);
  const [messages, setMessages] =  useState<any>([]);
  const [chatid, setchatid] = useState("")
  const [chattext, setchattext] = useState("")
  const authId = authdata?.userDetails?.userUid
  console.log(messages)
  const scrollViewRef = useRef();
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
<<<<<<< HEAD
 
  
  const getThisChats = async ()=>{
    const authId = authdata?.userDetails?.userUid
    try{
      let document;
      let id1id2 = `${authId}-${userId}`
=======


  const getThisChats = async ()=>{
    
    try{
      let document;
      let id1id2 = `${authId}-${userInfo.userUid}`
>>>>>>> ee648520b42a39ff20a450998d2bc588a7202d45
      document = await getDoc(doc(db,"chatstwo",id1id2))
      
      if(document.exists()){
<<<<<<< HEAD
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
=======
        setchatid(id1id2)
        return
      }
      const id2id1 = `${userInfo.userUid}-${authId}`
      document = await getDoc(doc(db,"chatstwo",id2id1))
      if(document.exists()){
>>>>>>> ee648520b42a39ff20a450998d2bc588a7202d45
        setchatid(id2id1)
        return
      }
      // create new document
      await setDoc(doc(db,"chatstwo",id1id2),{
        id1: authId,
<<<<<<< HEAD
        id2: userId
=======
        id2: userInfo.userUid
>>>>>>> ee648520b42a39ff20a450998d2bc588a7202d45
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
<<<<<<< HEAD
    const authId = authdata?.userDetails?.userUid
    const messageData = {
      message:chattext,
      sender:authId,
      createdAt: Date.now()
    }
    setMessages(messages=>[...messages, messageData])  
    setchattext("")
    try{
      await addDoc(collection(db,"chatstwo",chatid,"messages"),messageData)
=======
    console.log("hi theerrerere mesage sending ")
    let message = chattext;
    let createdAt =  Date.now()
    const messageData = {
      message:chattext,
      sender:authId,
      createdAt: createdAt
    }
    try{
      setchattext("")
      await addDoc(collection(db,"chatstwo",chatid,"messages"),messageData)
      await updateDoc(doc(db,"chatstwo",chatid),{
        lastMessage: message,
        createdAt: createdAt
      })
>>>>>>> ee648520b42a39ff20a450998d2bc588a7202d45
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
          {/* <View  style={{width: 50, height: 50, backgroundColor: COLORS.grey3, borderRadius: 25}}/> */}
          <InitialsBg sideLength={50} name={userInfo?.fullName || "0 0"} />
          <View style={{ marginLeft: 20 }}>
            <Text style={styles.chatName}>{userInfo.fullName}</Text>
            <View style={styles.chatStatusContainer}>
              <View style={styles.chatStatusDot} />
              <Text style={styles.chatStatusText}>Online</Text>
            </View>
          </View>
        </View>
      </View>
<<<<<<< HEAD
      <ScrollView style={styles.messageAreaContainer}  
      ref={scrollViewRef}
      onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}>
=======
      <ScrollView 
        style={styles.messageAreaContainer} 
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}>
>>>>>>> ee648520b42a39ff20a450998d2bc588a7202d45
      {/* Messages area */}
      {messages.map(mes=>{

<<<<<<< HEAD
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
=======
      {messages.map(mes=>{
          if(mes.sender === userInfo.userUid){
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
      
      {/* message input box */}
      </ScrollView>
>>>>>>> ee648520b42a39ff20a450998d2bc588a7202d45
      <View style={styles.chatTextContainer}>
        <View style={styles.inputarea}>
          <View style={styles.chatTextInput}>
            {/* <TouchableOpacity onPress={handleShowEmoji}>
              <SmileEmoji />
            </TouchableOpacity> */}
<<<<<<< HEAD
            <TextInput ref={textinput} placeholder="Enter Message" style={styles.textinput} value={chattext} onChangeText={text=>setchattext(text)}  />
          </View>
          <Button onPress={sendFireBaseMessage} title="Press me to send" />
=======
            <TextInput  placeholder="Enter Message" style={styles.textinput} value={chattext} onChangeText={text=>setchattext(text)}  />
            <TouchableOpacity style={{backgroundColor:"#003AD6", paddingHorizontal: 15,paddingVertical: 10, borderRadius:20 }} onPress={sendFireBaseMessage} >
              <Text style={{color:"#fff"}}>send</Text>
            </TouchableOpacity>
          </View>
        {/* <SendIcon /> */}
>>>>>>> ee648520b42a39ff20a450998d2bc588a7202d45
        </View>
        {/* {show &&<EmojiBoard containerStyle={{marginBottom: 5, position:"relative"}} showBoard={true} onClick={onClick} />} */}
      </View>
    </View>
  );
};

export default Chatsdm;
