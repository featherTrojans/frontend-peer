import React, { useState, useEffect } from "react";
import { View, Text, StatusBar } from "react-native";
import { Bottombtn, Keyboard, Loader, Numberbtn } from "../../../../components";
import LottieView from "lottie-react-native";

import { COLORS, FONTS, fontsize, icons } from "../../../../constants";
import axiosCustom from "../../../../httpRequests/axiosCustom";
import Globalmodal from "../../../shared/Globalmodal/Globalmodal";
import { securepinstyles } from "./Securepin.styles";
import Customstatusbar from "../../../shared/Customstatusbar";
import { RFValue } from "react-native-responsive-fontsize";
import { SafeAreaView } from "react-native-safe-area-context";
import useAlert from "../../../../utils/useAlerts";


const setAuthorizationToken = (token: string) => {
  if (token) {
    axiosCustom.defaults.headers.common["token"] = token;
  }
};


const { Successcheckanimate, Newlogo } = icons;

 
const SecurepinAgain = ({ route, navigation }) => {
  const {errorAlert} = useAlert()
  const { token, pin, fromm } = route.params;
  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0"];
  const [loading, setLoading] = useState<boolean>(false);
  const [amount, setAmount] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [result, setResult] = useState<any>();

  console.log('------------------------TOKEN--------------------------');
  console.log(token);
  const handleSubmit = async () => {
    if (pin.join("") !== amount.join("")) {
      return errorAlert(null, "Pin doesn't match");
    }
    setLoading(true);
    try {
      const pin = amount.join("");
      const response = await axiosCustom.put(
        "/auth/pin/set",
        { pin },
        { headers: { token: token } }
      );
      setResult(response.data.data);
      setAuthorizationToken(response?.data?.data?.token)
      setShowModal(true);
    } catch (err) {
      errorAlert(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSetAmount = (value: string) => {
    if (amount.length < 4) {
      setAmount((oldamount) => [...oldamount, value]);
    }
  };
  const handleRemoveAmount = () => {
    if (amount.length > 0) {
      const newdata = [...amount];
      newdata.pop();
      setAmount(newdata);
    }
  };

  useEffect(() => {
    if (amount.length === 4) {
      console.log(pin, "here is rhe amount");
      handleSubmit();
    }
  }, [amount]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <Customstatusbar />

      <Globalmodal
        showState={showModal}
        onBgPress={() => setShowModal(true)} // This should not do anything
        btnFunction={() => {
          setShowModal(false);
          navigation.navigate("Welcome", {
            fromm: fromm,
            username: result?.username,
            token: result?.token,
          });
        }}
        btnText="Continue"
      >
        <>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginHorizontal: RFValue(75),
              marginBottom: RFValue(50),
            }}
          >
            <LottieView
              source={Successcheckanimate}
              style={{
                width: RFValue(148),
                height: RFValue(148),
                marginBottom: RFValue(18),
              }}
              autoPlay
              loop
            />

            <Text
              style={{
                ...fontsize.bsmall,
                ...FONTS.regular,
                textAlign: "center",
                lineHeight: 24,
              }}
            >
              Your transaction pin has been successfully added
            </Text>
          </View>
        </>
      </Globalmodal>

      {loading && <Loader />}

      <View style={securepinstyles.container}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Newlogo />
          <View style={{ flexDirection: "row" }}>
            <View
              style={[securepinstyles.topDots, { marginRight: RFValue(10) }]}
            />
            <View
              style={[securepinstyles.topDots, { marginRight: RFValue(10) }]}
            />
            <View style={securepinstyles.activeDot} />
          </View>
        </View>

        <View style={{ marginTop: 28, marginBottom: 80 }}>
          <Text
            style={{ ...fontsize.bsmall, ...FONTS.medium, marginBottom: 9 }}
          >
            Confirm your secure PIN
          </Text>
          <Text
            style={{
              ...fontsize.smallest,
              ...FONTS.regular,
              color: COLORS.grey16,
            }}
          >
            Re-type Transaction PIN
          </Text>
        </View>

        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <View style={securepinstyles.pinInputContainer}>
            <View
              style={[
                securepinstyles.pinView,
                { backgroundColor: amount[0] ? COLORS.blue6 : COLORS.grey3 },
              ]}
            />
            <View
              style={[
                securepinstyles.pinView,
                { backgroundColor: amount[1] ? COLORS.blue6 : COLORS.grey3 },
              ]}
            />
            <View
              style={[
                securepinstyles.pinView,
                { backgroundColor: amount[2] ? COLORS.blue6 : COLORS.grey3 },
              ]}
            />
            <View
              style={[
                securepinstyles.pinView,
                { backgroundColor: amount[3] ? COLORS.blue6 : COLORS.grey3 },
              ]}
            />
          </View>
        </View>

        <View style={{ flex: 1 }} />

        <Keyboard
          array={[...numbers]}
          setDigit={handleSetAmount}
          removeDigit={handleRemoveAmount}
        />
      </View>
    </SafeAreaView>
  );
};

export default SecurepinAgain;
