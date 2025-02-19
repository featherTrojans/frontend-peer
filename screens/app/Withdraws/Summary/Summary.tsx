import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";

import { COLORS, FONTS, fontsize, icons, SIZES } from "../../../../constants";
import { Bottombtn, Loader, Sendingandreceive } from "../../../../components";
import { styles } from "./Summary.styles";
import Globalmodal from "../../../shared/Globalmodal/Globalmodal";
import { AuthContext } from "../../../../context/AuthContext";
import LottieView from "lottie-react-native";
import amountFormatter from "../../../../utils/formatMoney";
import Customstatusbar from "../../../shared/Customstatusbar";
import { db } from "../../../../firebase";
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetFlatList,
} from "@gorhom/bottom-sheet";
import {
  doc,
  updateDoc,
  query,
  where,
  collection,
  addDoc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import axiosCustom from "../../../../httpRequests/axiosCustom";
import { RFValue } from "react-native-responsive-fontsize";

import { useToast } from "react-native-toast-notifications";
import showerror from "../../../../utils/errorMessage";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Modal from "react-native-modal";
import { SafeAreaView } from "react-native-safe-area-context";

const { Backarrow, Successcheckanimate } = icons;

const Summary = ({ navigation, route }) => {
  const { requestInfo } = route.params;
  const toast = useToast();
  const { authdata } = useContext(AuthContext);
  const [showmodal, setShowModal] = useState(false);
  const [showSuccessmodal, setShowSuccessModal] = useState(false);
  const [showFailuremodal, setShowFailureModal] = useState(false);
  const [agentInfo, setAgentInfo] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    firestoreListener();
  }, []);

  useEffect(() => {
    getAgentInfo();
  }, []);
  const getAgentInfo = async () => {
    try {
      const response = await axiosCustom.get(
        `/user/${requestInfo.agentUsername}`
      );
      setAgentInfo(response?.data?.data);
    } catch (err) {}
  };
  const handleReadyToReceive = async () => {
    // create a document first
    try {
      const docRef = await setDoc(
        doc(db, "withdrawtransfer", requestInfo.reference),
        {
          status: "pending",
        }
      );
      setShowModal(true);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  // const handlePrepareToTestUpdate = async ()=>{
  //   const washingtonRef = doc(db, "withdrawtransfer", "zyx");
  //     await updateDoc(washingtonRef, {
  //       status: "approved"
  //     });
  // }
  const firestoreListener = async () => {
    try {
      const unsub = onSnapshot(
        doc(db, "withdrawtransfer", requestInfo.reference),
        (doc) => {
          // if accepted, show the final modal
          if (doc?.data()?.status === "approved") {
            setShowModal(false);
            setShowSuccessModal(true);
          }
          if (doc?.data()?.status === "rejected") {
            setShowModal(false);
            setShowFailureModal(true);
          }
        }
      );
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handleCancelRequest = async () => {
    setLoading(true);
    try {
      await axiosCustom({
        method: "DELETE",
        url: "/request/cancel",
        data: {
          reference: requestInfo.reference,
          reasonForCancel: "agent declining withdraw request",
        },
      });
      navigation.navigate("Home");
    } catch (err) {
      showerror(toast, err);
    } finally {
      setLoading(false);
    }
  };
  // const handlePrepareToReceive = async ()=>{
  //   // create a document first
  //   try {
  //     const docRef = await addDoc(collection(db, "withdrawtransfer"), {
  //       reference:requestInfo.statusId
  //       status:"pending"
  //     });
  //     console.log("Document written with ID: ", docRef.id);
  //   } catch (e) {
  //     console.error("Error adding document: ", e);
  //   }
  //   setShowModal(true)
  // }
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, paddingTop: RFValue(20) }}>
        {/* icon on the left and text in the middle */}
        <Customstatusbar />
        {loading && <Loader />}

        {/* Starts here */}

        <Modal
          isVisible={showmodal}
          coverScreen={true}
          backdropColor="#000"
          backdropOpacity={0.2}
          animationInTiming={400}
          backdropTransitionInTiming={200}
          animationOut={"fadeOut"}
          animationOutTiming={150}
          style={{ margin: 0, flex: 1 }}
          // onBackdropPress={onBgPress}
        >
          <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheet snapPoints={["45%", "60%"]}>
              <View
                style={{
                  paddingTop: RFValue(40),
                  // flex: 1,
                  // backgroundColor: COLORS.blue1,
                  // alignItems: "center",
                  // justifyContent: "center",
                  paddingHorizontal: 15,
                }}
              >
                <View>
                  <View
                    style={{ alignItems: "center", marginBottom: RFValue(30) }}
                  >
                    <ActivityIndicator color={COLORS.blue6} size="large" />
                  </View>
                  <Text
                    style={{
                      lineHeight: 25,
                      ...FONTS.regular,
                      ...fontsize.bsmall,
                      textAlign: "center",
                      marginHorizontal: 20,
                    }}
                  >
                    Kindly input your transaction pin on{" "}
                    <Text style={{ textTransform: "capitalize" }}>
                      {requestInfo?.agent?.replace(/\s+/g, " ").split(" ")[1] ||
                        requestInfo?.agent}
                    </Text>
                    's device to complete the transaction, don’t worry it’s
                    safe✌🏽
                  </Text>

                  <View
                    style={{
                      justifyContent: "center",
                      backgroundColor: COLORS.pink1,
                      borderRadius: 22,
                      paddingTop: RFValue(16),
                      paddingBottom: RFValue(14),
                      paddingHorizontal: 27,
                      marginTop: RFValue(30),
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        ...fontsize.small,
                        ...FONTS.medium,
                        color: COLORS.white,
                      }}
                    >
                      3 failed pin attempts - Transaction declines
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={{
                      paddingTop: RFValue(26),
                      paddingBottom: RFValue(24),
                      justifyContent: "center",
                      backgroundColor: COLORS.red1,
                      borderRadius: RFValue(10),
                      marginTop: RFValue(40),
                    }}
                    onPress={handleCancelRequest}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        color: COLORS.white,
                        ...fontsize.smallest,
                        ...FONTS.bold,
                      }}
                    >
                      CANCEL REQUEST
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </BottomSheet>
          </GestureHandlerRootView>
        </Modal>

        <Globalmodal
          showState={showSuccessmodal}
          //  onBgPress={() => setShowSuccessModal(!showSuccessmodal)}
          btnFunction={() => {
            setShowSuccessModal(false);
            navigation.navigate("Transactionsrating", {
              userToRate: agentInfo.userUid,
              reference: requestInfo.reference,
              username: agentInfo.username,
              fullname: agentInfo.fullName,
            });
          }}
        >
          <View style={{ alignItems: "center", paddingVertical: RFValue(30) }}>
            <LottieView
              source={Successcheckanimate}
              autoPlay
              loop
              style={{ width: RFValue(148), height: RFValue(148) }}
            />
            <Text
              style={{
                marginBottom: RFValue(30),
                ...fontsize.bsmall,
                ...FONTS.medium,
              }}
            >
              Transaction Successful
            </Text>
            <Text
              style={{
                width: "60%",
                textAlign: "center",
                ...fontsize.bsmall,
                ...FONTS.regular,
              }}
            >
              You can dispute this transaction after 24 hours
            </Text>
          </View>
        </Globalmodal>
        <Globalmodal
          showState={showFailuremodal}
          onBgPress={() => setShowFailureModal(!showFailuremodal)}
          btnFunction={() =>
            navigation.navigate("Acceptedwithdraw", {
              requestInfo: requestInfo,
            })
          }
        >
          <View style={{ alignItems: "center", paddingVertical: RFValue(30) }}>
            {/* <LottieView source={Successcheckanimate} autoPlay loop style={{width: 148, height: 148}}/> */}
            <Text
              style={{
                marginBottom: RFValue(30),
                ...fontsize.bsmall,
                ...FONTS.regular,
              }}
            >
              Transaction Failed
            </Text>
            <Text
              style={{
                width: "60%",
                textAlign: "center",
                ...fontsize.bsmall,
                ...FONTS.regular,
              }}
            >
              Please try again later
            </Text>
          </View>
        </Globalmodal>
        <View style={styles.backArrow}>
          <Backarrow />
          <View style={styles.backArrowTextContainer}>
            <Text style={styles.backArrowText}>Transaction Summary</Text>
          </View>
          <View />
        </View>

        <ScrollView>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            {/* Sending and receiver component */}
            <Sendingandreceive
              senderName={authdata?.userDetails?.fullName}
              receiverName={
                requestInfo?.agent || requestInfo?.user?.agent || "A Z"
              }
              title="Wallet Credit"
            />

            {/* text of notification */}
            <View style={styles.notifyingTextContainer}>
              <Text style={styles.notifyingText}>
                You are initiating a payment transaction to{" "}
                <Text style={styles.notifyingSubText}>
                  {requestInfo?.agent}
                </Text>
              </Text>
            </View>
          </View>
          <View style={styles.tablesContainer}>
            {/* A table showin the transaction details */}
            <View>
              <View style={styles.tableContainer}>
                <Text style={styles.tableTitle}>Receiver</Text>
                <Text style={styles.tableValue}>
                  @{requestInfo?.agentUsername}
                </Text>
              </View>
              <View style={styles.bottomLine} />
            </View>
            <View>
              <View style={styles.tableContainer}>
                <Text style={styles.tableTitle}>Amount</Text>
                <Text style={styles.tableValue}>
                  NGN {amountFormatter(requestInfo?.amount)}
                </Text>
              </View>
              <View style={styles.bottomLine} />
            </View>
            <View>
              <View style={styles.tableContainer}>
                <Text style={styles.tableTitle}>Withdrawal Charge</Text>
                <Text style={styles.tableValue}>
                  + NGN{" "}
                  {amountFormatter(
                    `${+requestInfo?.charges + +requestInfo?.negotiatedFee}`
                  )}
                </Text>
              </View>
              <View style={styles.bottomLine} />
            </View>

            <View style={styles.tableContainer}>
              <Text style={styles.tableTitle}>Total</Text>
              <Text style={[styles.tableValue, { color: COLORS.blue6 }]}>
                NGN {amountFormatter(requestInfo?.total)}
              </Text>
            </View>
          </View>

          {/* Continue button below */}
        </ScrollView>
        <Bottombtn title="CONTINUE" onpress={handleReadyToReceive} />

      </View>
    </SafeAreaView>
  );
};

export default Summary;
