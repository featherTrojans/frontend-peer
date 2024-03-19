import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useState } from "react";
import {
  AirtimeordataScreenStyles,
  ChoosefeatheruserScreenStyles,
} from "../assets/styles/screens";
import {
  FTCustombutton,
  FTIconwithtitleandinfo,
  FTInput,
  FTSearchinput,
  FTTitlepagewrapper,
} from "../components";
import { COLORS, FONTS, fontsize } from "../constants";

import axiosCustom from "../httpRequests/axiosCustom";
import Sendtoselficon from "../assets/icons/Sendtoselficon";
import amountFormatter from "../utils/formatMoney";
import { useNavigation } from "@react-navigation/native";
import { useAlert } from "../hooks";
import { AuthContext } from "../context/AuthContext";

const {} = AirtimeordataScreenStyles;
const { listHeaderText } = ChoosefeatheruserScreenStyles;

const AirtimeordatanumberScreen = ({ route }) => {
  const navigation = useNavigation();
  const network = route?.params?.network;
  const { authdata } = useContext(AuthContext);
  const [amount, setamount] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const { errorAlert, purpleAlert } = useAlert();
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
          phone: phoneNumber,
          network: network?.network,
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

  const airtimeDatas = [
    {
      amount: 100,
      amountInfo: "You get N100.00",
    },
    {
      amount: 200,
      amountInfo: "You get N200.00",
    },
    {
      amount: 500,
      amountInfo: "You get N500.00",
    },
    {
      amount: 1000,
      amountInfo: "You get N1,000.00",
    },
  ];

  return (
    <FTTitlepagewrapper title="Airtime">
      <FTSearchinput
        value={phoneNumber}
        onChange={setPhoneNumber}
        placeholder="Type in Phone Number"
        icon={false}
        mB={20}
        mT={20}
        textInputProps={{
          keyboardType: "numeric",
          returnKeyType: "done"
        }}
      />

      <FTSearchinput
        value={amount}
        onChange={onamountchange}
        placeholder="Type in custom amount"
        mB={20}
        icon={false}
        textInputProps={{
          keyboardType: "numeric",
          returnKeyType: "done"
        }}
      />

      <FlatList
        data={airtimeDatas}
        ItemSeparatorComponent={() => <View style={{ height: 30 }} />}
        renderItem={({ item }) => {
          const { amount, amountInfo } = item;
          return (
            <FTIconwithtitleandinfo
              // bG={COLORS.green2}
              title={amountFormatter(amount.toString())}
              info={amountInfo}
              onPress={() =>
                navigation.navigate("transactionpin_screen", {
                  action: actionairtime(amount),
                })
              }
              imageUrl={network?.logo}
              size={35}
            />
          );
        }}
      />

      <View style={{ position: "absolute", bottom: 20, left: 20, right: 20 }}>
        <FTCustombutton
          btntext="Proceed"
          bg={COLORS.blue9}
          onpress={() => {
            if (phoneNumber.length != 11) {
              errorAlert(null, "Phone number should be 11 digits");
              return;
            }
            if (amount == "" || Number(amount) < 50) {
              errorAlert(null, "Please input an amount greater than N50.00 ");
              return;
            }

            if (amount > authdata?.userDetails?.walletBal) {
              errorAlert(
                null,
                "Sorry you don't have sufficient amount to perform this transaction "
              );
              return;
            }
            navigation.navigate("transactionpin_screen", {
              action: actionairtime(amount),
            });
          }}
        />
      </View>
    </FTTitlepagewrapper>
  );
};

export default AirtimeordatanumberScreen;

const styles = StyleSheet.create({});
