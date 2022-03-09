import React, { useRef, useEffect, useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import LottieView from "lottie-react-native"
import { COLORS, FONTS, icons, SIZES, fontsize } from "../../../constants";
// 
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { styles } from "./Welcome.styles";
import { AuthContext } from "../../../context/AuthContext";
import axiosCustom from "../../../httpRequests/axiosCustom";

const { Smile, Winkinganimate } = icons;

const Welcome = ({navigation}) => {
  const { setAuthData } = useContext(AuthContext);
  const progressWidth = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: progressWidth.value,
    };
  });

  useEffect(() => {
    getDashboardData();
  }, []);

  const getDashboardData = async () => {
    try {
      const response = await axiosCustom.get("/dashboard")
      setAuthData(response?.data?.data);
    } catch (err) {
      console.log(err.response);
    }
  };

  useEffect(() => {
    progressWidth.value = withTiming(SIZES.width - 214, { duration: 1500 });
    setTimeout(() => {
      navigation.replace("Root")
    }, 2500);
  }, []);

  return (
    <View style={styles.container}>
      {/* Smiling Icon */}
      <View style={{ justifyContent: "center", alignItems: "center", marginTop: 42 }}>
      <LottieView source={Winkinganimate} autoPlay loop style={{width: 194, height: 194}}/>
      </View>
      {/* Welcome text */}
      <View style={styles.welcomeTextContainer}>
        <Text style={styles.welcomeText}>
          welcome on board <Text style={{ color: COLORS.blue6 }}>padi.</Text>
        </Text>
      </View>

      {/* Progress Line */}
      <View style={styles.lineBg}>
        <Animated.View style={[styles.line, animatedStyle]} />
      </View>

      {/* Get started text */}
      <View style={styles.getStartedContainer}>
        <Text style={styles.getStartedText}>
          Yo! we are setting things up for you to get started, this usually
          takes about one minute.
        </Text>
      </View>
    </View>
  );
};

export default Welcome;


