import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  FTCustombutton,
  FTIconwithbg,
  FTTitlepagewrapper,
} from "../components";
import { COLORS, FONTS, fontsize, icons } from "../constants";
import { WithdrawcashScreenStyles } from "../assets/styles/screens";

const {
  container,
  withdrawalInfoWrap,
  withdrawalProfileWrap,
  withdrawalProfileName,
  amountOfTransaction,
  locationInfoWrap,
  locationAddress,
  locationDistance,
  viewOnMapWrap,
  viewOnMapText,
  withdrawalActionWrap,
  withdrawalActionTitle,
} = WithdrawcashScreenStyles;

const { Blacksendicon, Cancelwithdrawicon, Phoneicon, Chaticon } = icons;

const WithdrawcashScreen = () => {
  const withdrawcashActions = [
    {
      Icon: Phoneicon,
      bg: COLORS.Tgreen3,
      title: "Phone",
      action: "",
    },
    {
      Icon: Chaticon,
      bg: COLORS.Tyellow4,
      title: "Chat",
      action: "",
    },
    {
      Icon: Cancelwithdrawicon,
      bg: COLORS.Tred4,
      title: "Cancel",
      action: "",
    },
  ];

  return (
    <FTTitlepagewrapper title="Withdraw Cash">
      <View style={container}>
        <View style={withdrawalInfoWrap}>
          <View style={withdrawalProfileWrap}>
            <FTIconwithbg Icon={Blacksendicon} bG={COLORS.Tblue} size={86} />

            <Text style={withdrawalProfileName}>Mayowa Adekoya</Text>
            <Text style={amountOfTransaction}>33 Transactions</Text>
          </View>

          <View style={locationInfoWrap}>
            <Text style={locationDistance}>15 Mins Away</Text>
            <Text style={locationAddress}>
              Gberigbe Field, Gberigbe Ikorodu
            </Text>
            <View style={viewOnMapWrap}>
              <Text style={viewOnMapText}>View on maps</Text>
            </View>
          </View>

          <View style={withdrawalActionWrap}>
            {withdrawcashActions.map(({ Icon, bg, title }) => {
              return (
                <View style={{ alignItems: "center" }}>
                  <FTIconwithbg Icon={Icon} bG={bg} />
                  <Text style={withdrawalActionTitle}>{title}</Text>
                </View>
              );
            })}
          </View>
        </View>
      </View>

      <FTCustombutton
        onpress={() => console.log()}
        btntext="Pay Merchant"
        bg={COLORS.blue9}
      />
    </FTTitlepagewrapper>
  );
};

export default WithdrawcashScreen;

const styles = StyleSheet.create({});
