import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import React, { useContext, useRef, useState, useEffect } from "react";
import { ChatsdmScreenStyles } from "../assets/styles/screens";
import { FTAllChatsModal, FTTitlepagewrapper } from "../components";
import { AuthContext } from "../context/AuthContext";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
  query,
  orderBy,
  updateDoc,
} from "firebase/firestore";
import { useCustomModal, usePushNotification } from "../hooks";
import { COLORS, FONTS, fontsize, icons } from "../constants";
import LottieView from "lottie-react-native";
import axiosCustom from "../httpRequests/axiosCustom";
import formatData from "../utils/fomatTrans";
import { db } from "../utils/firebase";
import moment from "moment";



const {
  chatTransferMsgWrap,
  chatTransferAnim,
  chatTransferTextBg,
  chatTransferText,
  chatToMe,
  chatToMeColor,
  chatTextStyle,
  chatToMeTime,
  chatNotMe,
  chatNotMeColor,
  chatHeader,
  headerDetailsContainer,
  chatsDmProfileWrap,
  chatName,
  chatLastSeen,
  emptyChatAnimation,
  messageAreaContainer,
  messagesDateWrap,
  messageDateText,
  chatTextContainer,
  inputarea,
  chatTextInput,
  textinput,
} = ChatsdmScreenStyles;

const { Backarrow, Bluecardicon } =
  icons;


const ChatsdmScreen = ({ route }) => {
  const { userInfo } = route.params;
  const { authdata } = useContext(AuthContext);
  const [messages, setMessages] = useState<any>([]);
  const [chatid, setchatid] = useState("");
  const [chattext, setchattext] = useState("");
  const [amount, setAmount] = useState({ name: "0", value: 0 });
  const [userPin, setUserPin] = useState("");
  const [sendcashModal, setSendCashModal] = useState(false);
  const [chooseAmount, setChooseAmount] = useState(false);
  const [enterPin, setEnterPin] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetchmessage, setFetchmessage] = useState(false);
  const animationRef = useRef<LottieView>(null);

  const authId = authdata?.userDetails?.userUid;

  const { sendPushNotification, expoPushToken } = usePushNotification();

  const scrollViewRef = useRef<ScrollView>(null);

  const profileactions = [
    {
      Icon: Bluecardicon,
      title: "Buzz",
    },
    {
      Icon: Bluecardicon,
      title: "Send",
    },
    {
      Icon: Bluecardicon,
      title: "Clear Chat",
    },
  ];

  useEffect(() => {
    getThisChats();
  }, []);

  useEffect(() => {
    let unsub = () => {};
    setFetchmessage(true);
    if (chatid) {
      const chatRef = collection(db, "chatstwo", chatid, "messages");
      const queryref = query(chatRef, orderBy("createdAt"));
      unsub = onSnapshot(queryref, (docs) => {
        const newdata = [{}];
        docs.forEach((change) => {
          newdata.push(change.data());
        });
        setMessages(formatData(newdata));
        console.log(formatData(newdata), "formated data");
        setFetchmessage(false);
      });
    } else {
      setFetchmessage(false);
    }

    return () => {
      unsub();
    };
  }, [chatid]);

  const getThisChats = async () => {
    try {
      let document;
      let id1id2 = `${authId}-${userInfo?.userUid}`;
      document = await getDoc(doc(db, "chatstwo", id1id2));

      if (document.exists()) {
        setchatid(id1id2);
        return;
      }
      const id2id1 = `${userInfo?.userUid}-${authId}`;
      document = await getDoc(doc(db, "chatstwo", id2id1));
      if (document.exists()) {
        setchatid(id2id1);
        return;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const sendCash = async () => {
    if (userPin.length !== 4) {
      return;
    }
    setLoading(true);
    try {
      await axiosCustom.post("/transfer", {
        amount: amount.value,
        transferTo: userInfo?.username,
        userPin: userPin,
      });
      setchattext("");
      setSendSuccess(true);
      await sendFireBaseMessage("transfer");
      // animationRef.current?.play()
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const sendFireBaseMessage = async (action = "message") => {
    if (chattext === "" && action === "message") return;
    if (fetchmessage) return;
    let chatId = chatid;
    if (!chatid) {
      // first create document
      setFetchmessage(true);
      chatId = `${authId}-${userInfo?.userUid}`;
      await setDoc(doc(db, "chatstwo", chatId), {
        id1: authId,
        id2: userInfo?.userUid,
      });
      setchatid(chatId);
      setFetchmessage(false);
    }
    let message = chattext;
    let createdAt = Date.now();
    const messageData = {
      message: action === "message" ? chattext : amount.name,
      sender: authId,
      createdAt: createdAt,
      action: action,
    };
    try {
      setchattext("");
      await addDoc(collection(db, "chatstwo", chatId, "messages"), messageData);
      sendPushNotification(
        userInfo?.messageToken,
        authdata?.userDetails.fullName,
        message,
        "Chatshome"
      );
      if (action === "message") {
        await updateDoc(doc(db, "chatstwo", chatid), {
          lastMessage: message,
          createdAt: createdAt,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const formatTime = (time) => {
    return `${moment(time).format("h:mm")}${moment(time).format("a")}`;
  };

  const handlePinChange = (text) => {
    setUserPin(text);
  };
  const handleAmountChange = (text) => {
    const amount = Number(text).toFixed(2);
    setAmount({ value: Number(amount), name: text });
  };
  const handleTextChange = (text) => {
    setchattext(text);
    if (text[text.length - 1] === "@") {
      setSendCashModal(true);
    }
  };

  const clearModals = () => {
    setSendCashModal(false);
    setChooseAmount(false);
    setEnterPin(false);
    setSendSuccess(false);
    setUserPin("");
    // setAmount({value:0,name:""})
  };
  const clearModalsAll = () => {
    setSendCashModal(false);
    setChooseAmount(false);
    setEnterPin(false);
    setSendSuccess(false);
    setUserPin("");
    setAmount({ value: 0, name: "" });
  };

  const renderReceiverHTML = (mes) => {
    if (mes?.action === "transfer") {
      return (
        <View style={chatTransferMsgWrap}>
          <View style={{ flex: 1 }}>
          </View>
          <View style={chatTransferTextBg}>
            <Text style={chatTransferText}>
              {" "}
              🎉 You sent <Text style={{ ...FONTS.bold }}>
                N{mes.message}
              </Text>{" "}
              to this user
            </Text>
          </View>
        </View>
      );
    }
    return (
      <View key={mes.createdAt} style={[chatToMe, { flex: 1 }]}>
        <View style={{ maxWidth: "80%" }}>
          <View style={chatToMeColor}>
            <Text style={[chatTextStyle, { color: COLORS.white }]}>
              {mes.message}
            </Text>
          </View>
          <Text style={[chatToMeTime, { textAlign: "right" }]}>
            {formatTime(mes.createdAt)}
          </Text>
        </View>
      </View>
    );
  };

  const renderSenderHTML = (mes) => {
    if (mes?.action === "transfer") {
      if (Date.now() - 60000 < mes.createdAt) {
        animationRef?.current?.play();
      }

      return (
        <View style={chatTransferMsgWrap}>
        <View style={{ flex: 1 }}>
          {/* <LottieView
            source={Sentconfetti}
            ref={animationRef}
            loop={false}
            style={chatTransferAnim}
          /> */}
          {/* <Successtranfericon /> */}
          <Bluecardicon />
        </View>
        <View style={chatTransferTextBg}>
          <Text style={chatTransferText}>
            {" "}
            🎉 You just received{" "}
            <Text style={{ ...FONTS.bold }}>N{mes.message}</Text> from this
            user
          </Text>
        </View>
      </View>
      );
    }
    return (
      <View key={mes.createdAt} style={[chatNotMe, { flex: 1 }]}>
        <View style={{ maxWidth: "80%" }}>
          <View style={chatNotMeColor}>
            <Text style={[chatTextStyle, { color: COLORS.blue9 }]}>
              {mes.message}
            </Text>
          </View>
          <Text style={[chatToMeTime, { textAlign: "left" }]}>
            {formatTime(mes.createdAt)}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <FTTitlepagewrapper>
      <FTAllChatsModal
        nameOfActiveChat={userInfo?.fullName}
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

      <View style={chatHeader}>
        <View style={[headerDetailsContainer]}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => console.log("Clicked on the profile")}
            style={chatsDmProfileWrap}
          >
            <View style={{ marginLeft: 18 }}>
              <Text style={chatName}>{userInfo?.fullName}</Text>
              <Text style={chatLastSeen}>Last online : 2 hours ago</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setSendCashModal(true)}
          >
            <Bluecardicon />
          </TouchableOpacity>
          
        </View>
      </View>

      {fetchmessage ? (
        <View style={emptyChatAnimation}>
             {/* <LottieView
            source={Feathecomingsoonchatanimate}
            autoPlay
            loop
            style={styles.emptyChatAnimation}
          /> */}
        </View>
      ) : (
        <ScrollView
          style={messageAreaContainer}
          ref={scrollViewRef}
          contentContainerStyle={{ paddingTop: 20 }}
          showsVerticalScrollIndicator={false}
          bounces={false}
          onContentSizeChange={() =>
            scrollViewRef?.current?.scrollToEnd({ animated: true })
          }
        >
          {messages.map(({ data, time }, index: number) => {
            return (
              <View key={index}>
                <View style={messagesDateWrap}>
                  <Text style={messageDateText}>{time}</Text>
                </View>

                {data.map((dat, index) => {
                  if (dat.sender === userInfo?.userUid) {
                    return <View key={index}>{renderSenderHTML(dat)}</View>;
                  }
                  return <View key={index}>{renderReceiverHTML(dat)}</View>;
                })}
              </View>
            );
          })}
        </ScrollView>
      )}
      <View style={chatTextContainer}>
        <View style={inputarea}>
          <View style={chatTextInput}>
            <TextInput
              placeholder="Enter Message"
              style={textinput}
              value={chattext}
              onChangeText={handleTextChange}
            />
            {chattext !== "" && (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => sendFireBaseMessage()}
              >
                <Bluecardicon />
              </TouchableOpacity>
            )}
            
          </View>
        </View>
      </View>
    </FTTitlepagewrapper>
  );
};

export default ChatsdmScreen;

const styles = StyleSheet.create({});
