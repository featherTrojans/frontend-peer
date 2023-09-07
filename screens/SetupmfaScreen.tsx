import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { SetupmfaScreenStyles } from "../assets/styles/screens";
import {
  FTCustombutton,
  FTHeaderandsubheader,
  FTHorizontaline,
  FTInput,
  FTKeyboardwrapper,
  FTTitlepagewrapper,
} from "../components";
import { useForm } from "react-hook-form";
import { VALIDATION } from "../utils";
import { SIZES } from "../constants";

const {pickQuestionText, questionText} = SetupmfaScreenStyles;

const SetupmfaScreen = () => {
  const { control, handleSubmit } = useForm({ mode: "all" });
  const [answer1, setAnswer1] = useState("Select Preferred Question 1");
  const [answer2, setAnswer2] = useState("Select Preferred Question 2");
  const [showModal, setShowModal] = useState(false);
  const [content, setContent] = useState<any>({ child: null, height: 400 });


  const questions = [
    "What’s your mother’s maiden name ?",
    "Where did you have your first kiss ?",
    "What’s the name of your favorite pet ?",
    "What’s the name of your favorite teacher?",
    "What’s the name of your dream car?",
    "What’s the name of your crush?",
  ]

  const closeAnswer1modal = (item) => {
    setAnswer1(item)
    setShowModal(false)
  }
  const closeAnswer2modal = (item) => {
    setAnswer2(item)
    setShowModal(false)
  }
  const SecurityQuestion1 = () => {
    return (
      <View>
        <Text style={pickQuestionText}>Pick a question</Text>
        <FlatList 
        data={questions}
        renderItem={({item}) => {
          return (
            <TouchableOpacity onPress={() => closeAnswer1modal(item)} activeOpacity={0.7}>
              <Text style={questionText}>{item}</Text>
            </TouchableOpacity>
          )
        }}
        
        />
      </View>
    )
  }

  const SecurityQuestion2 = () => {
    return (
      <View>
        <Text style={pickQuestionText}>Pick a question</Text>
        <FlatList 
        data={questions}
        renderItem={({item}) => {
          return (
            <TouchableOpacity onPress={() => closeAnswer2modal(item)} activeOpacity={0.7}>
              <Text style={questionText}>{item}</Text>
            </TouchableOpacity>
          )
        }}
        
        />
      </View>
    )
  }

  const switchModals = (value: number) => {
    switch (value) {
      case 0:
        setContent({ child: <SecurityQuestion1 />, height: SIZES.height / 1.8 });
        setShowModal((s) => !s);
        break;
      case 1:
        setContent({ child: <SecurityQuestion2 />, height: SIZES.height / 1.8 });
        setShowModal((s) => !s);
        break;
      default:
        break;
    }
  };

  const onsubmit = (data) => {
      console.log(data, "Jsnsmm")
  }

  return (
    <FTTitlepagewrapper
      title="Setup MFA"
      modalChildren={content.child}
      showModal={showModal}
      setShowModal={setShowModal}
      modalHeight={content.height}
    >
      <FTKeyboardwrapper>
        <FTHeaderandsubheader
          header="Setup your Security Questions and Answers"
          subHeader="Kindly choose from the questions above and provide appropriate answers to fully enable your MFA"
        />

        <FTInput
          placeholderText={answer1}
          name="state"
          label="Question 1"
          control={control}
          rules={VALIDATION.ANSWER_ONE_VALIDATION}
          mT={40}
          mB={15}
          type="dropdown"
          onPress={() => switchModals(0)}
        />

        <FTInput
          placeholderText="Type Preferred Answer 1"
          name="answer1"
          label="Answer 1"
          control={control}
          rules={VALIDATION.ANSWER_ONE_VALIDATION}
          mB={15}
        />

        <FTHorizontaline marginV={30} />

        <FTInput
          placeholderText={answer2}
          name="state"
          label="Question 2"
          control={control}
          rules={VALIDATION.ANSWER_TWO_VALIDATION}
          mB={15}
          type="dropdown"
          onPress={() => switchModals(1)}
        />

        <FTInput
          placeholderText="Type Preferred Answer 2"
          name="answer2"
          label="Answer 2"
          control={control}
          rules={VALIDATION.ANSWER_VALIDATION}
          mB={30}
        />

        <FTCustombutton
          btntext="Setup MFA"
          onpress={handleSubmit(onsubmit)}
        />
      </FTKeyboardwrapper>
    </FTTitlepagewrapper>
  );
};

export default SetupmfaScreen;

const styles = StyleSheet.create({});
