import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Switch,
} from "react-native";
import React, { useContext, useState } from "react";
import { styles } from "../Changepassword/Changepassword.styles";
import { COLORS, FONTS, fontsize, icons } from "../../../../../constants";
import { Bottombtn, Inputinsettings, Loader } from "../../../../../components";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import Customstatusbar from "../../../../shared/Customstatusbar";
import { useToast } from "react-native-toast-notifications";
import showerror from "../../../../../utils/errorMessage";
import axiosCustom from "../../../../../httpRequests/axiosCustom";
import { AuthContext } from "../../../../../context/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";

const { Backarrow, Fingerprinticon } = icons;

const Biometrics = () => {
  const navigation = useNavigation();
  const [isEnabled, setIsEnabled] = useState(true);
  const { allowBiometrics ,setAllowBiometrics} = useContext(AuthContext)
  const toggleSwitch = () => {
    setAllowBiometrics(!allowBiometrics); 
  } 

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <Customstatusbar />
      <View style={styles.container}>
        <View style={styles.mainHeaderContainer}>
          {/* Icons */}

          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              width: 25,
              height: 25,
              // backgroundColor: 'red',
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 25 / 2,
            }}
          >
            <Backarrow />
          </TouchableOpacity>
          <Text style={styles.mainHeaderText}>Security & Privacy</Text>
          <View />
        </View>

        <View
          style={{
            paddingHorizontal: 22,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 40,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Fingerprinticon />
            <Text
              style={{
                marginLeft: 20,
                ...fontsize.small,
                ...FONTS.medium,
                color: COLORS.blue3,
              }}
            >
              Biometrics Login
            </Text>
          </View>

          <Switch
            trackColor={{ false: COLORS.switchOff, true: COLORS.switchOn }}
            thumbColor={allowBiometrics ? COLORS.blue7 : COLORS.grey5}
            ios_backgroundColor={allowBiometrics ? COLORS.switchOn : COLORS.switchOff}
            onValueChange={toggleSwitch}
            value={allowBiometrics}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Biometrics;
