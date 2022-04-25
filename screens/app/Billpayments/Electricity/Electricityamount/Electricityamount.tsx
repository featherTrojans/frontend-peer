import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import { useToast } from "react-native-toast-notifications";
import { AuthContext } from "../../../../../context/AuthContext";
import {
  Backheader,
  Bottombtn,
  Keyboard,
  Numberbtn,
  Viewbalance,
} from "../../../../../components";
import Customstatusbar from "../../../../shared/Customstatusbar";
import amountFormatter from "../../../../../utils/formatMoney";
import { styles } from "../../../Transferfunds/TransferInput/TransferInput.styles";
import { COLORS } from "../../../../../constants";
import showerror from "../../../../../utils/errorMessage";
import { SafeAreaView } from "react-native-safe-area-context";

const Electricityamount = ({ navigation }) => {
  const { authdata } = useContext(AuthContext);
  const toast = useToast();
  const [amount, setAmount] = useState<string>("");
  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0"];

  // const amountFormatter = (value: string) => {
  //   return (
  //     Number(value)
  //       .toFixed(2)
  //       .replace(/\d(?=(\d{3})+\.)/g, "$&,") || "0.00"
  //   );
  // };

  const handleRemoveAmount = () => {
    if (amount.length > 0) {
      const newdata = amount.substring(0, amount.length - 1);
      setAmount(newdata);
    }
  };
  const handleSetAmount = (value: string) => {
    setAmount((oldamount) => {
      let newamount = oldamount.concat(value);
      if (Number(newamount)) {
        return newamount;
      }
      return oldamount;
    });
  };

  const handleToNext = () => {
    if (authdata?.walletBal < amount) {
      return showerror(toast, null, "insufficient amount");
    }
    if (Number(amount) < 1) {
      return showerror(toast, null, "Amount cannot be 0.00");
    }
    navigation.navigate("Electricitydetails", { amount });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Backheader title="Enter Amount" />
      <Customstatusbar />

      <View style={{ flex: 1, paddingHorizontal: 15 }}>
        <Viewbalance />

        <View style={{ flex: 1, justifyContent: "center" }}>
          <View style={{ alignItems: "center" }}>
            <View style={styles.amountcont}>
              <Text style={styles.amountTxt}>
                <Text style={{ color: COLORS.grey5 }}>N</Text>{" "}
                {amountFormatter(amount)}
              </Text>
            </View>
          </View>

          {/* <View style={styles.numberBtnContainer}>
           {numbers.map((number, index) => {
             return (
               <Numberbtn key={index} onpress={() => handleSetAmount(number)}>
                 {number}
               </Numberbtn>
             );
           })}
           <Numberbtn onpress={() => handleRemoveAmount()}>X</Numberbtn>
         </View> */}

          <Keyboard
            array={[...numbers]}
            setDigit={handleSetAmount}
            removeDigit={handleRemoveAmount}
          />
        </View>
      </View>

      <Bottombtn title="PROCEED" onpress={handleToNext} />
    </SafeAreaView>
  );
};

export default Electricityamount;
