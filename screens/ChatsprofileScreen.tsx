import {
  Animated,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
  ScrollView,
} from "react-native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  ChatsprofileScreenStyles,
  HomeScreenStyles,
} from "../assets/styles/screens";
import {
  FTEmptycomponent,
  FTHorizontaline,
  FTIconwithbg,
  FTOtherImage,
  FTTitlepagewrapper,
  FTTransactionhistory,
} from "../components";
import { COLORS, FONTS, fontsize, icons } from "../constants";
import axiosCustom from "../httpRequests/axiosCustom";

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
  recentTransactText,
} = ChatsprofileScreenStyles;
const { transactionWrap, transactionHeader, transactionText, viewAll } =
  HomeScreenStyles;

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

const ChatsprofileScreen = ({ route, navigation }) => {
  const userInfo = route?.params?.userInfo;
  const switchModals = route?.params?.switchModals;
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const histories: any[] = useMemo(
    () => formatData(transactions),
    [transactions]
  );

  useEffect(() => {
    getUserTransaction();
  }, []);

  const getUserTransaction = async () => {
    setLoading(true);
    try {
      const response = await axiosCustom.get(
        `transactions/users/${userInfo.username}`
      );
      setTransactions(response?.data?.data?.transactions);
    } catch (error) {
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const getUserTransactionWhenRefresh = async () => {
    try {
      const response = await axiosCustom.get(
        `transactions/users/${userInfo.username}`
      );
      setTransactions(response?.data?.data?.transactions);
    } catch (error) {
    } finally {
      // setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    getUserTransactionWhenRefresh();
  };

  const ListHeader = () => {
    return (
      <View style={[profileInfoWrap, { marginBottom: 30 }]}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <FTOtherImage
            imageurl={userInfo?.imageUrl}
            memojiImage={userInfo?.memoji}
            size={65}
            fullname={userInfo?.fullName}
          />

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

  const renderEachTransaction = useCallback(({ item, index }) => {
    return (
      <View
        style={{
          backgroundColor: "white",
          paddingHorizontal: 20,
          paddingTop: 25,
        }}
      >
        <View style={{ marginBottom: 30 }}>
          <FTTransactionhistory
            date={item.time}
            datas={item.data}
            index={index}
          />
        </View>
      </View>
    );
  }, []);

  return (
    <FTTitlepagewrapper
      title="Profile"
      childBg={COLORS.white3}
      headerBg={COLORS.white3}
    >
      <Animated.FlatList
        data={histories}
        ListHeaderComponent={ListHeader}
        initialNumToRender={10}
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
        renderItem={renderEachTransaction}
        keyExtractor={(item: { time: string }) => item.time}
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator size="large" color={COLORS.blue6} />
          ) : (
            <FTEmptycomponent
              msg="Sorry, You have not performed any transactions with this user"
              showTransact={false}
            />
          )
        }
      />
    </FTTitlepagewrapper>
  );
};

export default ChatsprofileScreen;

const styles = StyleSheet.create({});
