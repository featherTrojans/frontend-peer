import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import LottieView from "lottie-react-native";
import { styles } from "../../../Transferfunds/Transferpin/Transferpin.styles";
import { useToast } from "react-native-toast-notifications";
import { AuthContext } from "../../../../../context/AuthContext";
import Globalmodal from "../../../../shared/Globalmodal/Globalmodal";
import showerror from "../../../../../utils/errorMessage";
import axiosCustom from "../../../../../httpRequests/axiosCustom";
import { COLORS, FONTS, fontsize, icons } from "../../../../../constants";
import Customstatusbar from "../../../../shared/Customstatusbar";
import {
  Backheader,
  Bottombtn,
  Keyboard,
  Loader,
  Mainwrapper,
  Numberbtn,
} from "../../../../../components";
import amountFormatter from "../../../../../utils/formatMoney";
import SecureDot from "../../../../../assets/icons/SecureDot";
import { RFValue } from "react-native-responsive-fontsize";
import { SafeAreaView } from "react-native-safe-area-context";
import { securepinstyles } from "../../../../auth/signup/Securepin/Securepin.styles";

const { Successcheckanimate } = icons;

const Airtimepurchasepin = ({ navigation, route }) => {
  const toast = useToast();
  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0"];
  const { type, data } = route.params;
  const [pin, setPin] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [showmodal, setShowModal] = useState(false);
  const { messageToken, authdata } = useContext(AuthContext);

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
  useEffect(() => {
    if(pin.length === 4){
      handleSubmit()
    }
  }, [pin])

  
  const handleSubmit = async ()=>{
    console.log("airtimeprchase datas", type, data, pin);

    setLoading(true)
    try{
      if(type === "airtime"){
        // console.log("airtimeprchase datas", data, airtime);
        const sendingDatas = {
            phone : data.phone,
            network: data.network,
            amount: data.amount,
        }
        await axiosCustom.post("/bills/airtime",{...sendingDatas, userPin: pin.join("")})
        
      }else{
        await axiosCustom.post("/bills/electricity",{...data, userPin: pin.join("")})
        
      }
      setShowModal(true)
    }catch(err){
      showerror(toast, err)
      setPin([])
    }finally{
      setLoading(false)
    }
  }
  return (
    <Mainwrapper>
      {loading && <Loader />}


      <View style={{paddingHorizontal: 15, flex: 1}}>
        <View style={{marginTop: 32}}>
          <Text style={{...fontsize.bbsmall, ...FONTS.medium, color: COLORS.blue9, marginBottom: 20}}>Complete Transaction</Text>
          {type === "airtime" && 
          <Text style={{...fontsize.smallest, ...FONTS.regular, color: COLORS.grey2, lineHeight: 20}}>You are about to purchase <Text style={{...fontsize.smaller, ...FONTS.bold, color: COLORS.blue6}}>N{data.amount}</Text> airtime from your Primary Wallet to <Text style={{color: COLORS.blue6}}>{data.phone}</Text></Text>
          }
          {type === "data" && 
          <Text style={{...fontsize.smallest, ...FONTS.regular, color: COLORS.grey2, lineHeight: 20}}>You are about to purchase <Text style={{...fontsize.smaller, ...FONTS.bold, color: COLORS.blue6}}>N5,000</Text> data from your Primary Wallet to <Text style={{color: COLORS.blue6}}>08133211658</Text></Text>
          }
          
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

      {/* <Bottombtn title="PROCEED" onpress={() => handleSubmit(data)} /> */}
    </Mainwrapper>
  );
};

export default Airtimepurchasepin;
