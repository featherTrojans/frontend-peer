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
import { doesIncludeActiveStates } from "../../../../utils/utils";



function Depositinput({ route, navigation }) {
  const toast = useToast();
  const {type, reference} = route.params
  const {authdata} = useContext(AuthContext)
  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0"];
  const [amount, setAmount] = useState<string>("");
  const [coords, setCoords] = useState<any>({});
  const [loading, setLoading] = useState(false)
  const [locationLoading, setLocationLoading] = useState(false)


  useEffect(() => {
    getLocation()
  }, []);

  const getLocation = async () => {
    try{
      setLocationLoading(true)
      const {coordinates, address, locationObj}:any = await getCurrentLocation()
      if(!doesIncludeActiveStates(locationObj)){
        // navigate to the sorry not supported in your region yet
        // navigation.navigate("",{from:"deposit"})
        navigation.replace("Updatedeposit",{from:"deposit"})
      }
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
      if(type === "create"){
        await axiosCustom.post("/status/create",{
            amount: Number(amount),
            longitude: coords.longitude,
            latitude: coords.latitude,
            locationText:  coords.locationText
        })
      }else{
        await axiosCustom.put("/status/update",{
          amount:Number(amount),
          longitude: coords.longitude,
          latitude: coords.latitude,
          locationText:  coords.locationText,
          reference
        })
      }
      const random = Math.random()
        navigation.navigate("Depositupdate",{from:`true ${random}`})
    }catch(err){
      showerror(toast,err)
    }finally{
      setLoading(false)
    }
  }
  if(locationLoading){
    return(
      <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
        <ActivityIndicator  color={COLORS.blue6} size="large" />
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
        // onpress={()=>navigation.navigate("Depositupdate",{from:"true"})}
        
      />
    </View>
  );
}

export default Depositinput;
