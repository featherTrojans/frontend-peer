import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SetupmfaScreenStyles } from "../assets/styles/screens";
import {
  FTHeaderandsubheader,
  FTHorizontaline,
  FTInput,
  FTKeyboardwrapper,
  FTTitlepagewrapper,
} from "../components";
import { useForm } from "react-hook-form";
import { VALIDATION } from "../utils";

const {} = SetupmfaScreenStyles;

const SetupmfaScreen = () => {
  const { control, handleSubmit } = useForm({ mode: "all" });
  const [city, setCity] = useState("Select Preferred Question 1");

  return (
    <FTTitlepagewrapper title="Setup MFA">
      <FTKeyboardwrapper>
        <FTHeaderandsubheader
          header="Setup your Security Questions and Answers"
          subHeader="Kindly choose from the questions above and provide appropriate answers to fully enable your MFA"
        />

        <FTInput
          placeholderText={city}
          name="state"
          label="Question 1"
          control={control}
          rules={VALIDATION.FIRST_NAME_VALIDATION}
          mT={40}
          mB={15}
          type="dropdown"
          onPress={() => console.log(0)}
        />

        <FTInput
          placeholderText="Type Preferred Answer 1"
          name="house_no"
          label="Answer 1"
          control={control}
          rules={VALIDATION.FIRST_NAME_VALIDATION}
          mB={15}
        />

        <FTHorizontaline marginV={30} />

        <FTInput
          placeholderText={city}
          name="state"
          label="Question 2"
          control={control}
          rules={VALIDATION.FIRST_NAME_VALIDATION}
          mB={15}
          type="dropdown"
          onPress={() => console.log(0)}
        />

        <FTInput
          placeholderText="Type Preferred Answer 2"
          name="house_no"
          label="Answer 2"
          control={control}
          rules={VALIDATION.FIRST_NAME_VALIDATION}
          mB={15}
        />
      </FTKeyboardwrapper>
    </FTTitlepagewrapper>
  );
};

export default SetupmfaScreen;

const styles = StyleSheet.create({});
