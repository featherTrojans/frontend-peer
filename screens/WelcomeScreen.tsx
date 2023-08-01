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
import { sendSchedulePushNotification, sendTokenToDB } from "../utils/pushNotifications";
import { nameToShow } from "../utils/nameSplitter";
import { WelcomeScreenStyles } from "../assets/styles/screens";
const {
  container,
  welcomeTextContainer,
  welcomeText,
  welcomeTextSub,
  lineBg,
  line,
  getStartedContainer,
  getStartedText,
} = WelcomeScreenStyles;

const { Winkinganimate } = icons;

const WelcomeScreen = ({ navigation, route }) => {
  const { fromm, username, token } = route.params;
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
    setToken(token);
  };

  function callback() {
    "worklet";
    runOnJS(setToken)(token);
  }

  const getDashboardData = async () => {
    try {
      const response = await axiosCustom.get("/dashboard");
      await sendTokenToDB(messageToken);

      if (!response?.data?.data?.userDetails?.isVerified) {
        return navigation.navigate("Verification", {
          email: response?.data?.data?.userDetails?.email,
          phoneNumber: response?.data?.data?.userDetails?.phoneNumber,
          token: token,
        });
      }
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

        {/* Welcome text */}
        <View style={welcomeTextContainer}>
          {fromm === "setup" ? (
            <Text style={welcomeText}>
              welcome on board{" "}
              <Text style={{ color: COLORS.blue6 }}>padi.</Text>
            </Text>
          ) : (
            <>
              <Text style={welcomeText}>{getPeriod()}</Text>

              <Text
                style={[
                  welcomeTextSub,
                  { marginTop: 16, textTransform: "uppercase" },
                ]}
              >
                {authdata?.userDetails?.fullName &&
                  nameToShow(authdata?.userDetails?.fullName)}
              </Text>
            </>
          )}
        </View>

        {/* Progress Line */}
        <View style={{ flex: 0.4, justifyContent: "center" }}>
          <View style={lineBg}>
            <Animated.View style={[line, animatedStyle]} />
          </View>
        </View>

        {/* Get started text */}
        <View style={getStartedContainer}>
          <Text style={getStartedText}>
            {fromm === "setup"
              ? "Yo! we are setting things up for you to get started, this usually takes about one minute"
              : "Hey welcome back to feather, transact more today, earn more with cash deposits."}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
