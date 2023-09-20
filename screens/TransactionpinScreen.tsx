import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import {
  FTKeyboard,
  FTLoader,
  FTMainwrapper,
  FTTitlepagewrapper,
} from "../components";
import { COLORS, fontsize, icons } from "../constants";
import { TransactionpinScreenStyles } from "../assets/styles/screens";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { useAlert } from "../hooks";

const {
  headerSectionWrap,
  startedInput,
  enterPinText,
  keyboardWrap,
  staredInputWrap,
} = TransactionpinScreenStyles;

const { Pinlockicon } = icons;

const TransactionpinScreen = ({ route }) => {
  const action = route?.params?.action;
  const toptext = route?.params?.toptext || "Enter Transaction Pin";
  const { errorAlert } = useAlert();
  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0"];
  const [pin, setPin] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSetAmount = (value: string) => {
    const newpin = [...pin, value];
    if (pin.length < 4) {
      setPin(newpin);
    }
    if (pin.length === 3) {
      handleSubmit(newpin);
    }
  };
  const handleRemoveAmount = () => {
    if (pin.length > 0) {
      const newdata = [...pin];
      newdata.pop();
      setPin(newdata);
    }
  };

  const handleSubmit = async (newpin: any) => {
    setLoading(true);
    try {
      await action(newpin.join(""));
    } catch (err) {
      errorAlert(err);
      setPin([])
    } finally {
      setLoading(false);
    }
  };
  return (
    <FTTitlepagewrapper
      headerBg={COLORS.blue16}
      bg={COLORS.blue16}
      childBg={COLORS.blue16}
      invert
    >
      <FTLoader loading={loading} />
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

        <Text style={enterPinText}>{toptext}</Text>
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
