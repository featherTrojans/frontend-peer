import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { COLORS, FONTS, fontsize, icons } from "../../../../constants";
import { Bottombtn, Sendingandreceive } from "../../../../components";
import { styles } from "./Summary.styles";
import Globalmodal from "../../../shared/Globalmodal/Globalmodal";
import { AuthContext } from "../../../../context/AuthContext";
import LottieView from "lottie-react-native"
import amountFormatter from "../../../../utils/formatMoney";
import Customstatusbar from "../../../shared/Customstatusbar";
import {db} from "../../../../firebase"
import {doc, updateDoc,query,where, collection, addDoc, onSnapshot, setDoc } from "firebase/firestore"; 

const { Backarrow, Successcheckanimate } = icons;



const Summary = ({navigation, route}) => {
  const {requestInfo} = route.params
  const {authdata} = useContext(AuthContext)
  const [showmodal, setShowModal] = useState(false)
  const [showSuccessmodal, setShowSuccessModal] = useState(false)
  const [showFailuremodal, setShowFailureModal] = useState(false)

  useEffect(()=>{
    firestoreListener()
  },[])

  const handleReadyToReceive = async ()=>{
    // create a document first
    try {
      const docRef = await setDoc(doc(db,"withdrawtransfer",requestInfo.reference),{
        status: "pending"
      })
      // console.log("Document written with ID: ", docRef);
      setShowModal(true)
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  // const handlePrepareToTestUpdate = async ()=>{
  //   const washingtonRef = doc(db, "withdrawtransfer", "zyx");
  //     await updateDoc(washingtonRef, {
  //       status: "approved"
  //     });
  // }
  const firestoreListener = async ()=>{
    try {
      const unsub = onSnapshot(doc(db, "withdrawtransfer", requestInfo.reference), (doc) => {
        // if accepted, show the final modal
        if(doc?.data()?.status === "approved"){
          setShowModal(false);
          setShowSuccessModal(true)
        }
        if(doc?.data()?.status === "rejected"){
          setShowModal(false);
          setShowFailureModal(true)
        }
        // console.log("Current data: ", doc.data());
    });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  
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
         <View style={{
           paddingBottom: 70,
           paddingTop: 40,
           paddingHorizontal: 10
         }}>
           <View style={{alignItems:"center", marginBottom:30}}>
             <ActivityIndicator color="black" size="large" />
           </View>
          <Text style={{lineHeight: 15, ...FONTS.regular}}>
            Kindly input your transaction pin on Susan’s device to complete the transaction, don’t worry it’s safe✌🏽
          </Text>
         </View>
      </Globalmodal>
      <Globalmodal
       showState={showSuccessmodal}
       onBgPress={() => setShowSuccessModal(!showSuccessmodal)}
       btnFunction={()=>navigation.navigate("Home")}
       >
           <View style={{ alignItems: "center", paddingVertical: 30 }}>
            <LottieView source={Successcheckanimate} autoPlay loop style={{width: 148, height: 148}}/>
            <Text style={{marginBottom: 30, ...fontsize.bsmall,
                 ...FONTS.regular}}>Transaction Succesful</Text>
            <Text style={{width: "60%", textAlign:"center", ...fontsize.bsmall,
                 ...FONTS.regular}}>You can dispute this transaction after 24 hours</Text>
           </View>
          
      </Globalmodal>
      <Globalmodal
       showState={showFailuremodal}
       onBgPress={() => setShowFailureModal(!showFailuremodal)}
       btnFunction={()=>navigation.navigate("Home")}
       >
           <View style={{ alignItems: "center", paddingVertical: 30 }}>
            {/* <LottieView source={Successcheckanimate} autoPlay loop style={{width: 148, height: 148}}/> */}
            <Text style={{marginBottom: 30, ...fontsize.bsmall,
                 ...FONTS.regular}}>Transaction Failed</Text>
            <Text style={{width: "60%", textAlign:"center", ...fontsize.bsmall,
                 ...FONTS.regular}}>Please try again later</Text>
           </View>
          
      </Globalmodal>
      <View style={styles.backArrow}>
        <Backarrow />
        <View style={styles.backArrowTextContainer}>
          <Text style={styles.backArrowText}>Transaction Summary</Text>
        </View>
        <View />
      </View>

      <View style={{ alignItems: "center", justifyContent: 'center' }}>
        {/* Sending and receiver component */}
        <Sendingandreceive />

        {/* text of notification */}
        <View style={styles.notifyingTextContainer}>
          <Text style={styles.notifyingText}>
            You are initiating a payment transaction to{" "}
            <Text style={styles.notifyingSubText}>Susan Becroft</Text>
          </Text>
        </View>
      </View>

      <View style={styles.tablesContainer}>
        {/* A table showin the transaction details */}

  
          <View>
            <View style={styles.tableContainer}>
              <Text style={styles.tableTitle}>Receiver</Text>
              <Text style={styles.tableValue}>@{requestInfo?.agentUsername}</Text>
            </View>
            <View style={styles.bottomLine} />
          </View>
          <View>
            <View style={styles.tableContainer}>
              <Text style={styles.tableTitle}>Amount</Text>
              <Text style={styles.tableValue}>NGN {requestInfo?.amount}</Text>
            </View>
            <View style={styles.bottomLine} />
          </View>
          <View>
            <View style={styles.tableContainer}>
              <Text style={styles.tableTitle}>Withdrawal Charge</Text>
              <Text style={styles.tableValue}>+ NGN {requestInfo?.charges}</Text>
            </View>
            <View style={styles.bottomLine} />
          </View>
        

        <View style={styles.tableContainer}>
          <Text style={styles.tableTitle}>Total</Text>
          <Text style={[styles.tableValue, {color: COLORS.blue6}]}>NGN {requestInfo?.total}</Text>
        </View>
      </View>

      {/* Continue button below */}
      <Bottombtn title="CONTINUE" onpress={handleReadyToReceive}/>
      {/* <Bottombtn title="update" onpress={handlePrepareToTestUpdate}/> */}
      {/* <View>
        <View style={styles.btnBg}>
          <Text style={styles.btnText}>CONTINUE</Text>
        </View>
      </View> */}
    </View>
  );
};

export default Summary;
