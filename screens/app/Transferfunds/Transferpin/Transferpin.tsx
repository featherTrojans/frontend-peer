import { StyleSheet, Text, View, StatusBar } from "react-native";
import React, { useState } from "react";
import LottieView from "lottie-react-native"
import { styles } from "./Transferpin.styles";
import { COLORS, FONTS, fontsize, icons } from "../../../../constants";
import { Bottombtn, Loader, Numberbtn } from "../../../../components";
import axiosCustom from "../../../../httpRequests/axiosCustom";
import { useToast } from "react-native-toast-notifications";
import showerror from "../../../../utils/errorMessage";
import Globalmodal from "../../../shared/Globalmodal/Globalmodal";
import amountFormatter from "../../../../utils/formatMoney";
import { usePushNotification } from "../../../../navigation";






const { Backarrow, SecureDot, Successcheckanimate } = icons;

const Transferpin = ({route, navigation}) => {
  const sendPushNotification = usePushNotification()
  const toast = useToast();
  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0"];
  const {amount,userinfo} = route.params
  const [pin, setPin] = useState<string[]>([]);
  const [loading, setLoading] = useState(false)
  const [showmodal, setShowModal] = useState(false);
  const handleSetAmount = (value: string) => {
    if (pin.length < 4) {
      setPin((oldpin) => [...oldpin, value]);
    }
  };
  const handleRemoveAmount = () => {
    if (pin.length > 0) {
      const newdata = [...pin];
      newdata.pop();
      setPin(newdata);
      console.log(newdata);
    }
  };
  const handleSubmit = async () => {
    console.log(pin)
    try{
      setLoading(true);
      await axiosCustom.post("/transfer",{amount,transferTo:userinfo?.username,userPin:pin.join("")})
      //I am to send a push notification here
      sendPushNotification("ExponentPushToken[HtMvcuJzxC2c3PxLxJewxg]", "Wallet Credit", `Wallet Credit - N${amount} from “@mistascatter23 - Mayowa Olajide” `, "Root")
      setShowModal(true)
    }catch(err){
      console.log(err.response)
      showerror(toast,err)
    }finally{
      setLoading(false)
    }
  }


  return (
    <View style={styles.container}>
      {loading && <Loader />}
      <Globalmodal
      showState={showmodal}
      btnFunction={()=>navigation.navigate("Root")}
      >
        <View style={{ alignItems: "center" }}>
        <LottieView source={Successcheckanimate} autoPlay loop={false} style={{width: 148, height: 148}}/>


             <Text
               style={{
                 textAlign: "center",
                 marginHorizontal: 40,
                //  marginVertical: 40,
                marginTop: 24,
                marginBottom: 45,
                 ...fontsize.bsmall,
                 ...FONTS.regular,
               }}
             >You have successfully transfered NGN {amountFormatter(amount)} to  “<Text style={{textTransform: 'capitalize'}}>@{userinfo?.username}</Text> - <Text style={{textTransform: 'capitalize'}}> {userinfo?.fullName} </Text>”</Text>
           </View>
      </Globalmodal>
      <StatusBar />
      <View style={styles.mainContainer}>
        <View style={styles.backArrowConteiner}>
          <Backarrow />
        </View>

        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>
            You are about to send{" "}
            <Text style={styles.descriptionSubText}>NGN {amount}</Text> from
            your Primary Wallet to @{userinfo?.username} -  <Text style={{textTransform: 'capitalize'}}>{userinfo?.fullName}</Text>
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
              <Numberbtn key={index} onpress={() => handleSetAmount(number)}>
                {number}
              </Numberbtn>
            );
          })}

          <Numberbtn onpress={() => handleRemoveAmount()}>X</Numberbtn>
        </View>
        
      </View>
      <Bottombtn title="PROCEED" onpress={handleSubmit}/>
    </View>
  );
};

export default Transferpin;
