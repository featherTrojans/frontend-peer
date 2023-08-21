import { ScrollView, StyleSheet, Text, View, Switch } from "react-native";
import React, { useState } from "react";
import { SecurityandprivacyScreenStyles } from "../assets/styles/screens";
import { FTIconwithtitleandinfo, FTSwitchbtn, FTTitlepagewrapper } from "../components";
import { COLORS, FONTS, fontsize, icons } from "../constants";
import { redirectTo } from "../utils";



const { sectionHeader } = SecurityandprivacyScreenStyles;
const {
  Bankblueicon,
  Fingerprinticon,
  Transactionpinlockicon,
  Multifactoricon,
} = icons;


const SecurityandprivacyScreen = () => {
  const multifactorAction = () => {
    console.log("Multifactor ");
  };
  const biometricsTransaction = () => {
    console.log("Transaction ");
  };
  const biometricsLogin = () => {
    console.log("Login ");
  };

  return (
    <FTTitlepagewrapper title="Security & Privacy">
      <ScrollView
        contentContainerStyle={{ paddingTop: 30 }}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <Text style={sectionHeader}>Transaction PIN</Text>
          <FTIconwithtitleandinfo
            Icon={Transactionpinlockicon}
            bG={COLORS.Tblue}
            title="Change Transaction PIN"
            info="Modify & manage your secure pin"
            onPress={() => redirectTo("setupmfa_screen")}
            mB={30}
          />
          <FTIconwithtitleandinfo
            Icon={Multifactoricon}
            bG={COLORS.Tblue}
            title="Enable Multi Factor Authentication"
            info="Add a layer of security to your PIN"
            onPress={() => null}
            rightComponent={<FTSwitchbtn action={multifactorAction} />}
          />
        </View>
        <View style={{ marginTop: 40 }}>
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
        </View>
      </ScrollView>
    </FTTitlepagewrapper>
  );
};

export default SecurityandprivacyScreen;

const styles = StyleSheet.create({});
