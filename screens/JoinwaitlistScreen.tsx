import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { FTCustombutton, FTTitlepagewrapper } from "../components";
import { COLORS, FONTS, SIZES, fontsize, images } from "../constants";
import { CreatecardScreenStyles } from "../assets/styles/screens/createcard.style";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

const { width } = SIZES;

const { joinWaitlistText, waitlistMoreInfoText, waitlistCardsWrap, waitlistInfoWrap, waitlistCards } = CreatecardScreenStyles;
const { LilaccardImage, BluecardImage } = images;

const JoinwaitlistScreen = ({ navigation }) => {
  const translatedValue = useSharedValue(0);
  const [active, setActive] = useState(false)



  useEffect(() => {
    if(active){
      translatedValue.value = withSpring(25)
    }
    else{
      translatedValue.value = withSpring(0)
    }
  }, [active, translatedValue])

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: translatedValue.value }],
  }), []);
  const animatedStyles2 = useAnimatedStyle(() => ({
    transform: [{ translateY: -translatedValue.value }],
  }), []);



  return (
    <FTTitlepagewrapper title="Join Waitlist">

      <Pressable
        onPress={() => setActive(!active)}
        style={waitlistCardsWrap}
      >
        <Animated.View style={{ position: "absolute", left: -width / 4 }}>
          <Animated.Image
            source={LilaccardImage}
            style={[animatedStyles, waitlistCards,{  position: "absolute", left: 60 }]}
          />
          <Animated.Image
            source={BluecardImage}
            style={[animatedStyles2, waitlistCards,]}
          />
        </Animated.View>
      </Pressable>


      <View style={waitlistInfoWrap}>
        <Text style={joinWaitlistText}>Hey padi, join the waitlist!</Text>
        <Text style={waitlistMoreInfoText}>
          We have limited slots for our premium virtual card. Join the waitlist
          to get a chance
        </Text>
      </View>

      <FTCustombutton
        bg="#000"
        btntext="Join the waitlist"
        onpress={() => navigation.navigate("joinwaitlist_screen")}
      />
    </FTTitlepagewrapper>
  );
};

export default JoinwaitlistScreen;

const styles = StyleSheet.create({});
