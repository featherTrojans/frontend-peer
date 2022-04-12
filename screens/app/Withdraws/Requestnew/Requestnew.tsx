import React, { useState, useContext } from "react";
import { View, Text } from "react-native";
import { useToast } from "react-native-toast-notifications";
import {
  Backheader,
  Bottombtn,
  Keyboard,
  Numberbtn,
  Viewbalance,
} from "../../../../components";
import { COLORS } from "../../../../constants";
import { AuthContext } from "../../../../context/AuthContext";
import showerror from "../../../../utils/errorMessage";
import Customstatusbar from "../../../shared/Customstatusbar";
import { styles } from "../../Transferfunds/TransferInput/TransferInput.styles";
// import { styles } from "./TransferInput.styles";

function Requestnew({ navigation }) {
  const toast = useToast();
  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "00", "0"];
  const [amount, setAmount] = useState<string>("");
  const { authdata } = useContext(AuthContext);

  const amountFormatter = (value: string) => {
    return (
      Number(value)
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, "$&,") || "0.00"
    );
  };
  const handleRemoveAmount = () => {
    if (amount.length > 0) {
      const newdata = amount.substring(0, amount.length - 1);
      setAmount(newdata);
      // console.log(newdata);
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
  const handleNextScreen = () => {
    if (authdata?.walletBal < amount) {
      return showerror(toast, null, "insufficient amount");
    }
    if (200 > Number(amount)) {
      return showerror(toast, null, "cash request is can't be lower than N200");
    }
    navigation.navigate("Availablelisting", { amount });
  };

  return (
    <View style={styles.container}>
      <Backheader title="Amount" />
      <Customstatusbar />
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
      <Bottombtn title="PROCEED" onpress={handleNextScreen} />
    </View>
  );
}

export default Requestnew;
