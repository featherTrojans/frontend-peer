import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { COLORS, FONTS, fontsize, icons } from "../../../../constants";
import { Bottombtn, Sendingandreceive } from "../../../../components";
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
import { TouchableOpacity } from "react-native-gesture-handler";

const { Backarrow, Successcheckanimate } = icons;

const Summary = ({ navigation, route }) => {
  const { requestInfo } = route.params;
  const { authdata } = useContext(AuthContext);
  const [showmodal, setShowModal] = useState(false);
  const [showSuccessmodal, setShowSuccessModal] = useState(false);
  const [showFailuremodal, setShowFailureModal] = useState(false);
  const [agentInfo, setAgentInfo] = useState({});

  console.log(agentInfo, "agent info");
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
      // console.log("Document written with ID: ", docRef);
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
          // console.log("Current data: ", doc.data());
        }
      );
    } catch (e) {
      console.error("Error adding document: ", e);
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
    <View style={styles.container}>
      {/* icon on the left and text in the middle */}
      <Customstatusbar />

      <Globalmodal
        showState={showmodal}
        //  onBgPress={() => setShowModal(!showmodal)}
      >
        <View
          style={{
            paddingTop: RFValue(40),
            // paddingHorizontal: RFValue(10),
            // paddingBottom: RFValue(70),
          }}
        >
          <View style={{ alignItems: "center", marginBottom: RFValue(30) }}>
            <ActivityIndicator color="black" size="large" />
          </View>
          <Text
            style={{
              lineHeight: 25,
              ...FONTS.regular,
              ...fontsize.bsmall,
              textAlign: "center",
            }}
          >
            Kindly input your transaction pin on{" "}
            <Text style={{ textTransform: "capitalize" }}>
              {requestInfo?.agent?.replace(/\s+/g, " ").split(" ")[1] ||
                requestInfo?.agent}
            </Text>
            's device to complete the transaction, don’t worry it’s safe✌🏽
          </Text>

          <View
            style={{
              justifyContent: "center",
              backgroundColor: COLORS.pink1,
              borderRadius: 22,
              paddingTop: RFValue(16),
              paddingBottom: RFValue(14),
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
              borderRadius: 10,
              marginTop: RFValue(40),
            }}
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
      </Globalmodal>

      <Globalmodal
        showState={showSuccessmodal}
        //  onBgPress={() => setShowSuccessModal(!showSuccessmodal)}
        btnFunction={() =>
          navigation.navigate("Transactionsrating", {
            userToRate: agentInfo?.userUid,
            reference: requestInfo.reference,
          })
        }
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
              ...FONTS.regular,
            }}
          >
            Transaction Succesful
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
        btnFunction={() => navigation.navigate("Home")}
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
              <Text style={styles.notifyingSubText}>{requestInfo?.agent}</Text>
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
                + NGN {amountFormatter(requestInfo?.charges)}
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

      {/* <Bottombtn title="update" onpress={handlePrepareToTestUpdate}/> */}
      {/* <View>
        <View style={styles.btnBg}>
          <Text style={styles.btnText}>CONTINUE</1Text>
        </View>
      </View> */}
    </View>
  );
};

export default Summary;
