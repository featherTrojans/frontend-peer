import { View, Text } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { navigation, setAuthorizationToken, setDataInstorage } from "../utils";
import { FTCustombutton, FTLoader, FTTitlepagewrapper } from "../components";
import OTPTextInput from "react-native-otp-textinput";
import { COLORS } from "../constants";
import { PhoneVerificationScreenStyles } from "../assets/styles/screens";
import { useAlert } from "../hooks";
import axiosCustom from "../httpRequests/axiosCustom";
// import Loader from "../components/FTLoader";

// auth/signin/confirm
const PhoneVerificationScreen = ({ route }) => {
  const { errorAlert } = useAlert();
  const [loading, setLoading] = useState(false);
  const [otpCode, setOtpCode] = useState<any>("");
  const [timecount, settimecount] = useState(30);
  const phoneNumber = route.params?.phoneNumber || "08168890192";
  const from = route.params?.from || "login";
  const otpInput = useRef(null);

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

  return (
    <FTTitlepagewrapper title="Verify phone number">
      <FTLoader loading={loading} />
      <Text style={PhoneVerificationScreenStyles.center}>
        Enter the 6-digit code sent to you at {phoneNumber}.
      </Text>

      <OTPTextInput
        ref={otpInput}
        handleTextChange={(text) => setOtpCode(text)}
        inputCount={6}
        tintColor={COLORS.green1}
        offTintColor={COLORS.grey6}
        textInputStyle={{
          width: 49,
          height: 51,
          backgroundColor: COLORS.white,
          borderWidth: 1,
          borderBottomWidth: 1,
          borderRadius: 10,
        }}
      />
      <View style={PhoneVerificationScreenStyles.margin}>
        <FTCustombutton btntext="VERIFY" onpress={handlesubmit} />
      </View>
      <View style={PhoneVerificationScreenStyles.flexspace}>
        <Text>Didn’t receive the code yet?</Text>
        {timecount > 0 ? (
          <Text>00 : {timecount}s </Text>
        ) : (
          <Text onPress={resendcode}>Resend</Text>
        )}
      </View>
      <View style={PhoneVerificationScreenStyles.flex}>
        <Text>Incorrect Number?</Text>
        <Text
          style={PhoneVerificationScreenStyles.backlink}
          onPress={navigation.goBack}
        >
          Change Number
        </Text>
      </View>
    </FTTitlepagewrapper>
  );
};

export default PhoneVerificationScreen;
