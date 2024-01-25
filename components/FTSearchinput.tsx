import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import React, { Dispatch, SetStateAction } from "react";
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
  textInputProps,
}: {
  placeholder: string;
  bG?: string;
  mB?: number;
  mT?: number;
  value: string;
  onChange: any;
  icon?: boolean;
  textInputProps?: TextInputProps;
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
        {...textInputProps}
      />
      {icon && <Searchicon />}
    </View>
  );
};

export default FTSearchinput;

const styles = StyleSheet.create({});
