import { ProgressViewIOSBase, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { styles } from "./Loader.styles";
import { COLORS, icons } from "../../constants";

import Animated, {
  withRepeat,
  useSharedValue,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
  withSpring,
  withDelay
} from "react-native-reanimated";

const { Newlogo } = icons;

const Loader = () => {



    // This upper animation is for the scaling logo, just


  // const progress = useSharedValue(1);
  // const scale = useSharedValue(1)

  // const scalingLogo = useAnimatedStyle(() => {
  //   return {
  //     transform: [{scale: scale.value}]
  //   };
  // }, []);

  // useEffect(() => {
  //     progress.value = withTiming(0.5, {duration: 1500})
  //     scale.value= withRepeat(withSpring(1.5), -1, true)
  // }, []);





// This lower animation is for the bubbling, Pikc one but i like the this shaaa 

  const opacity = useSharedValue(1);
  const bubblingCircle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [
        {
          scale: interpolate(opacity.value, [1, 0], [0, 2]),
        },
      ],
    };
  });


  useEffect(() => {
    opacity.value = withRepeat(withTiming(0, {duration: 1200}), -1);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.logoBg, bubblingCircle, {position: 'absolute'}]} />
      
        <View style={styles.logoBg}>
          <Newlogo />
        </View>
    </View>
  );
};

export default Loader;
