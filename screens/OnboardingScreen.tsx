import React, { useRef, useState } from "react";
import { FlatList, Animated, View, Text, TouchableOpacity } from "react-native";
import { OnboardingScreenNavigationProps } from "../types";
import { COLORS, FONTS, fontsize, SIZES } from "../constants";
import onboardingdatas from "../onboardingdatas";
import Customstatusbar from "./shared/Customstatusbar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { OnboardingScreenStyles } from "../assets/styles/screens";
import FTEachOnboarding from "../components/FTEachOnboarding";
import { navigation } from "../utils";


const {
  animatedDots,
  animatedDotsWrap,
  onboardingFooterSubWrap,
  onboardingFooterWrap,
  skipBg,
  skipText,
  registerText,
  registerWrap,
} = OnboardingScreenStyles;

const OnboardingScreen = () => {
  const scrollX = useRef<any>(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList>(null);

  const [viewIndex, setViewIndex] = useState<number>(0);

  // i removed changed from the params passed to this useRef below
  const onViewChangeRef = useRef<
    ({ viewableItems, changed }: { viewableItems: any; changed: any }) => void
  >(({ viewableItems, changed }) => {
    setViewIndex(viewableItems[0]?.index);
  });

  const storeData = async () => {
    try {
      const stored = await AsyncStorage.setItem(
        "@onboarded",
        JSON.stringify({ onboard: true })
      );
      if (stored !== null) {
        // console.log(stored, "this is the respone of trhe ");
      }
    } catch (e) {
      // saving error
    }
  };

  const navigateToLogin = () => {
    storeData();
    navigation.navigate("getstarted_screen");
  };

  const scrollTo = () => {
    let currentIndex = Math.ceil(Number(scrollX._value / SIZES.width));
    if (currentIndex < onboardingdatas.length - 1) {
      // Scroll to the next item
      flatListRef?.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      navigateToLogin();
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <Customstatusbar />

      {/* Animated Dots */}
      <View style={animatedDotsWrap}>
        {onboardingdatas.map((item, index) => {
          const dotPosition = Animated.divide(scrollX, SIZES.width);

          const dotColor = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [COLORS.grey3, COLORS.black, COLORS.grey3],
            extrapolate: "clamp",
          });
          const dotOpacity = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.2, 1, 0.2],
            extrapolate: "clamp",
          });
          const dotWidth = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [8, 20, 8],
            extrapolate: "clamp",
          });
          return (
            <Animated.View
              key={index}
              style={[
                animatedDots,
                {
                  backgroundColor: dotColor,
                  opacity: dotOpacity,
                  width: dotWidth,
                },
              ]}
            />
          );
        })}
      </View>

      <FlatList
        ref={flatListRef}
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewChangeRef.current}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        bounces={false}
        keyExtractor={(item: any) => item.header}
        data={onboardingdatas}
        renderItem={({ item }: any) => <FTEachOnboarding item={item} />}
      />

      {/* Footer--Dots and the nxet button */}
      <View style={onboardingFooterWrap}>
        <View style={onboardingFooterSubWrap}>
          {viewIndex < onboardingdatas.length - 1 ? (
            <TouchableOpacity
              onPress={scrollTo}
              activeOpacity={0.8}
              style={skipBg}
            >
              <Text style={skipText}>SKIP</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={scrollTo}
              activeOpacity={0.8}
              style={registerWrap}
            >
              <Text style={registerText}>Join the flock - Register</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default OnboardingScreen;
