import {
  TouchableOpacity,
  Text,
  View,
  ScrollView,
  TextInput,
} from "react-native";
import React, { useState, useEffect, useContext, useRef } from "react";
import { styles } from "./Chatsdm.styles";
import { COLORS, FONTS, fontsize, icons } from "../../../../constants";
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
import { db } from "../../../../firebase";
import { AuthContext } from "../../../../context/AuthContext";
import moment from "moment";
import axiosCustom from "../../../../httpRequests/axiosCustom";
import { Backheader, InitialsBg, Mainwrapper } from "../../../../components";
import LottieView from "lottie-react-native";
import AllChatsModal from "./AllChatsModal";
import formatData from "../../../../utils/fomatTrans";
import { usePushNotification } from "../../../../hooks/usePushNotifications";
import useCustomModal from "../../../../utils/useCustomModal";

const {
  Backarrow,
  Feathecomingsoonchatanimate,
  Sentconfetti,
  Transfericon,
  Blacksendicon,
} = icons;

const Chatsdm = ({ navigation, route }) => {
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
      Icon: Blacksendicon,
      title: "Buzz",
    },
    {
      Icon: Blacksendicon,
      title: "Send",
    },
    {
      Icon: Blacksendicon,
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
        <View style={styles.chatTransferMsgWrap}>
          <View style={{ flex: 1 }}>
            <LottieView
              source={Sentconfetti}
              loop={false}
              style={styles.chatTransferAnim}
            />
            <Transfericon />
          </View>
          <View style={styles.chatTransferTextBg}>
            <Text style={styles.chatTransferText}>
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
      <View key={mes.createdAt} style={[styles.chatToMe, { flex: 1 }]}>
        <View style={{ maxWidth: "80%" }}>
          <View style={styles.chatToMeColor}>
            <Text style={[styles.chatTextStyle, { color: COLORS.white }]}>
              {mes.message}
            </Text>
          </View>
          <Text style={[styles.chatToMeTime, { textAlign: "right" }]}>
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
        <View style={styles.chatTransferMsgWrap}>
          <View style={{ flex: 1 }}>
            <LottieView
              source={Sentconfetti}
              ref={animationRef}
              loop={false}
              style={styles.chatTransferAnim}
            />
            {/* <Successtranfericon /> */}
            <Transfericon />
          </View>
          <View style={styles.chatTransferTextBg}>
            <Text style={styles.chatTransferText}>
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
      <View key={mes.createdAt} style={[styles.chatNotMe, { flex: 1 }]}>
        <View style={{ maxWidth: "80%" }}>
          <View style={styles.chatNotMeColor}>
            <Text style={[styles.chatTextStyle, { color: COLORS.blue9 }]}>
              {mes.message}
            </Text>
          </View>
          <Text style={[styles.chatToMeTime, { textAlign: "left" }]}>
            {formatTime(mes.createdAt)}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <Mainwrapper>
      <AllChatsModal
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

      <View style={styles.chatHeader}>
  
        <View style={[styles.headerDetailsContainer]}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => console.log("Clicked on the profile")}
            style={styles.chatsDmProfileWrap}
          >
            <InitialsBg sideLength={45} name={userInfo?.fullName || "0 0"} />
            <View style={{ marginLeft: 18 }}>
              <Text style={styles.chatName}>{userInfo?.fullName}</Text>
              <Text style={styles.chatLastSeen}>Last online : 2 hours ago</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setSendCashModal(true)}
          >
            <Blacksendicon />
          </TouchableOpacity>
        </View>
      </View>

 

      {fetchmessage ? (
        <View style={styles.emptyChatAnimation}>
          <LottieView
            source={Feathecomingsoonchatanimate}
            autoPlay
            loop
            style={styles.emptyChatAnimation}
          />
        </View>
      ) : (
        <ScrollView
          style={styles.messageAreaContainer}
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
                <View style={styles.messagesDateWrap}>
                  <Text style={styles.messageDateText}>{time}</Text>
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
      <View style={styles.chatTextContainer}>
        <View style={styles.inputarea}>
          <View style={styles.chatTextInput}>
            <TextInput
              placeholder="Enter Message"
              style={styles.textinput}
              value={chattext}
              onChangeText={handleTextChange}
            />
            {chattext !== "" && (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => sendFireBaseMessage()}
              >
                <Transfericon />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Mainwrapper>
  );
};

export default Chatsdm;
