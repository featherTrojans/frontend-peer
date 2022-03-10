import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
  TouchableHighlight,
} from "react-native";
import * as Location from 'expo-location';
import {
  Backheader,
  Bottombtn,
  Numberbtn,
  Viewbalance,
} from "../../../../components";
import { COLORS } from "../../../../constants";
import axiosCustom from "../../../../httpRequests/axiosCustom";
import amountFormatter from "../../../../utils/formatMoney";
import { styles } from "../../Transferfunds/TransferInput/TransferInput.styles";



function Depositinput({ route, navigation }) {
  const { nextscreen } = route.params;
  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0"];
  const [amount, setAmount] = useState<string>("");
  const [coords, setCoords] = useState({});
  const [locationSide, setLocationSide] = useState({});
  console.log(amount,"amount screen") 
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
        Location.setGoogleApiKey('AIzaSyA4C5Ezt6h_4Po4PX0jrnzrAchAolScS9k')
        let locationaddress = await Location.reverseGeocodeAsync(location.coords,{useGoogleMaps:true})
        console.log(locationaddress);
        setLocationSide(locationaddress[0])    
      })();
},[]) 

  const handleRemoveAmount = () => {
    if (amount.length > 0) {
      const newdata = amount.substring(0, amount.length - 1)
      setAmount(newdata);
      console.log(newdata);
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
    try{
        const response = await axiosCustom.post("/status/create",{
            amount,
            longitude: coords.longitude,
            lantitude: coords.latitude,
            locationText: locationSide.city
        })
        navigation.navigate("Depositupdate")
    }catch(err){

    }
  }
  return (
    <View style={styles.container}>
      <Backheader title="Enter Amount" />

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
