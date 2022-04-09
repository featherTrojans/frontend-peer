import { useState } from "react";
import { View, Text, StatusBar, ScrollView } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { RFValue } from "react-native-responsive-fontsize";
import { useToast } from "react-native-toast-notifications";
import { Bottombtn, Loader, Numberbtn } from "../../../../components";

import { icons } from "../../../../constants";

import { JustifyBetween } from "../../../../global/styles";
import showerror from "../../../../utils/errorMessage";
import Customstatusbar from "../../../shared/Customstatusbar";
import { styles } from "./Securepin.styles";

const { SecureDot } = icons;
const Securepin = ({ route, navigation }) => {
  const toast = useToast();
  const { token, fromm } = route.params;
  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0"];
  const [pin, setPin] = useState<string[]>([]);

  const handleSetAmount = (value: string) => {
    if (pin.length < 4) {
      setPin((oldamount) => [...oldamount, value]);
    }
  };
  const handleRemoveAmount = () => {
    if (pin.length > 0) {
      const newdata = [...pin];
      newdata.pop();
      setPin(newdata);
    }
  };
  const handleNext = () => {
    if (pin.join("") === "0000") {
      return showerror(toast, null, "Pin cannot be set to 0000");
    }
    navigation.navigate("SecurepinAgain", { token, pin, fromm });
  };

  return (
    <ScrollView style={styles.container}>
      <Customstatusbar />
      <View style={{ paddingHorizontal: RFValue(25) }}>
        <JustifyBetween style={{ marginBottom: RFValue(10) }}>
          <View>
            <Text style={styles.header}>Set up your </Text>
            <Text style={styles.header}>4-digit secure pin</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View style={[styles.topDots, { marginRight: RFValue(10) }]} />
            <View style={[styles.topDots, { marginRight: RFValue(10) }]} />
            <View style={styles.activeDot} />
          </View>
        </JustifyBetween>
        <View style={{ marginBottom: RFValue(40) }}>
          <Text style={styles.subText}>Transaction PIN</Text>
        </View>

        <View style={styles.pinContainer}>
          <View style={styles.pinInputContainer}>
            <View style={styles.pinView}>{pin[0] && <SecureDot />}</View>
            <View style={styles.pinView}>{pin[1] && <SecureDot />}</View>
            <View style={styles.pinView}>{pin[2] && <SecureDot />}</View>
            <View style={styles.pinView}>{pin[3] && <SecureDot />}</View>
          </View>
        </View>

       
      </View>
      <View style={styles.numberBtnContainer}>
          {numbers.map((number, index) => {
            return (
              <Numberbtn
                key={index}
                onpress={
                  number !== "" ? () => handleSetAmount(number) : () => null
                }
              >
                {number}
              </Numberbtn>
            );
          })}

          <Numberbtn onpress={() => handleRemoveAmount()}>X</Numberbtn>
        </View>

      <Bottombtn
        title="PROCEED"
        onpress={handleNext}
        disabled={pin.length !== 4}
      />
    </ScrollView>
  );
};

export default Securepin;
