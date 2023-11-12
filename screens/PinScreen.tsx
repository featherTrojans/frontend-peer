import { View, Text, SafeAreaView } from "react-native";
import React, { useContext, useState } from "react";
import { COLORS, FONTS, fontsize, icons } from "../constants";
import { useAlert } from "../hooks";
import { AuthContext } from "../context/AuthContext";
import axiosCustom from "../httpRequests/axiosCustom";
import { PinScreenStyles } from "../assets/styles/screens";
import { FTKeyboard, FTLoader, FTTitlepagewrapper } from "../components";
import { RFValue } from "react-native-responsive-fontsize";
import { TouchableOpacity } from "react-native-gesture-handler";

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
} = PinScreenStyles;

const { Newlogo, Transfersicon } = icons;
const PinScreen = ({ route }) => {
  const action = route?.params?.action;
  const { errorAlert } = useAlert();
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
      await action(newpin.join(""));
    } catch (err) {
      errorAlert(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={container}>
      <FTTitlepagewrapper>
        <View style={lockScreenContainer}>
          {loading && <FTLoader />}

          {/* //Error Alert to be removed and changed to the new one */}
          {error && (
            <View
              style={{
                backgroundColor: "#E00000",
                paddingVertical: RFValue(18),
                paddingHorizontal: RFValue(24),
                borderRadius: RFValue(10),
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "90%",
                position: "absolute",
                marginHorizontal: RFValue(25),
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  ...fontsize.small,
                  lineHeight: 20,
                  ...FONTS.regular,
                }}
              >
                Incorrect pin, try again
              </Text>
              <TouchableOpacity onPress={() => setError(false)}>
                <Transfersicon />
              </TouchableOpacity>
            </View>
          )}

          <View style={lockScreenSubcontainer}>
            <View>
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
              <Text style={enterPinText}>Enter your Feather PIN</Text>
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
        </View>
      </FTTitlepagewrapper>
    </View>
  );
};

export default PinScreen;
