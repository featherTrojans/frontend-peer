import {
  Animated,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Pressable,
  FlatList,
} from "react-native";
import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useContext,
} from "react";
import { AccountverificationScreenStyles } from "../assets/styles/screens";
import { FTCustombutton, FTTitlepagewrapper } from "../components";
import { COLORS, FONTS, SIZES, fontsize, icons } from "../constants";
import { AuthContext } from "../context/AuthContext";

import { useAlert } from "../hooks";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { useNavigation } from "@react-navigation/native";
const { Levelcheckicon, Leveloptioncancelicon, Leveloptioncheckicon } = icons;

const { width } = Dimensions.get("window");

const {
  BAlign,
  levelInfoWrap,
  levelText,
  requirementText,
  requirementMainText,
  blockWrap,
  infoKeyText,
  infoValueText,
  dashedLine,
  statusText,
  statusTextBg,
} = AccountverificationScreenStyles;

const AccountverificationScreen = (props) => {
  const navigation = useNavigation();
  const { authdata } = useContext(AuthContext);
  const { errorAlert } = useAlert();
  const userlevel = authdata?.userDetails?.userLevel;
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    console.log(selectedIndex, "here is the index");
  }, [selectedIndex]);

  const accountLevelDatas = [
    {
      levelTitle: "Newbie",
      level: 1,
      requirement: "Basic Personal Information",
      status: userlevel >= 1,
      fundinglimit: "Unlimited",
      cashrequest: "N30,000.00",
      transferout: "N50,000.00",
      accountnumber: false,
      usdcard: false,
      upgradeLocation: "editprofile_screen",
    },
    {
      levelTitle: "Odogwu",
      level: 2,
      requirement: "Bank Verification Number (BVN)",
      status: userlevel >= 2,
      fundinglimit: "Unlimited",
      cashrequest: "N200,000.00",
      transferout: "N500,000.00",
      accountnumber: true,
      usdcard: false,
      upgradeLocation: "bvn_screen",
    },
    {
      levelTitle: "Veteran",
      level: 3,
      requirement: "Identity Document Uploads",
      status: userlevel >= 3,
      fundinglimit: "Unlimited",
      cashrequest: "N500,000.00",
      transferout: "N1,000,000.00",
      accountnumber: true,
      usdcard: true,
      upgradeLocation: "uploaddoc_screen",
    },
  ];

  const ShowCurrentLevel = () => {
    const {
      status,
      level,
      levelTitle,
      fundinglimit,
      cashrequest,
      transferout,
      accountnumber,
      usdcard,
      requirement,
      upgradeLocation,
    } = accountLevelDatas[selectedIndex];
    return (
      <View style={{ width: width - 30, backgroundColor: COLORS.white }}>
        <View style={levelInfoWrap}>
          <View style={BAlign}>
            <Text style={levelText}>{levelTitle} Level</Text>
            <Levelcheckicon />
          </View>
          <Text style={requirementText}>Requirement</Text>
          <Text style={requirementMainText}>{requirement}</Text>
        </View>

        <View style={blockWrap}>
          <View style={BAlign}>
            <Text style={infoKeyText}>Status</Text>
            <View
              style={[
                statusTextBg,
                { backgroundColor: status ? "#E9F7EA" : "#FDF3F7" },
              ]}
            >
              <Text
                style={[
                  statusText,
                  { color: status ? COLORS.green4 : "#D81859" },
                ]}
              >
                {status ? "Completed" : "Not Started"}
              </Text>
            </View>
          </View>

          <View style={dashedLine} />

          <View style={BAlign}>
            <Text style={infoKeyText}>Funding Limit</Text>
            <Text style={infoValueText}>{fundinglimit}</Text>
          </View>
          <View style={[BAlign, { marginVertical: 18 }]}>
            <Text style={infoKeyText}>Cash Request</Text>
            <Text style={infoValueText}>{cashrequest}</Text>
          </View>
          <View style={BAlign}>
            <Text style={infoKeyText}>Transfer Out</Text>
            <Text style={infoValueText}>{transferout}</Text>
          </View>
          <View style={[BAlign, { marginVertical: 18 }]}>
            <Text style={infoKeyText}>Free Bank Account Number</Text>
            {accountnumber ? (
              <Leveloptioncheckicon />
            ) : (
              <Leveloptioncancelicon />
            )}
          </View>
          <View style={BAlign}>
            <Text style={infoKeyText}>Virtual USD Card</Text>
            {usdcard ? <Leveloptioncheckicon /> : <Leveloptioncancelicon />}
          </View>
        </View>
        {!status && (
          <FTCustombutton
            btntext={`Updrage to ${levelTitle}`}
            onpress={() => {
              if (userlevel < level - 1) {
                errorAlert(null, "Please upgrade to Odogwu");
                return;
              }
              navigation.navigate(upgradeLocation);
            }}
          />
        )}
      </View>
    );
  };

  return (
    <FTTitlepagewrapper title="Account Verification">
      <SegmentedControl
        values={["Newbie", "Odogwu", "Veteran"]}
        selectedIndex={selectedIndex}
        tintColor={COLORS.blue9}
        style={{
          width: "80%",
          alignSelf: "center",
        }}
        fontStyle={{
          color: "#11141A",
        }}
        activeFontStyle={{
          color: "white",
        }}
        backgroundColor="#F0F0F0"
        onChange={(event) => {
          setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
        }}
      />

      <ShowCurrentLevel />
    </FTTitlepagewrapper>
  );
};

export default AccountverificationScreen;

const styles = StyleSheet.create({});
