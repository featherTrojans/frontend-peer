import { StyleSheet, Text, View, FlatList, Pressable } from "react-native";
import React, { useMemo } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import { Horizontaline, Iconandinfo, Mainwrapper } from "../../../components";
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







const Profile = ({navigation}) => {




  const SettingOptions = () => {



    const settingoptions = [
      {
        Icon: Profilemanageicon,
        title: "Profile Management",
        info: "Customise & update your profile",
        action: () => navigation.navigate("Personalinfo")
      },
      {
        Icon: Mywalleticon,
        title: "Wallet Limits",
        info: "See your wallet capabilities",
        action: () => navigation.navigate("Walletlimits")
    
      },
      {
        Icon: Securityprivicon,
        title: "Security & Privacy",
        info: "Set your security preferences",
        action: () => navigation.navigate("Securityandprivacy")
    
      },
      {
        Icon: Shareandearnicon,
        title: "Share & Earn",
        info: "Set your security preferences",
        action: () => navigation.navigate("Shareandearn")
    
      },
      {
        Icon: Supporticon,
        title: "Support & Help Desk",
        info: "Set your security preferences",
        action: () => console.log("Support and help desk")
    
      },
      {
        Icon: Abouticon,
        title: "About Feather App",
        info: "Set your security preferences",
        action: () => console.log("About feather app")
    
      },
    ];
  
  
    return (
      <View>
        <FlatList
          data={settingoptions}
          contentContainerStyle={{ paddingBottom: 60 }}
          renderItem={({ item: { title, info, Icon, action } }) => {
            return (
              <>
                <Iconandinfo action={action} title={title} info={info} Icon={Icon}/>
                <Horizontaline marginV={20} />
              </>
            );
          }}
        />
      </View>
    );
  };


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
          <Pressable
          onPress={() => navigation.navigate("Personalinfo")}
          >
          <Profilerighticon />
          </Pressable>
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
