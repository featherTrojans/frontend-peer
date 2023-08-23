import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ChatsprofileScreenStyles } from "../assets/styles/screens";
import {
  FTEmptycomponent,
  FTIconwithbg,
  FTTitlepagewrapper,
} from "../components";
import { COLORS, FONTS, fontsize, icons } from "../constants";
import axiosCustom from "../httpRequests/axiosCustom";
import { navigation } from "../utils";

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

const ChatsprofileScreen = ({ route }) => {
  const userInfo = route?.params?.userInfo;
  const switchModals = route?.params?.switchModals;
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axiosCustom
      .get("transactions/users")
      .then((response) => {
        setTransactions(response?.data?.data?.transactions);
      })
      .catch((err) => {})
      .finally(() => {
        setLoading(false);
      });
  }, []);
  const ListHeader = () => {
    return (
      <View style={profileInfoWrap}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <FTIconwithbg Icon={Bluecardicon} bG={COLORS.Tblue3} size={65} />
          <View style={profileDetailWrap}>
            <Text style={profileNameText}>{userInfo?.fullName}</Text>
            {/* <Text style={profileDateJoined}>Joined Aug. 15, 2025</Text> */}
          </View>
        </View>
        <View style={alignWrap}>
          <QuickActionBtn
            icon={<Sendcashicon />}
            text="Send Cash"
            action={() => {
              navigation.goBack();
              switchModals(1);
            }}
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
