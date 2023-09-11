import { Pressable, StyleSheet, View, Keyboard } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
  SlideOutDown,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import Modal from "react-native-modal";
import { Gesture, GestureDetector, gestureHandlerRootHOC } from "react-native-gesture-handler";
import { AuthContext } from "../context/AuthContext";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const OVERDRAG = 20;

const useSwipemodal = () => {
  const Swipemodal = ({ children, showModal, setShowModal, modalHeight }) => {
    const offset = useSharedValue(0);
    const x = useSharedValue(0);
    const HEIGHT = modalHeight ? modalHeight : 200;

    const closeModal = () => {
      setShowModal((s) => !s);
      offset.value = withSpring(0);
    };

    const pan = Gesture.Pan()
      .onChange((event) => {
        const offsetDelta = event.changeY + offset.value;
        const clamp = Math.max(-OVERDRAG, offsetDelta);
        offset.value = offsetDelta > 0 ? offsetDelta : withSpring(clamp);
      })
      .onFinalize(() => {
        if (offset.value < HEIGHT / 3) {
          offset.value = withSpring(0);
        } else {
          offset.value = withTiming(HEIGHT, {}, () => {
            runOnJS(closeModal)();
          });
        }
      });

    const translateY = useAnimatedStyle(() => ({
      transform: [{ translateY: offset.value }],
    }));
 

    return (
      <>
        {showModal && (
          <AnimatedPressable
            entering={FadeIn}
            exiting={FadeOut}
            onPress={closeModal}
            style={[styles.backdrop]}
          >
            <GestureDetector gesture={pan}>
              <AnimatedPressable
                onPress={() => setShowModal(true)}
                entering={SlideInDown.springify().damping(15)}
                exiting={SlideOutDown}
                style={[styles.sheet, { height: HEIGHT }, translateY]}
              >
                {children}
              </AnimatedPressable>
            </GestureDetector>
          </AnimatedPressable>
        )}
      </>
    );
  };

  return { Swipemodal };
};

export default useSwipemodal;

const styles = StyleSheet.create({
  sheet: {
    backgroundColor: "white",
    padding: 25,
    paddingTop: 44,
    width: "100%",
    position: "absolute",
    bottom: -OVERDRAG * 1.1,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    zIndex: 2,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)",
    zIndex: 2,
  },
});
