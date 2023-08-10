import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { ProfileScreenStyles } from "../assets/styles/screens";
import { FTIconwithtitleandinfo, FTTabWrapper } from "../components";
import { COLORS, FONTS, fontsize, icons } from "../constants";
import { navigation } from "../utils";

const { Transfericon } = icons;

const {
  profileHeaderWrap,
  profileHeaderText,
  signoutText,
  profileDetailsWrap,
  profileOuterBorder,
  profileInnerBorder,
  userProfileBg,
  userEditiconBg,
  profileNameWrap,
  profileNameText,
  profileUsername,
  upgradeBg,
  upgradeOdogwuText,
} = ProfileScreenStyles;

const ProfileScreen = () => {
  const profileActions = [
    {
      Icon: "",
      title: "My Wallets",
      action: () => navigation.navigate("mywallet_screen"),
    },
    {
      Icon: "",
      title: "Account Verification",
      action: () => navigation.navigate("accountverification_screen"),
    },
    {
      Icon: "",
      title: "Support & Help Desk",
      action: () => navigation.navigate("accountverification_screen"),
    },
    {
      Icon: "",
      title: "Security & Privacy",
      action: () => navigation.navigate("securityandprivacy_screen"),
    },
    {
      Icon: "",
      title: "About Feather App",
      action: () => navigation.navigate("securityandprivacy_screen"),
    },
  ];

  return (
    <FTTabWrapper>
      <View style={profileHeaderWrap}>
        <Text style={profileHeaderText}>My Profile</Text>
        <View>
          <Text style={signoutText}>Sign Out</Text>
        </View>
      </View>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={profileDetailsWrap}>

          <View style={profileOuterBorder}>
            <View style={profileInnerBorder}>
              <View style={userProfileBg}>
                <View style={userEditiconBg}></View>
              </View>
            </View>
          </View>

          <View style={profileNameWrap}>
            <Text style={profileNameText}>Temitayo Danjuma</Text>
            <Text style={profileUsername}>@tayojumaa</Text>
          </View>
          <View style={upgradeBg}>
            <Text style={upgradeOdogwuText}>Upgrade to Odogwu</Text>
          </View>
        </View>

        {profileActions.map((profileAction, index) => {
          const { Icon, title, action } = profileAction;
          return (
            <FTIconwithtitleandinfo
              key={index}
              Icon={Transfericon}
              bG={COLORS.blue19}
              title={title}
              mB={20}
              onPress={action}
            />
          );
        })}
      </ScrollView>
    </FTTabWrapper>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
