import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import { FTIconwithbg, FTMainwrapper } from "../components";
import { COLORS, icons } from "../constants";
import { ChoosememojiScreenStyles } from "../assets/styles/screens";

const {
  buttonText,
  buttonWrap,
  memojiSuccessWrap,
  successHeader,
  successMessageText,
  succesAnimation,
} = ChoosememojiScreenStyles;

const { Blacksendicon, Memojisuccessanimated } = icons;

const MemojisuccessScreen = ({ route, navigation }) => {
  const active = route?.params?.active;
  const emojiindex = route?.params?.emojiindex;
  return (
    <FTMainwrapper>
      <LottieView
        source={Memojisuccessanimated}
        autoPlay
        loop
        style={succesAnimation}
      />
      <View style={memojiSuccessWrap}>
        <FTIconwithbg imageUrl={emojiindex} bG={active} size={150} />
        <View style={{ flex: 1 }}>
          <Text style={successHeader}>
            Padi, Memoji was {"\n"} created successfully{" "}
          </Text>
          <Text style={successMessageText}>
            Hey Padi, your custom Memoji has been created and saved to your
            account. This will update your profile image
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate("Dashboard")}
          style={[buttonWrap, { backgroundColor: COLORS.blue9 }]}
        >
          <Text style={buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </FTMainwrapper>
  );
};

export default MemojisuccessScreen;

const styles = StyleSheet.create({});
