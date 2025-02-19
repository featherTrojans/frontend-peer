import { StyleSheet, Text, View, StatusBar } from "react-native";
import React, { useState } from "react";
import { styles } from "./Transferpin.styles";
import { COLORS, FONTS, fontsize, icons } from "../../../../constants";
import { Bottombtn, Keyboard, Loader, Numberbtn } from "../../../../components";
import axiosCustom from "../../../../httpRequests/axiosCustom";
import { useToast } from "react-native-toast-notifications";
import showerror from "../../../../utils/errorMessage";
import Globalmodal from "../../../shared/Globalmodal/Globalmodal";
import amountFormatter from "../../../../utils/formatMoney";
import Customstatusbar from "../../../shared/Customstatusbar";
import { RFValue } from "react-native-responsive-fontsize";
import LottieView from "lottie-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const { Backarrow, SecureDot, Successcheckanimate } = icons;

const TransferpinBank = ({ route, navigation }) => {
  const toast = useToast();
  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0"];
  const { amount, accountInfomation } = route.params;
  const [pin, setPin] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
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
    }
  };
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await axiosCustom.post("/withdraw", {
        amount: Number(amount),
        account_code: accountInfomation.account_code,
        userPin: pin.join(""),
      });

      setShowModal(true);
    } catch (err) {
      showerror(toast, err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading && <Loader />}
      <Customstatusbar />
      <Globalmodal
        showState={showmodal}
        btnFunction={() => navigation.navigate("Root")}
      >
        <View style={{ alignItems: "center" }}>
          <LottieView
            source={Successcheckanimate}
            autoPlay
            loop
            style={{ width: RFValue(148), height: RFValue(148) }}
          />

          <Text
            style={{
              textAlign: "center",
              marginHorizontal: RFValue(40),
              //  marginVertical: 40,
              marginTop: RFValue(24),
              marginBottom: RFValue(45),
              ...fontsize.bsmall,
              ...FONTS.regular,
            }}
          >
            You have successfully transfered NGN {amountFormatter(amount)} to “
            {accountInfomation.bank_name} -
            <Text style={{ textTransform: "capitalize" }}>
              {accountInfomation.account_name}
            </Text>{" "}
            ”
          </Text>
        </View>
      </Globalmodal>

      <View style={styles.mainContainer}>
        <View style={[styles.backArrowConteiner, { marginLeft: 15 }]}>
          <Backarrow />
        </View>

        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>
            You are about to send{" "}
            <Text style={styles.descriptionSubText}>NGN {amount}</Text> from
            your Primary Wallet to {accountInfomation.bank_name} -{" "}
            <Text style={{ textTransform: "capitalize" }}>
              {accountInfomation.account_name}
            </Text>
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

       

        <Keyboard
          array={[...numbers]}
          setDigit={handleSetAmount}
          removeDigit={handleRemoveAmount}
        />
      </View>
      <Bottombtn title="PROCEED" onpress={handleSubmit} />
    </SafeAreaView>
  );
};

export default TransferpinBank;
