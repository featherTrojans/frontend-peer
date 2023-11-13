import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { MywalletScreenStyles } from "../assets/styles/screens";
import { FTIconwithbg, FTTitlepagewrapper } from "../components";
import { COLORS, FONTS, fontsize, icons } from "../constants";
import { useAlert, useCopyclipboard } from "../hooks";
import { AuthContext } from "../context/AuthContext";
import amountFormatter from "../utils/formatMoney";
import axiosCustom from "../httpRequests/axiosCustom";
import { nameCapitalize } from "../utils/nameSplitter";
const { Levelcheckicon, Copydetailsicon, Dashedlineicon } = icons;

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

type IWalletRangeProps = {
  cashRequest: { spent: number; total: number };
  dailyTransfer: { spent: number; total: number };
  monthlyTransfer: { spent: number; total: number };
};

const MywalletScreen = () => {
  const { authdata } = useContext(AuthContext);
  const [walletlimit, setWalletlimit] = useState<IWalletRangeProps>({
    cashRequest: { spent: 0, total: 0 },
    dailyTransfer: { spent: 0, total: 0 },
    monthlyTransfer: { spent: 0, total: 0 },
  });
  const [loading, setLoading] = useState(false);
  const { copyToClipboard } = useCopyclipboard("Copied successfully!!");
  const { purpleAlert } = useAlert();
  const CopyAction = () => {
    authdata?.userDetails?.accountNo
      ? copyToClipboard(authdata?.userDetails?.accountNo)
      : purpleAlert("Kindly upgrade your account to get this account.");
  };

  const {
    cashRequest: { total: requestTotal, spent: requestSpent },
    dailyTransfer: { total: dailyTotal, spent: dailySpent },
    monthlyTransfer: { total: monthlyTotal, spent: monthlySpent },
  } = walletlimit;

  useEffect(() => {
    setLoading(true);
    axiosCustom
      .get("/limitrange")
      .then((res) => {
        console.log(res.data.data, "heree is the lii");
        setWalletlimit(res.data.data);
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const accountlevel = () => {
    switch (authdata?.userDetails?.userLevel) {
      case 1:
        return "Newbie";
      case 2:
        return "Odogwu";
      case 3:
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
  }: {
    mT?: number;
    limitTitle: string;
    amountSpent: string;
    totalAmount: string;
    amountLeft: string;
    progressLevel: number;
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
    <FTTitlepagewrapper
      headerBg={COLORS.white3}
      childBg={COLORS.white3}
      title="My Wallet"
    >
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
            <FTIconwithbg
              bG=""
              size={42}
              imageUrl="https://firebasestorage.googleapis.com/v0/b/feather-340809.appspot.com/o/application_assets%2Fvfd.png?alt=media&token=edb7d867-00fc-4de0-b117-c2b0395965cb"
            />
          </View>

          <View style={{ marginTop: 30 }}>
            <View style={BAlign}>
              <Text style={tableKey}>Bank Account Number</Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={CopyAction}
                style={[BAlign]}
              >
                <Text style={tableValue}>
                  {authdata?.userDetails?.accountNo
                    ? authdata?.userDetails?.accountNo
                    : "**********"}
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
                {authdata?.userDetails?.fullName && (
                  <Text style={[tableValue, { marginRight: 0 }]}>
                    {nameCapitalize(authdata?.userDetails?.fullName)}
                  </Text>
                )}
              </View>
            </View>
          </View>
        </View>

        <View style={[blockWrap, { marginTop: 15 }]}>
          <View style={BAlign}>
            <Text style={fundingLimitText}>Funding Limit</Text>
            <Text style={unlimitedText}>Unlimited</Text>
          </View>

          <View style={dashedLine}>
            <Dashedlineicon />
          </View>

          <SpendingLimit
            limitTitle="Cash Request"
            totalAmount={`N${amountFormatter(`${requestTotal}`)}`}
            amountLeft={`N${amountFormatter(`${requestTotal - requestSpent}`)}`}
            amountSpent={`N${amountFormatter(`${requestSpent}`)}`}
            progressLevel={(requestSpent / requestTotal) * 100}
          />

          <SpendingLimit
            mT={40}
            limitTitle="Daily Transfer Out"
            totalAmount={`N${amountFormatter(`${dailyTotal}`)}`}
            amountLeft={`N${amountFormatter(`${dailyTotal - dailySpent}`)}`}
            amountSpent={`N${amountFormatter(`${dailySpent}`)}`}
            progressLevel={(dailySpent / dailyTotal) * 100}
          />

          <SpendingLimit
            limitTitle="Monthly Transfer Out"
            totalAmount={`N${amountFormatter(`${monthlyTotal}`)}`}
            amountLeft={`N${amountFormatter(`${monthlyTotal - monthlySpent}`)}`}
            amountSpent={`N${amountFormatter(`${monthlySpent}`)}`}
            progressLevel={(monthlySpent / monthlyTotal) * 100}
          />
        </View>
      </ScrollView>
    </FTTitlepagewrapper>
  );
};

export default MywalletScreen;

const styles = StyleSheet.create({});
