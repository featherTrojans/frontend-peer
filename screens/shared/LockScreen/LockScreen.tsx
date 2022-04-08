import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  TouchableNativeFeedback,
  StatusBar,
} from "react-native";
import { useContext, useState } from "react";
import Modal from "react-native-modal";
import { COLORS, FONTS, fontsize, SIZES, icons } from "../../../constants";
import { styles } from "./LockScreen.style";
import { JustifyBetween } from "../../../global/styles";
import SecureDot from "../../../assets/icons/SecureDot";
import { Bottombtn, Loader, Numberbtn } from "../../../components";
import axiosCustom from "../../../httpRequests/axiosCustom";
import { useToast } from "react-native-toast-notifications";
import showerror from "../../../utils/errorMessage";
import Globalmodal from "../Globalmodal/Globalmodal";
import { AuthContext } from "../../../context/AuthContext";
import { RFValue } from "react-native-responsive-fontsize";

const {Cancelicon} = icons
const LockScreen = ({ modal, setModal }: any) => {
  const toast = useToast();
  const {setToken,authdata} = useContext(AuthContext)
  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0"];
  const [pin, setPin] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [numoftrial, setNumberTrial] = useState(0)
  const [error, setError] = useState(false)
  console.log(pin) 
  const handleSetAmount = (value: string) => {
    const newpin = [...pin,value]
    if (pin.length < 4) {
      setPin(newpin);
    }
    if(pin.length === 3){
      handleSubmit(newpin)
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
  const handleSubmit = async (newpin:any) => {
    setLoading(true)
    try{
      await axiosCustom.post("/auth/pin/verify",{user_pin: newpin.join(""),pin:newpin.join("")})
      setPin([])
      setModal(false)  
    }catch(err){
      const newnumoftrial = numoftrial + 1
      setNumberTrial(newnumoftrial)
      setError(true)
      if(newnumoftrial === 5 ){
        setModal(false) 
        setToken("")
        setNumberTrial(0)
        setPin([])
      }
      console.log(err.response)
      // setModal(false)  
    }finally{
      setLoading(false)
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
       { error && <View  style={{
              backgroundColor:"#E00000",
              paddingVertical: RFValue(18),
              paddingHorizontal: RFValue(24),
              borderRadius: RFValue(10),
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "90%",
              position:"absolute",
              marginHorizontal:  RFValue(25),}}>
                <Text style={{color: "#fff", ...fontsize.small,lineHeight:20, ...FONTS.regular}}>Incorrect pin, try again</Text>    
                <TouchableOpacity onPress={()=>setError(false)}>
                  <Cancelicon />
                </TouchableOpacity>
            </View>}
        <StatusBar
          animated={modal}
          backgroundColor={COLORS.blue6}
          barStyle="light-content"
          networkActivityIndicatorVisible={true}
          showHideTransition="fade"
          hidden={false}
        />
        <View style={{ marginTop: RFValue(44) }}>
          <Text style={styles.headerText}>Welcome Back,</Text>
          <Text style={styles.headerText}>{authdata?.userDetails?.fullName?.replace(/\s+/g, ' ').split(" ")[0]}</Text> 
        </View>

        <View style={{ marginHorizontal: RFValue(70), marginTop: RFValue(42) }}>
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
              marginTop: RFValue(58),
              marginBottom: RFValue(60),
              height: RFValue(16)
            }}
          >
            <View
              style={{
                width: RFValue(16),
                height: RFValue(16),
                borderRadius: RFValue(16/2),
                backgroundColor: COLORS.white,
                opacity: pin[0]?1:0.2,
                
              }}
            />
            <View
              style={{
                width: RFValue(16),
                height: RFValue(16),
                borderRadius: RFValue(16/2),
                backgroundColor: COLORS.white,
                opacity: pin[1]?1:0.2,
              }}
            />
            <View
              style={{
                width: RFValue(16),
                height: RFValue(16),
                borderRadius: RFValue(16/2),
                backgroundColor: COLORS.white,
                opacity:  pin[2]?1:0.2,
              }}
            />
            <View
              style={{
                width: RFValue(16),
                height: RFValue(16),
                backgroundColor: COLORS.white,
                borderRadius: RFValue(16/2),
                opacity:  pin[3]?1:0.2,
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
            {numoftrial}/5
          </Text>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default LockScreen;