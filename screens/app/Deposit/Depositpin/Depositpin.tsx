import { StyleSheet, Text, View, StatusBar } from "react-native";
import React, { useState } from "react";
// import { styles } from "./Transferpin.styles";

import { COLORS, FONTS, fontsize, icons } from "../../../../constants";
import { Numberbtn, Bottombtn, Loader } from "../../../../components";
import { styles } from "../../Transferfunds/Transferpin/Transferpin.styles";
import axiosCustom from "../../../../httpRequests/axiosCustom";
import showerror from "../../../../utils/errorMessage";
import { useToast } from "react-native-toast-notifications";
import Globalmodal from "../../../shared/Globalmodal/Globalmodal";
import LottieView from "lottie-react-native";
import amountFormatter from "../../../../utils/formatMoney";
import Customstatusbar from "../../../shared/Customstatusbar";
import { db } from "../../../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { RFValue } from "react-native-responsive-fontsize";

const { Backarrow, SecureDot, Successcheckanimate } = icons;

const Depositpin = ({ route, navigation }) => {
  const toast = useToast();
  const { requestInfo } = route.params;
  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0"];
  const [pin, setPin] = useState<string[]>([]);
  const [successModal, setSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log(requestInfo);
  const handleSetAmount = (value: string) => {
    if (pin.length < 4) {
      setPin((oldamount) => [...oldamount, value]);
    }
  };
  const handleRemoveAmount = () => {
    if (pin.length > 0) {
      const newdata = [...pin];
      newdata.pop();
      setPin(newdata);
    }
  };
  const handlePrepareToTestUpdate = async (status: string) => {
    const washingtonRef = doc(db, "withdrawtransfer", requestInfo.reference);
    await updateDoc(washingtonRef, {
      status: status,
    });
  };

  const checkIfDocExist = async ()=>{
    const  document = await getDoc(doc(db,"withdrawtransfer",requestInfo.reference))
    if(document.exists()){
      if(document.data().status === "pending"){
        return true
      }else{
         throw {response:{data:{message:"Please swipe to confirm payment on withdrawal device"}}}   
      }
    }else{
       throw {response:{data:{message:"Please swipe to confirm payment on withdrawal device"}}}
    }
  }

  const handleApproveRequest = async () => {
    const joinpin = pin.join("");
    if (joinpin.length < 4) {
      return false;
    }

    setLoading(true);
  
    try {
      // check if document exist
      await checkIfDocExist()
      await axiosCustom.post("/request/approve", {
        reference: requestInfo.reference,
        user_pin: joinpin,
      });
      await handlePrepareToTestUpdate("approved");
      //show success message
      setSuccessModal(true);
    } catch (err) {
      console.log(err)
      showerror(toast, err);
      await handlePrepareToTestUpdate("rejected");
    } finally {
      setLoading(false);
    }
  };
  // return (<Text>hi there pin and things and things in between and beyond </Text>)
  return (
    <View style={styles.container}>
      <Customstatusbar />
      {loading && <Loader />}
      <Globalmodal
        showState={successModal}
        btnFunction={() => navigation.navigate("Transactionsrating",{userToRate:requestInfo.user.userUid, reference:requestInfo.reference})}
      >
        <View style={{ alignItems: "center" }}>
          <LottieView
            source={Successcheckanimate}
            autoPlay
            loop
            style={{ width: RFValue(148), height:  RFValue(148)}}
          />
          <Text
            style={styles.transactionSubHeader}
          >
            Transaction Successful
          </Text>
          <Text
            style={styles.transactionSubHeader}
          >
            You can dispute this transaction after 24 hours
          </Text>
          {/* share and download */}
        </View>
      </Globalmodal>
      <View style={styles.mainContainer}>
        <View style={styles.backArrowConteiner}>
          <Backarrow />
        </View>

        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>
            Hi, {requestInfo?.user?.fullName} kindly put in your transaction pin
            to proceed your transaction of N{amountFormatter(requestInfo.total)}
          </Text>
          <Text style={styles.enterPinText}>Enter Transaction PIN</Text>
        </View>

        <View style={styles.pinContainer}>
          <View style={styles.pinInputContainer}>
            <View style={styles.pinView}>{pin[0] && <SecureDot />}</View>
            <View style={styles.pinView}>{pin[1] && <SecureDot />}</View>
            <View style={styles.pinView}>{pin[2] && <SecureDot />}</View>
            <View style={styles.pinView}>{pin[3] && <SecureDot />}</View>
          </View>
        </View>

        <View style={styles.numberBtnContainer}>
          {numbers.map((number, index) => {
            return (
              <Numberbtn
                key={index}
                onpress={
                  number !== "" ? () => handleSetAmount(number) : () => null
                }
              >
                {number}
              </Numberbtn>
            );
          })}

          <Numberbtn onpress={() => handleRemoveAmount()}>X</Numberbtn>
        </View>
      </View>

      <Bottombtn title="CONTINUE" onpress={handleApproveRequest} />
    </View>
  );
};

export default Depositpin;
