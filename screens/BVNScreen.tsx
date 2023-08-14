import React, { useContext, useState } from "react";
import {
  FTCustombutton,
  FTHeaderandsubheader,
  FTInput,
  FTTitlepagewrapper,
} from "../components";
import { VALIDATION, navigation } from "../utils";
import { useForm } from "react-hook-form";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native";
import { BVNScreenStyles } from "../assets/styles/screens";
import { useAlert } from "../hooks";
import axiosCustom from "../httpRequests/axiosCustom";
import Loader from "../components/FTLoader";
import { AuthContext } from "../context/AuthContext";
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
} = BVNScreenStyles;
function BVNScreen() {
  const { token } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit } = useForm({ mode: "all" });
  const { errorAlert } = useAlert();

  const onsubmit = async (data) => {
    try {
      setLoading(true);
      await axiosCustom.post("/user/upgrade", data);
      navigation.navigate("bvn-verify_screen");
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
      {loading && <Loader />}
      <View style={flex}>
        <Text style={headerText}>HI Doyin</Text>
        <Text style={headerText}>Enter your BVN</Text>
        <FTInput
          placeholderText="Enter BVN"
          name="bvn"
          label="Your 11 Digit BVN"
          control={control}
          rules={VALIDATION.PHONE_NUMBER_VALIDATION}
          mB={20}
          mT={44}
        />
        <FTCustombutton btntext="Continue" onpress={handleSubmit(onsubmit)} />
        {!token && (
          <TouchableOpacity
            activeOpacity={0.4}
            style={skip}
            onPress={skipToWelcome}
          >
            <Text>Skip for later</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={flexdown}>
        <View style={bvnreason}>
          <Text style={bvntext}>Why Should I verify my BVN?</Text>
        </View>

        <View style={info}>
          <Text style={infotext}>For more information visit,</Text>
          <Text style={link}> www.getfeather.africa</Text>
        </View>
      </View>
    </FTTitlepagewrapper>
  );
}

export default BVNScreen;
