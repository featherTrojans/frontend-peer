import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { COLORS, FONTS, fontsize, icons } from "../constants";
import { FTSearchinputStyles } from "../assets/styles/components";

const { searchInputWrap, searchTextInput } = FTSearchinputStyles;

const { Searchicon } = icons;

const FTSearchinput = ({
  placeholder,
  bG = "#F9F9FA",
  mB = 40,
  mT = 0,
  value,
  onChange,
  icon = true,
}) => {
  return (
    <View
      style={[
        searchInputWrap,
        { backgroundColor: bG, marginBottom: mB, marginTop: mT },
      ]}
    >
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={COLORS.grey2}
        style={searchTextInput}
        value={value}
        onChangeText={onChange}
      />
      {icon && <Searchicon />}
    </View>
  );
};

export default FTSearchinput;

const styles = StyleSheet.create({});
