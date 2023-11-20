import { ScrollView, StyleSheet, Text, View, Pressable } from "react-native";
import React, { useContext } from "react";
import { Image as RNImage } from "expo-image";
import { ProfileScreenStyles } from "../assets/styles/screens";
import {
  FTIconwithtitleandinfo,
  FTTabWrapper,
  FTUpgradetag,
  FTUserImage,
} from "../components";
import { COLORS, icons } from "../constants";
import { clearDataFromStorage, redirectTo } from "../utils";
import { AuthContext } from "../context/AuthContext";
import { nameCapitalize } from "../utils/nameSplitter";
import { useLinking } from "../hooks";
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
} = ProfileScreenStyles;

const ProfileScreen = ({ navigation }) => {
  const { authdata, setAuthData, setToken } = useContext(AuthContext);
  const {redirecToAbout} = useLinking()

  const memojiImage = authdata?.userDetails?.memoji;
  let memojiobj = {color: ""};
  if (memojiImage) {
    if (typeof memojiImage == "string") {
      memojiobj = JSON.parse(memojiImage);
    } else {
      memojiobj = memojiImage;
    }
  }
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
      action: () => redirecToAbout(),
    },
  ];

  const handlesignout = async () => {
    // RNImage.clearDiskCache()
    // RNImage.clearMemoryCache()
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
          <View
            style={[
              profileOuterBorder,
              {
                borderColor: memojiobj?.color
                  ? memojiobj?.color + "55"
                  : "#F4F4FF",
              },
            ]}
          >
            <View
              style={[
                profileInnerBorder,
                {
                  borderColor: memojiobj?.color
                    ? memojiobj?.color + "AA"
                    : "#DFDDFF",
                },
              ]}
            >
              <View style={{}}>
                <FTUserImage size={100} />
              </View>
              <Pressable
                onPress={() => navigation.navigate("editprofile_screen")}
                style={userEditiconBg}
              >
                <Editprofileicon />
              </Pressable>
            </View>
          </View>

          <View style={profileNameWrap}>
            {authdata?.userDetails?.fullName && (
              <Text style={profileNameText}>
                {nameCapitalize(authdata?.userDetails?.fullName)}
              </Text>
            )}
            {authdata?.userDetails?.username && (
              <Text style={profileUsername}>
                @{authdata?.userDetails?.username}
              </Text>
            )}
          </View>
          <FTUpgradetag />
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
