import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { EditprofileScreenStyles } from "../assets/styles/screens";
import {
  FTCustombutton,
  FTInput,
  FTKeyboardwrapper,
  FTTitlepagewrapper,
} from "../components";
import { useForm } from "react-hook-form";
import {
  VALIDATION,
  navigation,
  redirectTo,
  setAuthorizationToken,
} from "../utils";
import { COLORS, FONTS, fontsize, icons } from "../constants";
import { AuthContext } from "../context/AuthContext";
import useDebounce from "../utils/debounce";
import { ActivityIndicator } from "react-native";
import Changememojicheckicon from "../assets/icons/Changememojicheckicon";
import axiosCustom from "../httpRequests/axiosCustom";
import { useAlert } from "../hooks";
const { Profileediticon } = icons;

const {
  profileHeaderText,
  headerWrap,
  profileWrap,
  headerRightWrap,
  headerRightEditText,
  pickOptionWrap,
  pickOptionText,
} = EditprofileScreenStyles;
const EditprofileScreen = () => {
  const { authdata, setAuthData } = useContext(AuthContext);
  const { errorAlert } = useAlert();
  const name = authdata?.userDetails?.fullName.split(" ");
  const [userinfo, getuserinfo, loadbounce, error] = useDebounce();

  const { control, handleSubmit, watch } = useForm({
    mode: "all",
    defaultValues: {
      featherTag: authdata?.userDetails?.username,
      firstName: name[1],
      lastName: name[0],
      email: authdata?.userDetails?.email,
      phoneNumber: authdata?.userDetails?.phoneNumber,
      gender: authdata?.userDetails?.gender,
    },
  });

  const usernamename = watch("featherTag", false) || "";
  useEffect(() => {
    getuserinfo(usernamename);
  }, [usernamename]);

  const onsubmit = async (values) => {
    try {
      const data = {
        gender: values.gender,
        newUsername: values.featherTag,
        firstName: values.firstName.trim(),
        lastName: values.lastName.trim(),
      };
      const response = await axiosCustom.put("/profile/update/basic", data);
      const userdetails = {
        ...authdata?.userDetails,
        username: values.featherTag,
        fullName: `${values.lastName} ${values.firstName}`,
        gender: values.gender,
      };
      setAuthData({
        ...authdata,
        userDetails: userdetails,
      });

      setAuthorizationToken(response?.data?.data?.token);
      navigation.navigate("Dashboard");
    } catch (err) {
      errorAlert(err);
    }
  };
  const HeaderRight = () => {
    return (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View
          style={{
            height: 35,
            width: 35,
            borderRadius: 35 / 2,
            backgroundColor: COLORS.Tblue4,
          }}
        ></View>
        <Pressable
          onPress={() => redirectTo("changeappearance_screen")}
          style={headerRightWrap}
        >
          <Profileediticon />
          <Text style={headerRightEditText}>Edit</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <FTTitlepagewrapper rightComponent={<HeaderRight />}>
      <FTKeyboardwrapper>
        <View style={headerWrap}>
          <View style={profileWrap}>
            <Text style={profileHeaderText}>My Profile</Text>

            <Text>Upgrade to Odogwu</Text>
          </View>
          <Text>Account Level : Newbie</Text>
        </View>

        <FTInput
          label="Feather Tag"
          placeholderText="Enter here.."
          name="featherTag"
          control={control}
          rules={VALIDATION.USER_NAME_VALIDATION}
        />
        <View
          style={{
            flexDirection: "row",
            marginRight: 5,
            marginBottom: 10,
            alignItems: "flex-end",
            justifyContent: "flex-end",
          }}
        >
          {loadbounce ? (
            <ActivityIndicator size={15} color={COLORS.blue6} />
          ) : userinfo.fullName &&
            usernamename?.toLowerCase() !==
              authdata?.userDetails?.username?.toLowerCase() ? (
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
          {(error ||
            usernamename?.toLowerCase() ===
              authdata?.userDetails?.username.toLowerCase()) && (
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

        <FTInput
          label="Legal Firstname"
          placeholderText="Enter here.."
          name="firstName"
          control={control}
          rules={VALIDATION.FIRST_NAME_VALIDATION}
          mB={20}
          mT={20}
        />
        <FTInput
          label="Legal Lastname"
          placeholderText="Enter here.."
          name="lastName"
          control={control}
          rules={VALIDATION.LAST_NAME_VALIDATION}
          mB={20}
        />
        <FTInput
          label="Email"
          placeholderText="Enter here.."
          name="email"
          control={control}
          rules={VALIDATION.EMAIL_VALIDATION}
          mB={20}
        />
        <FTInput
          label="Phone Number"
          placeholderText="Enter here.."
          name="phoneNumber"
          control={control}
          rules={VALIDATION.PHONE_NUMBER_VALIDATION}
          mB={20}
        />
        <FTInput
          label="Gender"
          placeholderText="Enter here.."
          name="gender"
          control={control}
          rules={VALIDATION.GENDER_VALIDATION}
          mB={20}
        />
        <FTCustombutton btntext="Submit" onpress={handleSubmit(onsubmit)} />
      </FTKeyboardwrapper>
    </FTTitlepagewrapper>
  );
};

export default EditprofileScreen;

const styles = StyleSheet.create({});
