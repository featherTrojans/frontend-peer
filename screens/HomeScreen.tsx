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
  FlatList,
} from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

import {
  FTBillPayment,
  FTTransfer,
  FTWithdraw,
  FTAddcash,
  FTEmptycomponent,
  FTHorizontaline,
  FTIconwithbg,
  FTIconwithtitleandinfo,
  FTTabWrapper,
  FTTransactionhistory,
  FTViewbalance,
} from "../components";
import { COLORS, FONTS, SIZES, fontsize, icons } from "../constants";

import { AuthContext } from "../context/AuthContext";
import axiosCustom from "../httpRequests/axiosCustom";

import formatData from "../utils/fomatTrans";

import { nameToShow } from "../utils/nameSplitter";
import { HomeScreenStyles } from "../assets/styles/screens";
import { useAlert } from "../hooks";
import { navigation, redirectTo } from "../utils";

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
  profileSetupHeader,
  completedSetup,
  profileSetupWrap,
} = HomeScreenStyles;

const {
  Bell,
  Featherdefault,
  Historyicon,
  Recentconvicon,
  Setupprofileicon,
  Balanceicon,
  Walletblueicon,
  Transactionpinsetupicon,
  Profilesetupicon,
  Personalsetupicon,
  Createtagsetupicon,
  Banksetupicon,
  Documentsetupicon,
  Levelcheckicon,
} = icons;

const scrollactions = [
  {
    bg: "#EDF3EB",
    text: "Withdraw cash from business and agents near you.",
    icon: "",
    modal: 3,
  },
  {
    bg: "#F3EEFB",
    text: "Transfer money to feather users and bank accounts.",
    icon: "",
    modal: 2,
  },
  {
    bg: "#D2EAFD",
    text: "Pay Bills with speed and ease, at good rates.",
    icon: "",
    modal: 4,
  },
];

const QuickActions = ({ onpress }) => {
  function Scrollaction({
    bg,
    text,
    icon,
    index,
    modal,
  }: {
    bg: string;
    text: string;
    icon: string;
    index: number;
    modal: number;
  }) {
    let isLast = index + 1 === scrollactions.length;
    return (
      <TouchableOpacity onPress={() => onpress(modal)}>
        <View
          style={[
            scrollaction,
            { backgroundColor: bg, marginRight: !isLast ? 16 : 0 },
          ]}
        >
          <Text style={scrollactionText}>{text}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      // contentContainerStyle={{ paddingHorizontal: 16 }}
    >
      {scrollactions.map((scrollaction, index) => {
        let { bg, text, icon, modal } = scrollaction;
        return (
          <Scrollaction
            bg={bg}
            text={text}
            icon={icon}
            key={index}
            index={index}
            modal={modal}
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

const SetupProfile = ({ onPress }) => {
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
        limits.{" "}
        <Text onPress={onPress} style={setupInfoSubText}>
          {" "}
          Check profile setup.
        </Text>
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

      <FTIconwithtitleandinfo
        title="Suzzane Vibes Shoes"
        info="N45,500"
        bG="blue"
        mT={24}
        onPress={() => console.log("yes")}
        Icon={Banksetupicon}
      />
    </View>
  );
};

const ProfileSetup = () => {
  const { authdata } = useContext(AuthContext);
  const level = authdata?.userDetails?.userLevel;

  const profilesetupdatas = [
    {
      title: "Personal Information",
      info: "Complete your personal user profile",
      Icon: Personalsetupicon,
      bg: COLORS.Tyellow,
      completed: !!authdata?.userDetails?.gender,
      onPress: () => navigation.navigate("editprofile_screen"),
    },
    {
      title: "Create a feather tag",
      info: "Create a custom feather tag",
      Icon: Createtagsetupicon,
      bg: COLORS.Tred,
      completed: !!authdata?.userDetails?.username,
      onPress: () => navigation.navigate("editprofile_screen"),
    },
    {
      title: "Profile Appearance",
      info: "Manage your profile appearance",
      Icon: Profilesetupicon,
      bg: COLORS.Tgreen3,
      completed:
        authdata?.userDetails?.imageUrl || authdata?.userDetails?.isMemoji,
      onPress: () => navigation.navigate("changeappearance_screen"),
    },
    {
      title: "Transaction PIN",
      info: "Secure your transactions with a PIN",
      Icon: Transactionpinsetupicon,
      bg: COLORS.Tred2,
      completed: !!authdata?.userDetails?.pin,
      onPress: () => navigation.navigate("securityandprivacy_screen"),
    },
    {
      title: "Bank Verification Number",
      info: "Verify your BVN to get an account number",
      Icon: Banksetupicon,
      bg: COLORS.Tblue5,
      completed: level >= 2,
      onPress: () => navigation.navigate("accountverification_screen"),
    },
    {
      title: "Document Verification",
      info: "Verify your documents to level up",
      Icon: Documentsetupicon,
      bg: COLORS.Tpurple,
      completed: level == 3,
      onPress: () => navigation.navigate("accountverification_screen"),
    },
  ];

  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      <Text style={{ textTransform: "capitalize" }}>
        Hi {nameToShow(authdata?.userDetails?.fullName)},{`\n`}Complete your
        profile!
      </Text>
      <Text>
        Completed {profilesetupdatas.filter((item) => item.completed).length} /
        6
      </Text>

      <View style={{ marginTop: 45, flex: 1 }}>
        <FlatList
          data={profilesetupdatas}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            const { title, info, Icon, bg, onPress, completed } = item;
            return (
              <FTIconwithtitleandinfo
                title={title}
                info={info}
                Icon={Icon}
                onPress={completed ? () => {} : onPress}
                bG={bg}
                mB={25}
                rightComponent={completed && <Levelcheckicon />}
              />
            );
          }}
          keyExtractor={(item) => item.title}
        />
      </View>
    </View>
  );
};

const HomeScreen = ({ navigation, route }: { navigation: any; route: any }) => {
  const { setAuthData, authdata, setShowTabs } = useContext(AuthContext);
  const histories: any[] = formatData(authdata?.transactions);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [extractedToken, setExtractedToken] = useState();
  const scrollViewRef = useRef<any>();
  const [showModal, setShowModal] = useState(false);
  const [content, setContent] = useState<{
    child: React.ReactNode;
    height: number;
  }>({ child: null, height: 200 });

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

  const ModalCon = () => {
    return (
      <View style={{ backgroundColor: "#fff", height: 200 }}>
        <Text>The name two</Text>
      </View>
    );
  };

  const switchModals = (value) => {
    switch (value) {
      case 0:
        setContent({ child: <ProfileSetup />, height: SIZES.height - 150 });
        setShowModal((s) => !s);
        setShowTabs(false);
        break;
      case 1:
        setContent({ child: <ModalCon />, height: 300 });
        setShowModal((s) => !s);
        setShowTabs(false);
        break;
      case 2:
        setContent({ child: <FTTransfer />, height: 300 });
        setShowModal((s) => !s);
        setShowTabs(false);
        break;
      case 3:
        setContent({ child: <FTWithdraw />, height: 300 });
        setShowModal((s) => !s);
        setShowTabs(false);
        break;
      case 4:
        setContent({ child: <FTBillPayment />, height: 360 });
        setShowModal((s) => !s);
        setShowTabs(false);
        break;

      default:
        break;
    }
  };

  return (
    <FTTabWrapper
      bgColor={COLORS.white3}
      modalChildren={content.child}
      showModal={showModal}
      setShowModal={setShowModal}
      modalHeight={content.height}
    >
      <View style={headerContainer}>
        <View style={profileContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Settings")}
            activeOpacity={0.8}
          >
            {authdata?.userDetails?.imageUrl !== null ? (
              <FTIconwithbg
                imageUrl={authdata?.userDetails?.imageUrl}
                size={45}
                bG={COLORS.Tblue}
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
          onPress={() => redirectTo("notification_screen")}
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
        <QuickActions onpress={switchModals} />
        <ActiveCashWithdrawal />
        <Conversations />
        <SetupProfile onPress={() => switchModals(0)} />

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
    </FTTabWrapper>
  );
};

export default HomeScreen;
