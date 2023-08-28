import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { FeatherTagScreenStyles } from "../assets/styles/screens";
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
import useDebounce from "../utils/debounce";
import { COLORS } from "../constants";
import Changememojicheckicon from "../assets/icons/Changememojicheckicon";

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

const FeatherTagScreen = ({ navigation }) => {
  const { control, handleSubmit, watch } = useForm({ mode: "all" });
  const [loading, setLoading] = useState(false);
  const { errorAlert } = useAlert();
  const [userinfo, getuserinfo, loadbounce, error] = useDebounce();
  const usernamename = watch("featherTag", false) || "";

  useEffect(() => {
    getuserinfo(usernamename);
  }, [usernamename]);

  const onsubmit = async (data) => {
    if (!error) {
      errorAlert(null, "Feather tag is taken");
      return;
    }

    try {
      console.log(data.featherTag);
      setLoading(true);
      await axiosCustom.put("auth/username/set", {
        newUsername: data.featherTag,
      });
      navigation.replace("welcome_screen", {
        fromm: "setup",
      });
    } catch (err) {
      console.log(err.response.data);
      errorAlert(err);
    } finally {
      setLoading(false);
    }
  };

  const skipToWelcome = () => {
    navigation.replace("welcome_screen", {
      fromm: "setup",
    });
  };

  return (
    <FTTitlepagewrapper title="Verify BVN">
      <FTLoader loading={loading} />
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
          name="featherTag"
          label="Your custom feather tag"
          control={control}
          rules={VALIDATION.LAST_NAME_VALIDATION}
          mB={10}
          mT={44}
        />
        <View
          style={{
            flexDirection: "row",
            marginRight: 5,
            marginBottom: 20,
            alignItems: "flex-end",
            justifyContent: "flex-end",
          }}
        >
          {loadbounce ? (
            <ActivityIndicator size={15} color={COLORS.blue6} />
          ) : userinfo.fullName ? (
            <>
              {/* <WrongIcon /> */}
              <Text
                style={{
                  color: "#0034CB",
                  marginLeft: 10,
                }}
              >
                {usernamename} is taken
              </Text>
            </>
          ) : null}
          {error && (
            <>
              <Changememojicheckicon />
              <Text
                style={{
                  color: "#0034CB",
                  marginLeft: 10,
                }}
              >
                {usernamename}
              </Text>
            </>
          )}
        </View>
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
