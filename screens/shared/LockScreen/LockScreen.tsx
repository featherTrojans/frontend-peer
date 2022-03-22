import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
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

const LockScreen = ({modal, setModal}: any) => {
    const toast = useToast()
    const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0"];
    const [pin, setPin] = useState<string[]>([]);
    const [loading, setLoading] = useState(false)

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
      isVisible={modal}
      coverScreen={true}
      backdropColor="#000"
      backdropOpacity={0.2}
      style={{margin: 0, flex: 1, }}
      deviceHeight={SIZES.height}
      deviceWidth={SIZES.width}
    >
      <SafeAreaView style={styles.container} >
        {loading && <Loader />}
        <View style={{ paddingHorizontal: 25 }}>
          
          

          <View style={styles.pinContainer}>
            <View style={styles.pinInputContainer}>
              <View style={styles.pinView}>{pin[0] && <SecureDot />}</View>
              <View style={styles.pinView}>{pin[1] && <SecureDot />}</View>
              <View style={styles.pinView}>{pin[2] && <SecureDot />}</View>
              <View style={styles.pinView}>{pin[3] && <SecureDot />}</View>
            </View>
          </View>

          <View style={styles.numberBtnContainer}>
            {numbers.map((number, index) => {
              return (
                <Numberbtn key={index} onpress={() => handleSetAmount(number)}>
                  {number}
                </Numberbtn>
              );
            })}

            <Numberbtn onpress={() => handleRemoveAmount()}>X</Numberbtn>
          </View>
        </View>

        {/* THis function should now call when the length of numbers is 4 */}
        {/* <Bottombtn
          title="submit"
          onpress={handleSubmit}
          disabled={pin.length !== 4}
        /> */}
      </SafeAreaView>
    </Modal>
  );
};


export default LockScreen;
