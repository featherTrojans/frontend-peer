import { StyleSheet, Text, View, StatusBar } from "react-native";
import React, { useContext, useState } from "react";
import LottieView from "lottie-react-native";
import { styles } from "./WithdrewPin.style";
import { COLORS, FONTS, fontsize, icons } from "../../../../constants";
import {
  Backheader,
  Bottombtn,
  Keyboard,
  Loader,
  Mainwrapper,
  Numberbtn,
  Sendingandreceive,
} from "../../../../components";
import axiosCustom from "../../../../httpRequests/axiosCustom";
import { useToast } from "react-native-toast-notifications";
import showerror from "../../../../utils/errorMessage";
import Globalmodal from "../../../shared/Globalmodal/Globalmodal";
import { LocationContext } from "../../../../context/LocationContext";
import Customstatusbar from "../../../shared/Customstatusbar";
import { AuthContext } from "../../../../context/AuthContext";
import { justCharge, plusBase } from "../../../../utils/utils";
import { RFValue } from "react-native-responsive-fontsize";
import { SafeAreaView } from "react-native-safe-area-context";
import { securepinstyles } from "../../../auth/signup/Securepin/Securepin.styles";
const { Backarrow, SecureDot, Successcheckanimate } = icons;

const WithdrawPin = ({ navigation, route }) => {
  // const { amount, userInfo, baseCharge } = route.params;

  const { coords } = useContext(LocationContext);
  const { authdata } = useContext(AuthContext);
  const toast = useToast();
  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0"];
  const [loading, setLoading] = useState(false);
  const [charges, setCharges] = useState<string>("");
  const [pin, setPin] = useState<string[]>([]);
  const [showmodal, setShowModal] = useState(false);
  const [shownextmodal, setShowNextModal] = useState(false);

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
    }
  };


  const handleRemoveAmount = () => {
    if (pin.length > 0) {
      const newdata = [...pin];
      newdata.pop();
      setPin(newdata);
    }
  };
  // const handleSubmit = async () => {
  //   try {
  //     setLoading(true);
  //     setShowModal(false);
  //     const data = {
  //       amount: amount,
  //       charges: baseCharge,
  //       agentUsername: userInfo.username,
  //       agent: userInfo.fullName,
  //       statusId: userInfo.reference,
  //       meetupPoint: coords.locationText,
  //       negotiatedFee: charges,
  //     };
  //     console.log(data);
  //     const response = await axiosCustom.post("/request/create", data);

  //     setShowNextModal(true);
  //   } catch (err) {
  //     showerror(toast, err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  return (
    <Mainwrapper>
      {loading && <Loader />}
      <Backheader title="Complete Transaction" />


      {/* <Globalmodal
        showState={showmodal}
        onBgPress={() => setShowModal(!showmodal)}
        btnFunction={handleSubmit}
      >
        <View style={{ alignItems: "center" }}>
          <Text style={{ alignSelf: "flex-start" }}>Request Summary</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: 20,
            }}
          >
            <Sendingandreceive
              senderName={authdata?.userDetails?.fullName}
              receiverName={userInfo?.fullName}
              title="Wallet Debit"
            />
   
          </View>
          <Text style={{ ...fontsize.bmedium, ...FONTS.bold }}>
            NGN {amountFormatter(amount)}
          </Text>
          <Text
            style={{
              backgroundColor: "#F2F5FF",
              paddingVertical: RFValue(10),
              paddingHorizontal: RFValue(20),
              borderRadius: 30,
              marginTop: RFValue(15),
            }}
          >
            Negotiation Charges:
            <Text style={{ ...FONTS.bold }}>N {baseCharge + +charges}</Text>
          </Text>
          <Text
            style={{
              textAlign: "center",
              marginHorizontal: RFValue(40),
              marginVertical: RFValue(40),
              ...fontsize.bsmall,
              ...FONTS.regular,
              lineHeight: 25,
            }}
          >
            Note that the base charge above can be negotiated by{" "}
            <Text style={{ ...FONTS.bold }}> @{userInfo.username}</Text>
          </Text>
        </View>
      </Globalmodal>
      <Globalmodal
        showState={shownextmodal}
        btnFunction={() => {
          setShowModal(false);
          setShowNextModal(false);
          navigation.navigate("Home");
        }}
      >
        <View style={{ alignItems: "center" }}>
          <LottieView
            source={Successcheckanimate}
            autoPlay
            loop
            style={{ width: RFValue(148), height: RFValue(148) }}
          />

          <Text
            style={{
              textAlign: "center",
              marginHorizontal: RFValue(40),
              marginVertical: RFValue(40),
              ...fontsize.bsmall,
              ...FONTS.regular,
            }}
          >
            Your request has been sent, you will be notified once accepted
          </Text>
        </View>
      </Globalmodal> */}

<View style={{paddingHorizontal: 15, flex: 1}}>
        <View style={{marginTop: 0}}>
          <Text style={{...fontsize.smallest, ...FONTS.regular, color: COLORS.blue9, lineHeight: 20, textAlign: "center"}}>Hey Damilare, kindly input your transaction pin to complete this transaction of N5,600.00</Text>
        </View>



          <View style={{ alignItems: "center", flex: 1, justifyContent: "center"}}>
            <Text style={{marginBottom: 60, ...fontsize.smaller, ...FONTS.regular, color: COLORS.blue9}}>Enter your Feather PIN</Text>


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
            

        <View>

        </View>
      </View>


      <Keyboard  array={[...numbers ]} setDigit={handleSetAmount} removeDigit={handleRemoveAmount}/>

      <View>
        <Text style={{textAlign: "center", marginBottom: 20, ...fontsize.smaller, ...FONTS.medium, color: COLORS.red4}}>0 / 3 Attempts</Text>
      </View>

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
