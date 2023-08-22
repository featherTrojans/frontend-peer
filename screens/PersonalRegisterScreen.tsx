import React, { useState } from "react";
import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { PersonalRegisterScreenStyles } from "../assets/styles/screens/personalregister.style";
import {
  FTCustombutton,
  FTHeaderandsubheader,
  FTInput,
  FTKeyboardwrapper,
  FTLoader,
  FTTitlepagewrapper,
} from "../components";

import axiosCustom from "../httpRequests/axiosCustom";
// import Loader from "../components/FTLoader";
import { useForm } from "react-hook-form";
import { VALIDATION, navigation } from "../utils";
import { useAlert } from "../hooks";

PersonalRegisterScreenStyles;

const Personal = ({}) => {
  const { errorAlert } = useAlert();
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit } = useForm({ mode: "all" });
  //   const { setAuthData } = useContext(AuthContext);

  const onsubmit = async (data) => {
    try {
      setLoading(true);
      const response = await axiosCustom.post("/auth/data/update", data);
      navigation.navigate("bvn_screen");
    } catch (err) {
      errorAlert(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FTTitlepagewrapper title="Personal Information">
      <FTLoader loading={loading} />

      <FTKeyboardwrapper>
        <FTHeaderandsubheader
          header="Personal information"
          subHeader="Kindly input your personal information to setup your profile"
        />

        <FTInput
          placeholderText="Enter your Firstname"
          name="firstName"
          label="Legal firstname"
          control={control}
          rules={VALIDATION.FIRST_NAME_VALIDATION}
          mB={15}
          mT={40}
        />
        <FTInput
          placeholderText="Enter your lastname"
          name="lastName"
          label="Legal Lastname"
          control={control}
          rules={VALIDATION.LAST_NAME_VALIDATION}
          mB={15}
        />
        <FTInput
          placeholderText="Enter valid email address"
          name="email"
          label="Email"
          control={control}
          rules={VALIDATION.EMAIL_VALIDATION}
          mB={15}
        />

        <FTInput
          placeholderText="--- Select Gender ---"
          name="gender"
          label="Gender"
          control={control}
          rules={VALIDATION.LAST_NAME_VALIDATION}
          mB={55}
        />

        {/* Proceed Btn */}
        <FTCustombutton btntext="Continue" onpress={handleSubmit(onsubmit)} />
      </FTKeyboardwrapper>
    </FTTitlepagewrapper>
  );
};

export default Personal;
