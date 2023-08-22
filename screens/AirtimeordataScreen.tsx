import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { AirtimeordataScreenStyles } from "../assets/styles/screens";
import {
  FTCustombutton,
  FTIconwithtitleandinfo,
  FTSearchinput,
  FTTitlepagewrapper,
} from "../components";
import { COLORS } from "../constants";
import { navigation } from "../utils";
import axiosCustom from "../httpRequests/axiosCustom";
import Sendtoselficon from "../assets/icons/Sendtoselficon";
import { TouchableOpacity } from "react-native-gesture-handler";
import { color } from "react-native-reanimated";
const {} = AirtimeordataScreenStyles;

const AirtimeordataScreen = ({ route }) => {
  const userinfo = route?.params?.userinfo;
  const [amount, setamount] = useState("");

  const onamountchange = (val) => {
    if (isNaN(val)) {
      return;
    }
    setamount(val);
  };

  const actionairtime = (amount) => {
    return async (pin) => {
      try {
        await axiosCustom.post("/bills/airtime", {
          phone: userinfo.phoneNumber,
          network: userinfo.network,
          amount: amount,
          userPin: pin,
        });
        navigation.navigate("transactionsuccess_screen");
      } catch (err) {
        throw err;
      } finally {
      }
    };
  };

  const actiondata = (amount) => {
    return async (pin) => {
      try {
        await axiosCustom.post("/bills/airtime", {
          phone: userinfo.phoneNumber,
          network: userinfo.network,
          amount: amount,
          userPin: pin,
        });
        navigation.navigate("transactionsuccess_screen");
      } catch (err) {
        throw err;
      } finally {
      }
    };
  };

  return (
    <FTTitlepagewrapper title="Airtime or Data">
      <FTSearchinput
        value={amount}
        onChange={onamountchange}
        placeholder="Type in custom amount"
      />
      <Text style={{ marginVertical: 20 }}>Purchase Recipient</Text>
      <FTIconwithtitleandinfo
        bG={COLORS.green2}
        title={userinfo?.fullName}
        info={userinfo.phoneNumber}
        rightComponent={
          <TouchableOpacity
            style={{
              width: 100,
              height: 100,
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "pink",
            }}
            onPress={navigation.goBack}
          >
            <Text style={{ color: "red" }}>Change</Text>
          </TouchableOpacity>
        }
        onPress={() =>
          navigation.navigate("airtimeordata_screen", { userinfo })
        }
        Icon={Sendtoselficon}
        // imageUrl={userinfo?.imageUrl || ""}
      />
      <Text style={{ marginVertical: 20 }}>Preset Amount</Text>

      <FTCustombutton
        btntext="Proceed"
        onpress={() =>
          navigation.navigate("transactionpin_screen", {
            action: actionairtime(amount),
          })
        }
      />
    </FTTitlepagewrapper>
  );
};

export default AirtimeordataScreen;

const styles = StyleSheet.create({});
