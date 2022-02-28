import { StyleSheet, Text, View, StatusBar } from "react-native";
import React, { useState } from "react";
import { styles } from "./Transferpin.styles";
import { COLORS, FONTS, fontsize, icons } from "../../../../constants";
import { Numberbtn } from "../../../../components";
const { Backarrow, SecureDot } = icons;

const Transferpin = () => {
  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0"];
  const [amount, setAmount] = useState<string[]>([]);

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
      <StatusBar />
      <View style={styles.backArrowConteiner}>
        <Backarrow />
      </View>

      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>
          You are about to send{" "}
          <Text style={styles.descriptionSubText}>NGN 35,750.00</Text> from your
          Primary Wallet to @della007 - Adeyemi Adeola Gideon
        </Text>
        <Text style={styles.enterPinText}>Enter Transaction PIN</Text>
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
  );
};

export default Transferpin;
