import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { COLORS, SIZES, fontsize, FONTS } from "../../../../constants";
import { JustifyBetween } from "../../../../global/styles";
import axiosCustom from "../../../../httpRequests/axiosCustom";
import { styles } from "./Securepin.styles";

const Securepin = ({ navigation }) => {
  const [veriPin, setVeriPin] = useState({ 1: "", 2: "", 3: "", 4: "" });

  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9","", "0"];

  const [amount, setAmount] = useState([]);

  const handleSubmit = async () => {
    try {
      const pin = Object.values(veriPin).join("");
      const response = await axiosCustom.post("/auth/pin/set", { pin });
      console.log(response);
      navigation.navigate("Setup");
    } catch (err) {
      console.log(err.response);
    }
  };

  const handleSetAmount = (value: string) => {
    // console.log(value)
    setAmount([...amount, value]);
    console.log(amount);
  };

  const NumberBtn = ({ children }: { children: string }) => {
    return (
      <TouchableOpacity
        style={styles.numberBtn}
        activeOpacity={0.8}
        onPress={() => handleSetAmount(children)}
      >
        <Text>{children}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
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
            <TextInput style={styles.pinInput} />
            <TextInput style={styles.pinInput} />
            <TextInput style={styles.pinInput} />
            <TextInput style={styles.pinInput} />
          </View>
        </View>

        <View style={styles.numberBtnContainer}>
          {numbers.map((number, index) => {
            return (
              <NumberBtn key={index}>{number}</NumberBtn>
            )
          })}

          <View style={styles.numberBtn}>
            <Text>X</Text>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.proceedBtn, { marginBottom: 80 }]}
          activeOpacity={0.8}
          onPress={handleSubmit}
        >
          <Text style={styles.proceedText}>PROCEED</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Securepin;
