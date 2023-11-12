import { Text, View, TouchableOpacity, SafeAreaView } from "react-native";
import React, { useContext, useState } from "react";
import Modal from "react-native-modal";
import { COLORS, FONTS, fontsize, SIZES, icons } from "../constants";
import { FTKeyboard, FTLoader } from "../components";
import axiosCustom from "../httpRequests/axiosCustom";
import { AuthContext } from "../context/AuthContext";
import { RFValue } from "react-native-responsive-fontsize";
import { nameToShow } from "../utils/nameSplitter";

import { LockScreenStyles } from "../assets/styles/screens";
import { useAlert } from "../hooks";

const {
  container,
  lockScreenContainer,
  lockScreenSubcontainer,
  header,
  topDots,
  activeDot,
  subText,
  subHeaderText,
  pinContainer,
  pinInputContainer,
  pinInput,
  pinView,
  pinViewWrap,
  pinText,
  enterPinText,
  proceedBtn,
  proceedText,
  numberBtn,
  numberBtnContainer,
  numberOfTrials,
  headerNameText,
  headerText,
} = LockScreenStyles;

const { Newlogo } = icons;
const LockScreen = ({ modal, setModal }: any) => {
  const { errorAlert } = useAlert();
  const { setToken, authdata } = useContext(AuthContext);
  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0"];
  const [pin, setPin] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [numoftrial, setNumberTrial] = useState(0);
  const [error, setError] = useState(false);

  const handleSetAmount = (value: string) => {
    const newpin = [...pin, value];
    if (pin.length < 4) {
      setPin(newpin);
    }
    if (pin.length === 3) {
      handleSubmit(newpin);
    }
  };
  const handleRemoveAmount = () => {
    if (pin.length > 0) {
      const newdata = [...pin];
      newdata.pop();
      setPin(newdata);
    }
  };

  const handleSubmit = async (newpin: any) => {
    setLoading(true);
    try {
      await axiosCustom.post("/auth/pin/verify", {
        user_pin: newpin.join(""),
        pin: newpin.join(""),
      });
      setPin([]);
      setModal(false);
    } catch (err) {
      const newnumoftrial = numoftrial + 1;
      setNumberTrial(newnumoftrial);
      setError(true);
      setPin([]);
      errorAlert("Incorrect Pin Please try again");

      if (newnumoftrial === 5) {
        setModal(false);
        setToken("");
        setNumberTrial(0);
      }

      // setModal(false)
    } finally {
      setLoading(false);
    }
  };
  // return (<View>Hi</View>)
  return (
    <Modal
      isVisible={modal} //modal should be pssed in here
      coverScreen={true}
      backdropColor={COLORS.white3}
      backdropOpacity={1}
      style={{ margin: 0, flex: 1 }}
      deviceHeight={SIZES.height}
      deviceWidth={SIZES.width}
      animationOut="fadeOut"
      animationOutTiming={400}
    >
      <SafeAreaView style={lockScreenContainer}>
        <FTLoader loading={loading} />

        {/* //Error Alert to be removed and changed to the new one */}
        <View style={lockScreenSubcontainer}>
          <Newlogo />
          <Text style={headerText}>
            Welcome Back,{" "}
            <Text style={headerNameText}>
              {nameToShow(authdata?.userDetails?.fullName)}.
            </Text>{" "}
          </Text>
          <Text style={subHeaderText}>
            Lets get you back to where {`\n`} you left off.
          </Text>

          <View>
            <Text style={enterPinText}>Enter your Feather PIN</Text>

            <View style={pinViewWrap}>
              <View
                style={[
                  pinView,
                  { backgroundColor: pin[0] ? COLORS.blue6 : COLORS.grey3 },
                ]}
              />
              <View
                style={[
                  pinView,
                  { backgroundColor: pin[1] ? COLORS.blue6 : COLORS.grey3 },
                ]}
              />
              <View
                style={[
                  pinView,
                  { backgroundColor: pin[2] ? COLORS.blue6 : COLORS.grey3 },
                ]}
              />
              <View
                style={[
                  pinView,
                  { backgroundColor: pin[3] ? COLORS.blue6 : COLORS.grey3 },
                ]}
              />
            </View>
          </View>

          <View style={{ flex: 1 }} />

          <FTKeyboard
            array={[...numbers]}
            setDigit={handleSetAmount}
            removeDigit={handleRemoveAmount}
            textColor={COLORS.blue9}
          />

          <Text style={numberOfTrials}>{numoftrial}/5 Attempts</Text>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default LockScreen;
