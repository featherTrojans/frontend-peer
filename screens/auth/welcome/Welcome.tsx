import React, { useRef, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS, FONTS, icons, SIZES, fontsize } from "../../../constants";
// 
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { styles } from "./Welcome.styles";

const { Smile } = icons;

const Welcome = ({navigation}) => {

  const progressWidth = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: progressWidth.value,
    };
  });

  useEffect(() => {
    progressWidth.value = withTiming(SIZES.width - 214, { duration: 1500 });
    setTimeout(() => {
      navigation.navigate("Root")
    }, 1500);
  }, []);

  return (
    <View style={styles.container}>
      {/* Smiling Icon */}
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Smile />
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


