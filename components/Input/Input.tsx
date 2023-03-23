import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, Pressable } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { icons, COLORS } from "../../constants";
// import { inputContainer } from "../../global/styles";
import { ReactNode } from "react";
import { styles } from "./Input.styles";

const { Transfericon } = icons;

type inputProps = {
  icon: ReactNode;
  placeholder: string;
  password?: boolean;
  name: string;
  formikProps?: any;
  inputbg?: string
};

const Input = ({
  icon,
  placeholder,
  password = false,
  formikProps,
  name,
  inputbg = COLORS.grey1,
  ...rest
}: inputProps) => {
  const [showPassword, setShowPassword] = useState(password);

  if (formikProps === undefined) {
    return (
      <View
        style={[
          styles.inputContainer,
          { marginBottom: 15, borderColor: COLORS.inputBorderColorDark, backgroundColor: inputbg },
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
      ? COLORS.inputBorderColorDark
      : COLORS.inputBorderColorDark;

  return (
    <View
      style={[
        styles.inputContainer,
        { marginBottom: 15, borderColor: borderColor, backgroundColor: inputbg },
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

      {password && (
        <Pressable
          onPress={() => setShowPassword(!showPassword)}
          // activeOpacity={0.8}
          hitSlop={16}
          style={{ padding: 8, paddingRight: 0,}}
        >
          {showPassword ? <Transfericon /> : <Transfericon />}
        </Pressable>
      )}
    </View>
  );
};

export default Input;
