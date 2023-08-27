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
import {
  FTAllChatsModal,
  FTCustombutton,
  FTIconwithbg,
  FTMainwrapper,
  FTTabWrapper,
  FTTitlepagewrapper,
} from "../components";

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
import Animated, {
  useAnimatedKeyboard,
  useAnimatedStyle,
} from "react-native-reanimated";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { SafeAreaView } from "react-native-safe-area-context";
import { navigation } from "../utils";

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
  backArrowWrap,

  viewWrapper,
  sendCashHeader,
  sendCashWrapper,
  sendCashButton,
  buttonIconBg,
  buttonText,
  chooseAmountHeader,
  securePinHeader,
  inputLockWrapper,
  securePinTextInput,
  chooseAmountInputWrap,
  textInputStyle,
} = ChatsdmScreenStyles;

const {
  Backarrow,
  Bluecardicon,
  Blacksendicon,
  Addchatsicon,
  Startnewchaticon,
  Successtransfericon,
  Smalllockicon,
  Smallbackarrow
} = icons;

const ChatsdmScreen = ({ route }) => {
  const userIn = route?.params?.userInfo;
  const chatwithid = route?.params?.chatwithid;
  const [userInfo, setuserInfo] = useState(userIn);
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
  const textInputRef = useRef<TextInput>(null);
  const [showModal, setShowModal] = useState(false);
  const [content, setContent] = useState<any>({ child: null, height: 200 });

  const focus = () => {
    if (textInputRef.current !== null) {
      textInputRef.current.focus();
    }
  };

  const authId = authdata?.userDetails?.userUid;

  const { sendPushNotification, expoPushToken } = usePushNotification();

  const scrollViewRef = useRef<ScrollView>(null);

  const keyboard = useAnimatedKeyboard();
  const translateStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: -keyboard.height.value }],
    };
  });

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
    if (chatwithid) {
      getUserInfo();
    }
  }, [chatwithid]);
  useEffect(() => {
    getThisChats();
  }, [userInfo]);

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

        setFetchmessage(false);
      });
    } else {
      setFetchmessage(false);
    }

    return () => {
      unsub();
    };
  }, [chatid]);

  const getUserInfo = async () => {
    try {
      setFetchmessage(true);
      const response = await axiosCustom.get(`/merchant/detail/${chatwithid}`);
      setuserInfo(response.data.data);
      setFetchmessage(false);
    } catch (err) {}
  };

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
    } catch (err) {}
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
    } catch (err) {}
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

  const renderReceiverHTML = (mes) => {
    if (mes?.action === "transfer") {
      return (
        <View style={chatTransferMsgWrap}>
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
            <Successtransfericon />
            {/* <Bluecardicon /> */}
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

  const switchModals = (value) => {
    switch (value) {
      case 0:
        setContent({ child: <PickOption />, height: 220 });
        setShowModal((s) => !s);
        break;
      case 1:
        setContent({ child: <AmountToSend />, height: 250 });
        setShowModal((s) => !s);
        break;
      case 2:
        setContent({ child: <TransactionPin />, height: 250 });
        setShowModal((s) => !s);
        break;
      case 3:
        setContent({ child: <ActionSuccess />, height: 250 });
        setShowModal((s) => !s);
        break;

      default:
        break;
    }
  };

  const closeModal = () => {
    setShowModal(false);
    // switchModals(1)
  };

  const openAmount = () => {
    setShowModal(false);
    switchModals(1);
  };
  const openTransactionPin = () => {
    setShowModal(false);
    switchModals(2);
  };

  const openSuccess = () => {
    setShowModal(false);
    switchModals(3);
  };

  const PickOption = () => {
    return (
      <View style={{ backgroundColor: "#fff" }}>
        <Text style={sendCashHeader}>
          Hey Padi, want to send cash to{" "}
          <Text style={{ textTransform: "capitalize" }}> Ayobami</Text> or is it
          just a text language?
        </Text>

        <View style={sendCashWrapper}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={openAmount}
            style={[{ backgroundColor: COLORS.blue5 }, sendCashButton]}
          >
            <View style={buttonIconBg}>
              <Blacksendicon />
            </View>
            <Text style={buttonText}>Send Cash?</Text>
          </TouchableOpacity>

          {/* Second Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={closeModal}
            style={[{ backgroundColor: COLORS.purple }, sendCashButton]}
          >
            <View style={buttonIconBg}>
              <Blacksendicon />
            </View>
            <Text style={buttonText}>Keep Typing?</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const AmountToSend = () => {
    return (
      <View>
        <Text style={chooseAmountHeader}>How much to send?</Text>

        <View style={chooseAmountInputWrap}>
          <Smalllockicon />
          <TextInput
            style={textInputStyle}
            placeholder="Enter Amount"
            placeholderTextColor={COLORS.grey2}
            keyboardType="number-pad"
          />
        </View>

        <FTCustombutton btntext="Transfer Cash" onpress={openTransactionPin} />
      </View>
    );
  };

  const TransactionPin = () => {
    return (
      <View style={{ backgroundColor: "#fff" }}>
        <Text style={chooseAmountHeader}>
          Amount to send : <Text style={{ ...FONTS.bold }}>N{amount.name}</Text>{" "}
          + N0 Charges
        </Text>

        <View style={chooseAmountInputWrap}>
          <Smalllockicon />
          <TextInput
            style={textInputStyle}
            secureTextEntry={true}
            placeholder="Enter your secure 4 digit PIN"
            placeholderTextColor={COLORS.grey2}
            onChangeText={handlePinChange}
            value={userPin}
            maxLength={4}
            keyboardType="number-pad"
          />
        </View>

        <FTCustombutton
          disable={loading}
          btntext="Transfer Cash"
          onpress={() => console.log("Send the cash")}
        />
      </View>
    );
  };

  const ActionSuccess = () => {
    return (
      <View style={{ backgroundColor: "#fff" }}>
        <Text onPress={() => console.log("Yes bajhdb anndsk hj")}>
          Scuessfull
        </Text>
      </View>
    );
  };

  return (
    <FTTabWrapper
      pH={0}
      bgColor={COLORS.white}
      childBg={COLORS.white3}
      modalChildren={content.child}
      showModal={showModal}
      setShowModal={setShowModal}
      modalHeight={content.height}
    >
      {/* Header Section */}
      <View style={chatHeader}>
        <View style={[headerDetailsContainer]}>
          <TouchableOpacity activeOpacity={0.7} onPress={navigation.goBack} style={backArrowWrap}>
            <Smallbackarrow /> 
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate("chatsprofile_screen", {
                userInfo,
                switchModals,
              })
            }
            style={chatsDmProfileWrap}
          >
            <FTIconwithbg bG={COLORS.Tyellow} Icon={Blacksendicon} />
            <View style={{ marginLeft: 18 }}>
              <Text style={chatName}>{userInfo?.fullName}</Text>
              {/* <Text style={chatLastSeen}>Last online : 2 hours ago</Text> */}
            </View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} onPress={() => switchModals(0)}>
            <Blacksendicon />
          </TouchableOpacity>
        </View>
      </View>

      <Animated.View style={[{ flex: 1 }]}>
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
            contentContainerStyle={{ paddingTop: 20, paddingBottom: 100 }}
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

        {/* Bottom Input */}
        <View style={[chatTextContainer]}>
          <View style={chatTextInput}>
            <TextInput
              placeholder="Enter Message..."
              style={textinput}
              value={chattext}
              onChangeText={handleTextChange}
              placeholderTextColor={COLORS.grey16}
              returnKeyType="done"
            />
            {chattext !== "" && (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => sendFireBaseMessage()}
              >
                <Addchatsicon />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Animated.View>
    </FTTabWrapper>
  );
};

export default ChatsdmScreen;

const styles = StyleSheet.create({});
