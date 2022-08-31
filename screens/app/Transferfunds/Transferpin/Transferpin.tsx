import { StyleSheet, Text, View, StatusBar } from "react-native";
import React, { useContext, useState } from "react";
import LottieView from "lottie-react-native";
import { styles } from "./Transferpin.styles";
import { COLORS, FONTS, fontsize, icons } from "../../../../constants";
import {
  Backheader,
  Bottombtn,
  Keyboard,
  Loader,
  Mainwrapper,
  Numberbtn,
} from "../../../../components";
import axiosCustom from "../../../../httpRequests/axiosCustom";
import { useToast } from "react-native-toast-notifications";
import showerror from "../../../../utils/errorMessage";
import Globalmodal from "../../../shared/Globalmodal/Globalmodal";
import amountFormatter from "../../../../utils/formatMoney";
import { usePushNotification } from "../../../../navigation";
import { AuthContext } from "../../../../context/AuthContext";
import Customstatusbar from "../../../shared/Customstatusbar";
import { ScrollView } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import { SafeAreaView } from "react-native-safe-area-context";
import { securepinstyles } from "../../../auth/signup/Securepin/Securepin.styles";


const { Backarrow, SecureDot, Successcheckanimate } = icons;

const Transferpin = ({ route, navigation }) => {
  const { sendPushNotification } = usePushNotification();
  const toast = useToast();
  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0"];
  // const { amount, userinfo } = route.params;
  const [pin, setPin] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [showmodal, setShowModal] = useState(false);
  const { messageToken, authdata } = useContext(AuthContext);

  const handleSetAmount = (value: string) => {
    if (pin.length < 4) {
      setPin((oldpin) => [...oldpin, value]);
    }
  };


  const handleRemoveAmount = () => {
    if (pin.length > 0) {
      const newdata = [...pin];
      newdata.pop();
      setPin(newdata);
    }
  };

  const handleSubmit = async () => {
    const joinpin = pin.join("");
    if (joinpin.length < 4) {
      return false;
    }
    try {
      setLoading(true);
  
      // await axiosCustom.post("/transfer", {
      //   amount,
      //   transferTo: userinfo?.username,
      //   userPin: joinpin,
      // });

      setShowModal(true);
    } catch (err) {
      console.log(err.response);
      showerror(toast, err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Mainwrapper>
      {loading && <Loader />}



      <View style={{paddingHorizontal: 15, flex: 1}}>
        <View style={{marginTop: 32}}>
          <Text style={{...fontsize.bbsmall, ...FONTS.medium, color: COLORS.blue9, marginBottom: 20}}>Complete Transaction</Text>
          <Text style={{...fontsize.smallest, ...FONTS.regular, color: COLORS.grey2, lineHeight: 20}}>You are about to send NGN 35,750.00 from your Primary Wallet to @della007 - Adeyemi Adeola Gideon</Text>
        </View>



          <View style={{ alignItems: "center", flex: 1, justifyContent: "center"}}>
            <Text style={{marginBottom: 60, ...fontsize.smaller, ...FONTS.regular, color: COLORS.blue9}}>Enter your Feather PIN</Text>


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
          </View>
            

        <View>

        </View>
      </View>


      <Keyboard  array={[...numbers ]} setDigit={handleSetAmount} removeDigit={handleRemoveAmount}/>


      {/* <Bottombtn title="PROCEED" onpress={handleSubmit} /> */}

        
    </Mainwrapper>
  );
};

export default Transferpin;
