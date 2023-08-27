import React, { useContext, useEffect } from "react";
import { COLORS, FONTS, fontsize, icons, SIZES } from "../constants";

import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { Formik, replace } from "formik";
import * as Yup from "yup";

import * as LocalAuthentication from "expo-local-authentication";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  FTCustombutton,
  FTInput,
  FTLoader,
  FTMainwrapper,
} from "../components";
import axiosCustom from "../httpRequests/axiosCustom";
import { useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { RFValue } from "react-native-responsive-fontsize";
import {
  getBiometricsAccess,
  getCredentials,
  saveCredentials,
} from "../utils/biometrics";
import { LoginScreenStyles } from "../assets/styles/screens";
import { useAlert } from "../hooks";
import { AWEEKAFTER, VALIDATION, navigation, setDataInstorage } from "../utils";
import { Controller, useForm } from "react-hook-form";


const {
  center,
  bottomtext,
  loginInputWrap,
  logoAndInitialWrap,
  logoStyle,
  initialStyle,
  lineSeparator,
  textInputStyles,
  errorMessageText
} = LoginScreenStyles;

const { Newlogo } = icons;

const setAuthorizationToken = (token: string) => {
  if (token) {
    axiosCustom.defaults.headers.common["token"] = token;
  }
};

// /auth/signin/v2
const LoginScreen = () => {
  const { control, handleSubmit } = useForm({ mode: "all" });
  const { errorAlert } = useAlert();
  const [loading, setLoading] = useState(false);


  const onsubmit = async (data) => {
    try {
      setLoading(true);
      const response = await axiosCustom.post("/auth/signin/v2", data);

      navigation.navigate("phone-verify_screen", {
        phonenumber: data.username,
        from: "login",
      });
    } catch (err) {
      errorAlert(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FTMainwrapper>
      <FTLoader loading={loading} />
      <Text style={center}>Enter Phone Number</Text>

      <Controller
        control={control}
        name="username"
        rules={VALIDATION.PHONE_NUMBER_VALIDATION}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <View style={{marginBottom: 20}}>
          <View style={[loginInputWrap, {
                    borderColor: error
                      ? COLORS.pink1
                      : value && !error
                      ? COLORS.blue16
                      : COLORS.grey15,
                  },]}>
            <View style={logoAndInitialWrap}>
              <View style={logoStyle} />
              <Text style={initialStyle}>+234</Text>
            </View>
            <View style={lineSeparator} />
            <TextInput
              onChangeText={onChange}
              editable
              onBlur={onBlur}
              keyboardType="number-pad"
              returnKeyType="done"
              value={value}
              placeholder="Enter here..."
              placeholderTextColor={COLORS.grey9}
              style={textInputStyles}
              maxLength={11}
            />
          </View>
          {error && <Text style={errorMessageText}> {error.message}</Text>}
          </View>
        )}
      />

      <FTCustombutton btntext="PROCEED" onpress={handleSubmit(onsubmit)} />
      <Text style={bottomtext}>
        Ensure you can reach this mobile number to get started as this number
        has to be verified.
      </Text>
    </FTMainwrapper>
  );
};

export default LoginScreen;
