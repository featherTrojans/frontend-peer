import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useContext, useState } from "react";
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
import { AuthContext } from "../../../context/AuthContext";

const LockScreen = ({modal, setModal}: any) => {
    const toast = useToast()
    const {setToken} = useContext(AuthContext)
    const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0"];
    const [pin, setPin] = useState<string[]>([]);
    const [loading, setLoading] = useState(false)
    const [numoftrial, setNumberTrial] = useState(0)

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
      // console.log(newdata);
    }
  };
  // const handleSubmit = async () => {
  //   console.log("preparing")
  //   setLoading(true);
  //   try {
  //    const response = await axiosCustom.post("/auth/pin/verify", { user_pin: pin.join("") });
  //     setPin([]);
  //     console.log(response)
  //     setModal(false);
  //   } catch (err) {
  //     showerror(toast, err);
  //     console.log(err.response)
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // return (<View>Hi</View>)

  const handleSub = async ()=>{
    setLoading(true)
    try{
      await axiosCustom.post("/auth/pin/verify",{user_pin: pin.join(""),pin:pin.join("")})
      setPin([])
      setModal(false)  
    }catch(err){
      const newnumoftrial = numoftrial + 1
      setNumberTrial(newnumoftrial)
      if(newnumoftrial === 3 ){
        setToken("")
      }
      console.log(err.response)
      // setModal(false)  
    }finally{
      setLoading(false)
    }
  }
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
        <Bottombtn
          title="SUBMIT"
          disabled={pin.length !== 4}
          onpress={handleSub}
        />       
      </SafeAreaView>
    </Modal>
  );
};


export default LockScreen;
