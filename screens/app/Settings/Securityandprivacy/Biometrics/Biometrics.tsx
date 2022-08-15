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
import { Backheader, Bottombtn, Inputinsettings, Loader, Mainwrapper } from "../../../../../components";
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


const { Backarrow, Bluefingerprinticon } = icons;

const Biometrics = () => {
  const navigation = useNavigation();
  const [isEnabled, setIsEnabled] = useState(false);
  const { allowBiometrics, setAllowBiometrics } = useContext(AuthContext);



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
    <Mainwrapper>

      <Backheader title="Biometrics Login"/>





      <View  style={{paddingHorizontal: 15}}>





        <View
          style={{
            paddingHorizontal: 20,
            paddingVertical: 22,
            backgroundColor: COLORS.white,
            borderRadius: 15,
          }}
        >
          <Text style={{marginBottom: 40}}>Enable for transactions</Text>



          <View style={{flexDirection: "row", justifyContent: "space-between",  }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>


            <View style={{width: 34, height: 34, backgroundColor: "#D2EAFD", borderRadius: 34/2, justifyContent: "center", alignItems: "center"}}>
            <Bluefingerprinticon />

            </View>




            <Text
              style={{
                marginLeft: 20,
                ...fontsize.smaller,
                ...FONTS.medium,
                color: COLORS.blue3,
              }}
            >
              Biometrics Login
            </Text>
          </View>

          <Switch
            trackColor={{ false: COLORS.switchOff, true: COLORS.switchOn }}
            thumbColor={isEnabled ? COLORS.blue6 : COLORS.grey5}
            ios_backgroundColor={isEnabled ? COLORS.switchOn : COLORS.switchOff}
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
          </View>



        </View>
      </View>
    </Mainwrapper>
  );
};

export default Biometrics;
