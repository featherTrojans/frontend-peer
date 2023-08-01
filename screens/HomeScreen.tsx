import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useRef,
} from "react";
import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

import {
  FTEmptycomponent,
  FTHorizontaline,
  FTTransactionhistory,
  FTViewbalance,
} from "../components";
import { COLORS,icons } from "../constants";

import { AuthContext } from "../context/AuthContext";
import axiosCustom from "../httpRequests/axiosCustom";

import Customstatusbar from "./shared/Customstatusbar";

import formatData from "../utils/fomatTrans";

import { nameToShow } from "../utils/nameSplitter";
import { HomeScreenStyles } from "../assets/styles/screens";
import { useAlert } from "../hooks";



const {
  container,
  headerContainer,
  profileContainer,
  profileName,
  profileNameContainer,
  profileUsername,
  notificationBell,
  walletBlock,
  optionContainer,
  optionIconBg,
  optionTitle,
  headerWrapper,
  addcashheadertext,
  primarywallettext,
  availablebalancetext,
  scrollaction,
  scrollactionText,
  informationblockwrap,
  informationiconswrap,
  informationblocktext,
  transactionWrap,
  transactionHeader,
  transactionIconWrap,
  transactionText,
  viewAll,
  conversationWrap,
  conversationHeader,
  recentIconWrap,
  recentconvText,
  numberOfUnread,
  setupProfile,
  setupText,
  setupInfoText,
  setupInfoSubText,
  setupIconWrap,
  setupHeadSection,
  activeWithdrawalAmount,
  activeWithdrawalName,
  activeWithdrawalProfile,
} = HomeScreenStyles;

const {
  Bell,
  Featherdefault,
  Historyicon,
  Recentconvicon,
  Setupprofileicon,
  Balanceicon,
} = icons;

const scrollactions = [
  {
    bg: "#EDF3EB",
    text: "Withdraw cash from business and agents near you.",
    icon: "",
  },
  {
    bg: "#F3EEFB",
    text: "Transfer money to feather users and bank accounts.",
    icon: "",
  },
  {
    bg: "#D2EAFD",
    text: "Pay Bills with speed and ease, at good rates.",
    icon: "",
  },
];

const QuickActions = () => {
  function Scrollaction({
    bg,
    text,
    icon,
    index,
  }: {
    bg: string;
    text: string;
    icon: string;
    index: number;
  }) {
    let isLast = index + 1 === scrollactions.length;
    return (
      <View
        style={[
          scrollaction,
          { backgroundColor: bg, marginRight: !isLast ? 16 : 0 },
        ]}
      >
        <Text style={scrollactionText}>{text}</Text>
      </View>
    );
  }

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 16 }}
    >
      {scrollactions.map((scrollaction, index) => {
        let { bg, text, icon } = scrollaction;
        return (
          <Scrollaction
            bg={bg}
            text={text}
            icon={icon}
            key={index}
            index={index}
          />
        );
      })}
    </ScrollView>
  );
};

const Conversations = () => {
  return (
    <View style={[conversationWrap, { marginVertical: 0 }]}>
      <View style={conversationHeader}>
        <View style={recentIconWrap}>
          {/* icon */}
          <Recentconvicon />
          <Text style={recentconvText}>Conversations</Text>
        </View>
        <Text style={numberOfUnread}>You have 3 unreads</Text>
      </View>

      <FTHorizontaline marginV={15} />

      <View style={{ flexDirection: "row" }}>
        <View
          style={{
            width: 45,
            height: 45,
            backgroundColor: COLORS.grey1,
            borderRadius: 45 / 2,
            marginRight: 10,
          }}
        />
      </View>
    </View>
  );
};

const SetupProfile = () => {
  return (
    <View style={setupProfile}>
      <View style={setupHeadSection}>
        <View style={setupIconWrap}>
          {/* icon */}
          <Setupprofileicon />
          <Text style={setupText}>Setup Your Profile</Text>
        </View>
      </View>

      <FTHorizontaline marginV={15} />

      <Text style={setupInfoText}>
        Complete your profile today to enjoy all the benefits of feather without
        limits.<Text style={setupInfoSubText}> Go to profile page.</Text>
      </Text>
    </View>
  );
};

const ActiveCashWithdrawal = () => {
  return (
    <View style={setupProfile}>
      <View style={conversationHeader}>
        <View style={recentIconWrap}>
          {/* icon */}
          <Recentconvicon />
          <Text style={recentconvText}>Cash Withdrawal</Text>
        </View>
        <Text style={numberOfUnread}>15 Mins Away</Text>
      </View>

      <View style={{ marginTop: 20 }}>
        <View style={activeWithdrawalProfile}>
          <View
            style={{
              width: 45,
              height: 45,
              backgroundColor: COLORS.lightgray,
              borderRadius: 45 / 2,
            }}
          />
          <View style={{ marginLeft: 18 }}>
            <Text style={activeWithdrawalName}>Suzzane Vibes Shoes</Text>
            <Text style={activeWithdrawalAmount}>N45,500</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const HomeScreen = ({ navigation, route }: { navigation: any; route: any }) => {
  const { setAuthData, authdata } = useContext(AuthContext);
  const histories: any[] = formatData(authdata?.transactions);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [extractedToken, setExtractedToken] = useState();
  const scrollViewRef = useRef<any>();

  const { updateAlert } = useAlert();

  const getDashboardData = async () => {
    setLoading(true);
    try {
      const response = await axiosCustom.get("/dashboard");
      setAuthData(response?.data?.data);
    } catch (err) {
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };
  useEffect(() => {
    getDashboardData();
  }, []);

  const onRefreshFunc = useCallback(() => {
    setRefreshing(true);
    getDashboardData();
  }, []);

  return (
    <View style={[container, { paddingTop: getStatusBarHeight(true) }]}>
      <Customstatusbar />
      <View style={headerContainer}>
        <View style={profileContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Settings")}
            activeOpacity={0.8}
          >
            {authdata?.userDetails?.imageUrl !== null ? (
              <Image
                style={{ width: 45, height: 45, borderRadius: 45 / 2 }}
                source={{
                  uri: authdata?.userDetails?.imageUrl,
                }}
              />
            ) : (
              <Featherdefault />
            )}
          </TouchableOpacity>

          <View style={profileNameContainer}>
            <Text style={profileName}>
              Hi, {nameToShow(authdata?.userDetails?.fullName)}✌🏽
            </Text>
            <Text style={profileUsername}>
              @{authdata?.userDetails?.username}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate("Notifications")}
          style={notificationBell}
        >
          <Bell />
        </TouchableOpacity>
      </View>

      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefreshFunc}
            progressBackgroundColor={COLORS.white}
            colors={[COLORS.blue6]}
            tintColor={COLORS.blue6}
            title="Refreshing"
            titleColor={COLORS.blue6}
          />
        }
      >
        <FTViewbalance />
        <QuickActions />
        <ActiveCashWithdrawal />
        <Conversations />
        <SetupProfile />

        <View style={transactionWrap}>
          <View style={transactionHeader}>
            <View style={transactionIconWrap}>
              {/* icons */}
              <Historyicon />
              <Text style={transactionText}>Transactions</Text>
            </View>
            <Text style={viewAll}>View All</Text>
          </View>

          <FTHorizontaline marginV={14} />
          {histories.length === 0 ? (
            <FTEmptycomponent
              size={110}
              msg="Padi, you have not performed any 
            transactions yet. Transact Now"
            />
          ) : (
            histories.map((history, index) => {
              const { data, time } = history;
              return (
                <FTTransactionhistory
                  index={index}
                  date={time}
                  datas={data}
                  key={time}
                />
              );
            })
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
