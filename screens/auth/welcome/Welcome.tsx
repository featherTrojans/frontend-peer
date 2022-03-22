import React, { useRef, useEffect, useContext, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import LottieView from "lottie-react-native";
import { COLORS, FONTS, icons, SIZES, fontsize } from "../../../constants";
//
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
  runOnUI,
} from "react-native-reanimated";
import { styles } from "./Welcome.styles";
import { AuthContext } from "../../../context/AuthContext";
import axiosCustom from "../../../httpRequests/axiosCustom";
import Customstatusbar from "../../shared/Customstatusbar";
import { sendSchedulePushNotification } from "../../../utils/pushNotifications";

const { Smile, Winkinganimate } = icons;

const Welcome = ({ navigation, route }) => {
  const { fromm, username, token } = route.params;
  const { setToken, authdata } = useContext(AuthContext);
  const { setAuthData } = useContext(AuthContext);
  const [percentage, setPercentage] = useState(0);

  const progressWidth = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: progressWidth.value,
    };
  });

  const nameToShow = (value: string) => {
    if (value?.split(" ").length > 1) {
      return value?.split(" ")[1];
    } else {
      return value;
    }
  };

  const getPeriod = () => {
    const hour = new Date().getHours();
    var textMessage =
      hour < 12
        ? "Good Morning"
        : hour < 18
        ? "Good Afternoon"
        : "Good Evening";

    return textMessage;
  };
  useEffect(() => {
    getDashboardData();
  }, []);

  // const setTokenOnComplete = () => {
  //   setToken(token)
  // }

  function callback() {
    "worklet";
    runOnJS(setToken)(token);
  }

  const getDashboardData = async () => {
    try {
      const response = await axiosCustom.get("/dashboard");
      setAuthData(response?.data?.data);

      progressWidth.value = withTiming(
        SIZES.width - 214,
        { duration: 3000 },
        callback
      );
    } catch (err) {
      console.log(err.response);
    }
  };

  useEffect(() => {
    if(fromm == "setup"){
      sendSchedulePushNotification("Acccount Registration", `Hi ${nameToShow(authdata?.userDetails?.fullName)}, Welcome onboard to feather africa, Enjoy true freedom.`)
      
    }
    else{
      sendSchedulePushNotification("Welcome Back Padi! 🎉", "Do more today. Enjoy financial flexibility")

    }
  }, [])

  // React.useEffect(() => {
  //     shared.value = someAnimation(callback)
  // }, [])

  // useEffect(() => {
  //   progressWidth.value = withTiming(SIZES.width - 214, { duration: 3000 });
  //   setTimeout(() => {

  //   }, 3500);
  // }, []);


  return (
    <View style={styles.container}>
      {/* Smiling Icon */}
      <Customstatusbar />
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 42,
        }}
      >
        <LottieView
          source={Winkinganimate}
          autoPlay
          loop
          style={{ width: 194, height: 194 }}
        />
      </View>
      {/* Welcome text */}
      <View style={styles.welcomeTextContainer}>
        {fromm === "setup" ? (
          <Text style={styles.welcomeText}>
            welcome on board <Text style={{ color: COLORS.blue6 }}>padi.</Text>
          </Text>
        ) : (
          <>
            <Text style={styles.welcomeText}>{getPeriod()}</Text>

            <Text
              style={[
                styles.welcomeTextSub,
                { marginTop: 16, textTransform: "uppercase" },
              ]}
            >
              {nameToShow(authdata?.userDetails?.fullName)}
            </Text>
          </>
        )}
      </View>

      {/* Progress Line */}
      <View style={styles.lineBg}>
        <Animated.View style={[styles.line, animatedStyle]} />
      </View>

      {/* Get started text */}
      <View style={styles.getStartedContainer}>
        <Text style={styles.getStartedText}>
          {fromm === "setup"
            ? "Yo! we are setting things up for you to get started, this usually takes about one minute"
            : "Hey welcome back to feather, transact more today, earn more with cash deposits."}
        </Text>
      </View>
    </View>
  );
};

export default Welcome;
