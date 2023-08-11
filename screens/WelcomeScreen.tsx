import React, {
  useRef,
  useEffect,
  useContext,
  useState,
  useCallback,
} from "react";
import { StyleSheet, Text, View } from "react-native";
import LottieView from "lottie-react-native";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
  runOnUI,
} from "react-native-reanimated";

import { RFValue } from "react-native-responsive-fontsize";
import { SafeAreaView } from "react-native-safe-area-context";
import { getPeriod } from "../utils/getDayPeriod";

import { COLORS, FONTS, SIZES, fontsize, icons } from "../constants";
import { AuthContext } from "../context/AuthContext";
import axiosCustom from "../httpRequests/axiosCustom";
import Customstatusbar from "./shared/Customstatusbar";
import {
  sendSchedulePushNotification,
  sendTokenToDB,
} from "../utils/pushNotifications";
import { nameToShow } from "../utils/nameSplitter";
import { WelcomeScreenStyles } from "../assets/styles/screens";
import { getAuthorizationTokenFromAxois } from "../utils";
const {
  container,
  welcomeTextContainer,
  welcomeText,
  welcomeTextSub,
  lineBg,
  line,
  getStartedContainer,
  getStartedText,
  info,
  infotext,
  link,
} = WelcomeScreenStyles;

const { Winkinganimate } = icons;

// /dashboard
const WelcomeScreen = ({ navigation, route }) => {
  const fromm = route.params?.fromm || "login";
  const { setToken, authdata, messageToken } = useContext(AuthContext);
  const { setAuthData } = useContext(AuthContext);
  const [percentage, setPercentage] = useState(0);
  const [sent, setSent] = useState(false);

  const progressWidth = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: progressWidth.value,
    };
  });

  const nameInNotification = authdata?.userDetails?.fullName
    ? nameToShow(authdata?.userDetails?.fullName)
    : "Padi";

  useEffect(() => {
    const sendRegistrationMessage = () => {
      if (fromm == "setup" && authdata?.userDetails?.fullName) {
        // checked = false
        console.log("push from setup");
        sendSchedulePushNotification(
          "Acccount Registration",
          `Hi ${nameInNotification}, Welcome onboard to feather africa, Enjoy true freedom.`
        );
        setSent(true);
      }
    };
    if (!sent) {
      sendRegistrationMessage();
    }
  }, [authdata]);

  // A comment just for the push

  useEffect(() => {
    const sendMessage = () => {
      if (fromm !== "setup" && authdata?.userDetails?.fullName) {
        console.log("push from login new");
        // console.log(authdata, "Here is the authdata")
        // console.log(authdata?.userDetails?.fullName)
        sendSchedulePushNotification(
          "Welcome Back Padi! 🎉",
          "Do more today. Enjoy financial flexibility"
        );
        setSent(true);
      }
    };
    if (!sent) {
      sendMessage();
    }
  }, [authdata]);

  useEffect(() => {
    getDashboardData();
  }, []);

  const setTokenOnComplete = () => {
    setToken(getAuthorizationTokenFromAxois());
  };

  function callback() {
    "worklet";
    runOnJS(setToken)(getAuthorizationTokenFromAxois());
  }

  const getDashboardData = async () => {
    try {
      const response = await axiosCustom.get("/dashboard");
      await sendTokenToDB(messageToken);

      setAuthData(response?.data?.data);
      // setTokenOnComplete()
      progressWidth.value = withTiming(
        SIZES.width - 214,
        { duration: 3000 },
        callback
      );
    } catch (err) {
      console.log(err.response);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={container}>
        {/* Smiling Icon */}
        <Customstatusbar />

        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flex: 0.4,
          }}
        >
          <LottieView
            source={Winkinganimate}
            autoPlay
            loop
            style={{ width: RFValue(194), height: RFValue(194) }}
          />
        </View>

        <View style={welcomeTextContainer}>
          <Text style={welcomeTextSub}>Welcome to the flock!</Text>
        </View>

        {/* Welcome text */}
        <View style={welcomeTextContainer}>
          <Text style={welcomeText}>
            Get cash, Pay bills & Make payments today
          </Text>
        </View>

        {/* Get started text */}
        <View style={getStartedContainer}>
          <Text style={getStartedText}>
            Yo! we are setting things up for you to get started, this usually
            takes about one minute
          </Text>
        </View>
        {/* Progress Line */}
        <View style={{ flex: 0.4, justifyContent: "center" }}>
          <View style={lineBg}>
            <Animated.View style={[line, animatedStyle]} />
          </View>
        </View>

        <View style={info}>
          <Text style={infotext}>For more information visit,</Text>
          <Text style={link}> www.getfeather.africa</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
