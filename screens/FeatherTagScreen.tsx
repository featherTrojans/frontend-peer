import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { FeatherTagScreenStyles } from "../assets/styles/screens";
import { FTCustombutton, FTInput, FTTitlepagewrapper } from "../components";
import { useForm } from "react-hook-form";
import { VALIDATION, navigation } from "../utils";
import axiosCustom from "../httpRequests/axiosCustom";
import { useAlert } from "../hooks";

const {
  headerText,
  skip,
  flex,
  flexdown,
  bvnreason,
  bvntext,
  info,
  infotext,
  link,
  subHeaderText,
} = FeatherTagScreenStyles;
const FeatherTagScreen = () => {
  const { control, handleSubmit } = useForm({ mode: "all" });
  const [loading, setLoading] = useState(false);
  const { errorAlert } = useAlert();

  const onsubmit = async (data) => {
    return;
    try {
      setLoading(true);
      // await axiosCustom.post("/user/upgrade", data);
      navigation.navigate("welcome_screen");
    } catch (err) {
      errorAlert(err);
    } finally {
      setLoading(false);
    }
  };

  const skipToWelcome = () => {
    navigation.navigate("welcome_screen", {
      fromm: "setup",
    });
  };

  return (
    <FTTitlepagewrapper title="Verify BVN">
      <View style={flex}>
        <View style={{ width: "80%" }}>
          <Text style={headerText}>Almost there!</Text>
          <Text style={headerText}>Create a feather tag</Text>
          <Text style={subHeaderText}>
            Kindly input your personal information to setup your profile
          </Text>
        </View>
        <FTInput
          placeholderText="Enter tag"
          name="tag"
          label="Your custom feather tag"
          control={control}
          rules={VALIDATION.LAST_NAME_VALIDATION}
          mB={20}
          mT={44}
        />
        <FTCustombutton btntext="Continue" onpress={handleSubmit(onsubmit)} />
        <TouchableOpacity
          activeOpacity={0.4}
          style={skip}
          onPress={skipToWelcome}
        >
          <Text>Skip for later</Text>
        </TouchableOpacity>
      </View>
      <View style={flexdown}>
        <View style={info}>
          <Text style={infotext}>For more information visit,</Text>
          <Text style={link}> www.getfeather.africa</Text>
        </View>
      </View>
    </FTTitlepagewrapper>
  );
};

export default FeatherTagScreen;
