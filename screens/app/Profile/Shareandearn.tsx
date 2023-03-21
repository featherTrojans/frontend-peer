import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Backheader, Custombutton, Mainwrapper } from "../../../components";
import { COLORS, FONTS, fontsize } from "../../../constants";
import { profilestyles } from "./Profile.styles";

const Shareandearn = () => {
  return (
    <Mainwrapper>
      <Backheader />

      <View style={{ paddingHorizontal: 20 }}>
        <View style={profilestyles.shareAndEarnSvgWrap}>
          <View
            style={{
              width: 280,
              height: 148,
              backgroundColor: COLORS.grey1,
              marginBottom: 60,
            }}
          ></View>
        </View>

        <View>
          <Text style={profilestyles.shareAndEarnMainText}>
            Earn extra cash with every successful referral
          </Text>
          <Text style={profilestyles.shareAndEarnSubText}>
            Share your referral code with your friends and family and earn N200
            after they fund their wallet with minimum N1,000
          </Text>
        </View>

        <View style={profilestyles.shareAndEarchReferWrap}>
          <Text style={profilestyles.shareAndEarnReferCode}>SETH-FTH002</Text>
          <Text style={profilestyles.shareAndEarnTaptocopy}>
            Tap to copy code
          </Text>
        </View>

        <Custombutton
          onpress={() => console.log("SHare feather App")}
          btntext="Share Feather app"
        />
      </View>
    </Mainwrapper>
  );
};

export default Shareandearn;

const styles = StyleSheet.create({});
