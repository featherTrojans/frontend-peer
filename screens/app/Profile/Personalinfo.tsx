import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Backheader, Mainwrapper } from "../../../components";
import { COLORS, FONTS, fontsize } from "../../../constants";
import { profilestyles } from "./Profile.styles";

const Personalinfo = () => {
  return (
    <Mainwrapper>
      <Backheader />

      <View style={profilestyles.personalUserImageWrap}>
        <View style={profilestyles.personalUserImageBorder}>
          <View style={profilestyles.personalImageBg}>{/* icons */}</View>
        </View>
        <Text style={[profilestyles.personalNames, { marginBottom: 8 }]}>
          Ishaya Bello
        </Text>
        <Text style={profilestyles.personalNames}>@ishayabello100bells</Text>
      </View>

      <View
        style={[
          profilestyles.personalEachOverlapBlock,
          { height: 200, backgroundColor: COLORS.white, zIndex: 2 },
        ]}
      >
        <Text style={profilestyles.personalEachBlockHeader}>
          Account KYC Level
        </Text>
        <Text style={profilestyles.personalEachBlockSubHeader}>
          Your KYC Level
        </Text>
      </View>

      <View
        style={[
          profilestyles.personalEachOverlapBlock,
          { height: "45%", backgroundColor: COLORS.blue16, zIndex: 1 },
        ]}
      >
        <View>
          <Text style={profilestyles.personalEachBlockHeader}>
            My Personal Info
          </Text>
          <Text style={profilestyles.personalEachBlockSubHeader}>
            Manage all your saved data here
          </Text>
        </View>
      </View>
    </Mainwrapper>
  );
};

export default Personalinfo;

const styles = StyleSheet.create({});
