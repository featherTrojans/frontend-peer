import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
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



function Depositinput({ route, navigation }) {
  const toast = useToast();
  const {authdata} = useContext(AuthContext)
  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0"];
  const [amount, setAmount] = useState<string>("");
  const [coords, setCoords] = useState({});
  const [locationSide, setLocationSide] = useState({});
  const [loading, setLoading] = useState(false)
  
  // const amountFormatter = (value: string) => {
  //   return (
  //     Number(value)
  //       .toFixed(2)
  //       .replace(/\d(?=(\d{3})+\.)/g, "$&,") || "0.00"
  //   );
  // };

  useEffect(()=>{
    (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.log('Permission to access location was denied');
          return;
        }
        let location = await Location.getCurrentPositionAsync({accuracy:6});
        setCoords(location.coords);
        Location.setGoogleApiKey('AIzaSyAi-mitwXb4VYIZo9p-FXCwzMeHSsknCnY')
        let locationaddress = await Location.reverseGeocodeAsync(location.coords,{useGoogleMaps:true})
        setLocationSide(locationaddress[0])    
      })();
},[]) 

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
    if(authdata?.walletBal < amount){
      return showerror(toast, null, "insufficient amount")
    }
    let locationText = `${locationSide.name}, ${locationSide.city}`
    
    try{
        await axiosCustom.post("/status/create",{
            amount,
            longitude: coords.longitude,
            latitude: coords.latitude,
            locationText:  locationSide.city
        })
        let asyncval = JSON.stringify({locationText, amount, time: Date.now()})
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
  return (
    <View style={styles.container}>
      <Backheader title="Enter Amount" />
      {loading && <Loader />}
      <View style={{ flex: 1, paddingHorizontal: 15 }}>
      <Viewbalance navigate={() => navigation.navigate("Addcash")}/>

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
