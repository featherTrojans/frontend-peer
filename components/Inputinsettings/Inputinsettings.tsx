import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { COLORS, FONTS, fontsize } from "../../constants";
import { styles } from "./Inputinsettings.styles";

type InputinsettingsProps = {
  label: string;
  placeholder: string;
};

const Inputinsettings = ({ label, placeholder, ...rest }: InputinsettingsProps) => {
  const [hidePassword, setHidePassword] = useState(true);

  return (
    <View style={styles.container}>
      {/* Label */}
      <Text style={styles.inputLabel}>{label}</Text>

      <View style={styles.inputBox}>
        <TextInput
          style={styles.textInput}
          placeholder={placeholder}
          secureTextEntry={hidePassword}
          placeholderTextColor={COLORS.grey9}
            {...rest}
        />

        <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
          <Text style={styles.showOrHide}>{hidePassword ? "Show": "Hide"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Inputinsettings;
