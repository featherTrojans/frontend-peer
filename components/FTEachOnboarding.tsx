import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { OnboardingScreenStyles } from '../assets/styles/screens';


const {
    eachOnboardingWrap,
    eachOnboardingImage,
    eachOnboardingInfoWrap,
    eachOnboardingHeader,
    eachOnboardingInfo,
  } = OnboardingScreenStyles;

export type EachOnboardingTypes = {
    item: {
      icon: JSX.Element;
      header: string;
      information: string;
      imageBg: String;
      page: number;
    };
  };

const FTEachOnboarding = ({ item }: EachOnboardingTypes) => {
    const { header, information, icon, imageBg, page } = item;
    return (
      <View style={eachOnboardingWrap}>
        <View
          style={[
            eachOnboardingImage,
            {
              backgroundColor: `${imageBg}`,
              borderRadius: 26,
              borderTopLeftRadius: page == 1 ? 100 : 26,
              borderTopRightRadius: page == 1 ? 26 : 100,
            },
          ]}
        >
          {icon}
        </View>
  
        <View style={eachOnboardingInfoWrap}>
          <Text style={eachOnboardingHeader}>{header}</Text>
          <Text style={eachOnboardingInfo}>{information}</Text>
        </View>
      </View>
    );
}

export default FTEachOnboarding

const styles = StyleSheet.create({})