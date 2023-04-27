import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import OTPTextInput from "react-native-otp-textinput";
import axiosCustom from "../../../../httpRequests/axiosCustom";
import showerror from "../../../../utils/errorMessage";
import Globalmodal from "../../../shared/Globalmodal/Globalmodal";
import Customstatusbar from "../../../shared/Customstatusbar";
import { useToast } from "react-native-toast-notifications";
import { COLORS, FONTS, fontsize, icons } from "../../../../constants";
import { styles } from "../../verification/Verification.styles";

import {
  Backheader,
  Custombutton,
  Horizontaline,
  Loader,
  Mainwrapper,
} from "../../../../components";
import { SafeAreaView } from "react-native-safe-area-context";
import { RFValue } from "react-native-responsive-fontsize";
import useAlert from "../../../../utils/useAlerts";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const { Successcheckanimate, Cancelicon } = icons;

const Forgetpasswordotp = ({ navigation, route }) => {
  const toast = useToast();
  const { email, token } = route.params;
  const [time, setTime] = useState<number>(30);
  // const {email, phoneNumber, token} = route.params
  const [loading, setLoading] = useState<boolean>(false);
  const [otpCode, setOtpCode] = useState<any>("");
  const [tokenn, setToken] = useState<string | null>(token);
  const [disable, setDisable] = useState(true);
  const otpInput = useRef(null);
  const {errorAlert} = useAlert()

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevtime) => {
        if (prevtime < 1) {
          setDisable(false);
          return 0;
        } else {
          setDisable(true);
          return prevtime - 1;
        }
      });
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    // handleResendOTP()
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await axiosCustom.post(
        "auth/verify/code",
        { code: otpCode },
        { headers: { token: tokenn! } }
      );
      navigation.navigate("Setnewpassword", { token: tokenn, code: otpCode });
    } catch (err) {
      errorAlert(err);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setLoading(true);
    try {
      const response = await axiosCustom.post("auth/resend/code", { email });
      setToken(response?.data?.data?.token);
      setDisable(false);
      setTime(30);
    } catch (err) {
      errorAlert(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Mainwrapper>
      <Backheader title="Verify Email Address" />

      <KeyboardAwareScrollView style={[{ paddingHorizontal: RFValue(25) }]}>


        {loading && <Loader />}

        <View style={{ marginTop: 30 }}>
          <Text
            style={{
              marginBottom: 15,
              ...fontsize.bsmall,
              ...FONTS.medium,
              color: COLORS.blue9,
            }}
          >
            Enter OTP sent to your email
          </Text>
          <Text
            style={{
              ...fontsize.smallest,
              ...FONTS.regular,
              color: COLORS.grey16,
            }}
          >
            An OTP has been sent to you via your email - {email}
          </Text>
        </View>

        <View style={{ marginTop: 47, marginBottom: 40 }}>
          <OTPTextInput
            ref={otpInput}
            handleTextChange={(text) => setOtpCode(text)}
            inputCount={6}
            tintColor={COLORS.grey6}
            offTintColor={COLORS.grey6}
            textInputStyle={{
              width: 40,
              height: 50,
              backgroundColor: COLORS.white,
              borderWidth: 1,
              borderBottomWidth: 1,
              borderRadius: 4,
            }}
          />
        </View>
        <View
          style={{
            backgroundColor: COLORS.white,
            padding: 20,
            borderRadius: 15,
            marginBottom: 22,
          }}
        >
          {/* Resend sms duration */}
          <View style={styles.resendAndDuration}>
            <TouchableOpacity disabled={disable} onPress={handleResendOTP}>
              <Text style={styles.resendText}>Resend OTP in</Text>
            </TouchableOpacity>
            <View>
              <Text style={styles.duration}>00 : {time}s</Text>
            </View>
          </View>

          {/* Dashedline */}
          <Horizontaline marginV={17} />
          {/* Change number text */}
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.changeNumber}>
              Incorrect Email?{" "}
              <Text style={{ color: COLORS.blue9 }}>Change email.</Text>
            </Text>
          </TouchableOpacity>
        </View>

        {/* Submit button */}

        <Custombutton btntext="Verify" onpress={handleSubmit} />



      </KeyboardAwareScrollView>
    </Mainwrapper>
  );
};

export default Forgetpasswordotp;
