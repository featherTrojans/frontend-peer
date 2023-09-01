import { View, Text, Pressable, TextInput } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { navigation, setAuthorizationToken, setDataInstorage } from "../utils";
import { FTCustombutton, FTLoader, FTTitlepagewrapper } from "../components";
import OTPTextInput from "react-native-otp-textinput";
import { COLORS, FONTS } from "../constants";
import { PhoneVerificationScreenStyles } from "../assets/styles/screens";
import { useAlert } from "../hooks";
import axiosCustom from "../httpRequests/axiosCustom";
import * as Clipboard from "expo-clipboard";

const {
  enterDigitText,
  enterDigitSubText,
  bottomtext,
  otpInputWrap,
  buttonWrap,
  notReceiveText,
  durationWrap,
  changeNumberText,
} = PhoneVerificationScreenStyles;

// auth/signin/confirm
const PhoneVerificationScreen = ({ route }) => {
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

  useEffect(() => {
    if (text.length === 6) {
      console.log(text);
      otpInput?.current?.setValue(text);
    }
  }, [text]);

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
    const url = from == "login" ? "auth/signin/confirm" : "auth/signup/confirm";
    const navigateurl =
      from == "login" ? "welcome_screen" : "personalregister_screen";
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
        phoneNumber,
      });
      settimecount(30);
    } catch (err) {
      errorAlert(err);
    } finally {
      setLoading(false);
    }
  };


  // let isChanging = (value) => {
  //   console.log(value, "yya");
  //   setNoOfInput(false);
  //   otpInput?.current?.setValue(value);
  // };

  return (
    <FTTitlepagewrapper title="Verify phone number">
      <FTLoader loading={loading} />
      <Text style={enterDigitText}>
        Enter the 6-digit code sent to you at{" "}
        <Text style={enterDigitSubText}>{phoneNumber}</Text>.
      </Text>

      <View style={{alignContent: "center", alignSelf: "center"}}>
      <OTPTextInput
        ref={otpInput}
        handleTextChange={(text) => setOtpCode(text)}
        // handleCellTextChange={(text) => console.log(text, "Single")}
        inputCount={6}
        // inputCellLength={1}
        tintColor={COLORS.blue16}
        offTintColor={COLORS.grey21}
        textInputStyle={otpInputWrap}
        autoFocus={false}
      />
      </View>
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
