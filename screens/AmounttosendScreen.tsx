import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import {
  FTCustombutton,
  FTKeyboard,
  FTTabWrapper,
  FTTitlepagewrapper,
} from "../components";
import { COLORS, FONTS, fontsize } from "../constants";
import { navigation } from "../utils";
import { TransactionpinScreenStyles } from "../assets/styles/screens";
import amountFormatter from "../utils/formatMoney";
const {
  headerSectionWrap,
  startedInput,
  enterPinText,
  keyboardWrap,
  staredInputWrap,
} = TransactionpinScreenStyles;

const AmounttosendScreen = ({ route }) => {
  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0"];
  const { nextScreen } = route.params;
  const [pin, setPin] = useState<string[]>([]);

  const handleSetAmount = (value: string) => {
    const newpin = [...pin, value];
    if (pin.length < 4) {
      setPin(newpin);
    }
    if (pin.length === 3) {
      //   handleSubmit(newpin);
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
    <FTTitlepagewrapper
      title="How Much?"
      headerBg={COLORS.blue16}
      bg={COLORS.blue16}
      childBg={COLORS.blue16}
      invert
    >
      <View>
        <View
          style={{ height: 50, alignItems: "center", justifyContent: "center" }}
        >
          <Text
            style={{ ...fontsize.xbiggest, ...FONTS.bold, color: COLORS.white }}
          >
            {pin}
          </Text>
        </View>

        <Text style={[enterPinText, { textAlign: "center" }]}>
          Enter amount with the keypad
        </Text>
      </View>
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
        onpress={() => navigation.navigate("choosefeatheruser_screen")}
        bg={COLORS.blue9}
      />
    </FTTitlepagewrapper>
  );
};

export default AmounttosendScreen;

const styles = StyleSheet.create({});
