import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Switch,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
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
import {
  getBiometricsAccess,
  removeBiometricsAccess,
  saveBiometricsAccess,
} from "../../../../../utils/biometrics";
import { ContactTypes } from "expo-contacts";

const { Backarrow, Fingerprinticon } = icons;

const Biometrics = () => {
  const navigation = useNavigation();
  const [isEnabled, setIsEnabled] = useState(false);
  const { allowBiometrics, setAllowBiometrics } = useContext(AuthContext);

  // const toggleSwitch = () => {
  //   setAllowBiometrics(!allowBiometrics);
  //   if(!allowBiometrics){
  //     saveBiometricsAccess()
  //   }
  //   else{
  //   removeBiometricsAccess()
  //   }
  // }


  





  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
  };

  useEffect(() => {
    const checkStatus = async () => {
      const response = await getBiometricsAccess();
      console.log(response, "here is it");

      if (response === "true") {
        setIsEnabled(true);
        // saveBiometricsAccess();
        // console.log("setted to true")
      } else {
        setIsEnabled(false);
        // removeBiometricsAccess()
        // console.log('setted to false')
      }
      // console.log(isEnabled, "isENabled");
    }; 
    // console.log(isEnabled, "Status")


    checkStatus();
  }, []);


    useEffect(() => {
    if (isEnabled) {
      saveBiometricsAccess();
    } else {
      removeBiometricsAccess();
    }
  }, [isEnabled]);










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
            thumbColor={false ? COLORS.blue7 : COLORS.grey5}
            ios_backgroundColor={false ? COLORS.switchOn : COLORS.switchOff}
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Biometrics;
