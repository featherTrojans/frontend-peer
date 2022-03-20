import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import LottieView from "lottie-react-native";
import { styles } from "../../../Transferfunds/Transferpin/Transferpin.styles";
import { useToast } from "react-native-toast-notifications";
import { AuthContext } from "../../../../../context/AuthContext";
import Globalmodal from "../../../../shared/Globalmodal/Globalmodal";
import showerror from "../../../../../utils/errorMessage";
import axiosCustom from "../../../../../httpRequests/axiosCustom";
import { COLORS, FONTS, fontsize, icons } from "../../../../../constants";
import Customstatusbar from "../../../../shared/Customstatusbar";
import {
  Backheader,
  Bottombtn,
  Loader,
  Numberbtn,
} from "../../../../../components";
import amountFormatter from "../../../../../utils/formatMoney";
import SecureDot from "../../../../../assets/icons/SecureDot";

const { Successcheckanimate } = icons;

const Airtimepurchasepin = ({ navigation }) => {
  const toast = useToast();
  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0"];
  // const { amount, userinfo } = route.params;
  const [pin, setPin] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [showmodal, setShowModal] = useState(false);
  const { messageToken, authdata } = useContext(AuthContext);

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
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ flex: 1 }}>
      {loading && <Loader />}
      <Customstatusbar />
      <Globalmodal
        showState={showmodal}
        btnFunction={() => navigation.navigate("Root")}
        onBgPress={() => setShowModal(true)}
      >
        <View style={{ alignItems: "center" }}>
          <LottieView
            source={Successcheckanimate}
            autoPlay
            loop
            style={{ width: 148, height: 148 }}
          />

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
          >
            Airtime Purchase Successful!!
          </Text>
        </View>
      </Globalmodal>

      <Backheader />
      <View style={styles.mainContainer}>
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>
            You are about to purchase  <Text style={{...fontsize.bsmall, ...FONTS.bold}}>NGN 35,750.00 - Airtel </Text> to 09082764561
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
      <Bottombtn title="PROCEED" onpress={() => setShowModal(true)} />
    </ScrollView>
  );
};

export default Airtimepurchasepin;
