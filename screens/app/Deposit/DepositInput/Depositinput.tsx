import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
  TouchableHighlight,
} from "react-native";
import {
  Backheader,
  Bottombtn,
  Numberbtn,
  Viewbalance,
} from "../../../../components";
import { COLORS } from "../../../../constants";
import amountFormatter from "../../../../utils/formatMoney";
import { styles } from "../../Transferfunds/TransferInput/TransferInput.styles";


function Depositinput({ route, navigation }) {
  const { nextscreen } = route.params;
  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0"];
  const [amount, setAmount] = useState<string>("");
  
  console.log(amount,"amount screen") 
  // const amountFormatter = (value: string) => {
  //   return (
  //     Number(value)
  //       .toFixed(2)
  //       .replace(/\d(?=(\d{3})+\.)/g, "$&,") || "0.00"
  //   );
  // };

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
        onpress={() =>
          navigation.navigate(nextscreen, { amount: amount })
        }
      />
    </View>
  );
}

export default Depositinput;
