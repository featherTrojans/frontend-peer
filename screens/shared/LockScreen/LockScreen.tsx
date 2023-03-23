import { Text, View, TouchableOpacity, SafeAreaView } from "react-native";
import React, { useContext, useState } from "react";
import Modal from "react-native-modal";
import { COLORS, FONTS, fontsize, SIZES, icons } from "../../../constants";
import { styles } from "./LockScreen.style";
import {  Keyboard, Loader } from "../../../components";
import axiosCustom from "../../../httpRequests/axiosCustom";
import { AuthContext } from "../../../context/AuthContext";
import { RFValue } from "react-native-responsive-fontsize";
import useAlert from "../../../utils/useAlerts";
import { getFirstName } from "../../../utils/nameSplitter";

const { Newlogo, Transfericon } = icons;
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

      if (newnumoftrial === 5) {
        setModal(false);
        setToken("");
        setNumberTrial(0);
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
      animationOut="fadeOut"
      animationOutTiming={400}
    >
      <SafeAreaView style={styles.lockScreenContainer}>
        {loading && <Loader />}

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
              <Transfericon />
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.lockScreenSubcontainer}>
          <Newlogo />
          <Text style={styles.headerText}>
            Welcome Back,{" "}
            <Text style={styles.headerNameText}>
              {getFirstName(authdata?.userDetails?.fullName)}.
            </Text>{" "}
          </Text>
          <Text style={styles.subHeaderText}>
            Lets get you back to where {`\n`} you left off.
          </Text>

          <View>
            <Text style={styles.enterPinText}>Enter your Feather PIN</Text>

            <View style={styles.pinViewWrap}>
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

          <View style={{ flex: 1 }} />

          <Keyboard
            array={[...numbers]}
            setDigit={handleSetAmount}
            removeDigit={handleRemoveAmount}
            textColor={COLORS.blue9}
          />

          <Text style={styles.numberOfTrials}>{numoftrial}/5 Attempts</Text>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default LockScreen;
