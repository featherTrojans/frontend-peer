import React, { useContext, useEffect } from "react";
import { COLORS, FONTS, fontsize, icons, SIZES } from "../constants";

import { View, Text, TouchableOpacity } from "react-native";
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
import { VALIDATION, navigation } from "../utils";
import { useForm } from "react-hook-form";
import Loader from "../components/FTLoader";

const { center, bottomtext } = LoginScreenStyles;

const { Newlogo, Transfericon } = icons;

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
      setAuthorizationToken(response.data.data.token);
      navigation.navigate("phone-verify_screen", {
        phonenumber: data.phoneNumber,
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
      <Text style={center}>Enter Phone Number</Text>
      {loading && <Loader />}
      <View>
        <FTInput
          placeholderText="Enter here.."
          name="username"
          control={control}
          rules={VALIDATION.PHONE_NUMBER_VALIDATION}
          mB={20}
        />
      </View>
      <FTCustombutton btntext="PROCEED" onpress={handleSubmit(onsubmit)} />
      <Text style={bottomtext}>
        Ensure you can reach this mobile number to get started as this number
        has to be verified.
      </Text>
    </FTMainwrapper>
  );
};

export default LoginScreen;
