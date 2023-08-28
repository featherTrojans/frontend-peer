import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext } from "react";
import { MywalletScreenStyles } from "../assets/styles/screens";
import { FTTitlepagewrapper } from "../components";
import { COLORS, FONTS, fontsize, icons } from "../constants";
import { useCopyclipboard } from "../hooks";
import { AuthContext } from "../context/AuthContext";
const { Levelcheckicon, Copydetailsicon } = icons;

const {
  accountLeveltext,
  levelTypeWrap,
  levelTypeText,
  blockWrap,
  BAlign,
  receiveMoneyText,
  vfgLogo,
  tableKey,
  tableValue,
  fundingLimitText,
  unlimitedText,
  dashedLine,
  limitTitleText,
  limitValueText,
  limitProgressBg,
  limitProgress,
  accountLevelWrap,
} = MywalletScreenStyles;

const MywalletScreen = () => {
  const { authdata } = useContext(AuthContext);

  const { copyToClipboard } = useCopyclipboard("Copied successfully!!");

  const accountlevel = () => {
    switch (authdata?.userDetails?.userLevel) {
      case 1:
        return "Newbie";
      case 3:
        return "Odogwu";
      case 4:
        return "Veteran";
      default:
        return null;
    }
  };

  const SpendingLimit = ({
    mT = 0,
    limitTitle,
    amountSpent,
    totalAmount,
    amountLeft,
    progressLevel = 0,
  }) => {
    return (
      <View style={{ marginTop: mT, marginBottom: mT }}>
        <View style={BAlign}>
          <Text style={limitTitleText}>{limitTitle}</Text>
          <Text style={limitValueText}>
            {amountLeft} / {totalAmount}
          </Text>
        </View>
        <View style={[BAlign, { marginTop: 7 }]}>
          <View style={limitProgressBg}>
            <View style={[limitProgress, { width: `${progressLevel}%` }]} />
          </View>
          <Text style={limitValueText}>{amountLeft} Left</Text>
        </View>
      </View>
    );
  };

  return (
    <FTTitlepagewrapper title="My Wallet">
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={accountLevelWrap}>
          <Text style={accountLeveltext}>Account Level</Text>
          <View style={levelTypeWrap}>
            <Text style={levelTypeText}>{accountlevel()} Level</Text>
            <Levelcheckicon />
          </View>
        </View>

        <View style={blockWrap}>
          <View style={BAlign}>
            <Text style={receiveMoneyText}>Receive Money</Text>
            <View style={vfgLogo} />
          </View>

          <View style={{ marginTop: 30 }}>
            <View style={BAlign}>
              <Text style={tableKey}>Bank Account Number</Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() =>
                  copyToClipboard(authdata?.userDetails?.accountNo)
                }
                style={[BAlign]}
              >
                <Text style={tableValue}>
                  {authdata?.userDetails?.accountNo}
                </Text>
                <Copydetailsicon />
              </TouchableOpacity>
            </View>
            <View style={[BAlign, { marginVertical: 22 }]}>
              <Text style={tableKey}>Bank Name</Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => copyToClipboard("VFD Microfinance Bank")}
                style={[BAlign]}
              >
                <Text style={tableValue}>VFD Microfinance Bank</Text>
                <Copydetailsicon />
              </TouchableOpacity>
            </View>

            <View style={BAlign}>
              <Text style={tableKey}>Account Name</Text>
              <View style={BAlign}>
                <Text style={[tableValue, { marginRight: 0 }]}>
                  {authdata?.userDetails?.fullName}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={[blockWrap, { marginTop: 15 }]}>
          <View style={BAlign}>
            <Text style={fundingLimitText}>Funding Limit</Text>
            <Text style={unlimitedText}>Unlimited</Text>
          </View>

          <View style={dashedLine} />

          <SpendingLimit
            limitTitle="Cash Request"
            totalAmount="N30,000"
            amountLeft="N8,500"
            amountSpent="N22,560"
            progressLevel={73}
          />
          <SpendingLimit
            mT={40}
            limitTitle="Daily Transfer Out"
            totalAmount="N50,000"
            amountLeft="N45,000"
            amountSpent="N5,000"
            progressLevel={36}
          />
          <SpendingLimit
            limitTitle="Monthly Transfer Out"
            totalAmount="N100,000"
            amountLeft="N50,000"
            amountSpent="N50,000"
            progressLevel={50}
          />
        </View>
      </ScrollView>
    </FTTitlepagewrapper>
  );
};

export default MywalletScreen;

const styles = StyleSheet.create({});
