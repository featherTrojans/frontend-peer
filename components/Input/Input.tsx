import React from "react";
import { Text, View, TextInput } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { icons, COLORS, } from "../../constants";
// import { inputContainer } from "../../global/styles";
import { ReactNode } from "react";
import { styles } from "./Input.styles";



const { Eyeicon, Usericondark } = icons;

const Input = ({icon, placeholder, password, value, onchange}: {icon: ReactNode, placeholder: string, password?: boolean, value:string,onchange:(e:any)=>{}}) => {
  return (
    <View style={[styles.inputContainer, { marginBottom: 15 }]}>
    <View style={styles.inputiconwrapper}>
      {icon}
    </View>
    <TextInput
      style={styles.textInput}
      placeholder={placeholder}
      value={value}
      onChangeText={e=>onchange(e)}
      placeholderTextColor={COLORS.placeHolder}
      underlineColorAndroid="transparent"
      secureTextEntry={password ? true : false}
    />
  </View>
  );
};

export default Input;

