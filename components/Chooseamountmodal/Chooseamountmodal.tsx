import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { styles } from "../../screens/app/Chats/Chatsdm/Chatsdm.styles";
import Custombutton from "../Custombutton/Custombutton";

const amounts = [
  { name: "50", value: 50 },
  { name: "100", value: 100 },
  { name: "200", value: 200 },
  { name: "500", value: 500 },
  { name: "1,000", value: 1000 },
  { name: "2,000", value: 2000 },
  { name: "5,000", value: 5000 },
];

const Chooseamountmodal = ({ headerText, onpress }) => {
  const [amount, setAmount] = useState("0")
  const handleAmountChange = (value) =>{
    setAmount(value)
  }
  return (
    <View>
      <Text style={styles.chooseAmountHeader}>{headerText}</Text>

      <View style={styles.amountBlockWrap}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {/* minus icon */}
          {/* <Minusicon /> */}
          <TextInput
            style={styles.addedAmountText}
            keyboardType="numeric"
            placeholder="N0.00"
             value={amount}
             onChangeText={handleAmountChange}
          />
          {/* <Text style={styles.addedAmountText}>N0.00</Text> */}
          {/* Add icon */}
          {/* <Plusicon /> */}
        </View>
      </View>
      {/* Amount options */}
      <View style={[styles.amountOptionsContainer, {marginBottom: 40}]}>
        {amounts.map((item, index) => {
          return (
            <TouchableOpacity
              onPress={() => handleAmountChange(item.name)}
              activeOpacity={0.8}
              key={index}
              style={styles.amountOption}
            >
              <Text style={styles.amountOptionText}>N{item.name}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

        <Custombutton btntext="Continue" onpress={()=>onpress(amount)}/>

      {/* <TouchableOpacity style={styles.buttonWrapper} onPress={onpress}>
        <Text style={styles.buttonTextValue}>Proceed</Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default Chooseamountmodal;

// const styles = StyleSheet.create({})
