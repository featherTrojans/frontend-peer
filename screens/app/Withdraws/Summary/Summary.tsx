import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { COLORS, FONTS, fontsize, icons } from "../../../../constants";
import { Bottombtn, Sendingandreceive } from "../../../../components";
import { styles } from "./Summary.styles";
import Globalmodal from "../../../shared/Globalmodal/Globalmodal";
import { AuthContext } from "../../../../context/AuthContext";
import LottieView from "lottie-react-native"
import amountFormatter from "../../../../utils/formatMoney";

const { Backarrow, Successcheckanimate } = icons;

const tableDatas = [
  {
    title: "Receiver",
    value: "@suzzy_bcroft",
  },
  {
    title: " Amount",
    value: "NGN 35,000.00",
  },
  {
    title: "Withdrawal Charge",
    value: "+ NGN 750",
  },
];

const Summary = ({navigation}) => {
  const {authdata} = useContext(AuthContext)
  const [showmodal, setShowModal] = useState(false)
  const [showSuccessmodal, setShowSuccessModal] = useState(true)
  
  
  useEffect(() => {
    const ws = new WebSocket(
      `wss://locahost:3300/request/${authdata.userId}`,
      "realtime"
    );
    ws.onmessage = (data) => {
      console.log(data)
      // setShowSuccessModal(true)
    };

    return ws.close();
  }, []);
  return (
    <View style={styles.container}>
      {/* icon on the left and text in the middle */}

      <Globalmodal
       showState={showmodal}
       onBgPress={() => setShowModal(!showmodal)}
       >
         <View style={{
           paddingVertical: 70,
           paddingHorizontal: 10
         }}>
          <Text style={{lineHeight: 15, ...FONTS.regular}}>
            Kindly input your transaction pin on Susan’s device to complete the transaction, don’t worry it’s safe✌🏽
          </Text>
         </View>
      </Globalmodal>
      <Globalmodal
       showState={showSuccessmodal}
       onBgPress={() => setShowSuccessModal(!showmodal)}
       btnFunction={()=>navigation.navigate("Home")}
       >
           <View style={{ alignItems: "center", paddingVertical: 30 }}>
            <LottieView source={Successcheckanimate} autoPlay loop={false} style={{width: 148, height: 148}}/>
            <Text style={{marginBottom: 30, ...fontsize.bsmall,
                 ...FONTS.regular}}>Transaction Succesful</Text>
            <Text style={{width: "60%", textAlign:"center", ...fontsize.bsmall,
                 ...FONTS.regular}}>You can dispute this transaction after 24 hours</Text>
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

        {tableDatas.map(({ title, value }, index) => (
          <View key={index}>
            <View style={styles.tableContainer}>
              <Text style={styles.tableTitle}>{title}</Text>
              <Text style={styles.tableValue}>{value}</Text>
            </View>
            <View style={styles.bottomLine} />
          </View>
        ))}

        <View style={styles.tableContainer}>
          <Text style={styles.tableTitle}>Total</Text>
          <Text style={[styles.tableValue, {color: COLORS.blue6}]}>NGN 35,750.00</Text>
        </View>
      </View>

      {/* Continue button below */}
      <Bottombtn title="CONTINUE" onpress={() => setShowModal(true)}/>
      {/* <View>
        <View style={styles.btnBg}>
          <Text style={styles.btnText}>CONTINUE</Text>
        </View>
      </View> */}
    </View>
  );
};

export default Summary;
