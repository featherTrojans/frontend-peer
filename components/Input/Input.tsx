import React from "react";
import { Text, View, TextInput } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { icons, COLORS, } from "../../constants";
// import { inputContainer } from "../../global/styles";
import { ReactNode } from "react";
import { styles } from "./Input.styles";



const { Eyeicon, Usericondark } = icons;

type inputProps = {
  icon: ReactNode, 
  placeholder: string, 
  password?: boolean, 
  name: string,
  formikProps: any,

}

const Input = ({icon, placeholder, password, formikProps, name, ...rest}: inputProps) => {

  if(formikProps === undefined){
    return (
      <View style={[styles.inputContainer, { marginBottom: 15, borderColor:  COLORS.inputBorderColorDark }]}>
    <View style={styles.inputiconwrapper}>
      {icon}
    </View>
    <TextInput
      style={styles.textInput}
      placeholder={placeholder}
      placeholderTextColor={COLORS.placeHolder}
      underlineColorAndroid="transparent"
      

      {...rest}
      secureTextEntry={password ? true : false}
    />
  </View>
    )
  }
  const { handleBlur, errors, touched, handleChange } = formikProps;

  const borderColor = errors[name] && touched[name] ?  COLORS.errorBorder :  COLORS.inputBorderColorDark


  return (
    <View style={[styles.inputContainer, { marginBottom: 15, borderColor: borderColor }]}>
    <View style={styles.inputiconwrapper}>
      {icon}
    </View>
    <TextInput
      style={styles.textInput}
      placeholder={placeholder}
      onChangeText={handleChange(name)}
      placeholderTextColor={COLORS.placeHolder}
      underlineColorAndroid="transparent"
      onBlur={handleBlur(name)}
      {...rest}
      secureTextEntry={password ? true : false}
    />
  </View>
  );
};

export default Input;

