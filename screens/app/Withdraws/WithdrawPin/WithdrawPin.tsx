import { StyleSheet, Text, View, StatusBar } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import LottieView from "lottie-react-native";
import { COLORS, FONTS, fontsize, icons } from "../../../../constants";
import {
  Backheader,
  Keyboard,
  Loader,
  Mainwrapper,
  Successmodal,
} from "../../../../components";
import axiosCustom from "../../../../httpRequests/axiosCustom";
import { useToast } from "react-native-toast-notifications";
import showerror from "../../../../utils/errorMessage";
import { AuthContext } from "../../../../context/AuthContext";
import { securepinstyles } from "../../../auth/signup/Securepin/Securepin.styles";
import { db } from "../../../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import useCustomModal from "../../../../utils/useCustomModal";
import { getFirstName } from "../../../../utils/nameSplitter";
import useAlert from "../../../../utils/useAlerts";

const { Backarrow, SecureDot, Successcheckanimate } = icons;

const WithdrawPin = ({ navigation, route }) => {
  const info = route.params.info;
  const charge = route.params.charge;
  const { authdata } = useContext(AuthContext);
  const { purpleAlert, errorAlert, successAlert } = useAlert();
  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0"];
  const [loading, setLoading] = useState(false);
  const [pin, setPin] = useState<string[]>([]);
  const [successModal, setSuccessModal] = useState(false);
  const { CustomModal, closeModal, openModal } = useCustomModal();

  const amountFormatter = (value: string) => {
    return (
      Number(value)
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, "$&,") || "0.00"
    );
  };

  const handleSetAmount = (value: string) => {
    if (pin.length < 4) {
      setPin((oldpin) => [...oldpin, value]);
      if (pin.length === 3) {
        handleApproveRequest([...pin, value]);
      }
    }
  };

  const handleRemoveAmount = () => {
    if (pin.length > 0) {
      const newdata = [...pin];
      newdata.pop();
      setPin(newdata);
    }
  };

  const handleApproveRequest = async (pin) => {
    const joinpin = pin.join("");

    if (joinpin.length < 4) {
      return false;
    }
    setLoading(true);
    try {
      const response = await axiosCustom.post("/request/approve", {
        reference: info.reference,
        user_pin: joinpin,
        agreedCharge: Number(charge),
      });
      openModal();
      successAlert(
        "Your cash withdrawal transaction was successful and you've been credited."
      );
    } catch (err) {
      errorAlert(err);
      // check the error, don't reject for pin error
      if (err?.response?.data?.message === "Incorrect Pin") {
        return;
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Mainwrapper>
      {loading && <Loader />}
      <CustomModal hideOnTap={false}>
        <Successmodal
          btnText="Great Continue"
          successMsg="Your transaction was successful, cash has been received from receiver"
          btnFunction={() => {
            closeModal();
            navigation.navigate("Transactionsrating", info);
          }}
        />
      </CustomModal>
      <Backheader title="Complete Transaction" />
      <View style={{ paddingHorizontal: 15, flex: 1 }}>
        <View style={{ marginTop: 0 }}>
          <Text
            style={{
              ...fontsize.smallest,
              ...FONTS.regular,
              color: COLORS.blue9,
              lineHeight: 20,
              textAlign: "center",
            }}
          >
            You are about to send N
            {amountFormatter(Number(info?.amount) + Number(charge))} from your
            Primary Wallet to @{info?.agentUsername} - {info?.agent}
          </Text>
        </View>
        <View
          style={{ alignItems: "center", flex: 1, justifyContent: "center" }}
        >
          <Text
            style={{
              marginBottom: 60,
              ...fontsize.smaller,
              ...FONTS.regular,
              color: COLORS.blue9,
            }}
          >
            Enter your Feather PIN
          </Text>

          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <View style={securepinstyles.pinInputContainer}>
              <View
                style={[
                  securepinstyles.pinView,
                  { backgroundColor: pin[0] ? COLORS.blue6 : COLORS.grey3 },
                ]}
              />
              <View
                style={[
                  securepinstyles.pinView,
                  { backgroundColor: pin[1] ? COLORS.blue6 : COLORS.grey3 },
                ]}
              />
              <View
                style={[
                  securepinstyles.pinView,
                  { backgroundColor: pin[2] ? COLORS.blue6 : COLORS.grey3 },
                ]}
              />
              <View
                style={[
                  securepinstyles.pinView,
                  { backgroundColor: pin[3] ? COLORS.blue6 : COLORS.grey3 },
                ]}
              />
            </View>
          </View>
        </View>

        <View></View>
      </View>

      <Keyboard
        array={[...numbers]}
        setDigit={handleSetAmount}
        removeDigit={handleRemoveAmount}
      />

      {/* <Bottombtn
          title="PROCEED"
          onpress={() => {
            if (Number(charges) <= 0) {
              showerror(
                toast,
                null,
                "sorry you have to input a fair amount to continue"
              );
              return;
            }
            setShowModal(true);
          }}
        /> */}
    </Mainwrapper>
  );
};

export default WithdrawPin;
