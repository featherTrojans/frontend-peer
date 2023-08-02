import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { COLORS, FONTS, fontsize, icons } from "../constants";
import { FTSearchinputStyles } from "../assets/styles/components";

const { searchInputWrap, searchTextInput } = FTSearchinputStyles;

const { Searchicon } = icons;

const FTSearchinput = ({ placeholder }) => {
  return (
    <View style={searchInputWrap}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={COLORS.grey2}
        style={searchTextInput}
      />
      <Searchicon />
    </View>
  );
};

export default FTSearchinput;

const styles = StyleSheet.create({});
