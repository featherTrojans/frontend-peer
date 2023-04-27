import {
  TouchableOpacity,
  Text,
  View,
  ScrollView,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
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
import { InitialsBg, Mainwrapper } from "../../../../components";
import LottieView from "lottie-react-native";
import AllChatsModal from "./AllChatsModal";
import { usePushNotification } from "../../../../navigation";
import formatData from "../../../../utils/fomatTrans";
import useAlert from "../../../../utils/useAlerts";

const {
  Backarrow,
  Successtranfericon,
  Sendmessageicon,
  Feathecomingsoonchatanimate,
  Sentconfetti,
  SendTF,
} = icons;

type userinfoobj = {
  userUid;
  username;
  fullName;
  messageToken;
};

const Chatsdm = ({ navigation, route }) => {
  const userIn = route.params.userInfo as userinfoobj;
  const chatwithid = route.params.chatwithid;
  const [userInfo, setuserInfo] = useState(userIn);
  const { authdata } = useContext(AuthContext);
  const { errorAlert, successAlert } = useAlert();
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
  const animationRef = useRef<Lottie>(null);
  const textInputRef = useRef<TextInput>(null);

  const focus = () => {
    if (textInputRef.current !== null) {
      textInputRef.current.focus();
    }
  };

  const authId = authdata?.userDetails?.userUid;

  const { sendPushNotification, expoPushToken } = usePushNotification();

  const scrollViewRef = useRef<ScrollView>();

  useEffect(() => {
    if (chatwithid) {
      getUserInfo();
    }
  }, [chatwithid]);
  useEffect(() => {
    getThisChats();
  }, [userInfo]);

  const getUserInfo = async () => {
    try {
      setFetchmessage(true);
      const response = await axiosCustom.get(`/merchant/detail/${chatwithid}`);
      setuserInfo(response.data.data);
      setFetchmessage(false);
    } catch (err) {}
  };

  useEffect(() => {
    let unsub = () => {};
    setFetchmessage(true);
    if (chatid) {
      const chatRef = collection(db, "chatstwo", chatid, "messages");
      const queryref = query(chatRef, orderBy("createdAt"));
      unsub = onSnapshot(queryref, (docs) => {
        const newdata = [];
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
    // console.log("Send details", amount.value, userInfo?.username, userPin)

    if (userPin.length !== 4) {
      return;
    }
    setLoading(true);
    try {
      let response = await axiosCustom.post("/transfer", {
        amount: amount.value,
        transferTo: userInfo?.username,
        userPin: userPin,
      });

      setTimeout(() => {
        successAlert(response?.data?.message);
      }, 2000);
      setchattext("");
      setSendSuccess(true);
      setEnterPin(false);
      await sendFireBaseMessage("transfer");
      // animationRef.current?.play()
    } catch (err) {
      errorAlert(err);
      // console.log(err);
    } finally {
      setUserPin("");
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
    setAmount({ value: amount, name: text });
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
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 50,
            flex: 1,
          }}
        >
          <View style={{ flex: 1 }}>
            <LottieView
              source={Sentconfetti}
              loop={false}
              style={{
                width: "100%",
                height: 590,
                position: "absolute",
                left: -121,
                bottom: 0,
                zIndex: 1,
              }}
            />
            <Successtranfericon />
          </View>
          <View
            style={{
              borderWidth: 0.5,
              borderColor: COLORS.grey13,
              backgroundColor: COLORS.grey14,
              paddingHorizontal: 24,
              paddingTop: 9,
              paddingBottom: 13,
              marginTop: 10,
              borderRadius: 24,
              position: "relative",
            }}
          >
            <Text
              style={{
                ...fontsize.smallest,
                ...FONTS.bold,
                lineHeight: 24,
                color: COLORS.black,
                textAlign: "center",
              }}
            >
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
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 50,
          }}
        >
          <View style={{ flex: 1 }}>
            <LottieView
              source={Sentconfetti}
              ref={animationRef}
              loop={false}
              style={{
                width: "100%",
                height: 590,
                position: "absolute",
                left: -121,
                bottom: 0,
                zIndex: 1,
              }}
            />
            <Successtranfericon />
          </View>
          <View
            style={{
              borderWidth: 0.5,
              borderColor: COLORS.grey13,
              backgroundColor: COLORS.grey14,
              paddingHorizontal: 24,
              paddingTop: 9,
              paddingBottom: 13,
              marginTop: 10,
              borderRadius: 24,
            }}
          >
            <Text
              style={{
                ...fontsize.smallest,
                ...FONTS.bold,
                lineHeight: 24,
                color: COLORS.blue9,
                textAlign: "center",
              }}
            >
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
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
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
          inputFocus={focus}
        />
        <View style={styles.chatHeader}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{ paddingHorizontal: 10, paddingVertical: 8 }}
            onPress={() => navigation.goBack()}
          >
            <Backarrow />
          </TouchableOpacity>

          <View style={[styles.headerDetailsContainer]}>
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                activeOpacity={0.8}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  alignSelf: "flex-start",
                }}
              >
                <InitialsBg
                  sideLength={34}
                  name={userInfo?.fullName || "0 0"}
                />
                <Text style={styles.chatName}>{userInfo?.fullName}</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setSendCashModal(true)}
            >
              <SendTF style={{ marginRight: 10 }} />
            </TouchableOpacity>
          </View>
        </View>

        {fetchmessage ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <LottieView
              source={Feathecomingsoonchatanimate}
              autoPlay
              loop
              style={{ width: 160, height: 160 }}
            />
          </View>
        ) : (
          <>
            <ScrollView
              style={styles.messageAreaContainer}
              ref={scrollViewRef}
              contentContainerStyle={{ paddingTop: 20 }}
              showsVerticalScrollIndicator={false}
              bounces={false}
              onContentSizeChange={() =>
                scrollViewRef.current.scrollToEnd({ animated: true })
              }
            >
              {messages.map(({ data, time }, index: number) => {
                return (
                  <View key={index}>
                    <View
                      style={{
                        justifyContent: "center",
                        alignSelf: "center",
                        backgroundColor: COLORS.purple3,
                        paddingHorizontal: 16,
                        paddingVertical: 9,
                        borderRadius: 15,
                        marginVertical: 20,
                      }}
                    >
                      <Text
                        style={{
                          textAlign: "center",
                          ...fontsize.xsmallest,
                          ...FONTS.regular,
                          color: COLORS.purple2,
                        }}
                      >
                        {time}
                      </Text>
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
          </>
        )}

        <View style={styles.chatTextInput}>
          <TextInput
            ref={textInputRef}
            placeholder="Enter Message..."
            style={[
              styles.textinput,
              { ...FONTS.regular, color: COLORS.grey7, ...fontsize.smallest },
            ]}
            placeholderTextColor={COLORS.grey5}
            value={chattext}
            onChangeText={handleTextChange}
          />
          {chattext !== "" && (
            <Pressable hitSlop={20} onPress={() => sendFireBaseMessage()}>
              <Sendmessageicon />
            </Pressable>
          )}
        </View>
      </KeyboardAvoidingView>
    </Mainwrapper>
  );
};

export default Chatsdm;
