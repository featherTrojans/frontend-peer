import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { FTIconwithbg, FTMainwrapper } from "../components";
import { COLORS, FONTS, fontsize, icons } from "../constants";
import { ChoosememojiScreenStyles } from "../assets/styles/screens";
import { navigation } from "../utils";

const { buttonText, buttonWrap } = ChoosememojiScreenStyles;

const { Blacksendicon } = icons;

const MemojisuccessScreen = () => {
  return (
    <FTMainwrapper>
      <View style={{ flex: 1, alignItems: "center", paddingVertical: 50 }}>
        <FTIconwithbg bG="#F6DEAC" Icon={Blacksendicon} size={150} />
        <View style={{flex: 1}}>
          <Text
            style={{
              ...fontsize.bmedium,
              textAlign: "center",
              ...FONTS.bold,
              lineHeight: 29,
              color: COLORS.blue9,
              marginTop: 78,
              marginBottom: 40,
            }}
          >
            Padi, Memoji was {'\n'} created successfully{" "}
          </Text>
          <Text
            style={{
              ...fontsize.small,
              ...FONTS.medium,
              lineHeight: 26,
              textAlign: "center",
              color: COLORS.blue9,
            }}
          >
            Hey Padi, your custom Memoji has been created and saved to your
            account. This will update your profile image
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => console.log("memojisuccess_screen")}
          style={[buttonWrap, {backgroundColor: COLORS.blue9}]}
        >
          <Text style={buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </FTMainwrapper>
  );
};

export default MemojisuccessScreen;

const styles = StyleSheet.create({});
