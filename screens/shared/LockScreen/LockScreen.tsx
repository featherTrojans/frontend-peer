import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  TouchableNativeFeedback
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
import Cancelicon from "../../../assets/icons/Cancelicon";

const LockScreen = ({modal, setModal}: any) => {
    const toast = useToast()
    const {setToken} = useContext(AuthContext)
    const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0"];
    const [pin, setPin] = useState<string[]>([]);
    const [loading, setLoading] = useState(false)
    const [numoftrial, setNumberTrial] = useState(0)
  const [error, setError] = useState(false)

  const handleSetAmount = (value: string) => {
    if (pin.length < 4) {
      setPin((oldamount) => [...oldamount, value]);
    }
    if(pin.length === 3){
      handleSub()
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
      setError(true)
      if(newnumoftrial === 3 ){
        setModal(false) 
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
      isVisible={modal} //modal should be pssed in here
      coverScreen={true}
      backdropColor={COLORS.blue6}
      backdropOpacity={1}
      style={{ margin: 0, flex: 1 }}
      deviceHeight={SIZES.height}
      deviceWidth={SIZES.width}
    >
      <SafeAreaView style={{flex: 1, paddingHorizontal: 15}}>
        {loading && <Loader />}
        { error && <View  style={{
        backgroundColor:"#E00000",
        paddingVertical: 18,
        paddingHorizontal: 24,
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "90%",
        position:"absolute",
        marginHorizontal:25,}}>
        <Text style={{color: "#fff",fontSize: 14,lineHeight:20}}>Incorrect pin, try again</Text>    
        <TouchableOpacity onPress={()=>setError(false)}>
            <Cancelicon />
        </TouchableOpacity>
        </View>}
        <View style={{marginTop: 44}}>
          <Text style={styles.headerText}>Welcome Back,</Text>
          <Text style={styles.headerText}>Damilare</Text>
        </View>

        <View style={{marginHorizontal: 70, marginTop: 42}}>
          <Text style={{textAlign: "center", ...fontsize.bsmall,...FONTS.medium, color: COLORS.white}}>Enter PIN</Text>

          <View style={{flexDirection: 'row', justifyContent: "center",marginTop: 58, marginBottom: 105}}>
            {
              pin.map(item=><View  style={{width: 16, height: 16,marginHorizontal:30, backgroundColor: COLORS.white, borderRadius: 16/2}}/>)
            }
            
            {/* <View  style={{width: 16, height: 16, backgroundColor: COLORS.white, borderRadius: 16/2}}/>
            <View  style={{width: 16, height: 16, backgroundColor: COLORS.white, borderRadius: 16/2}}/>
            <View  style={{width: 16, height: 16, backgroundColor: COLORS.white, borderRadius:16/2}}/> */}
          </View>
        </View>



          <View style={styles.numberBtnContainer}>
            {numbers.map((number, index) => {
              return (
                <Numberbtn key={index} onpress={() => handleSetAmount(number)} textColor={COLORS.white}>
                  {number}
                </Numberbtn>
              );
            })}

            <Numberbtn onpress={() => handleRemoveAmount()} textColor={COLORS.white}>X</Numberbtn>
          </View>


          <View style={{ justifyContent: "center", alignItems: "center"}}>
            <Text style={{...fontsize.bsmall, ...FONTS.bold, color: COLORS.yellow1}}>0/5</Text>
          </View>

    
      </SafeAreaView>
    </Modal>
  );
};

export default LockScreen;
