import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Backheader, Horizontaline, Mainwrapper } from "../../../components";
import { COLORS, FONTS, fontsize } from "../../../constants";
import { profilestyles } from "./Profile.styles";

const Walletlimits = () => {
  const SubInfo = ({
    title,
    firstInfo,
    secondInfo,
  }: {
    title: String;
    firstInfo: String;
    secondInfo?: String;
  }) => {
    return (
      <View>
        <Text style={profilestyles.walletListOptionHeader}>{title}</Text>
        <Text style={profilestyles.walletListOptionSubHeader}>{firstInfo}</Text>
        {secondInfo && (
          <Text
            style={[profilestyles.walletListOptionSubHeader, { marginTop: 10 }]}
          >
            {secondInfo}
          </Text>
        )}
      </View>
    );
  };

  return (
    <Mainwrapper>
      <Backheader />
      <View style={{ paddingHorizontal: 20 }}>
        <View>
          <Text style={profilestyles.walletListHeader}>Odogwu</Text>
          <Text style={profilestyles.walletListSubHeader}>LEVEL 2</Text>
        </View>

        <View style={{ marginTop: 50 }}>
          <SubInfo
            title="Fund Wallet"
            firstInfo="N45,780 / N5,000,000 (Monthly)"
          />
          <Horizontaline marginV={20} />
          <SubInfo
            title="Bank Transfer"
            firstInfo="N0.00 / N500,000 (Daily)"
            secondInfo="N45,780 / N3,500,000 (Monthly)"
          />
          <Horizontaline marginV={20} />
          <SubInfo
            title="Wallet Transfer"
            firstInfo="N0.00 / N3,500,000 (Daily)"
            secondInfo="N45,780 / N10,000,000 (Monthly)"
          />
          <Horizontaline marginV={20} />
          <SubInfo
            title="Cash Request"
            firstInfo="N0.00 / N3,500,000 (Daily)"
            secondInfo="N45,780 / N10,000,000 (Monthly)"
          />
        </View>
      </View>
    </Mainwrapper>
  );
};

export default Walletlimits;

const styles = StyleSheet.create({});
