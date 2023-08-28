import {
  Animated,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ChatsprofileScreenStyles } from "../assets/styles/screens";
import {
  FTEmptycomponent,
  FTIconwithbg,
  FTTitlepagewrapper,
  FTTransactionhistory,
} from "../components";
import { COLORS, FONTS, fontsize, icons } from "../constants";
import axiosCustom from "../httpRequests/axiosCustom";
import { navigation } from "../utils";
import { ActivityIndicator } from "react-native";
import formatData from "../utils/fomatTrans";

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
    activeOpacity={0.7}
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
  const [refreshing, setRefreshing] = useState<boolean>(false);

  useEffect(() => {
    getUserTransaction();
  }, []);

  const getUserTransaction = async () => {
    setLoading(true);
    try {
      const response = await axiosCustom.get(
        `transactions/users/${userInfo.phoneNumber}`
      );
      setTransactions(response?.data?.data?.transactions);
    } catch (error) {
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    getUserTransaction();
  };

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
    <FTTitlepagewrapper
      title="Profile"
      childBg={COLORS.white3}
      headerBg={COLORS.white3}
    >
      <View style={{ flex: 1 }}>
        {loading ? (
          <View style={{}}>
            <ActivityIndicator size="large" color={COLORS.blue6} />
          </View>
        ) : (
          <>
            <Animated.FlatList
              data={formatData(transactions)}
              ListHeaderComponent={ListHeader}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={handleRefresh}
                  progressBackgroundColor="white"
                  colors={[COLORS.blue6]}
                  tintColor={COLORS.blue6}
                  title="Refreshing"
                  titleColor={COLORS.blue6}
                />
              }
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }: any) => (
                <FTTransactionhistory
                  date={item.time}
                  datas={item.data}
                  index={index}
                />
              )}
              keyExtractor={(item: { time: string }) => item.time}
              ListEmptyComponent={
                <FTEmptycomponent
                  msg="Sorry, You have not performed any transactions with this user"
                  showTransact={false}
                />
              }
            />
          </>
        )}
      </View>
    </FTTitlepagewrapper>
  );
};

export default ChatsprofileScreen;

const styles = StyleSheet.create({});
