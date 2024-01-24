import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import React, { useContext, useRef, useState, useEffect } from "react";
import { ChatsdmScreenStyles } from "../assets/styles/screens";
import {
  FTCustombutton,
  FTMainwrapper,
  FTOtherImage,
  FTQuickActionBtn,
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
import { useAlert, useCustomModal, usePushNotification } from "../hooks";
import { COLORS, FONTS, fontsize, icons } from "../constants";
import LottieView from "lottie-react-native";
import axiosCustom from "../httpRequests/axiosCustom";
import formatData, { formatTime } from "../utils/fomatTrans";
import { db } from "../utils/firebase";
import Animated from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import amountFormatter from "../utils/formatMoney";
import Loader from "../components/FTLoader";

const {
  chatTransferMsgWrap,
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
  emptyChatAnimation,
  messageAreaContainer,
  messagesDateWrap,
  messageDateText,
  chatTextInput,
  textinput,
  backArrowWrap,
  sendCashHeader,
  sendCashWrapper,
  sendCashButton,
  buttonIconBg,
  buttonText,
  chooseAmountHeader,
  transactionSuccessText,
  chooseAmountInputWrap,
  textInputStyle,
  emptyChatLoaderWrap,
} = ChatsdmScreenStyles;

const {
  Backarrow,
  Bluecardicon,
  Blacksendicon,
  Addchatsicon,
  Successtransfericon,
  Smalllockicon,
  Chattransfericon,
  Keeptypingicon,
  Feathecomingsoonchatanimate,
  Successcheckanimate,
  Blockusericon,
  Bigblockedusericon,
} = icons;

const PickOption = ({ userInfo, openAmount, closeModal }) => {
  return (
    <View style={{ backgroundColor: "#fff" }}>
      {/* <TextInput style={{height: 50, borderColor: "red", borderWidth: 1}}/> */}

      <Text style={sendCashHeader}>
        Hey Padi, want to send cash to{" "}
        <Text style={{ textTransform: "capitalize" }}>
          {" "}
          {userInfo?.fullName}
        </Text>{" "}
        or is it just a text language?
      </Text>

      <View style={sendCashWrapper}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={openAmount}
          style={[{ backgroundColor: COLORS.blue6 }, sendCashButton]}
        >
          <View style={buttonIconBg}>
            <Chattransfericon />
          </View>
          <Text style={buttonText}>Send Cash?</Text>
        </TouchableOpacity>

        {/* Second Button */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={closeModal}
          style={[{ backgroundColor: COLORS.grey16 }, sendCashButton]}
        >
          <View style={buttonIconBg}>
            <Keeptypingicon />
          </View>
          <Text style={buttonText}>Keep Typing?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const AmountToSend = ({ openTransactionPin }) => {
  const [amount, setAmount] = useState({ name: "0", value: 0 });
  const handleAmountChange = (text) => {
    const amount = Number(text).toFixed(2);
    setAmount({ value: Number(amount), name: text });
  };
  // console.log(amount, "yeyey");
  const handlenext = () => {
    openTransactionPin(amount);
  };

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
          // value={amount.value}
          onChangeText={handleAmountChange}
        />
      </View>

      <FTCustombutton btntext="Transfer Cash" onpress={handlenext} />
    </View>
  );
};

const TransactionPin = ({
  amount,
  sendFireBaseMessage,
  setchattext,
  setSendSuccess,
  userInfo,
}) => {
  const [userPin, setUserPin] = useState("");
  const [loading, setLoading] = useState(false);
  const { errorAlert } = useAlert();

  const handlePinChange = (text) => {
    setUserPin(text);
  };
  const sendCash = async () => {
    if (userPin.length !== 4) {
      return;
    }
    setLoading(true);
    Keyboard.dismiss();
    try {
      const response = await axiosCustom.post("/transfer", {
        amount: amount.value,
        transferTo: userInfo?.username,
        userPin: userPin,
      });

      setchattext("");
      setSendSuccess(true);
      await sendFireBaseMessage("transfer", amount);
      // animationRef.current?.play()
    } catch (err) {
      errorAlert(err);
      setUserPin("");
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={{ backgroundColor: "#fff" }}>
      <Text style={chooseAmountHeader}>
        Amount to send :{" "}
        <Text style={{ ...FONTS.bold }}>N{amountFormatter(amount.name)}</Text> +
        N0 Charges
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
        btntext={loading ? "Sending..." : "Transfer Cash"}
        onpress={sendCash}
      />
    </View>
  );
};

const ActionSuccess = () => {
  return (
    <View style={{ backgroundColor: "#fff", alignSelf: "center" }}>
      <LottieView
        source={Successcheckanimate}
        autoPlay
        loop
        style={emptyChatAnimation}
      />
      <Text style={transactionSuccessText}>Transaction Successful</Text>
    </View>
  );
};

const BlockedCard = ({ isBlockedByMe = false, unblockUser }) => {
  const { successAlert, errorAlert } = useAlert();
  const [load, setload] = useState(false);

  const handleunBlockUser = async () => {
    try {
      setload(true);
      await unblockUser();
      successAlert(
        "User has been unblocked succesfully, you can unblock this user anytime"
      );
    } catch (err) {
      errorAlert(null, "Unable to unblock this user, please try again");
    } finally {
      setload(false);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "flex-end" }}>
      <Loader loading={load} />
      <View
        style={{
          backgroundColor: COLORS.white,
          borderRadius: 28,
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 40,
        }}
      >
        <View
          style={{
            width: 70,
            height: 70,
            borderRadius: 70 / 2,
            backgroundColor: isBlockedByMe
              ? "rgba(255, 227, 227, 0.4)"
              : "rgba(119, 119, 119, 0.4)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* Iocn here  */}
          <Bigblockedusericon color={isBlockedByMe ? "#F50000" : "#777777"} />
        </View>

        <Text
          style={{
            ...fontsize.small,
            ...FONTS.medium,
            color: COLORS.black,
            width: "75%",
            textAlign: "center",
            paddingVertical: 35,
          }}
        >
          {isBlockedByMe
            ? "You blocked this user, unblock to continue sending chats to David."
            : "This user has blocked all chats from you, you cannot send any chat until unblocked by user."}
        </Text>

        {isBlockedByMe && (
          <FTQuickActionBtn
            icon={
              <Blockusericon
                color={isBlockedByMe ? COLORS.black : COLORS.red6}
              />
            }
            text={isBlockedByMe ? "Unblock User" : "Block User"}
            action={handleunBlockUser}
            bG={isBlockedByMe ? `rgba(206, 206, 206, .3)` : COLORS.Tred}
            color={isBlockedByMe ? COLORS.black : COLORS.red6}
          />
        )}
      </View>
    </View>
  );
};

const ChatsdmScreen = ({ route }) => {
  const userIn = route?.params?.userInfo;
  const chatwithid = route?.params?.chatwithid;
  const [userInfo, setuserInfo] = useState(userIn);
  const { authdata } = useContext(AuthContext);
  const [messages, setMessages] = useState<any>([]);
  const [chatid, setchatid] = useState("");
  const [chattext, setchattext] = useState("");
  const [blockid, setblockid] = useState("");
  const [amount, setAmount] = useState({ name: "0", value: 0 });
  const [fetchmessage, setFetchmessage] = useState(false);
  const animationRef = useRef<LottieView>(null);
  const textInputRef = useRef<TextInput>(null);
  const [showModal, setShowModal] = useState(false);
  const [content, setContent] = useState<any>({ child: null, height: 200 });
  const navigation = useNavigation();
  const [animHeight, setAnimHeight] = useState(0);

  const { CustomModal, openModal, closeModal } = useCustomModal();

  const focus = () => {
    if (textInputRef.current !== null) {
      textInputRef.current.focus();
    }
  };

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
        // check block column
        const doc = document.data();
        if (doc.blockedid && doc.blockedid !== "") {
          setblockid(doc.blockedid);
        }
        return;
      }
      const id2id1 = `${userInfo?.userUid}-${authId}`;
      document = await getDoc(doc(db, "chatstwo", id2id1));
      if (document.exists()) {
        setchatid(id2id1);
        const doc = document.data();
        if (doc.blockedid && doc.blockedid !== "") {
          setblockid(doc.blockedid);
        }
        return;
      }
    } catch (err) {}
  };

  const blockUser = async () => {
    try {
      await updateDoc(doc(db, "chatstwo", chatid), {
        blockedid: userInfo?.userUid,
      });
      setblockid(userInfo?.userUid);
      return "good";
    } catch (err) {
      console.log(err, "ANOTHER ERROR");
      throw err;
    }
  };

  const unblockUser = async () => {
    try {
      await updateDoc(doc(db, "chatstwo", chatid), {
        blockedid: "",
      });
      setblockid("");
      return "good";
    } catch (err) {
      throw err;
    }
  };

  const sendFireBaseMessage = async (action = "message", amount) => {
    if (chattext.trim() === "" && action === "message") return;
    if (fetchmessage) return;
    let chatId = chatid;
    if (!chatid) {
      // first create document
      setFetchmessage(true);
      chatId = `${authId}-${userInfo?.userUid}`;
      await setDoc(doc(db, "chatstwo", chatId), {
        id1: authId,
        id2: userInfo?.userUid,
        blockedid: "",
      });
      setchatid(chatId);
      setFetchmessage(false);
    }
    let message = chattext.trim();
    let createdAt = Date.now();
    const messageData = {
      message: action === "message" ? chattext.trim() : amount.name,
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

  const handleTextChange = (text) => {
    setchattext(text);
    if (text[text.length - 1] === "@") {
      switchModals(0);
    }
  };

  const renderReceiverHTML = (mes) => {
    if (mes?.action === "transfer") {
      return (
        <View style={chatTransferMsgWrap}>
          <View style={chatTransferTextBg}>
            <Text style={chatTransferText}>
              {" "}
              🎉 You sent{" "}
              <Text style={{ ...FONTS.bold }}>
                N{amountFormatter(mes.message)}
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
          </View>
          <View style={chatTransferTextBg}>
            <Text style={chatTransferText}>
              {" "}
              🎉 You just received{" "}
              <Text style={{ ...FONTS.bold }}>
                N{amountFormatter(mes.message)}
              </Text>{" "}
              from this user
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

  const switchModals = (value, amount) => {
    switch (value) {
      case 0:
        openMoxdal();
        setContent({
          child: (
            <PickOption
              closeModal={closeModal}
              openAmount={openAmount}
              userInfo={userInfo}
            />
          ),
          height: 150,
        });
        setShowModal((s) => !s);
        break;
      case 1:
        openModal();
        setContent({
          child: <AmountToSend openTransactionPin={openTransactionPin} />,
          height: 150,
        });
        setShowModal((s) => !s);
        break;
      case 2:
        setContent({
          child: (
            <TransactionPin
              amount={amount}
              sendFireBaseMessage={sendFireBaseMessage}
              setSendSuccess={openSuccess}
              setchattext={setchattext}
              userInfo={userInfo}
            />
          ),
          height: 150,
        });
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

  const openAmount = () => {
    setShowModal(false);
    switchModals(1);
  };

  const openTransactionPin = (amount) => {
    setShowModal(false);
    switchModals(2, amount);
  };

  const openSuccess = () => {
    setShowModal(false);
    switchModals(3);
  };

  return (
    <FTMainwrapper pH={0} bgColor={COLORS.white} childBg={COLORS.white3}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={40}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <CustomModal>
          <View style={{ height: content.height }}>{content.child}</View>
        </CustomModal>
        <View style={chatHeader}>
          <View style={[headerDetailsContainer]}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={navigation.goBack}
                style={backArrowWrap}
              >
                <Backarrow />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() =>
                  navigation.navigate("chatsprofile_screen", {
                    userInfo,
                    switchModals,
                    blockUser,
                    unblockUser,
                    blockid,
                  })
                }
                style={chatsDmProfileWrap}
              >
                <FTOtherImage
                  imageurl={userInfo?.imageUrl}
                  memojiImage={userInfo?.memoji}
                  fullname={userInfo?.fullName}
                />
                <View style={{ marginLeft: 18 }}>
                  <Text style={chatName}>{userInfo?.fullName}</Text>
                  {/* <Text style={chatLastSeen}>Last online : 2 hours ago</Text> */}
                </View>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              activeOpacity={0.7}
              style={{
                backgroundColor: COLORS.white3,
                padding: 12,
                borderRadius: 30,
              }}
              onPress={() => switchModals(0)}
            >
              <Blacksendicon />
            </TouchableOpacity>
          </View>
        </View>
        {blockid != "" ? (
          <BlockedCard
            isBlockedByMe={blockid != authId}
            unblockUser={unblockUser}
          />
        ) : (
          <>
            {fetchmessage ? (
              <View style={emptyChatLoaderWrap}>
                <LottieView
                  source={Feathecomingsoonchatanimate}
                  autoPlay
                  loop
                  style={emptyChatAnimation}
                />
              </View>
            ) : (
              <Animated.ScrollView
                style={messageAreaContainer}
                ref={scrollViewRef}
                contentContainerStyle={{
                  paddingVertical: 20,
                  justifyContent: "flex-end",
                }}
                showsVerticalScrollIndicator={false}
                bounces={false}
                snapToEnd={true}
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
                          return (
                            <View key={index}>{renderSenderHTML(dat)}</View>
                          );
                        }
                        return (
                          <View key={index}>{renderReceiverHTML(dat)}</View>
                        );
                      })}
                    </View>
                  );
                })}
              </Animated.ScrollView>
            )}
            <View style={chatTextInput}>
              <TextInput
                placeholder="Enter Message..."
                style={[textinput, { minHeight: 40, maxHeight: 120 }]}
                value={chattext}
                multiline={true}
                textAlignVertical="center"
                underlineColorAndroid="transparent"
                onChangeText={handleTextChange}
                placeholderTextColor={COLORS.grey16}
                enablesReturnKeyAutomatically={chattext.trim() == ""}
                onFocus={() =>
                  scrollViewRef?.current?.scrollToEnd({ animated: true })
                }
              />
              {chattext.trim() !== "" && (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => sendFireBaseMessage()}
                >
                  <Addchatsicon />
                </TouchableOpacity>
              )}
            </View>
          </>
        )}
      </KeyboardAvoidingView>
    </FTMainwrapper>
  );
};

export default ChatsdmScreen;

const styles = StyleSheet.create({});
