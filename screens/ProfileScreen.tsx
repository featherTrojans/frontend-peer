import { ScrollView, StyleSheet, Text, View, Pressable } from "react-native";
import React, { useContext } from "react";
import { ProfileScreenStyles } from "../assets/styles/screens";
import {
  FTIconwithtitleandinfo,
  FTTabWrapper,
  FTUserImage,
} from "../components";
import { COLORS, icons } from "../constants";
import { clearDataFromStorage, redirectTo } from "../utils";
import { AuthContext } from "../context/AuthContext";

const {
  Editprofileicon,
  Mywalleticon,
  Abouticon,
  Securityprivicon,
  Supporticon,
} = icons;

const {
  profileHeaderWrap,
  profileHeaderText,
  signoutText,
  profileDetailsWrap,
  profileOuterBorder,
  profileInnerBorder,
  userEditiconBg,
  profileNameWrap,
  profileNameText,
  profileUsername,
  upgradeBg,
  upgradeOdogwuText,
} = ProfileScreenStyles;

const ProfileScreen = ({ navigation }) => {
  const { authdata, setAuthData, setToken } = useContext(AuthContext);

  const profileActions = [
    {
      Icon: Mywalleticon,
      title: "My Wallets",
      action: () => navigation.navigate("mywallet_screen"),
    },
    {
      Icon: Securityprivicon,
      title: "Account Verification",
      action: () => navigation.navigate("accountverification_screen"),
    },
    {
      Icon: Supporticon,
      title: "Support & Help Desk",
      action: () => console.log("yes support"),
    },
    {
      Icon: Securityprivicon,
      title: "Security & Privacy",
      action: () => navigation.navigate("securityandprivacy_screen"),
    },
    {
      Icon: Abouticon,
      title: "About Feather App",
      action: () => console.log("yes about"),
    },
  ];

  const upgradeDecision = () => {
    switch (authdata?.userDetails?.userLevel) {
      case 1:
        return "Upgrade to Odogwu";
      case 2:
        return "Upgrade to Veteran";
      default:
        return null;
    }
  };

  const upgrade = upgradeDecision();

  const handlesignout = async () => {
    await clearDataFromStorage("@token");
    setToken(null);
    setAuthData({});
  };

  return (
    <FTTabWrapper>
      <View style={profileHeaderWrap}>
        <Text style={profileHeaderText}>My Profile</Text>
        <View>
          <Text onPress={handlesignout} style={signoutText}>
            Sign Out
          </Text>
        </View>
      </View>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={profileDetailsWrap}>
          <View style={profileOuterBorder}>
            <View style={profileInnerBorder}>
              <View style={{}}>
                <FTUserImage size={100} />
              </View>
              <Pressable
                onPress={() => redirectTo("editprofile_screen")}
                style={userEditiconBg}
              >
                <Editprofileicon />
              </Pressable>
            </View>
          </View>

          <View style={profileNameWrap}>
            <Text style={profileNameText}>
              {authdata?.userDetails?.fullName}
            </Text>
            {authdata?.userDetails?.username && (
              <Text style={profileUsername}>
                @{authdata?.userDetails?.username}
              </Text>
            )}
          </View>
          {upgrade && (
            <View style={upgradeBg}>
              <Text
                onPress={() =>
                  navigation.navigate("accountverification_screen")
                }
                style={upgradeOdogwuText}
              >
                {upgrade}
              </Text>
            </View>
          )}
        </View>

        {profileActions.map((profileAction, index) => {
          const { Icon, title, action } = profileAction;
          return (
            <FTIconwithtitleandinfo
              key={index}
              Icon={Icon}
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
