import { View, Text, Pressable, TextInput } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { setAuthorizationToken, setDataInstorage } from "../utils";
import { FTCustombutton, FTLoader, FTTitlepagewrapper } from "../components";
// import OTPTextInput from "react-native-otp-textinput";
import { COLORS, FONTS } from "../constants";
import { PhoneVerificationScreenStyles } from "../assets/styles/screens";
import { useAlert } from "../hooks";
import axiosCustom from "../httpRequests/axiosCustom";
import * as Clipboard from "expo-clipboard";
import { useFocusEffect } from "@react-navigation/native";
import OTPInputView from "@twotalltotems/react-native-otp-input";

const {
  enterDigitText,
  enterDigitSubText,
  bottomtext,
  otpInputWrap,
  otpHighlightInputWrap,
  buttonWrap,
  notReceiveText,
  durationWrap,
  changeNumberText,
} = PhoneVerificationScreenStyles;

const PhoneVerificationScreen = ({ navigation, route }) => {
  const { errorAlert } = useAlert();
  const [loading, setLoading] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [timecount, settimecount] = useState(30);
  const phoneNumber = route.params?.phonenumber || "08168890192";
  const from = route.params?.from || "login";
  const otpInput = useRef(null);
  const inputRef = useRef(TextInput);
  const [text, setText] = useState("");
  const [noOfInput, setNoOfInput] = useState(true);
  const [focusInput, setFocusInput] = useState(false);

  useEffect(() => {
    let timer = setInterval(() => {
      if (timecount < 1) {
        clearInterval(timer);
      } else {
        settimecount((prev) => prev - 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timecount]);

  const handlesubmit = async () => {
    const url = from == "login" ? "auth/signin/confirm" : "/auth/verify/code";
    const navigateurl = from == "login" ? "welcome_screen" : "bvn_screen";
    if (`${otpCode}`.length !== 6) {
      errorAlert(null, "please complete OTP field");
      return;
    }

    try {
      setLoading(true);
      const response = await axiosCustom.post(url, {
        code: otpCode,
      });
      await setDataInstorage("@token", {
        token: response.data.data.token,
        time: Date.now(),
      });
      setAuthorizationToken(response.data.data.token);
      navigation.navigate(navigateurl);
    } catch (err) {
      errorAlert(err);
    } finally {
      setLoading(false);
    }
  };

  const resendcode = async () => {
    try {
      setLoading(true);
      await axiosCustom.post("auth/resend/code", {
        detail: phoneNumber,
      });
      settimecount(30);
    } catch (err) {
      errorAlert(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FTTitlepagewrapper title="Verify phone number">
      <FTLoader loading={loading} />
      <Text style={enterDigitText}>
        Enter the 6-digit code sent to you at{" "}
        <Text style={enterDigitSubText}>{phoneNumber}</Text>.
      </Text>

      <OTPInputView
        style={{ width: "100%", height: 52 }}
        pinCount={6}
        autoFocusOnLoad
        codeInputFieldStyle={otpInputWrap}
        codeInputHighlightStyle={otpHighlightInputWrap}
        onCodeFilled={(code) => setOtpCode(code)}
      />

      <View style={buttonWrap}>
        <FTCustombutton btntext="VERIFY" onpress={handlesubmit} />
      </View>

      <View style={durationWrap}>
        <Text style={notReceiveText}>Didn’t receive the code yet?</Text>
        {timecount > 0 ? (
          <Text style={notReceiveText}>00 : {timecount}s </Text>
        ) : (
          <Pressable onPress={resendcode}>
            <Text style={[notReceiveText, { color: COLORS.blue16 }]}>
              Resend
            </Text>
          </Pressable>
        )}
      </View>
      <Text style={notReceiveText}>
        Incorrect Number?{" "}
        <Text style={changeNumberText} onPress={navigation.goBack}>
          Change Number
        </Text>
      </Text>
    </FTTitlepagewrapper>
  );
};

export default PhoneVerificationScreen;
