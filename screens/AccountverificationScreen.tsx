import {
  Animated,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Pressable,
  FlatList,
} from "react-native";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { AccountverificationScreenStyles } from "../assets/styles/screens";
import { FTTitlepagewrapper } from "../components";
import { COLORS, FONTS, SIZES, fontsize } from "../constants";

const { width } = Dimensions.get("window");

const {
  segmentedWrap,
  movingSegmentedbg,
  segmentedOptions,
  segmentedOptionText,
} = AccountverificationScreenStyles;

const AccountverificationScreen = (props) => {
  const translateValue = 260 / 3;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [tabTranslate, setTabTranslate] = React.useState(new Animated.Value(0));
  const flatlistRef = useRef<FlatList>(null);

  const onOptionPress = useCallback((index) => {
    setCurrentIndex(index);
  }, []);

  useEffect(() => {
    Animated.spring(tabTranslate, {
      toValue: currentIndex * translateValue,
      stiffness: 180,
      damping: 20,
      mass: 1,
      useNativeDriver: true,
    }).start();
    const scrollTo = () => {
      flatlistRef?.current?.scrollToIndex({
        index: currentIndex,
        animated: true,
      });
    };
    scrollTo();
  }, [currentIndex]);

  const accountLevels = ["Newbie", "Odogwu", "Veteran"];

  const pages = ["red", "blue", "green"];

  return (
    <FTTitlepagewrapper title="Account Verification">
      <View style={segmentedWrap}>
        <Animated.View
          style={[movingSegmentedbg,{transform: [{translateX: tabTranslate,}]}]}
        />

        {accountLevels.map((accountLevel, index) => {
          let isActive = index == currentIndex;
          return (
            <Pressable
              key={index}
              onPress={() => onOptionPress(index)}
              style={segmentedOptions}
              onLayout={(e) => {
                console.log(e.nativeEvent.layout.width)
              }}
            >
              <Text
                style={[
                  segmentedOptionText,
                  { color: !isActive ? COLORS.blue9 : COLORS.white },
                ]}
              >
                {accountLevel}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <FlatList
        data={pages}
        contentContainerStyle={{marginTop: 130}}
        horizontal
        ref={flatlistRef}
        pagingEnabled
        scrollEnabled={false}
        renderItem={({ item }) => {
          return (
            <View
              style={{ width: width - 30, backgroundColor: item, height: 200 }}
            ></View>
          );
        }}
      />
    </FTTitlepagewrapper>
  );
};

export default AccountverificationScreen;

const styles = StyleSheet.create({});
