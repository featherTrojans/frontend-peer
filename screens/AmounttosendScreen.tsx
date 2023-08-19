import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Animated, { Layout } from "react-native-reanimated";
import {
  FTCustombutton,
  FTKeyboard,
  FTLoader,
  FTTabWrapper,
  FTTitlepagewrapper,
} from "../components";
import { COLORS, FONTS, fontsize, icons } from "../constants";
import { navigation } from "../utils";
import {
  AmounttosendScreenStyles,
  TransactionpinScreenStyles,
} from "../assets/styles/screens";
import amountFormatter from "../utils/formatMoney";
import { useAlert } from "../hooks";

const { enterPinText, keyboardWrap } = TransactionpinScreenStyles;

const { amountWrap, nairaIconWrap, amountValueText } = AmounttosendScreenStyles;

const { Nairaicon } = icons;

const AmounttosendScreen = ({ route }) => {
  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0"];
  const nextScreen = route?.params?.nextScreen;
  const onsubmit = route?.params?.onsubmit;
  const { errorAlert } = useAlert();
  const [loading, setLoading] = useState(false);

  const [amount, setAmount] = useState([]);
  //   const formatted = formatter.format(amount.join(""));
  const formatted = amountFormatter(amount.join(""));

  const handleSetAmount = (value: string) => {
    const newpin = [...amount, value];

    setAmount(newpin);
    if (amount.length === 3) {
      //   handleSubmit(newpin);
    }
  };
  const handleRemoveAmount = () => {
    if (amount.length > 0) {
      const newdata = [...amount];
      newdata.pop();
      setAmount(newdata);
    }
  };
  const handlesubmit = async () => {
    setLoading(true);
    try {
      await onsubmit(amount.join(""));
    } catch (err) {
      errorAlert(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <FTTitlepagewrapper
      title="How Much?"
      headerBg={COLORS.blue16}
      bg={COLORS.blue16}
      childBg={COLORS.blue16}
      invert
    >
      {loading && <FTLoader />}
      <View>
        <Animated.View layout={Layout.springify()} style={amountWrap}>
          <View style={nairaIconWrap}>
            <Nairaicon />
          </View>

          <Animated.View layout={Layout.springify()}>
            <Text style={amountValueText}>{formatted}</Text>
          </Animated.View>
        </Animated.View>
      </View>

      <Text style={[enterPinText, { textAlign: "center" }]}>
        Enter amount with the keypad
      </Text>

      <View style={keyboardWrap}>
        <FTKeyboard
          array={[...numbers]}
          setDigit={handleSetAmount}
          removeDigit={handleRemoveAmount}
          textColor={COLORS.white}
        />
      </View>
      <FTCustombutton
        btntext="Fund Wallet"
        onpress={handlesubmit}
        bg={COLORS.blue9}
      />
    </FTTitlepagewrapper>
  );
};

export default AmounttosendScreen;

const styles = StyleSheet.create({});
