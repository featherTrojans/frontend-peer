import { TouchableOpacity, Text, View, ScrollView,TextInput, ImageBackground } from "react-native";
import React, {useState, useEffect, useContext, useRef} from "react";
import { styles } from "./Chatsdm.styles";
import { COLORS, FONTS, fontsize, icons, images } from "../../../../constants";
import { addDoc, collection, doc, getDoc, onSnapshot, setDoc, query, orderBy, updateDoc  } from "firebase/firestore";
import { db } from "../../../../firebase";
import { AuthContext } from "../../../../context/AuthContext";
import moment from "moment";
import axiosCustom from "../../../../httpRequests/axiosCustom";
const { Chatimage, chatbg } = images;
import { Bottombtn, InitialsBg } from "../../../../components";
import Customstatusbar from "../../../shared/Customstatusbar";
import LottieView from "lottie-react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import AllChatsModal from "./AllChatsModal";
import { usePushNotification } from "../../../../navigation";
import formatData from "../../../../utils/fomatTrans";




const { Backarrow, SendIcon, Outlinedlock,Plusicon,
  Minusicon,
  Arrowupicon,
  Lettercaseicon,Successtranfericon,Sendmessageicon, Successcheckanimate, Feathecomingsoonchatanimate, SendTF } = icons;



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
  const [fetchmessage, setFetchmessage] = useState(false)

  const authId = authdata?.userDetails?.userUid

  const { sendPushNotification, expoPushToken } = usePushNotification();

  const scrollViewRef = useRef<ScrollView>();
  
  useEffect(() => {    
    getThisChats()
}, [])

  useEffect(()=>{
    let unsub = ()=>{}
    setFetchmessage(true)
    if(chatid){ 
      const chatRef = collection(db, "chatstwo",chatid,"messages" )
      const queryref =  query(chatRef, orderBy("createdAt"))
      unsub = onSnapshot(queryref, (docs) => {
        const newdata = []
        docs.forEach((change) => { 
              newdata.push(change.data())
        });
        setMessages(formatData(newdata))
        // console.log(moment(newdata[0].createdAt), 'here is the propose message');
        // console.log(moment(newdata[0], "her4e is the date"));
        console.log(formatData(newdata), "formated data");
        
        
        
        setFetchmessage(false)
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
      // // create new document
      // await setDoc(doc(db,"chatstwo",id1id2),{
      //   id1: authId,
      //   id2: userInfo.userUid
      // })
      // setchatid(id1id2)
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
    let chatId = chatid;
    if(!chatid){
      // first create document
     chatId = `${authId}-${userInfo.userUid}`
      await setDoc(doc(db,"chatstwo",chatId),{
        id1: authId,
        id2: userInfo.userUid
      })
      setchatid(chatId)
    }
    let message = chattext;
    let createdAt =  Date.now();
    const messageData = {
      message: action === "message"? chattext: amount.name,
      sender:authId,
      createdAt: createdAt,
      action:action
    }
    console.log(messageData, "Message data from the chats")
    try{
      setchattext("")   
      await addDoc(collection(db,"chatstwo",chatId,"messages"),messageData)
      sendPushNotification(userInfo.messageToken, authdata?.userDetails.fullName, message, "Chatshome" )
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
    const amount = Number(text).toFixed(2);
    setAmount({value:amount, name:text});
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
    setUserPin("");
    // setAmount({value:0,name:""})
  }
  const clearModalsAll = ()=>{
    setSendCashModal(false)
    setChooseAmount(false)
    setEnterPin(false)
    setSendSuccess(false)
    setUserPin("");
    setAmount({value:0,name:""})
  }

  const renderReceiverHTML = (mes)=>{
    if(mes?.action === "transfer"){
      return (
        <View style={{justifyContent: "center", alignItems: "center", marginBottom:50}}>
          <Successtranfericon />
          <View style={{borderWidth: 0.5, borderColor: COLORS.grey13, backgroundColor: COLORS.grey14, paddingHorizontal: 24, paddingTop: 9, paddingBottom: 13,marginTop: 10, borderRadius: 24 }}>
            <Text style={{...fontsize.smallest, ...FONTS.bold, lineHeight: 24, color: COLORS.black, textAlign: "center"}}> 🎉 You sent  <Text style={{...FONTS.bold}}>N{mes.message}</Text> to this user</Text>
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
  }

  const renderSenderHTML = (mes)=>{
    if(mes?.action === "transfer"){
      return (
        <View style={{justifyContent: "center", alignItems: "center", marginBottom:50}}>
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
    <ImageBackground source={chatbg} style={{width:"100%", flex: 1}}>
    <SafeAreaView
    style={styles.container}>
      <Customstatusbar />      



      <AllChatsModal 
        sendcashModal={sendcashModal}
        chooseAmount={chooseAmount}
        enterPin={enterPin}
        sendSuccess={sendSuccess} 

        clearModals={clearModals}
        clearModalsAll={clearModalsAll}
        setChooseAmount={setChooseAmount}
        setSendCashModal={setSendCashModal}
        
        amount={amount}
        handleAmountChange={handleAmountChange}
        setAmount={setAmount}
        setEnterPin={setEnterPin}
        loading={loading}
        handlePinChange={handlePinChange}
        userPin={userPin}
        sendCash={sendCash}
      />



      <View style={styles.chatHeader}>
        <TouchableOpacity onPress={()=>navigation.goBack()}>
          <Backarrow />
        </TouchableOpacity>


        <View style={styles.headerDetailsContainer}>
          <InitialsBg sideLength={34} name={userInfo?.fullName || "0 0"} />
            <Text style={styles.chatName}>{userInfo.fullName}</Text>
          <TouchableOpacity activeOpacity={0.8} onPress={()=>setSendCashModal(true)}>
            <SendTF style={{marginRight: 10}} />
          </TouchableOpacity>
        </View>


      </View>



      {fetchmessage  ?
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
              <LottieView source={Feathecomingsoonchatanimate} autoPlay loop style={{ width: 160, height: 160 }}/>          
        </View>
        :





        <ScrollView 
        style={styles.messageAreaContainer} 
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        bounces={false}
        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}>



          {messages.map(({data, time}, index: number) => {
            return (
              <View key={index}>
              <View style={{justifyContent: "center", alignSelf: "center", backgroundColor: COLORS.purple3, paddingHorizontal: 16, paddingVertical: 9, borderRadius: 15}}>
                <Text style={{textAlign: "center", ...fontsize.xsmallest, ...FONTS.regular, color: COLORS.purple2}}>{time}</Text>
              </View>
              
              {data.map((dat, index) => {
                if(dat.sender === userInfo.userUid){
                  return (
                    <View key={index}>
                      {renderSenderHTML(dat) }
                    </View>
                  )
                }
                return (
                  <View key={index}>
                    {renderReceiverHTML(dat) }
                    </View>
                )
              })}
              </View>
            )
          })}
        {/* {messages.map(mes=>{
            if(mes.sender === userInfo.userUid){
              return (
                renderSenderHTML(mes) 
              )
            }
            return (
                renderReceiverHTML(mes) 
            )
          })} */}
      </ScrollView>



      }
      <View style={styles.chatTextContainer}>
        <View style={styles.inputarea}>
          <View style={styles.chatTextInput}>
            <TextInput  placeholder="Enter Message" style={[styles.textinput, {...FONTS.regular, color: COLORS.grey7}]} value={chattext} onChangeText={handleTextChange}  />
            {chattext !== ""  &&
              <TouchableOpacity activeOpacity={0.8}  onPress={()=>sendFireBaseMessage()} >
                <Sendmessageicon />
              </TouchableOpacity>
            }
          </View>
        </View>
      </View>
    </SafeAreaView>
      </ImageBackground>
  );
};

export default Chatsdm;
