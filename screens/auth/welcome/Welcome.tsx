import React, { useRef, useEffect, useContext, useState, useCallback } from "react";
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
import { sendSchedulePushNotification, sendTokenToDB } from "../../../utils/pushNotifications";
import { RFValue } from "react-native-responsive-fontsize";

const { Smile, Winkinganimate } = icons;

const Welcome = ({ navigation, route }) => {
  const { fromm, username, token } = route.params;
  const { setToken, authdata , messageToken} = useContext(AuthContext);
  const { setAuthData } = useContext(AuthContext);
  const [percentage, setPercentage] = useState(0);
  

  const progressWidth = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: progressWidth.value,
    };
  });

  const nameToShow = (value: string) => {
    if(!value) return ""
    const newvalue =  value.replace(/\s+/g, ' ');
    if (newvalue?.split(" ").length > 1) {
      return newvalue?.split(" ")[1];
    } else {
      return newvalue;
    }
  };
  const nameInNotification = authdata?.userDetails?.fullName ? nameToShow(authdata?.userDetails?.fullName) : "Padi"

  
  useEffect(() => {

      let check = true

      const sendRegistrationMessage = () => {
        if (fromm == "setup" && authdata?.userDetails?.fullName) {
          console.log("push from setup")
          sendSchedulePushNotification(
            "Acccount Registration",
            `Hi ${nameInNotification}, Welcome onboard to feather africa, Enjoy true freedom.`
          );
        } 
      }
    
  }, [authdata]);

  useEffect(() => {
    let check = true
    const  sendMessage = () => {
      if(fromm !== "setup" && authdata?.userDetails?.fullName){
        // console.log("push from login")
        // console.log(authdata, "Here is the authdata")
        // console.log(authdata?.userDetails?.fullName)
        sendSchedulePushNotification(
          "Welcome Back Padi! 🎉",
          "Do more today. Enjoy financial flexibility"
        );
      }
    }
    if(check){
      sendMessage()
    }
    

    return () => {
      check = false
    }

    
  }, [authdata])

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
      await sendTokenToDB(messageToken)
      
      setAuthData(response?.data?.data);
      // setTokenOnComplete()
      progressWidth.value = withTiming(
        SIZES.width - 214,
        { duration: 3000 },
        callback
      );
    } catch (err) {
      // console.log(err.response);
    }
  };




  // useCallback(() => {
  //   if(fromm !== "setup" && authdata?.userDetails?.fullName){
  //     sendSchedulePushNotification(
  //       "Welcome Back Padi! 🎉",
  //       "Do more today. Enjoy financial flexibility"
  //     );
  //   }
  // },[authdata])

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
          // marginTop: RFValue(42),
          flex: .4
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
              {authdata?.userDetails?.fullName && nameToShow(authdata?.userDetails?.fullName)}
            </Text>
          </>
        )}
      </View>



      {/* Progress Line */}
      <View style={{flex: .4,  justifyContent: "center"}}>
      <View style={styles.lineBg}>
        <Animated.View style={[styles.line, animatedStyle]} />
      </View>
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
