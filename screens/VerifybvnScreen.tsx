import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { VerifybvnScreenStyles } from "../assets/styles/screens";
import {
  FTCustombutton,
  FTInput,
  FTLoader,
  FTTitlepagewrapper,
} from "../components";
import { useForm } from "react-hook-form";
import { VALIDATION } from "../utils";
import axiosCustom from "../httpRequests/axiosCustom";
import { useAlert } from "../hooks";

const { flex, headerText, backlink, flexspace, flexrow, margin } =
  VerifybvnScreenStyles;

const VerifybvnScreen = ({ navigation }) => {
  const { control, handleSubmit } = useForm({ mode: "all" });
  const [loading, setLoading] = useState(false);
  const [errorcount, seterrorcount] = useState(0);
  const [timecount, settimecount] = useState(30);
  const { errorAlert } = useAlert();

  const onsubmit = async (data) => {
    try {
      setLoading(true);
     const response = await axiosCustom.post("user/verify/upgrade", data);
     console.log(response.data, "Here is the bvn response")
      navigation.navigate("bvn-success_screen");
    } catch (err) {
      if (errorcount == 2) {
        navigation.navigate("bvn-error_screen");
        return;
      }
      errorAlert(err);
      seterrorcount(errorcount + 1);
    } finally {
      setLoading(false);
    }
  };

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

  const resendcode = async () => {
    //   const url =   "auth/signup/resend";
    //   try {
    //     setLoading(true);
    //     await axiosCustom.post(url, {
    //       phoneNumber,
    //     });
    //     settimecount(30);
    //   } catch (err) {
    //     errorAlert(err);
    //   } finally {
    //     setLoading(false);
    //   }
  };
  return (
    <FTTitlepagewrapper title="Verify BVN">
      <FTLoader loading={loading} />
      <View style={flex}>
        <Text style={headerText}>
          Enter code sent to your {"\n"}mobile phone
        </Text>
        <FTInput
          placeholderText="Enter BVN"
          name="code"
          label="6 Digit Code"
          control={control}
          rules={VALIDATION.PHONE_NUMBER_VALIDATION}
          mB={20}
          mT={44}
        />
        <View style={margin}>
          <FTCustombutton btntext="Continue" onpress={handleSubmit(onsubmit)} />
        </View>
        <View style={flexspace}>
          <Text>Didn’t receive the code yet?</Text>
          {timecount > 0 ? (
            <Text>00 : {timecount}s </Text>
          ) : (
            <Text onPress={resendcode}>Resend</Text>
          )}
        </View>
        <View style={flexrow}>
          <Text>Incorrect BVN?</Text>
          <Text style={backlink} onPress={navigation.goBack}>
            Change BVN
          </Text>
        </View>
      </View>
    </FTTitlepagewrapper>
  );
};

export default VerifybvnScreen;

const styles = StyleSheet.create({});
