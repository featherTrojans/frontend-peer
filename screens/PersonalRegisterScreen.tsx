import React, { useState } from "react";
import { Pressable } from "react-native";

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
import { VALIDATION } from "../utils";
import { useAlert } from "../hooks";
import { FlatList } from "react-native-gesture-handler";
import { Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

const { optionText } = PersonalRegisterScreenStyles;

const Personal = ({ route }) => {
  const phoneNumber = route.params;
  const navigation = useNavigation();
  const { errorAlert } = useAlert();
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit } = useForm({ mode: "all" });
  const [gender, setGender] = useState("--- Select Gender ---");
  const [showModal, setShowModal] = useState(false);
  //   const { setAuthData } = useContext(AuthContext);

  const onsubmit = async (data) => {
    try {
      setLoading(true);
      const response = await axiosCustom.put("/auth/signup", {
        ...data,
        phoneNumber: phoneNumber,
        gender: gender,
      });
      navigation.navigate("phone-verify_screen", {
        phonenumber: phoneNumber,
        from: "signup",
      });
    } catch (err) {
      console.log(err.response);
      errorAlert(err);
    } finally {
      setLoading(false);
    }
  };

  const closeGenderModal = (item) => {
    setGender(item);
    setShowModal(false);
  };

  const GenderModal = () => {
    return (
      <FlatList
        data={["male", "female"]}
        renderItem={({ item }) => {
          return (
            <Pressable onPress={() => closeGenderModal(item)}>
              <Text style={optionText}>{item}</Text>
            </Pressable>
          );
        }}
        keyExtractor={(item) => item}
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    );
  };

  return (
    <FTTitlepagewrapper
      title="Personal Information"
      modalChildren={<GenderModal />}
      showModal={showModal}
      setShowModal={setShowModal}
      modalHeight={200}
    >
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
          placeholderText={gender}
          name="gender"
          label="Gender"
          control={control}
          type="dropdown"
          // rules={VALIDATION.LAST_NAME_VALIDATION}
          mB={55}
          onPress={() => setShowModal(true)}
        />
        <FTInput
          placeholderText="Enter A Password"
          name="password"
          label="Password"
          control={control}
          rules={VALIDATION.PASSWORD_VALIDATION}
          type="password"
          mB={15}
        />
        {/* Proceed Btn */}
        <FTCustombutton btntext="Continue" onpress={handleSubmit(onsubmit)} />
      </FTKeyboardwrapper>
    </FTTitlepagewrapper>
  );
};

export default Personal;
