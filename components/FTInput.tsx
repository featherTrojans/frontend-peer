import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { icons, COLORS, fontsize, FONTS } from "../constants";
import { ReactNode } from "react";
import { FTInputStyles } from "../assets/styles/components";

const { inputContainer, textInput, inputiconwrapper, inputLabel } =
  FTInputStyles;

const { Transfericon } = icons;

type inputProps = {
  label?: string;
  placeholderText?: string;
  mT?: number;
  mB?: number;
  formikProps?: any;
  name?: String;
};

const FTInput = ({
  placeholderText,
  label,
  mT = 0,
  mB = 0,
  formikProps,
  name,
}: inputProps) => {
  const { handleBlur, errors, touched, handleChange } = formikProps;

  const borderColor =
    errors[name] && touched[name]
      ? COLORS.errorBorder
      : COLORS.inputBorderColorDark;

  return (
    <View style={{ marginTop: mT, marginBottom: mB, borderColor: borderColor }}>
      <Text style={inputLabel}>{label}</Text>
      <TextInput
        style={textInput}
        placeholder={placeholderText}
        placeholderTextColor={COLORS.grey18}
        underlineColorAndroid="transparent"
        onChangeText={handleChange(name)}
        onBlur={handleBlur(name)}
      />
    </View>
  );
};

export default FTInput;
