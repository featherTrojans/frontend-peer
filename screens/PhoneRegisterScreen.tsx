import { View, Text } from "react-native";
import React, { useState } from "react";
import { FTCustombutton, FTInput, FTMainwrapper } from "../components";
import { PhoneRegisterScreenStyles } from "../assets/styles/screens";
import { useForm } from "react-hook-form";
import { VALIDATION, setAuthorizationToken } from "../utils";
import axiosCustom from "../httpRequests/axiosCustom";
import { useAlert } from "../hooks";
import Loader from "../components/FTLoader";
const { center, bottomtext } = PhoneRegisterScreenStyles;

const PhoneRegisterScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit } = useForm({ mode: "all" });
  const { errorAlert } = useAlert();
  const onsubmit = async (data) => {
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
  return (
    <FTMainwrapper>
      <Text style={center}>Enter Phone Number</Text>
      {loading && <Loader />}
      <View>
        <FTInput
          placeholderText="Enter here.."
          name="phoneNumber"
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

export default PhoneRegisterScreen;
