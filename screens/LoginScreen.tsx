import React from "react";

import { View, Text, TextInput, Image, Pressable } from "react-native";
import { Image as RNImage } from "expo-image";
import { COLORS, FONTS, fontsize, icons, images } from "../constants";

import {
  FTCustombutton,
  FTInput,
  FTLoader,
  FTMainwrapper,
} from "../components";
import axiosCustom from "../httpRequests/axiosCustom";
import { useState } from "react";

import { LoginScreenStyles } from "../assets/styles/screens";
import { useAlert } from "../hooks";
import { VALIDATION } from "../utils";
import { Controller, useForm } from "react-hook-form";
import Animated, { Layout } from "react-native-reanimated";

const {
  center,
  bottomtext,
  inputLabel,
  loginInputWrap,
  logoAndInitialWrap,
  logoStyle,
  initialStyle,
  lineSeparator,
  textInputStyles,
  errorMessageText,
} = LoginScreenStyles;

const { NigeriaflagImage } = images;

const setAuthorizationToken = (token: string) => {
  if (token) {
    axiosCustom.defaults.headers.common["token"] = token;
  }
};

// /auth/signin/v2
const LoginScreen = ({ navigation }) => {
  const { control, handleSubmit } = useForm({ mode: "all" });
  const { control: control2, handleSubmit: handleSubmit2 } = useForm({
    mode: "all",
  });
  const [withOtp, setWithOtp] = useState(true);

  const { errorAlert } = useAlert();
  const [loading, setLoading] = useState(false);

  const onsubmit = async (data) => {
    console.log(data, "here");
    try {
      setLoading(true);
      const response = await axiosCustom.post("/auth/signin/v2", data);

      navigation.navigate("phone-verify_screen", {
        phonenumber: data.username,
        from: "login",
      });
    } catch (err) {
      if (
        "Aww padi! Incorrect feather tag/ phone number" ==
        err?.response?.data?.message
      ) {
        // PUSH TO SIGNUP PAGE
        return navigation.navigate("personalregister_screen", data.username);
        // await onsignup({ phoneNumber: data.username });
      } else {
        errorAlert(err);
      }
    } finally {
      setLoading(false);
    }
  };

  const onsignup = async (data) => {
    try {
      setLoading(true);
      const response = await axiosCustom.post("/auth/signup/v2", data);
      setAuthorizationToken(response.data.data.token);
      navigation.navigate("phone-verify_screen", {
        phonenumber: data.phoneNumber,
        from: "signup",
      });
    } catch (err) {
      errorAlert(err);
    } finally {
      setLoading(false);
    }
  };

  const onsubmitpassword = async (data) => {
    try {
      setLoading(true);
      const response = await axiosCustom.post("/auth/signin", data);
      setAuthorizationToken(response.data.data.token);
      navigation.navigate("welcome_screen");
    } catch (err) {
      if ("Incorrect feather tag/ username" == err?.response?.data?.message) {
        // PUSH TO SIGNUP PAGE
        return navigation.navigate("personalregister_screen", data.username);
        // await onsignup({ phoneNumber: data.username });
      } else {
        errorAlert(err);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <FTMainwrapper>
      <FTLoader loading={loading} />
      <Text style={center}>Enter Phone Number</Text>

      {/* WITH OTP */}
      {withOtp ? (
        <Controller
          control={control}
          name="username"
          rules={VALIDATION.PHONE_NUMBER_VALIDATION}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <View style={{ marginBottom: 20 }}>
              <Text style={inputLabel}>Phone Number</Text>
              <View
                style={[
                  loginInputWrap,
                  {
                    borderColor: error
                      ? COLORS.pink1
                      : value && !error
                      ? COLORS.blue16
                      : COLORS.grey15,
                  },
                ]}
              >
                <View style={logoAndInitialWrap}>
                  <RNImage source={NigeriaflagImage} style={logoStyle} />
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
      ) : (
        <View>
          {/* WITH PASSWORD */}
          <Controller
            control={control2}
            name="username"
            rules={VALIDATION.PHONE_NUMBER_VALIDATION}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <View style={{ marginBottom: 20 }}>
                <Text style={inputLabel}>Phone Number</Text>
                <View
                  style={[
                    loginInputWrap,
                    {
                      borderColor: error
                        ? COLORS.pink1
                        : value && !error
                        ? COLORS.blue16
                        : COLORS.grey15,
                    },
                  ]}
                >
                  <View style={logoAndInitialWrap}>
                    <RNImage source={NigeriaflagImage} style={logoStyle} />
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
                {error && (
                  <Text style={errorMessageText}> {error.message}</Text>
                )}
              </View>
            )}
          />
          <View style={{ marginBottom: 20 }}>
            <FTInput
              placeholderText="****"
              name="password"
              label="Password"
              control={control2}
              rules={VALIDATION.PASSWORD_VALIDATION}
              mB={15}
              type="password"
              textInputProps={{
                returnKeyType: "done",
              }}
            />
          </View>
        </View>
      )}

      <FTCustombutton
        btntext="PROCEED"
        onpress={
          withOtp ? handleSubmit(onsubmit) : handleSubmit2(onsubmitpassword)
        }
      />

      <Text style={bottomtext}>
        Ensure you can reach this mobile number to get started as this number
        has to be verified.
      </Text>

      <Pressable onPress={() => setWithOtp(!withOtp)}>
        <Text
          style={{
            marginTop: 50,
            textAlign: "center",
            ...fontsize.small,
            ...FONTS.semibold,
            color: COLORS.green4,
          }}
        >
          {!withOtp
            ? "Login with One-Time Password (OTP)"
            : "Login with password"}
        </Text>
      </Pressable>
    </FTMainwrapper>
  );
};

export default LoginScreen;
