import React, { useEffect, useState } from "react";
import { View, Text, StatusBar, ScrollView } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { RFValue } from "react-native-responsive-fontsize";
import { SafeAreaView } from "react-native-safe-area-context";
import { useToast } from "react-native-toast-notifications";
import { Bottombtn, Keyboard, Loader, Numberbtn } from "../../../../components";

import { COLORS, FONTS, fontsize, icons } from "../../../../constants";

import { JustifyBetween } from "../../../../global/styles";
import showerror from "../../../../utils/errorMessage";
import Customstatusbar from "../../../shared/Customstatusbar";

import { securepinstyles } from "./Securepin.styles";

const { SecureDot, Newlogo } = icons;
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

  useEffect(() => {
    if(pin.length === 4){
      console.log(pin, "here is rhe pin");
      handleNext()
    }
    
  }, [pin])


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <Customstatusbar />

      <View style={securepinstyles.container}>



        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Newlogo />
          <View style={{ flexDirection: "row" }}>
            <View
              style={[securepinstyles.topDots, { marginRight: RFValue(10) }]}
            />
            <View
              style={[securepinstyles.topDots, { marginRight: RFValue(10) }]}
            />
            <View style={securepinstyles.activeDot} />
          </View>
        </View>



        <View style={{ marginTop: 28, marginBottom: 80 }}>
          <Text
            style={{ ...fontsize.bsmall, ...FONTS.medium, marginBottom: 9 }}
          >
            Setup your secure PIN
          </Text>
          <Text
            style={{
              ...fontsize.smallest,
              ...FONTS.regular,
              color: COLORS.grey16,
            }}
          >
            Create Transaction PIN
          </Text>
        </View>





        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <View style={securepinstyles.pinInputContainer}>
            <View
              style={[
                securepinstyles.pinView,
                { backgroundColor: pin[0] ? COLORS.blue6 : COLORS.grey3 },
              ]}
            />
            <View
              style={[
                securepinstyles.pinView,
                { backgroundColor: pin[1] ? COLORS.blue6 : COLORS.grey3 },
              ]}
            />
            <View
              style={[
                securepinstyles.pinView,
                { backgroundColor: pin[2] ? COLORS.blue6 : COLORS.grey3 },
              ]}
            />
            <View
              style={[
                securepinstyles.pinView,
                { backgroundColor: pin[3] ? COLORS.blue6 : COLORS.grey3 },
              ]}
            />
          </View>
        </View>

        <View style={{ flex: 1, }} />

          <Keyboard
            array={[...numbers]}
            setDigit={handleSetAmount}
            removeDigit={handleRemoveAmount}
          />

    
      </View>
    </SafeAreaView>
  );
};

export default Securepin;
