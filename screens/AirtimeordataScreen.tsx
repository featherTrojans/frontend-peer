import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import {
  AirtimeordataScreenStyles,
  ChoosefeatheruserScreenStyles,
} from "../assets/styles/screens";
import {
  FTCustombutton,
  FTIconwithtitleandinfo,
  FTSearchinput,
  FTTitlepagewrapper,
} from "../components";
import { COLORS, FONTS, fontsize } from "../constants";

import axiosCustom from "../httpRequests/axiosCustom";
import Sendtoselficon from "../assets/icons/Sendtoselficon";
import amountFormatter from "../utils/formatMoney";
import { useNavigation } from "@react-navigation/native";

const {} = AirtimeordataScreenStyles;
const { listHeaderText } = ChoosefeatheruserScreenStyles;

const AirtimeordataScreen = ({ route }) => {
  const navigation = useNavigation();
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
          network: userinfo?.network?.network,
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

  const ListHeader = () => {
    return (
      <>
        <Text style={listHeaderText}>Purchase Recipient</Text>
        <FTIconwithtitleandinfo
          bG={COLORS.green2}
          title={userinfo?.fullName}
          info={userinfo.phoneNumber}
          mB={40}
          rightComponent={
            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: COLORS.red2,
                alignSelf: "flex-end",
                paddingVertical: 11,
                paddingHorizontal: 18,
                borderRadius: 10,
              }}
              onPress={() => navigation.goBack()}
            >
              <Text
                style={{
                  color: COLORS.red3,
                  ...fontsize.xxsmallest,
                  ...FONTS.semibold,
                }}
              >
                Change
              </Text>
            </TouchableOpacity>
          }
          onPress={() =>
            navigation.navigate("airtimeordata_screen", { userinfo })
          }
          Icon={Sendtoselficon}
          // imageUrl={userinfo?.imageUrl || ""}
        />
        <Text style={listHeaderText}>Preset Amount</Text>
      </>
    );
  };

  return (
    <FTTitlepagewrapper title="Airtime">
      <FTSearchinput
        value={amount}
        onChange={onamountchange}
        placeholder="Type in custom amount"
        icon={false}
      />

      <FlatList
        data={airtimeDatas}
        ItemSeparatorComponent={() => <View style={{ height: 30 }} />}
        ListHeaderComponent={ListHeader}
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
              imageUrl={userinfo?.network?.logo}
              size={35}
            />
          );
        }}
      />

      <View style={{ position: "absolute", bottom: 20, left: 20, right: 20 }}>
        <FTCustombutton
          btntext="Proceed"
          bg={COLORS.blue9}
          onpress={() =>
            navigation.navigate("transactionpin_screen", {
              action: actionairtime(amount),
            })
          }
        />
      </View>
    </FTTitlepagewrapper>
  );
};

export default AirtimeordataScreen;

const styles = StyleSheet.create({});
