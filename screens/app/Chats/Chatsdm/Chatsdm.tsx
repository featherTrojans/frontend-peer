import { TouchableOpacity, Text, View, Image, StatusBar, Button, ScrollView,TextInput } from "react-native";
import React, {useState, useEffect, useContext, useRef} from "react";
import { styles } from "./Chatsdm.styles";
import { COLORS, FONTS, fontsize, icons, images } from "../../../../constants";
import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, setDoc, query, orderBy, updateDoc  } from "firebase/firestore";
import { db } from "../../../../firebase";
import { AuthContext } from "../../../../context/AuthContext";
import Modal from "react-native-modal";
import moment, { fn } from "moment";
import { useNavigation } from "@react-navigation/native";
import { Bottombtn, InitialsBg } from "../../../../components";
import Customstatusbar from "../../../shared/Customstatusbar";
import { getBottomSpace } from "react-native-iphone-x-helper";
import LottieView from "lottie-react-native"
import { SafeAreaView } from "react-native-safe-area-context";


const { Backarrow, SendIcon, Outlinedlock, Successcheckanimate  } = icons;
const { Chatimage } = images;

const Chatsdm = ({navigation,route}) => {
  const {userInfo} = route.params
  const {authdata} = useContext(AuthContext);
  const [messages, setMessages] =  useState<any>([]);
  const [chatid, setchatid] = useState("")
  const [chattext, setchattext] = useState("")
  const [sendcashModal, setSendCashModal] = useState(false)
  const [chooseAmount, setChooseAmount] = useState(false)
  const [enterPin, setEnterPin] = useState(false)
  const [sendSuccess, setSendSuccess] = useState(false)
  
  const amounts = ["50", "100", "200", "500", "1,000", "2,000", "5,000"]

  const authId = authdata?.userDetails?.userUid
  console.log(messages)
  const scrollViewRef = useRef<ScrollView>();
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
    
    try{
      let document;
      let id1id2 = `${authId}-${userInfo.userUid}`
      document = await getDoc(doc(db,"chatstwo",id1id2))
      
      if(document.exists()){
        setchatid(id1id2)
        return
      }
      const id2id1 = `${userInfo.userUid}-${authId}`
      document = await getDoc(doc(db,"chatstwo",id2id1))
      if(document.exists()){
        setchatid(id2id1)
        return
      }
      // create new document
      await setDoc(doc(db,"chatstwo",id1id2),{
        id1: authId,
        id2: userInfo.userUid
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
    }catch(err){      
      console.log(err)
    }
  }


  const formatTime = (time) => {
    return `${moment(time).format('h:mm')}${moment(time).format('a')}`
  }


  const Chatsmodal = ({children, showState}) => {
    return(

      <Modal 
      style={{margin: 0, justifyContent: "flex-end",}} 
      isVisible={showState}
      backdropColor={COLORS.black}
      backdropOpacity={0.2}
      >
        <View style={styles.viewWrapper}>
          {children}
        </View>
      </Modal>
    )
  }

  return (
    <SafeAreaView
    style={styles.container}>
      {/* header section */}

      <Customstatusbar />      



        {/* Send cash or keep typing modal */}
        <Chatsmodal showState={sendcashModal}>
          
          <Text style={styles.sendCashHeader}>Hey Padi, want to send cash to Stephanie Okereke or is it just a text language?</Text>

              <View style={styles.sendCashWrapper}>

                  {/* First One */}
                  <View style={styles.sendCashButton}>
                    <View style={styles.buttonIconBg}>
                      {/* icons */}
                    </View>
                    <Text style={styles.buttonText}>Send Cash?</Text>
                  </View>

                  {/* Second Button */}
                  <View style={styles.sendCashButton}>
                    <View style={styles.buttonIconBg}>
                      {/* icons */}
                    </View>
                    <Text style={styles.buttonText}>Keep Typing?</Text>
                  </View>
              </View>
          
          </Chatsmodal>


        {/* Choose amount to send */}


        <Chatsmodal showState={chooseAmount}>
          <Text style={styles.chooseAmountHeader}>How much do you want to send?</Text>

          <View style={styles.amountBlockWrap}>
            <View style={{flexDirection: "row", alignItems: "center"}}>
              {/* minus icon */}

                <Text style={styles.addedAmountText}>N0.00</Text>
              {/* Add icon */}
            </View>
          </View>



          {/* Amount options */}
          <View style={styles.amountOptionsContainer}>
            {amounts.map((amount, index) => {
              return (
                <TouchableOpacity activeOpacity={0.8} key={index} style={styles.amountOption}>
                    <Text style={styles.amountOptionText}>N{amount}</Text>
                </TouchableOpacity>
              )
            })}
          </View>

          <TouchableOpacity style={styles.buttonWrapper}>
              <Text style={styles.buttonTextValue}>Proceed</Text>
          </TouchableOpacity>
        </Chatsmodal>   



      {/* Enter Secure Pin */}

      <Chatsmodal showState={enterPin}>

        <Text style={styles.securePinHeader}>Amount to send : <Text style={{...FONTS.bold}}>N5,000</Text> + N0 Charges</Text>

        <View style={styles.inputLockWrapper}>
          <Outlinedlock />
          <TextInput style={styles.securePinTextInput} placeholder="Enter your secure 4 digit PIN" placeholderTextColor={COLORS.grey2} maxLength={4} keyboardType="numeric" />
        </View>

        <TouchableOpacity style={styles.buttonWrapper}>
              <Text style={styles.buttonTextValue}>Transfer Cash</Text>
        </TouchableOpacity>

      </Chatsmodal>






              {/* Sending success Modal */}

      <Chatsmodal showState={sendSuccess}>
        <View style={{ alignItems: "center"}}>
        <LottieView source={Successcheckanimate} autoPlay loop style={{width: 118, height: 118, marginBottom: 15 }}/>
        <Text style={styles.sendingSuccessText}>Transaction Successful</Text>
        </View>
      </Chatsmodal>




     




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
      <ScrollView 
        style={styles.messageAreaContainer} 
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}>
      {/* Messages area */}
      

      {messages.map(mes=>{
          if(mes.sender === userInfo.userUid){
            return (
              <View key={mes.createdAt} style={styles.chatNotMe}>
                <View>
                  <View style={styles.chatNotMeColor}><Text  style={[styles.chatTextStyle,{color: COLORS.black}]}>{mes.message}</Text></View>
                  <Text style={[styles.chatToMeTime, {textAlign: "right"}]}>{formatTime(mes.createdAt)}</Text>
                </View>
              </View>  
            )
          }
          return (
            <View key={mes.createdAt} style={styles.chatToMe}>
              <View>
                 <View style={styles.chatToMeColor}><Text style={[styles.chatTextStyle,{color: COLORS.white}]} >{mes.message}</Text></View>
                <Text style={[styles.chatToMeTime, {textAlign: "right"}]}>{formatTime(mes.createdAt)}</Text>
              </View>
            </View>
          )
          })}
      
      {/* message input box */}
      </ScrollView>
      <View style={styles.chatTextContainer}>
        <View style={styles.inputarea}>
          <View style={styles.chatTextInput}>
            {/* <TouchableOpacity onPress={handleShowEmoji}>
              <SmileEmoji />
            </TouchableOpacity> */}
            <TextInput  placeholder="Enter Message" style={styles.textinput} value={chattext} onChangeText={text=>setchattext(text)}  />
            <TouchableOpacity style={{backgroundColor:"#003AD6", paddingHorizontal: 15,paddingVertical: 10, borderRadius:20 }} onPress={sendFireBaseMessage} >
              <Text style={{color:"#fff"}}>send</Text>
            </TouchableOpacity>
          </View>
        {/* <SendIcon /> */}
        </View>
        {/* {show &&<EmojiBoard containerStyle={{marginBottom: 5, position:"relative"}} showBoard={true} onClick={onClick} />} */}
      </View>
    </SafeAreaView>
  );
};

export default Chatsdm;
