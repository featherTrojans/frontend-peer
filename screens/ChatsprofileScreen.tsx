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
  FTCustombutton,
  FTEmptycomponent,
  FTHorizontaline,
  FTIconwithbg,
  FTOtherImage,
  FTQuickActionBtn,
  FTTitlepagewrapper,
  FTTransactionhistory,
} from "../components";
import { COLORS, FONTS, fontsize, icons } from "../constants";
import axiosCustom from "../httpRequests/axiosCustom";

import { ActivityIndicator } from "react-native";
import formatData from "../utils/fomatTrans";
import { useCustomModal } from "../hooks";

const {
  Bluecardicon,
  Blacksendicon,
  Clearchaticon,
  Sendcashicon,
  Blockusericon,
  Bigblockedusericon,
} = icons;
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

const ChatsprofileScreen = ({ route, navigation }) => {
  const userInfo = route?.params?.userInfo;
  const switchModals = route?.params?.switchModals;
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const isBlocked = false;

  const { CustomModal, openModal, closeModal } = useCustomModal();

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
          <FTQuickActionBtn
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

          <FTQuickActionBtn
            icon={
              <Blockusericon color={isBlocked ? COLORS.black : COLORS.red6} />
            }
            text={isBlocked ? "Unblock User" : "Block User"}
            action={() => openModal()}
            bG={isBlocked ? `rgba(206, 206, 206, .3)` : COLORS.Tred}
            color={isBlocked ? COLORS.black : COLORS.red6}
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
      <CustomModal>
        <View style={{ height: 322, alignItems: "center" }}>
          <View
            style={{
              width: 70,
              height: 70,
              borderRadius: 70 / 2,
              backgroundColor: "rgba(255, 227, 227, 0.4)",
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center",
            }}
          >
            {/* Iocn here  */}
            <Bigblockedusericon color={"#F50000"} />
          </View>
          <Text
            style={{
              ...fontsize.small,
              ...FONTS.medium,
              color: COLORS.black,
              width: "85%",
              textAlign: "center",
              paddingVertical: 35,
            }}
          >
            Blocking this user will mean this user cannot send you chats until
            you unblock
          </Text>

          <View style={{alignSelf: "stretch", gap: 12}}>
            <FTCustombutton 
              btntext="Block user"
              onpress={() => console.log("Blocker user function")}
              bg="#E13121"
            />
             <FTCustombutton 
              outline
              btntext="Cancel"
              onpress={closeModal}
              bg="#000"
            />
          </View>
        </View>
      </CustomModal>
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
