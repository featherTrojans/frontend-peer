import { Dimensions, Pressable, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
  SlideOutDown,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const { width } = Dimensions.get("screen");





const useSwipemodal = () => {
  const Swipemodal = () => {
    const offset = useSharedValue(0);
    const x = useSharedValue(0);
    const [showModal, setShowModal] = useState(false);

    const pan = Gesture.Pan()
      .onChange((event) => {
        const offsetDelta = event.changeY + offset.value;
        offset.value = offsetDelta > 0 ? offsetDelta : 0;
      })
      .onFinalize(() => {
        offset.value = withSpring(0);
      });

    const translateY = useAnimatedStyle(() => ({
      transform: [{ translateY: offset.value }],
    }));
    return (
      <View style={{ flex: 1 }}>
        {showModal && (
          <AnimatedPressable
            entering={FadeIn}
            exiting={FadeOut}
            onPress={() => setShowModal((s) => !s)}
            style={[
              StyleSheet.absoluteFillObject,
              {
                backgroundColor: "rgba(0, 0, 100, 0.4)",
                justifyContent: "center",
                alignItems: "center",
              },
            ]}
          >
            <GestureDetector gesture={pan}>
              <Animated.View
                entering={SlideInDown.springify().damping(15)}
                exiting={SlideOutDown}
                style={[styles.box, translateY]}
              />
            </GestureDetector>
          </AnimatedPressable>
        )}
      </View>
    );
  };

  return { Swipemodal };
};

export default useSwipemodal;

const styles = StyleSheet.create({
  box: {
    width: width,
    height: width,
    backgroundColor: "red",
    position: "absolute",
    bottom: -50 * 1.1,
    // margin: 100
  },
});
