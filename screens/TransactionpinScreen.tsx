import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { FTKeyboard, FTMainwrapper, FTTitlepagewrapper } from "../components";
import { COLORS, fontsize, icons } from "../constants";
import { TransactionpinScreenStyles } from "../assets/styles/screens";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

const {
  headerSectionWrap,
  startedInput,
  enterPinText,
  keyboardWrap,
  staredInputWrap,
} = TransactionpinScreenStyles;

const { Pinlockicon } = icons;

const TransactionpinScreen = () => {
  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0"];
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
      headerBg={COLORS.blue16}
      bg={COLORS.blue16}
      childBg={COLORS.blue16}
      invert
    >
      <View style={headerSectionWrap}>
        <Pinlockicon />

        <View style={staredInputWrap}>
          {[1, 1, 1, 2].map((eachStar, index) => (
            <Text
              key={index}
              style={[
                startedInput,
                { color: pin[index] ? COLORS.white : COLORS.blue9 },
              ]}
            >
              *
            </Text>
          ))}
        </View>

        <Text style={enterPinText}>Enter Transaction Pin</Text>
      </View>
      <View style={keyboardWrap}>
        <FTKeyboard
          array={[...numbers]}
          setDigit={handleSetAmount}
          removeDigit={handleRemoveAmount}
          textColor={COLORS.white}
        />
      </View>
    </FTTitlepagewrapper>
  );
};

export default TransactionpinScreen;

const styles = StyleSheet.create({});
