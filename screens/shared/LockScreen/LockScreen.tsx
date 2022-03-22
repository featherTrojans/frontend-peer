import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  TouchableNativeFeedback,
  StatusBar,
} from "react-native";
import { useState } from "react";
import Modal from "react-native-modal";
import { COLORS, FONTS, fontsize, SIZES } from "../../../constants";
import { styles } from "./LockScreen.style";
import { JustifyBetween } from "../../../global/styles";
import SecureDot from "../../../assets/icons/SecureDot";
import { Bottombtn, Loader, Numberbtn } from "../../../components";
import axiosCustom from "../../../httpRequests/axiosCustom";
import { useToast } from "react-native-toast-notifications";
import showerror from "../../../utils/errorMessage";
import Globalmodal from "../Globalmodal/Globalmodal";

const LockScreen = ({ modal, setModal }: any) => {
  const toast = useToast();
  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0"];
  const [pin, setPin] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSetAmount = (value: string) => {
    if (pin.length < 4) {
      setPin((oldamount) => [...oldamount, value]);
    }
  };
  const handleRemoveAmount = () => {
    if (pin.length > 0) {
      const newdata = [...pin];
      newdata.pop();
      setPin(newdata);
      console.log(newdata);
    }
  };
  const handleSubmit = async () => {
    setLoading(true);
    try {
      await axiosCustom.post("/auth/pin/verify", { pin: pin.join("") });
      setPin([]);
      setModal(false);
    } catch (err) {
      showerror(toast, err);
    } finally {
      setLoading(false);
    }
  };
  // return (<View>Hi</View>)
  return (
    <Modal
      isVisible={modal} //modal should be pssed in here
      coverScreen={true}
      backdropColor={COLORS.blue6}
      backdropOpacity={1}
      style={{ margin: 0, flex: 1 }}
      deviceHeight={SIZES.height}
      deviceWidth={SIZES.width}
    >
      <SafeAreaView style={{ flex: 1, paddingHorizontal: 15 }}>
        {loading && <Loader />}
        <StatusBar
          animated={modal}
          backgroundColor={COLORS.blue6}
          barStyle="light-content"
          networkActivityIndicatorVisible={true}
          showHideTransition="fade"
          hidden={false}
        />
        <View style={{ marginTop: 44 }}>
          <Text style={styles.headerText}>Welcome Back,</Text>
          <Text style={styles.headerText}>Damilare</Text> 
        </View>

        <View style={{ marginHorizontal: 70, marginTop: 42 }}>
          <Text
            style={{
              textAlign: "center",
              ...fontsize.bsmall,
              ...FONTS.medium,
              color: COLORS.white,
            }}
          >
            Enter PIN
          </Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 58,
              marginBottom: 105,
              height: 16
            }}
          >
            <View
              style={{
                width: 16,
                height: 16,
                backgroundColor: COLORS.white,
                opacity: 0.2,
                borderRadius: 16 / 2,
              }}
            />
            <View
              style={{
                width: 16,
                height: 16,
                borderRadius: 16/2,
                backgroundColor: COLORS.white,
                opacity: 0.2,
              }}
            />
            <View
              style={{
                width: 16,
                height: 16,
                borderRadius: 16/2,
                backgroundColor: COLORS.white,
                opacity: 0.2,
              }}
            />
            <View
              style={{
                width: 16,
                height: 16,
                backgroundColor: COLORS.white,
                borderRadius: 16 / 2,
                opacity: 0.2,
              }}
            />
          </View>
        </View>

        <View style={styles.numberBtnContainer}>
          {numbers.map((number, index) => {
            return (
              <Numberbtn
                key={index}
                onpress={() => handleSetAmount(number)}
                textColor={COLORS.white}
              >
                {number}
              </Numberbtn>
            );
          })}

          <Numberbtn
            onpress={() => handleRemoveAmount()}
            textColor={COLORS.white}
          >
            X
          </Numberbtn>
        </View>

        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text
            style={{ ...fontsize.bsmall, ...FONTS.bold, color: COLORS.yellow1 }}
          >
            0/5
          </Text>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default LockScreen;
