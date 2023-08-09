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
import { COLORS, FONTS, SIZES, fontsize, icons } from "../constants";
const { Levelcheckicon, Leveloptioncancelicon, Leveloptioncheckicon } = icons;

const { width } = Dimensions.get("window");

const {
  segmentedWrap,
  movingSegmentedbg,
  segmentedOptions,
  segmentedOptionText,
  BAlign,
  levelInfoWrap,
  levelText,
  requirementText,
  requirementMainText,
  blockWrap,
  infoKeyText,
  infoValueText,
  dashedLine,
  statusText,
  statusTextBg
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

  const accountLevelDatas = [
    {
      levelTitle: "Newbie",
      requirement: "Basic Personal Information",
      status: true,
      fundinglimit: "Unlimited",
      cashrequest: "N30,000.00",
      transferout: "N50,000.00",
      accountnumber: false,
      usdcard: false,
    },
    {
      levelTitle: "Odogwu",
      requirement: "Bank Verification Number (BVN)",
      status: false,
      fundinglimit: "Unlimited",
      cashrequest: "N200,000.00",
      transferout: "N500,000.00",
      accountnumber: true,
      usdcard: false,
    },
    {
      levelTitle: "Veteran",
      requirement: "Identity Document Uploads",
      status: false,
      fundinglimit: "Unlimited",
      cashrequest: "N500,000.00",
      transferout: "N1,000,000.00",
      accountnumber: true,
      usdcard: true,
    },
  ];

  return (
    <FTTitlepagewrapper title="Account Verification">
      <View style={segmentedWrap}>
        <Animated.View
          style={[
            movingSegmentedbg,
            { transform: [{ translateX: tabTranslate }] },
          ]}
        />

        {accountLevels.map((accountLevel, index) => {
          let isActive = index == currentIndex;
          return (
            <Pressable
              key={index}
              onPress={() => onOptionPress(index)}
              style={segmentedOptions}
              onLayout={(e) => {
                console.log(e.nativeEvent.layout.width);
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
        data={accountLevelDatas}
        horizontal
        ref={flatlistRef}
        pagingEnabled
        scrollEnabled={false}
        renderItem={({ item }) => {
          const {status, levelTitle, fundinglimit, cashrequest, transferout, accountnumber, usdcard } = item
          
          return (
            <View style={{ width: width - 30, backgroundColor: COLORS.white }}>
              <View style={levelInfoWrap}>
                <View style={BAlign}>
                  <Text style={levelText}>{levelTitle} Level</Text>
                  <Levelcheckicon />
                </View>
                <Text style={requirementText}>Requirement</Text>
                <Text style={requirementMainText}>
                  Basic Personal Information
                </Text>
              </View>

              <View style={blockWrap}>
                <View style={BAlign}>
                  <Text style={infoKeyText}>Status</Text>
                  <View style={[statusTextBg, {backgroundColor: status ? "#E9F7EA" : "#FDF3F7" }]}>
                    <Text style={[statusText, { color: status ? COLORS.green4 : "#D81859" }]}>
                     {status ?  "Completed" : "Not Started"}
                    </Text>
                  </View>
                </View>

                <View style={dashedLine} />

                <View style={BAlign}>
                  <Text style={infoKeyText}>Funding Limit</Text>
                  <Text style={infoValueText}>{fundinglimit}</Text>
                </View>
                <View style={[BAlign, { marginVertical: 18 }]}>
                  <Text style={infoKeyText}>Cash Request</Text>
                  <Text style={infoValueText}>{cashrequest}</Text>
                </View>
                <View style={BAlign}>
                  <Text style={infoKeyText}>Transfer Out</Text>
                  <Text style={infoValueText}>{transferout}</Text>
                </View>
                <View style={[BAlign, { marginVertical: 18 }]}>
                  <Text style={infoKeyText}>Free Bank Account Number</Text>
                  {accountnumber ?  <Leveloptioncheckicon /> : <Leveloptioncancelicon />}
                </View>
                <View style={BAlign}>
                  <Text style={infoKeyText}>Virtual USD Card</Text>
                  {usdcard ?  <Leveloptioncheckicon /> : <Leveloptioncancelicon />}
                </View>
              </View>
            </View>
          );
        }}
      />
    </FTTitlepagewrapper>
  );
};

export default AccountverificationScreen;

const styles = StyleSheet.create({});
