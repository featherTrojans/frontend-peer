import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useState } from "react";
import { EditprofileScreenStyles } from "../assets/styles/screens";
import { FTInput, FTKeyboardwrapper, FTTitlepagewrapper } from "../components";
import { useForm } from "react-hook-form";
import { VALIDATION, redirectTo } from "../utils";
import { COLORS, FONTS, fontsize, icons } from "../constants";
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
  const { control, handleSubmit } = useForm({
    mode: "all",
    defaultValues: {
      firstName: "Ayobami",
      lastName: "Lawal",
    },
  });

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
          rules={VALIDATION.PHONE_NUMBER_VALIDATION}
          mB={20}
        />
      </FTKeyboardwrapper>
    </FTTitlepagewrapper>
  );
};

export default EditprofileScreen;

const styles = StyleSheet.create({});
