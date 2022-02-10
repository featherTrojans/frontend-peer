import React, {useState} from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { COLORS, SIZES, fontsize, FONTS } from "../../../../constants";
import { JustifyBetween } from "../../../../global/styles";
import axiosCustom from "../../../../httpRequests/axiosCustom";
import { styles } from "./Securepin.styles";

const Securepin = ({ navigation }) => {
  const [veriPin,setVeriPin] = useState({1:"",2:"",3:"",4:""});

  const handleSubmit = async()=>{
    try{
      const pin = Object.values(veriPin).join("")
      const response = await axiosCustom.post("/auth/pin/set",{pin})
      console.log(response)
      navigation.navigate("Setup")
    }catch(err){
      console.log(err.response)
    }
  }

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <JustifyBetween style={{ marginBottom: 10 }}>
          <View>
            <Text style={styles.header}>Set up your </Text>
            <Text style={styles.header}>4-digit secure pin</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View style={[styles.topDots, { marginRight: 10 }]} />
            <View style={[styles.topDots, { marginRight: 10 }]} />
            <View style={styles.topDots} />
          </View>
        </JustifyBetween>
        <View style={{ marginBottom: 40 }}>
          <Text style={styles.subText}>Transaction PIN</Text>
        </View>

        <View style={styles.pinContainer}>
          <View style={styles.pinInputContainer}>
            <TextInput style={styles.pinInput} />
            <TextInput style={styles.pinInput} />
            <TextInput style={styles.pinInput} />
            <TextInput style={styles.pinInput} />
          </View>
        </View>

        <View style={styles.numberBtnContainer}>
          <View style={styles.numberBtn}>
            <Text>1</Text>
          </View>
          <View style={styles.numberBtn}>
            <Text>2</Text>
          </View>
          <View style={styles.numberBtn}>
            <Text>3</Text>
          </View>
          <View style={styles.numberBtn}>
            <Text>4</Text>
          </View>
          <View style={styles.numberBtn}>
            <Text>5</Text>
          </View>
          <View style={styles.numberBtn}>
            <Text>6</Text>
          </View>
          <View style={styles.numberBtn}>
            <Text>7</Text>
          </View>
          <View style={styles.numberBtn}>
            <Text>8</Text>
          </View>
          <View style={styles.numberBtn}>
            <Text>9</Text>
          </View>
          <View style={styles.numberBtn}>
            <Text></Text>
          </View>
          <View style={styles.numberBtn}>
            <Text>0</Text>
          </View>
          <View style={styles.numberBtn}>
            <Text>X</Text>
          </View>
        </View>
        <TouchableOpacity
          style={[styles.proceedBtn, { marginBottom: 80 }]}
          activeOpacity={0.8}
          onPress={handleSubmit}
        >
          <Text style={styles.proceedText}>PROCEED</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Securepin;
