import { ProgressViewIOSBase, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Modal from "react-native-modal";
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

const { Newlogowhite } = icons;

const Loader = () => {
  const [showState, setShowState] = useState(true);


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
    <Modal
    isVisible={showState}
    backdropColor="#fff"
    backdropOpacity={0.7}
    style={{margin: 0}}
    animationIn="fadeIn"
    animationOut="fadeOut"
    onBackdropPress={() => setShowState(!showState)}
    onBackButtonPress={() => setShowState(!showState)}
    >
    <View style={styles.container}>
      <Animated.View style={[styles.logoBg, bubblingCircle, {position: 'absolute'}]} />
      
        <View style={styles.logoBg}>
          <Newlogowhite />
        </View>
    </View>
    </Modal>
  );
};

export default Loader;
