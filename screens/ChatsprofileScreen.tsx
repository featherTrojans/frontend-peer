import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { ChatsprofileScreenStyles } from "../assets/styles/screens";
import {
  FTEmptycomponent,
  FTIconwithbg,
  FTTitlepagewrapper,
} from "../components";
import { COLORS, FONTS, fontsize, icons } from "../constants";

const { Bluecardicon, Blacksendicon, Clearchaticon, Sendcashicon } = icons;
const {
  quickActionBtn,
  quickActionBtnText,
  profileInfoWrap,
  alignWrap,
  profileDetailWrap,
  profileNameText,
  profileDateJoined,
} = ChatsprofileScreenStyles;

const QuickActionBtn = ({ icon, text, action, bG, color }) => {
  return (
    <TouchableOpacity
      style={[quickActionBtn, { backgroundColor: bG }]}
      onPress={action}
    >
      {icon}
      <Text style={[quickActionBtnText, { color: color }]}>{text}</Text>
    </TouchableOpacity>
  );
};

const ChatsprofileScreen = () => {
  const ListHeader = () => {
    return (
      <View style={profileInfoWrap}>
        <View style={{justifyContent: "center", alignItems: "center"}}>
          <FTIconwithbg Icon={Bluecardicon} bG={COLORS.Tblue3} size={65} />
          <View style={profileDetailWrap}>
            <Text style={profileNameText}>Robert Ziravandu</Text>
            <Text style={profileDateJoined}>Joined Aug. 15, 2025</Text>
          </View>
        </View>
        <View style={alignWrap}>
          <QuickActionBtn
            icon={<Sendcashicon />}
            text="Send Cash"
            action={() => console.log("Send Cash")}
            bG={COLORS.Tgreen4}
            color={COLORS.green1}
          />
          <View style={{ width: 15 }} />
          <QuickActionBtn
            icon={<Clearchaticon />}
            text="Clear Chat"
            action={() => console.log("Clear Chat")}
            bG={COLORS.Tred3}
            color={COLORS.red3}
          />
        </View>
      </View>
    );
  };

  return (
    <FTTitlepagewrapper title="Profile" headerBg={COLORS.white3}>
      <FlatList
        data={[]}
        renderItem={() => <View />}
        ListHeaderComponent={ListHeader}
        ListEmptyComponent={() => (
          <FTEmptycomponent msg="Sorry, You have not performed any transactions with this user" />
        )}
      />
    </FTTitlepagewrapper>
  );
};

export default ChatsprofileScreen;

const styles = StyleSheet.create({});
