import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useContext } from "react";
import {
  FTCustombutton,
  FTIconwithbg,
  FTIconwithtitleandinfo,
  FTTitlepagewrapper,
} from "../components";

import { COLORS, FONTS, fontsize, icons } from "../constants";
import { navigation } from "../utils";
import { WalletfundingScreenStyles } from "../assets/styles/screens";
import { useCopyclipboard } from "../hooks";
import axiosCustom from "../httpRequests/axiosCustom";
import { AuthContext } from "../context/AuthContext";

const {
  blockWrap,
  blockHeader,
  bankNameText,
  accountNoText,
  tapToCopyText,
  extraInfotext,
  accountDetailWrap,
  accountNameText,
  accountNameValue,
  upgradeAccountBg,
  upgradeAccountText,
} = WalletfundingScreenStyles;

const { Debitcardicon } = icons;
const WalletfundingScreen = ({ route }) => {
  const { authdata } = useContext(AuthContext);

  const onsubmit = async (amount) => {
    const response = await axiosCustom.post("/pay", { amount: amount });
    navigation.navigate("customweb_screen", {
      url: response.data.data.authorization_url,
      reference: response.data.data.reference,
      amount: amount,
    });
  };

  const { copyToClipboard } = useCopyclipboard("Account copied successfully!");

  const CopyAction = () => {
    authdata?.userDetails?.accountNo
      ? copyToClipboard(authdata?.userDetails?.accountNo)
      : () => null;
  };

  return (
    <FTTitlepagewrapper childBg={COLORS.white3} title="Wallet Funding">
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={blockWrap}>
          <View>
            <Text style={blockHeader}>Recommended</Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <FTIconwithbg Icon={Debitcardicon} bG={COLORS.blue10} size={52} />
            <Text style={bankNameText}>VFD Microfinance Bank</Text>

            <TouchableOpacity activeOpacity={0.8} onPress={CopyAction}>
              <Text style={accountNoText}>
                {authdata?.userDetails?.accountNo
                  ? authdata?.userDetails?.accountNo
                  : "**********"}
              </Text>
              <Text style={tapToCopyText}>
                {authdata?.userDetails?.accountNo
                  ? "Tap to copy account number"
                  : "Upgrade your profile to get this number"}
              </Text>
            </TouchableOpacity>
            <Text style={extraInfotext}>
              Money sent to this account number, will be {`\n`} directly funded
              into your feather primary wallet
            </Text>

            {authdata?.userDetails?.accountNo ? (
              <View style={accountDetailWrap}>
                <Text style={accountNameText}>Account Name</Text>
                <Text style={accountNameValue}>
                  Feather - {authdata?.userDetails?.fullName}
                </Text>
              </View>
            ) : (
              <View style={upgradeAccountBg}>
                <Text
                  onPress={() =>
                    navigation.navigate("accountverification_screen")
                  }
                  style={upgradeAccountText}
                >
                  Upgrade account
                </Text>
              </View>
            )}
          </View>
        </View>

        <View style={blockWrap}>
          <Text style={[blockHeader, { marginBottom: 30 }]}>Other Option</Text>
          <FTIconwithtitleandinfo
            title="Debit card, Bank or USSD"
            info="Secured by Paystack."
            Icon={Debitcardicon}
            onPress={() =>
              navigation.navigate("amounttosend_screen", { onsubmit: onsubmit })
            }
            bG={COLORS.Tblue3}
          />
        </View>
      </ScrollView>
    </FTTitlepagewrapper>
  );
};

export default WalletfundingScreen;

const styles = StyleSheet.create({});
