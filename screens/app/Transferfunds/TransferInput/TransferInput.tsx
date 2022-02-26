import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
  TouchableHighlight,
} from "react-native";
import { Backheader, Bottombtn, Viewbalance } from "../../../../components";
import { COLORS } from "../../../../constants";
import { styles } from "./TransferInput.styles";

function TransferInput({ route, navigation }) {
  const { nextscreen } = route.params;
  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0"];
  const [amount, setAmount] = useState<string[]>([]);


  const amountFormatter = (value: string) => {
    return (Number(value)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') || "0.00"
  }

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
      <TouchableNativeFeedback
        style={styles.numberBtn}
        onPress={() => handleSetAmount(children)}
        background={TouchableNativeFeedback.Ripple(COLORS.lightBlue, true)}
      >
        <View style={styles.numberBtn}>
          <Text style={styles.numberBtnText}>{children}</Text>
        </View>
      </TouchableNativeFeedback>
    );
  };

  return (
    <View style={styles.container}>
      <Backheader title="Deposit" />

      <View style={{ flex: 1, paddingHorizontal: 15 }}>
        <Viewbalance />
        <View style={{ flex: 1, justifyContent: "center" }}>
          <View style={{ alignItems: "center" }}>
            <View style={styles.amountcont}>
              <Text style={styles.amountTxt}>
                {" "}
                <Text style={{ color: COLORS.grey5 }}>N</Text>{" "}
                {amountFormatter(amount.join(""))}
              </Text>
            </View>
          </View>
          <View style={styles.numberBtnContainer}>
            {numbers.map((number, index) => {
              return <NumberBtn key={index}>{number}</NumberBtn>;
            })}

            <TouchableNativeFeedback
              style={styles.numberBtn}
              onPress={() => handleRemoveAmount()}
              // underlayColor={COLORS.lightBlue}
              background={TouchableNativeFeedback.Ripple(
                COLORS.lightBlue,
                true
              )}
            >
              <View style={styles.numberBtn}>
                <Text>X</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      </View>

      <Bottombtn
        title="PROCEED"
        onpress={() =>
          navigation.navigate(nextscreen, { amount: amount.join("") })
        }
      />
    </View>
  );
}

export default TransferInput;
