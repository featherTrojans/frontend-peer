import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useMemo } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import { Horizontaline, Mainwrapper } from "../../../components";
import Customstatusbar from "../../shared/Customstatusbar";
import { profilestyles } from "./Profile.styles";
import { icons } from "../../../constants";

const {
  Profilerighticon,
  Profilemanageicon,
  Securityprivicon,
  Shareandearnicon,
  Supporticon,
  Mywalleticon,
  Abouticon,
  Accountcopyicon,
  Greaterthanicon,
} = icons;

const settingoptions = [
  {
    Icon: Profilemanageicon,
    title: "Profile Management",
    info: "Customise & update your profile",
  },
  {
    Icon: Mywalleticon,
    title: "My Wallets",
    info: "See your wallet capabilities",
  },
  {
    Icon: Securityprivicon,
    title: "Security & Privacy",
    info: "Set your security preferences",
  },
  {
    Icon: Shareandearnicon,
    title: "Share & Earn",
    info: "Set your security preferences",
  },
  {
    Icon: Supporticon,
    title: "Support & Help Desk",
    info: "Set your security preferences",
  },
  {
    Icon: Abouticon,
    title: "About Feather App",
    info: "Set your security preferences",
  },
];

const SettingOptions = () => {
  return (
    <View>
      <FlatList
        data={settingoptions}
        contentContainerStyle={{ paddingBottom: 60 }}
        renderItem={({ item: { title, info, Icon } }) => {
          return (
            <>
              <View style={profilestyles.settingOptionsWrap}>
                <View style={profilestyles.settingAction}>
                  <View style={profilestyles.settingActionIconBg}>
                    <Icon />
                  </View>
                  <View style={{ marginLeft: 14 }}>
                    <Text style={profilestyles.settingActionTitle}>
                      {title}
                    </Text>
                    <Text style={profilestyles.settingActionInfo}>{info}</Text>
                  </View>
                </View>
                <Greaterthanicon />
              </View>
              <Horizontaline marginV={20} />
            </>
          );
        }}
      />
    </View>
  );
};

const Profile = () => {
  const snapPoints = useMemo(() => ["40%", "70%"], []);

  return (
    <View style={profilestyles.container}>
      <Customstatusbar />
      <View style={profilestyles.subcontainer}>
        <View style={profilestyles.profilehomeheader}>
          <Text style={profilestyles.profileheaderText}>My Profile</Text>
        </View>

        <View style={profilestyles.userProfileWrap}>
          <View style={profilestyles.userProfile}>
            <View style={profilestyles.userImageBg}>{/* user icons */}</View>

            <View style={{ marginLeft: 20 }}>
              <Text style={profilestyles.userFullname}>Ishaya Bello</Text>
              <Text style={profilestyles.userUsername}>
                @ishayabello100bells
              </Text>
            </View>
          </View>

          {/* icons */}
          <Profilerighticon />
        </View>

        <View style={profilestyles.accountDataWrap}>
          <View style={profilestyles.accountData}>
            <View>
              <Text style={profilestyles.accountKey}>Account Number</Text>
              <Text style={profilestyles.accountValue}>3647110938</Text>
            </View>
            <Accountcopyicon />
          </View>

          <Horizontaline marginV={12.5} />

          <View style={profilestyles.accountData}>
            <View>
              <Text style={profilestyles.accountKey}>Bank Name</Text>
              <Text style={profilestyles.accountBankname}>
                VFD Microfinance Bank
              </Text>
            </View>
            <Accountcopyicon />
          </View>
        </View>

        <BottomSheet
          index={0}
          snapPoints={snapPoints}
          style={{
            paddingHorizontal: 24,
          }}
        >
          <View>
            <Text style={profilestyles.settingsHeader}>Settings</Text>

            <SettingOptions />
          </View>
        </BottomSheet>
      </View>
    </View>
  );
};

export default Profile;
