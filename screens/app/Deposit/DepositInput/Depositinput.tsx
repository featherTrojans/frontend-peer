import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  ActivityIndicator,
} from "react-native";
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useToast } from "react-native-toast-notifications"; 
import {
  Backheader,
  Bottombtn,
  Loader,
  Numberbtn,
  Viewbalance,
} from "../../../../components";
import { COLORS } from "../../../../constants";
import axiosCustom from "../../../../httpRequests/axiosCustom";
import amountFormatter from "../../../../utils/formatMoney";
import { styles } from "../../Transferfunds/TransferInput/TransferInput.styles";
import showerror from "../../../../utils/errorMessage";
import { AuthContext } from "../../../../context/AuthContext";
import Customstatusbar from "../../../shared/Customstatusbar";
import { getCurrentLocation } from "../../../../utils/customLocation";



function Depositinput({ route, navigation }) {
  const toast = useToast();
  const {authdata} = useContext(AuthContext)
  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0"];
  const [amount, setAmount] = useState<string>("");
  const [coords, setCoords] = useState({});
  const [loading, setLoading] = useState(false)
  const [locationLoading, setLocationLoading] = useState(false)

  useEffect(() => {
    getLocation()
  }, []);

  const getLocation = async () => {
    try{
      setLocationLoading(true)
      const {coordinates, address} = await getCurrentLocation()
      setCoords({...coordinates,locationText:address});   
    }catch(err){}finally{
      setLocationLoading(false)
    }
  }

  const handleRemoveAmount = () => {
    if (amount.length > 0) {
      const newdata = amount.substring(0, amount.length - 1)
      setAmount(newdata);
    }
  };
  const handleSetAmount = (value: string) => {
    setAmount((oldamount) => {
      let newamount = oldamount.concat(value)
      if(Number(newamount)){
        return newamount
      }
      return oldamount
    });
  };
  const handleSubmit= async ()=>{
    setLoading(true)
    try{
        await axiosCustom.post("/status/create",{
            amount,
            longitude: coords.longitude,
            latitude: coords.latitude,
            locationText:  coords.locationText
        })
        let asyncval = JSON.stringify({locationText:coords.locationText, amount, time: Date.now()})
        try{
          await AsyncStorage.setItem("@depositstatus",asyncval)
        }catch(err){
          console.log(err)
        }
        navigation.navigate("Home")
    }catch(err){
      showerror(toast,err)
    }finally{
      setLoading(false)
    }
  }
  if(locationLoading){
    return(
      <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
        <ActivityIndicator  color="#000" size="large" />
       </View>
      )
  }
  return (
    <View style={styles.container}>
      <Backheader title="Enter Amount" />
      <Customstatusbar />
      {loading && <Loader />}
      <View style={{ flex: 1, paddingHorizontal: 15 }}>
      <Viewbalance />

        <View style={{ flex: 1, justifyContent: "center" }}>
          <View style={{ alignItems: "center" }}>
            <View style={styles.amountcont}>
              <Text style={styles.amountTxt}>
                {" "}
                <Text style={{ color: COLORS.grey5 }}>N</Text>{" "}
                {amountFormatter(amount)}
              </Text>
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
      </View>

      <Bottombtn
        title="PROCEED"
        onpress={handleSubmit}
      />
    </View>
  );
}

export default Depositinput;
