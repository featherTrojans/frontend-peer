import React, {useState} from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { icons, COLORS } from "../../constants";
// import { inputContainer } from "../../global/styles";
import { ReactNode } from "react";
import { styles } from "./Input.styles";

const { Eyeicon, Usericondark, Passwordhideicon } = icons;

type inputProps = {
  icon: ReactNode;
  placeholder: string;
  password?: boolean;
  name: string;
  formikProps: any;
};

const Input = ({
  icon,
  placeholder,
  password=false,
  formikProps,
  name,
  ...rest
}: inputProps) => {


  const [showPassword, setShowPassword] = useState(password)




  if (formikProps === undefined) {
    return (
      <View
        style={[
          styles.inputContainer,
          { marginBottom: 15, borderColor: COLORS.inputBorderColorDark },
        ]}
      >
        <View style={styles.inputiconwrapper}>{icon}</View>
        <TextInput
          style={styles.textInput}
          placeholder={placeholder}
          placeholderTextColor={COLORS.grey2}
          underlineColorAndroid="transparent"
          {...rest}
          secureTextEntry={password ? true : false}
        />
      </View>
    );
  }
  const { handleBlur, errors, touched, handleChange } = formikProps;

  const borderColor =
    errors[name] && touched[name]
      ? COLORS.errorBorder
      : COLORS.inputBorderColorDark;

  return (
    <View
      style={[
        styles.inputContainer,
        { marginBottom: 15, borderColor: borderColor },
      ]}
    >
      <View style={styles.inputiconwrapper}>{icon}</View>
      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        onChangeText={handleChange(name)}
        placeholderTextColor={COLORS.grey2}
        underlineColorAndroid="transparent"
        onBlur={handleBlur(name)}
        {...rest}
        secureTextEntry={password && showPassword ? true : false}
      />

      {password && 
      
      <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                      activeOpacity={0.8}
                    >
                      {showPassword ? <Eyeicon /> : <Passwordhideicon />}
                    </TouchableOpacity>
      }
    </View>
  );
};

export default Input;
