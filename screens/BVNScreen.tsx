import React, { useContext, useState } from "react";
import {
  FTCustombutton,
  FTHeaderandsubheader,
  FTInput,
  FTLoader,
  FTTitlepagewrapper,
} from "../components";
import { VALIDATION } from "../utils";
import { useForm } from "react-hook-form";
import {
  Text,
  View,
  TouchableOpacity,
  Pressable,
  StyleSheet,
} from "react-native";
import { BVNScreenStyles } from "../assets/styles/screens";
import { useAlert } from "../hooks";
import axiosCustom from "../httpRequests/axiosCustom";
import { AuthContext } from "../context/AuthContext";
import { COLORS, FONTS, fontsize, icons } from "../constants";
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
  SlideInUp,
  SlideOutDown,
  SlideOutUp,
} from "react-native-reanimated";

const {
  headerText,
  skip,
  flex,
  flexdown,
  bvnreason,
  bvntext,
  infotext,
  link,
  skipLaterText,
  bvnIconTextWrap,
  modalBg,
  modalBvnInfo,
  modalBvnInfoText,
} = BVNScreenStyles;

const { Skiplatericon, Bvncommenticon, Bvnverifyicon } = icons;
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function BVNScreen({ navigation }) {
  const { token } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit } = useForm({ mode: "all" });
  const { errorAlert } = useAlert();
  const [showModal, setShowModal] = useState(false);
  const [height, setHeight] = useState(56);

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
  const closeModal = () => {
    setShowModal((s) => !s);
    setHeight(240);
  };

  const skipToWelcome = () => {
    navigation.replace("feathertag_screen");
  };

  const BVNReasonModal = () => {
    return (
      <AnimatedPressable
        entering={FadeIn}
        exiting={FadeOut}
        onPress={closeModal}
        style={modalBg}
      >
        <AnimatedPressable
          entering={SlideInDown}
          exiting={SlideOutDown}
          style={[modalBvnInfo, { height: height }]}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={closeModal}
            style={[bvnreason]}
          >
            <View style={bvnIconTextWrap}>
              <Bvncommenticon />
              <Text style={bvntext}>Why Should I verify my BVN?</Text>
            </View>
            <View style={{ transform: [{ rotate: "180deg" }] }}>
              <Bvnverifyicon />
            </View>
          </TouchableOpacity>

          <View style={{ paddingHorizontal: 16 }}>
            <Text style={modalBvnInfoText}>1. Increased wallet limits </Text>
            <Text style={modalBvnInfoText}>
              2. Free bank account number for receiving money{" "}
            </Text>
            <Text style={modalBvnInfoText}>3. Access to discounted offers</Text>
          </View>
        </AnimatedPressable>
      </AnimatedPressable>
    );
  };
  return (
    <>
      <FTTitlepagewrapper title="Verify BVN">
        <FTLoader loading={loading} />
        <View style={flex}>
          <Text style={headerText}>Hi Doyin {"\n"}Enter your BVN</Text>
          <FTInput
            placeholderText="Enter BVN"
            name="bvn"
            label="Your 12 Digit BVN"
            textInputProps={{
              maxLength: 11,
              keyboardType: "number-pad",
              returnKeyType: "done",
            }}
            control={control}
            rules={VALIDATION.BVN_NUMBER_INPUT_VALIDATION}
            mB={20}
            mT={50}
          />
          <FTCustombutton btntext="Continue" onpress={handleSubmit(onsubmit)} />
          {!token && (
            <TouchableOpacity
              activeOpacity={0.4}
              style={skip}
              onPress={skipToWelcome}
            >
              <Skiplatericon />
              <Text style={skipLaterText}>Skip for later</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={flexdown}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={closeModal}
            style={bvnreason}
          >
            <View style={bvnIconTextWrap}>
              <Bvncommenticon />
              <Text style={bvntext}>Why Should I verify my BVN?</Text>
            </View>
            <Bvnverifyicon />
          </TouchableOpacity>

          <Text style={infotext}>
            For more information visit,
            <Text style={link}> www.getfeather.africa</Text>
          </Text>
        </View>
      </FTTitlepagewrapper>
      {showModal && <BVNReasonModal />}
    </>
  );
}

export default BVNScreen;
