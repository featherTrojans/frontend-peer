import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
  TouchableHighlight,
} from "react-native";
import { useToast } from "react-native-toast-notifications";
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import {
  Backheader,
  Bottombtn,
  Loader,
  Numberbtn,
  Viewbalance,
} from "../../../../components";
import { COLORS } from "../../../../constants";
import axiosCustom from "../../../../httpRequests/axiosCustom";
import showerror from "../../../../utils/errorMessage";
import amountFormatter from "../../../../utils/formatMoney";
import { styles } from "../../Transferfunds/TransferInput/TransferInput.styles";


function WalletPin({ route, navigation }) {
  const toast = useToast()
  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0"];
  const [amount, setAmount] = useState<string>("");
  const [loading, setLoading] = useState(false);
  

  const handleSubmit = async () =>{
      setLoading(true)
    try{
        const response = await axiosCustom.post("/pay",{amount});
        // Linking.openURL(response.data.data.authorization_url)
        WebBrowser.openBrowserAsync(response.data.data.authorization_url);
        // console.log(response)
    }catch(err){
        showerror(toast,err)
    }finally{
        setLoading(false)
    } 
  }
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

  return (
    <View style={styles.container}>
      <Backheader title="Enter Amount" />
        {loading && <Loader />}
      <View style={{ flex: 1, paddingHorizontal: 15 }}>

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

export default WalletPin;
