import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  TouchableNativeFeedback,
  StatusBar,
} from "react-native";
import React, { useContext, useState } from "react";
import Modal from "react-native-modal";
import { COLORS, FONTS, fontsize, SIZES, icons } from "../../../constants";
import { styles } from "./LockScreen.style";
import { JustifyBetween } from "../../../global/styles";
import SecureDot from "../../../assets/icons/SecureDot";
import { Bottombtn, Keyboard, Loader, Numberbtn } from "../../../components";
import axiosCustom from "../../../httpRequests/axiosCustom";
import { useToast } from "react-native-toast-notifications";
import showerror from "../../../utils/errorMessage";
import Globalmodal from "../Globalmodal/Globalmodal";
import { AuthContext } from "../../../context/AuthContext";
import { RFValue } from "react-native-responsive-fontsize";
import useAlert from "../../../utils/useAlerts";

const { Cancelicon, Newlogo } = icons;
const LockScreen = ({ modal, setModal }: any) => {
  const toast = useToast();
  const {errorAlert} = useAlert()
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
      if (newnumoftrial === 5) {
        setModal(false);
        setToken("");
        setNumberTrial(0);
        setPin([]);
      }
      console.log(err.response);
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
      animationOutTiming={1000}
    >
      <SafeAreaView style={{ flex: 1, paddingHorizontal: 15, paddingBottom: 20, backgroundColor: COLORS.white3 }}>
        {loading && <Loader />}
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
              <Cancelicon />
            </TouchableOpacity>
          </View>
        )}
   
        <View style={{ marginTop: RFValue(30) }}>
          <Newlogo />
          <Text style={[styles.headerText, {marginTop: 36}]}>Welcome Back, <Text style={{...FONTS.bold, color: COLORS.blue6}}>{authdata?.userDetails?.fullName?.replace(/\s+/g, ' ').split(" ")[1]}.</Text>  </Text>
          <Text style={{marginTop: 10, ...fontsize.smaller, ...FONTS.regular, color: COLORS.grey2, lineHeight: 20}}>Lets get you back to where {`\n`} you left off.</Text>
        </View>

        <View >


          <Text
            style={{
              textAlign: "center",
              ...fontsize.smaller,
              ...FONTS.regular,
              color: COLORS.blue9,
              marginTop: 40,
              marginBottom: 60
            }}
          >
            Enter your Feather PIN
          </Text>



            <View style={{ justifyContent: "center", alignItems: "center" }}>

            <View
              style={{
                width: RFValue(160),
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View
              style={[
                styles.pinView,
                { backgroundColor: pin[0] ? COLORS.blue6 : COLORS.grey3 },
              ]}
            />
            <View
              style={[
                styles.pinView,
                { backgroundColor: pin[1] ? COLORS.blue6 : COLORS.grey3 },
              ]}
            />
            <View
              style={[
                styles.pinView,
                { backgroundColor: pin[2] ? COLORS.blue6 : COLORS.grey3 },
              ]}
            />
            <View
              style={[
                styles.pinView,
                { backgroundColor: pin[3] ? COLORS.blue6 : COLORS.grey3 },
              ]}
            />
              
            </View>
          </View>



        </View>

        <View style={{flex: 1, }} />

       
        <Keyboard
          array={[...numbers]}
          setDigit={handleSetAmount}
          removeDigit={handleRemoveAmount}
          textColor={COLORS.blue9}
        />

        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text
            style={{ ...fontsize.small, ...FONTS.medium, color: COLORS.grey16 }}
          >
            {numoftrial}/5 Attempts
          </Text>
        </View>


      </SafeAreaView>
    </Modal>
  );
};

export default LockScreen;
