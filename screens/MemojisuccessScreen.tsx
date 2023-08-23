import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { FTIconwithbg, FTMainwrapper } from "../components";
import { COLORS, FONTS, fontsize, icons } from "../constants";
import { ChoosememojiScreenStyles } from "../assets/styles/screens";
import { navigation } from "../utils";

const {
  buttonText,
  buttonWrap,
  memojiSuccessWrap,
  successHeader,
  successMessageText,
} = ChoosememojiScreenStyles;

const { Blacksendicon } = icons;

const MemojisuccessScreen = () => {
  return (
    <FTMainwrapper>
      <View style={memojiSuccessWrap}>
        <FTIconwithbg bG="#F6DEAC" Icon={Blacksendicon} size={150} />
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
          onPress={() => console.log("memojisuccess_screen")}
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
