import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS, FONTS, fontsize } from "../../constants";
import Tableoption from "../Tableoption/Tableoption";
import Custombutton from "../Custombutton/Custombutton";
import { navigationRef } from "../../utils/customNavigation";
import { useNavigation } from "@react-navigation/native";
import useAlert from "../../utils/useAlerts";



const Upgrademodal = ({closeUpgradeModal}) => {
  const navigate = useNavigation()
  const {purpleAlert} = useAlert()
  return (
    <View>
      <Text
        style={{ ...fontsize.bbsmall, ...FONTS.medium, color: COLORS.blue9 }}
      >
        Soon to be <Text style={{ color: COLORS.blue6 }}>Odogwu!</Text> Let’s Go
      </Text>
      <Text
        style={{
          lineHeight: 20,
          ...fontsize.smaller,
          ...FONTS.regular,
          color: COLORS.grey2,
          marginTop: 22,
        }}
      >
        This upgrade will provide you with a new bank account number and more
        flexible transaction limits
      </Text>

      <View style={{backgroundColor: COLORS.white, borderRadius: 20, paddingHorizontal: 20, paddingVertical: 28, marginTop: 30, marginBottom: 42}}>

        <Tableoption title="Receive" value="Unlimited"/>
        <Tableoption title="Max Cash Request" value="N100,000 per day"/>
        <Tableoption title="Max Cash Deposit" value="N200,000 per day"/>
        <Tableoption title="Max bank Transfers" value="N500,000 per day"/>
        <Tableoption title="Wallet Funding" value="N200,000 per time" mb={false}/>
      </View>

        <Text style={{...fontsize.smaller, textAlign: "center", ...FONTS.regular, color: COLORS.grey2, marginBottom: 32}}>For more info visit : <Text style={{...FONTS.medium, color: COLORS.blue9}}> feather.africa/accounts/upgrade</Text></Text>
        <Custombutton btntext="Great, Upgrade" onpress={() => {closeUpgradeModal(); navigate.navigate("Addbvn")}}/>

    </View>
  );
};

export default Upgrademodal;

const styles = StyleSheet.create({});
