import React, { useRef, useState } from "react";
import { FlatList, Animated, View, Text, TouchableOpacity } from "react-native";
import { COLORS, icons, SIZES } from "../constants";
import onboardingdatas from "../onboardingdatas";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { OnboardingScreenStyles } from "../assets/styles/screens";
import { FTCustombutton, FTEachonboarding, FTMainwrapper } from "../components";

const { animatedDots, animatedDotsWrap, dotAndSkipWrap, skipWrap, skipText } =
  OnboardingScreenStyles;
const { Skiplatericon } = icons;

const OnboardingScreen = ({ navigation }) => {
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
    navigation.replace("login_screen");
  };

  let isLastIndex = viewIndex === onboardingdatas.length - 1;

  return (
    <FTMainwrapper pH={0}>
      <View style={dotAndSkipWrap}>
        {/* Animated Dots */}
        <View style={animatedDotsWrap}>
          {onboardingdatas.map((item, index) => {
            const dotPosition = Animated.divide(scrollX, SIZES.width);

            const dotColor = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [COLORS.grey3, COLORS.blue6, COLORS.grey3],
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
        {!isLastIndex ? (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={navigateToLogin}
            style={skipWrap}
          >
            <Skiplatericon />
            <Text style={skipText}>Skip</Text>
          </TouchableOpacity>
        ) : (
          <View style={{ height: 14 }} />
        )}
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
        renderItem={({ item }: any) => <FTEachonboarding item={item} />}
      />

      {/* Footer--Dots and the nxet button */}
      <View style={{ paddingHorizontal: 20, paddingBottom: 20 }}>
        {/* <Text>{isLastIndex ? "tha s" : "Me"}</Text> */}
        {isLastIndex && (
          <>
            <FTCustombutton btntext="Get Started" onpress={navigateToLogin} />
          </>
        )}
      </View>
    </FTMainwrapper>
  );
};

export default OnboardingScreen;
