import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { FTCustombutton, FTTitlepagewrapper } from "../components";
import { COLORS, FONTS, fontsize } from "../constants";
import { CreatecardScreenStyles } from "../assets/styles/screens/createcard.style";

const { joinWaitlistText, waitlistMoreInfoText } = CreatecardScreenStyles;

const JoinwaitlistScreen = ({ navigation }) => {
  return (
    <FTTitlepagewrapper title="Join Waitlist">
      <View>
        <Text style={joinWaitlistText}>Hey padi, join the waitlist!</Text>
        <Text style={waitlistMoreInfoText}>
          We have limited slots for our premium virtual card. Join the waitlist
          to get a chance
        </Text>

        <FTCustombutton
          bg="#000"
          btntext="Create a Visa card"
          onpress={() => navigation.navigate("joinwaitlist_screen")}
        />
      </View>
    </FTTitlepagewrapper>
  );
};

export default JoinwaitlistScreen;

const styles = StyleSheet.create({});
