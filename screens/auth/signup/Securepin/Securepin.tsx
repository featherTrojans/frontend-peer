import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableNativeFeedback,
  StatusBar,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Bottombtn, Loader, Numberbtn } from "../../../../components";

import { COLORS, SIZES, fontsize, FONTS, icons } from "../../../../constants";

import { JustifyBetween } from "../../../../global/styles";
import axiosCustom from "../../../../httpRequests/axiosCustom";
import { styles } from "./Securepin.styles";

const { SecureDot } = icons;
const Securepin = ({ route, navigation }) => {
  const { token } = route.params;

  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0"];
  const [loading, setLoading] = useState<boolean>(false);
  const [amount, setAmount] = useState<string[]>([]);

  console.log(amount);
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const pin = amount.join("");
      const response = await axiosCustom.put(
        "/auth/pin/set",
        { pin },
        { headers: { token: token } }
      );
      console.log(response);
      navigation.navigate("Setup", { token: response?.data?.data?.token });
    } catch (err) {
      console.log(err.response);
    } finally {
      setLoading(false);
    }
  };

  const handleSetAmount = (value: string) => {
    if (amount.length < 4) {
      setAmount((oldamount) => [...oldamount, value]);
    }
  };
  const handleRemoveAmount = () => {
    if (amount.length > 0) {
      const newdata = [...amount];
      newdata.pop();
      setAmount(newdata);
      console.log(newdata);
    }
  };


  return (
    <View style={styles.container}>
      {loading && <Loader />}
      <StatusBar />
      <View style={{ paddingHorizontal: 25 }}>
        <JustifyBetween style={{ marginBottom: 10 }}>
          <View>
            <Text style={styles.header}>Set up your </Text>
            <Text style={styles.header}>4-digit secure pin</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View style={[styles.topDots, { marginRight: 10 }]} />
            <View style={[styles.topDots, { marginRight: 10 }]} />
            <View style={styles.activeDot} />
          </View>
        </JustifyBetween>
        <View style={{ marginBottom: 40 }}>
          <Text style={styles.subText}>Transaction PIN</Text>
        </View>

        <View style={styles.pinContainer}>
          <View style={styles.pinInputContainer}>
            <View style={styles.pinView}>{amount[0] && <SecureDot />}</View>
            <View style={styles.pinView}>{amount[1] && <SecureDot />}</View>
            <View style={styles.pinView}>{amount[2] && <SecureDot />}</View>
            <View style={styles.pinView}>{amount[3] && <SecureDot />}</View>
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
      <Bottombtn
        title="PROCEED"
        onpress={handleSubmit}
        disabled={amount.length !== 4}
      />
    </View>
  );
};

export default Securepin;
