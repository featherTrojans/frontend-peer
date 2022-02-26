import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
} from "react-native";
import { Backheader, Viewbalance } from "../../../../components";
import { styles } from "./TransferInput.styles";


function TransferInput({ route, navigation }) {
  const { nextscreen } = route.params;
  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0"];
  const [amount, setAmount] = useState<string[]>([]);


  const handleRemoveAmount = () => {
 
    if (amount.length > 0) {
      const newdata = [...amount];
      newdata.pop();
      setAmount(newdata);
      console.log(newdata);
    }
  };
  const handleSetAmount = (value: string) => {
    setAmount((oldamount) => [...oldamount, value]);
  };


  const NumberBtn = ({ children }: { children: string }) => {
    return (
      <TouchableOpacity
        style={styles.numberBtn}
        activeOpacity={0.8}
        onPress={() => handleSetAmount(children)}
      >
        <Text>{children}</Text>
      </TouchableOpacity>
    );
  };


  
  return (
    <View style={styles.container}>
      <Backheader title="Deposit" />
      <Viewbalance />
      <View style={{ flex: 1, justifyContent: "center" }}>
        <View style={{ alignItems: "center" }}>
          <View style={styles.amountcont}>
            <Text style={styles.amounttxt}>N {amount.join("") || "0.00"}</Text>
          </View>
        </View>
        <View style={styles.numberBtnContainer}>
          {numbers.map((number, index) => {
            return <NumberBtn key={index}>{number}</NumberBtn>;
          })}

          <TouchableNativeFeedback
            style={styles.numberBtn}
            onPress={() => handleRemoveAmount()}
            background={TouchableNativeFeedback.Ripple('grey', true)}
          >
            <View  style={styles.numberBtn}>
              <Text>X</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(nextscreen, { amount: amount.join("") })
        }
        style={styles.btnBg}
      >
        <Text style={styles.btnText}>Proceed</Text>
      </TouchableOpacity>
    </View>
  );
}

export default TransferInput;
