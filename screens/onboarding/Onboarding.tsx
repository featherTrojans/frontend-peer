import React, { useRef, useState } from "react";
import { FlatList, Animated, StatusBar } from "react-native";
import { OnboardingScreenNavigationProps } from "../../types";
import { COLORS, FONTS, fontsize, SIZES } from "../../constants";
import onboardingdatas from "../../onboardingdatas";
import EachOnboarding from "../../components/onboarding-component/OnBoardingComponent";
import {
  DotFlexRow,
  FlexRow,
  GetStartedBtn,
  GetStartedContainer,
  GetStartedText,
  LoginBtn,
  NextText,
  OnboardingContainer,
  OnboardingFlatlist,
  SkipText,
} from "./Onboarding.styles";
import Customstatusbar from "../shared/Customstatusbar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RFValue } from "react-native-responsive-fontsize";

const Onboarding = ({ navigation }: OnboardingScreenNavigationProps) => {
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

  // const getData = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem('@storage_Key')
  //     if(value !== null) {
  //       // value previously stored
  //     }
  //   } catch(e) {
  //     // error reading value
  //   }
  // }

  const navigateToLogin = () => {
    storeData();
    navigation.replace("Getstarted");
  };

  const scrollTo = () => {
    let currentIndex = Math.ceil(Number(scrollX._value / SIZES.width));
    if (currentIndex < onboardingdatas.length - 1) {
      // Scroll to the next item
      flatListRef?.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
      //   console.log("Right index", currentIndex);
    } else {
      navigateToLogin()
    }
  };

  return (
    <OnboardingContainer>
      <Customstatusbar />

      <LoginBtn activeOpacity={0.6} onPress={navigateToLogin} style={{marginBottom: RFValue(32)}}>
        <SkipText>Skip</SkipText>
      </LoginBtn>

      <OnboardingFlatlist
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
        renderItem={({ item }: any) => <EachOnboarding item={item} />}
      />

      {/* Footer--Dots and the nxet button */}
      <FlexRow>
        <DotFlexRow>
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
                style={{
                  marginBottom: 10,
                  height: 8,
                  borderRadius: 1000,
                  marginRight: 10,
                  backgroundColor: dotColor,
                  opacity: dotOpacity,
                  width: dotWidth,
                }}
              />
            );
          })}
        </DotFlexRow>

        <GetStartedBtn activeOpacity={0.8} onPress={scrollTo}>
          {viewIndex < onboardingdatas.length - 1 ? (
            <NextText>Next</NextText>
          ) : (
            <GetStartedContainer>
              <GetStartedText>Launch Feather</GetStartedText>
            </GetStartedContainer>
          )}
        </GetStartedBtn>
      </FlexRow>
    </OnboardingContainer>
  );
};

export default Onboarding;
