import { ScrollView, StyleSheet, Text, View, Switch } from "react-native";
import React from "react";
import { SecurityandprivacyScreenStyles } from "../assets/styles/screens";
import {
  FTIconwithtitleandinfo,
  FTSwitchbtn,
  FTTitlepagewrapper,
} from "../components";
import { COLORS, icons } from "../constants";
import axiosCustom from "../httpRequests/axiosCustom";

const { sectionHeader, blockWrap } = SecurityandprivacyScreenStyles;
const { Fingerprinticon, Transactionpinlockicon, Multifactoricon } = icons;

const SecurityandprivacyScreen = ({ navigation }) => {
  const multifactorAction = () => {
    console.log("Multifactor ");
  };
  const biometricsTransaction = () => {
    console.log("Transaction ");
  };
  const biometricsLogin = () => {
    console.log("Login ");
  };

  const action2 = async (pin) => {
    try {
      await axiosCustom.put("auth/pin/set", {
        pin: pin,
      });
      navigation.navigate("Dashboard");
    } catch (err) {
      throw err;
    }
  };
  const action = async (oldpin) => {
    try {
      await axiosCustom.post("/auth/pin/verify", { user_pin: oldpin });
      navigation.push("transactionpin_screen", {
        action: action2,
        toptext: "Enter New pin",
      });
    } catch (err) {
      throw err;
    }
  };

  return (
    <FTTitlepagewrapper headerBg={COLORS.white3} childBg={COLORS.white3} title="Security & Privacy">
      <ScrollView
        contentContainerStyle={{ paddingTop: 30 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={blockWrap}>
          <Text style={sectionHeader}>Transaction PIN</Text>
          <FTIconwithtitleandinfo
            Icon={Transactionpinlockicon}
            bG={COLORS.Tblue}
            title="Change Transaction PIN"
            info="Modify & manage your secure pin"
            onPress={() =>
              navigation.navigate("transactionpin_screen", {
                action: action,
                toptext: "Enter Old Pin",
              })
            }
            mB={30}
          />
          <FTIconwithtitleandinfo
            Icon={Multifactoricon}
            bG={COLORS.Tblue}
            title="Enable Multi Factor Authentication"
            info="Add a layer of security to your PIN"
            onPress={() => navigation.navigate("setupmfa_screen")}
            rightComponent={<FTSwitchbtn action={multifactorAction} />}
          />
        </View>
        {/* <View style={{ marginTop: 40 }}>
          <Text style={sectionHeader}>Biometrics</Text>
          <FTIconwithtitleandinfo
            Icon={Fingerprinticon}
            bG={COLORS.Tgreen}
            title="Use biometrics for Transactions"
            info="Enable biometrics for security actions"
            onPress={() => null}
            rightComponent={<FTSwitchbtn action={biometricsTransaction} />}
            mB={30}
          />
          <FTIconwithtitleandinfo
            Icon={Fingerprinticon}
            bG={COLORS.Tgreen}
            title="Use biometrics for Login"
            info="Enable biometrics for security actions"
            onPress={() => null}
            rightComponent={<FTSwitchbtn action={biometricsLogin} />}
          />
        </View> */}
      </ScrollView>
    </FTTitlepagewrapper>
  );
};

export default SecurityandprivacyScreen;

const styles = StyleSheet.create({});
