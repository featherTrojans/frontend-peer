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
// import { StatusBar } from 'expo-status-bar'
// import moment from "moment";
import axiosCustom from "../../../../httpRequests/axiosCustom";
const { Backarrow, SendIcon, Outlinedlock,Plusicon,
  Minusicon,
  Arrowupicon,
  Lettercaseicon,Successtranfericon,Sendmessageicon, Successcheckanimate  } = icons;
const { Chatimage } = images;
import { Bottombtn, InitialsBg } from "../../../../components";
import Customstatusbar from "../../../shared/Customstatusbar";
import { getBottomSpace } from "react-native-iphone-x-helper";
import LottieView from "lottie-react-native"
import { SafeAreaView } from "react-native-safe-area-context";

const amounts = [
  {name:"50", value:50},
  {name: "100", value:100}, 
  {name:"200",value:200},
  {name: "500", value:500},
  {name: "1,000", value:1000}, 
  {name:"2,000",value:2000},
  {name: "5,000", value:5000}
]


const Chatsmodal = ({children, showState, onBgPress=()=>{}}) => {
  return(

    <Modal 
    style={{margin: 0, justifyContent: "flex-end",}} 
    isVisible={showState}
    backdropColor={COLORS.black}
    backdropOpacity={0.2}
    onBackdropPress={onBgPress}
    >
      <View style={styles.viewWrapper}>
        {children}
      </View>
    </Modal>
  )
}

const Chatsdm = ({navigation,route}) => {
  const {userInfo} = route.params
  const {authdata} = useContext(AuthContext);
  const [messages, setMessages] =  useState<any>([]);
  const [chatid, setchatid] = useState("")
  const [chattext, setchattext] = useState("")
  const [amount, setAmount ] = useState({name:"0",value:0})
  const [userPin, setUserPin] = useState("")
  const [sendcashModal, setSendCashModal] = useState(false)
  const [chooseAmount, setChooseAmount] = useState(false)
  const [enterPin, setEnterPin] = useState(false)
  const [sendSuccess, setSendSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const authId = authdata?.userDetails?.userUid
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

  const sendCash = async ()=>{
    if(userPin.length !== 4){
      return
    }
    setLoading(true)
    try{
      await axiosCustom.post("/transfer",{
        amount:amount.value,
        transferTo:userInfo.username,
        userPin:userPin
      })
      setchattext("")
      setSendSuccess(true)
      await sendFireBaseMessage("transfer")
    }catch(err){
      console.log(err)
    }finally{
      setLoading(false)
    }
  }

  const sendFireBaseMessage = async (action="message") =>{
    if(chattext === "" && action === "message") return 
    let message = chattext;
    let createdAt =  Date.now()
    const messageData = {
      message: action === "message"? chattext: amount.name,
      sender:authId,
      createdAt: createdAt,
      action:action
    }
    console.log(messageData)
    try{
      setchattext("")
      await addDoc(collection(db,"chatstwo",chatid,"messages"),messageData)
      if(action === "message"){
        await updateDoc(doc(db,"chatstwo",chatid),{
          lastMessage: message,
          createdAt: createdAt,
        })
      }
    }catch(err){      
      console.log(err)
    }
  }


  const formatTime = (time) => {
    return `${moment(time).format('h:mm')}${moment(time).format('a')}`
  }

  const handlePinChange= (text)=>{
    setUserPin(text)
  }
  const handleAmountChange = text=>{
    const amount = Number(text)
    setAmount(text)
  }
  const handleTextChange = (text)=>{
    setchattext(text)
    if(text[text.length - 1] === "@"){
      setSendCashModal(true)
    }
  }

  const clearModals = ()=>{
    setSendCashModal(false)
    setChooseAmount(false)
    setEnterPin(false)
    setSendSuccess(false)
    setUserPin("")
  }

  const renderReceiverHTML = (mes)=>{
    
    return (
      <View key={mes.createdAt} style={styles.chatToMe}>
        <View>
            <View style={styles.chatToMeColor}><Text style={[styles.chatTextStyle,{color: COLORS.white}]} >{mes.message}</Text></View>
          <Text style={[styles.chatToMeTime, {textAlign: "right"}]}>{formatTime(mes.createdAt)}</Text>
        </View>
      </View>
    )
  }

  const renderSenderHTML = (mes)=>{
    if(mes?.action === "transfer"){
      return (
        <View style={{justifyContent: "center", alignItems: "center"}}>
          <Successtranfericon />
          <View style={{borderWidth: 0.5, borderColor: COLORS.grey13, backgroundColor: COLORS.grey14, paddingHorizontal: 24, paddingTop: 9, paddingBottom: 13,marginTop: 10, borderRadius: 24 }}>
            <Text style={{...fontsize.smallest, ...FONTS.bold, lineHeight: 24, color: COLORS.black, textAlign: "center"}}> 🎉 You just received  <Text style={{...FONTS.bold}}>N{mes.message}</Text> from this user</Text>
          </View>
        </View>
      )
    }
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
    <SafeAreaView
    style={styles.container}>
      {/* header section */}

      <Customstatusbar />      



        {/* Send cash or keep typing modal */}
        <Chatsmodal showState={sendcashModal} onBgPress={clearModals}>
          
          <Text style={styles.sendCashHeader}>Hey Padi, want to send cash to Stephanie Okereke or is it just a text language?</Text>

              <View style={styles.sendCashWrapper}>

                  {/* First One */}
                  <TouchableOpacity activeOpacity={0.8} onPress={()=>setChooseAmount(true)} style={[ {backgroundColor: COLORS.blue5},   styles.sendCashButton]}>
                    <View style={styles.buttonIconBg}>
                      <Arrowupicon />
                    </View>
                    <Text style={styles.buttonText}>Send Cash?</Text>
                  </TouchableOpacity>

                  {/* Second Button */}
                  <TouchableOpacity activeOpacity={0.8} onPress={()=>setSendCashModal(false)} style={[{backgroundColor: COLORS.purple},   styles.sendCashButton]}>
                    <View style={styles.buttonIconBg}>
                      <Lettercaseicon />
                    </View>
                    <Text style={styles.buttonText}>Keep Typing?</Text>
                  </TouchableOpacity>
              </View>
          
          </Chatsmodal>


        {/* Choose amount to send */}


        <Chatsmodal showState={chooseAmount} onBgPress={clearModals}>
          <Text style={styles.chooseAmountHeader}>How much do you want to send?</Text>

          <View style={styles.amountBlockWrap}>
            <View style={{flexDirection: "row", alignItems: "center"}}>
              {/* minus icon */}
                {/* <Minusicon /> */}
                <TextInput style={styles.addedAmountText} keyboardType="numeric" placeholder="N0.00" value={amount} onChangeText={handleAmountChange} />
                {/* <Text style={styles.addedAmountText}>N0.00</Text> */}
              {/* Add icon */}
              {/* <Plusicon /> */}
            </View>
          </View>
          {/* Amount options */}
          <View style={styles.amountOptionsContainer}>
            {amounts.map((item, index) => {
              return (
                <TouchableOpacity onPress={()=>{setAmount(item);clearModals(); setEnterPin(true)}} activeOpacity={0.8} key={index} style={styles.amountOption}>
                    <Text style={styles.amountOptionText}>N{item.name}</Text>
                </TouchableOpacity>
              )
            })}
          </View>

          <TouchableOpacity style={styles.buttonWrapper} onPress={()=>{clearModals(); setEnterPin(true)}}>
              <Text style={styles.buttonTextValue}>Proceed</Text>
          </TouchableOpacity>
        </Chatsmodal>   



      {/* Enter Secure Pin */}

      <Chatsmodal showState={enterPin} onBgPress={loading?()=>{}:clearModals} >

        <Text style={styles.securePinHeader}>Amount to send : <Text style={{...FONTS.bold}}>N{amount.name}</Text> + N0 Charges</Text>

        <View style={styles.inputLockWrapper}>
          <Outlinedlock />
          <TextInput style={styles.securePinTextInput}
          secureTextEntry={true} 
          placeholder="Enter your secure 4 digit PIN" 
          placeholderTextColor={COLORS.grey2} 
          onChangeText={handlePinChange}
          value={userPin}
          maxLength={4} 
          keyboardType="numeric" />
        </View>

        <TouchableOpacity disabled={loading} activeOpacity={0.8} onPress={sendCash} style={ [styles.buttonWrapper,{opacity: (loading ? 0.8: 1) } ]}>
              <Text style={styles.buttonTextValue}>Transfer Cash</Text>
        </TouchableOpacity>

      </Chatsmodal>






              {/* Sending success Modal */}

      <Chatsmodal showState={sendSuccess} onBgPress={clearModals}>
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
            {/* <View style={styles.chatStatusContainer}>
              <View style={styles.chatStatusDot} />
              <Text style={styles.chatStatusText}>Online</Text>
            </View> */}
          </View>
        </View>
      </View>
      <ScrollView 
        style={styles.messageAreaContainer} 
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        bounces={false}
        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}>
      {/* Messages area */}

      {messages.map(mes=>{
          if(mes.sender === userInfo.userUid){
            return (
              renderSenderHTML(mes) 
            )
          }
          return (
              renderReceiverHTML(mes) 
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
            <TextInput  placeholder="Enter Message" style={[styles.textinput, {...FONTS.regular, color: COLORS.grey7}]} value={chattext} onChangeText={handleTextChange}  />


            <TouchableOpacity activeOpacity={0.8}  onPress={()=>sendFireBaseMessage()} >
              <Sendmessageicon />
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
