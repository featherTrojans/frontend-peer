import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useRef,
  useMemo,
} from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import {
  FTBillPayment,
  FTTransfer,
  FTWithdraw,
  FTEmptycomponent,
  FTHorizontaline,
  FTIconwithtitleandinfo,
  FTTabWrapper,
  FTTransactionhistory,
  FTViewbalance,
  FTCustombutton,
  FTUserImage,
  FTConversations,
  FTQuickactions,
  FTLoader,
} from "../components";
import { COLORS, FONTS, SIZES, fontsize, icons, images } from "../constants";

import { AuthContext } from "../context/AuthContext";
import axiosCustom from "../httpRequests/axiosCustom";

import formatData from "../utils/fomatTrans";

import { nameToShow } from "../utils/nameSplitter";
import { HomeScreenStyles } from "../assets/styles/screens";
import { useNavigation } from "@react-navigation/native";

import { FlatList as AnimatedFlatlist } from "react-native-gesture-handler";
import { useAlert } from "../hooks";
import amountFormatter from "../utils/formatMoney";
import { useExpoUpdate } from "../hooks/useExpoUpdate";

const {
  headerContainer,
  profileContainer,
  profileName,
  profileNameContainer,
  profileUsername,
  notificationBell,
  transactionWrap,
  transactionHeader,
  transactionIconWrap,
  transactionText,
  viewAll,
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
  Historyicon,
  Recentconvicon,
  Setupprofileicon,
  Transactionpinsetupicon,
  Profilesetupicon,
  Personalsetupicon,
  Createtagsetupicon,
  Banksetupicon,
  Documentsetupicon,
  Levelcheckicon,
  Setuppinlockicon,
} = icons;

const SetupProfile = ({ onPress }) => {
  const { authdata } = useContext(AuthContext);
  const level = authdata?.userDetails?.userLevel;
  console.log(authdata?.userDetails, "HELEPELEPLEL");
  let isProfileSetupCompleted =
    !!authdata?.userDetails?.gender &&
    !!authdata?.userDetails?.username &&
    level >= 3 &&
    level >= 2 &&
    !!authdata?.userDetails?.pin &&
    (authdata?.userDetails?.imageUrl || authdata?.userDetails?.memoji);

  if (isProfileSetupCompleted) {
    return null;
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={setupProfile}
    >
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
    </TouchableOpacity>
  );
};

const ActiveCashWithdrawal = () => {
  const [info, setInfo] = useState({
    reference: "",
    amount: "",
    charges: "",
    total: "",
    negotiatedFee: "",
    agent: "",
    agentUsername: "",
    phoneNumber: "",
    status: "",
    meetupPoint: "",
    createdAt: "",
    agentImage: null,
  });
  const navigation = useNavigation();

  useEffect(() => {
    axiosCustom.get("/request/accepted").then((response) => {
      setInfo(response?.data?.data);
      if (response.data && response.data.data.length > 0) {
        setInfo(response?.data?.data[0]);
      }
    });
  }, []);
  if (!info.reference) {
    return null;
  }
  return (
    <View style={[setupProfile, { marginBottom: 0, marginTop: 15 }]}>
      <View style={conversationHeader}>
        <View style={recentIconWrap}>
          {/* icon */}
          <Recentconvicon />
          <Text style={recentconvText}>Cash Withdrawal</Text>
        </View>
        <Text style={numberOfUnread}>15 Mins Away</Text>
      </View>

      <FTIconwithtitleandinfo
        title={info.agent}
        info={`N${info.total}`}
        bG="blue"
        mT={24}
        onPress={() =>
          navigation.navigate("withdrawcash_screen", {
            info: info,
            amount: 0,
          })
        }
        Icon={Banksetupicon}
      />
    </View>
  );
};

const ProfileSetup = ({ nav }) => {
  const { authdata } = useContext(AuthContext);
  const level = authdata?.userDetails?.userLevel;

  const action = (pin) => {
    const action2 = async (newpin) => {
      if (newpin !== pin) {
        throw { response: { data: { message: "pins does not match" } } };
      }
      try {
        await axiosCustom.put("auth/pin/set", { pin });
      } catch (err) {
        throw err;
      }
    };
    nav.push("transactionpin_screen", {
      action: action2,
      toptext: "Enter pin again",
    });
  };

  const profilesetupdatas = [
    {
      title: "Personal Information",
      info: "Complete your personal user profile",
      Icon: Personalsetupicon,
      bg: COLORS.Tyellow,
      completed: !!authdata?.userDetails?.gender,
      onPress: () => nav.navigate("editprofile_screen"),
    },
    {
      title: "Create a feather tag",
      info: "Create a custom feather tag",
      Icon: Createtagsetupicon,
      bg: COLORS.Tred,
      completed: !!authdata?.userDetails?.username,
      onPress: () => nav.navigate("editprofile_screen"),
    },
    {
      title: "Profile Appearance",
      info: "Manage your profile appearance",
      Icon: Profilesetupicon,
      bg: COLORS.Tgreen3,
      completed:
        authdata?.userDetails?.imageUrl || authdata?.userDetails?.memoji,
      onPress: () => nav.navigate("changeappearance_screen"),
    },
    {
      title: "Transaction PIN",
      info: "Secure your transactions with a PIN",
      Icon: Transactionpinsetupicon,
      bg: COLORS.Tred2,
      completed: !!authdata?.userDetails?.pin,
      onPress: () => nav.navigate("transactionpin_screen", { action }),
    },
    {
      title: "Bank Verification Number",
      info: "Verify your BVN to get an account number",
      Icon: Banksetupicon,
      bg: COLORS.Tblue5,
      completed: level >= 2,
      onPress: () => nav.navigate("accountverification_screen"),
    },
    {
      title: "Document Verification",
      info: "Verify your documents to level up",
      Icon: Documentsetupicon,
      bg: COLORS.Tpurple,
      completed: level >= 3,
      onPress: () => nav.navigate("accountverification_screen"),
    },
  ];
  let completedProfileSetup = profilesetupdatas.filter(
    (item) => item.completed
  ).length;

  return (
    <View style={profileSetupWrap}>
      <Text style={profileSetupHeader}>
        Hi{" "}
        {authdata?.userDetails?.fullName && (
          <Text style={{ textTransform: "capitalize" }}>
            {nameToShow(authdata?.userDetails?.fullName)}
          </Text>
        )}
        ,{`\n`}Complete your profile!
      </Text>
      <Text style={completedSetup}>Completed {completedProfileSetup} / 6</Text>

      <View style={{ marginTop: 45, flex: 1 }}>
        <AnimatedFlatlist
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

const SetupPin = ({ nav }) => {
  const action = (pin) => {
    const action2 = async (newpin) => {
      if (newpin !== pin) {
        throw { response: { data: { message: "pins does not match" } } };
      }
      try {
        await axiosCustom.put("auth/pin/set", { pin });
      } catch (err) {
        throw err;
      }
    };
    nav.push("transactionpin_screen", {
      action: action2,
      toptext: "Enter pin again",
    });
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Setuppinlockicon />
      </View>
      <View style={{ marginBottom: 30 }}>
        <Text style={{ textAlign: "center", marginBottom: 5 }}>
          *We take your security and privacy serious,
        </Text>
        <Text style={{ textAlign: "center" }}>
          Kindly setup your pin to continue on the app
        </Text>
      </View>
      <FTCustombutton
        btntext="Setup Transaction PIN"
        onpress={() => nav.navigate("transactionpin_screen", { action })}
      />
      <Text
        style={{
          textAlign: "center",
          ...fontsize.xxsmall,
          ...FONTS.regular,
          marginVertical: 20,
        }}
      >
        Need Help? Learn More
      </Text>
    </View>
  );
};
const HomeScreen = ({ navigation, route }: { navigation: any; route: any }) => {
  const { setAuthData, authdata } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [extractedToken, setExtractedToken] = useState();
  const scrollViewRef = useRef<any>();
  const { errorAlert } = useAlert();
  const [showModal, setShowModal] = useState(false);
  const walletbalance = amountFormatter(authdata?.userDetails?.walletBal);
  const [content, setContent] = useState<{
    child: React.ReactNode;
    height: number;
  }>({ child: null, height: 200 });
  const [withdrawLoading, setWithdrawLoading] = useState(false);
  useExpoUpdate();

  const histories: any[] = useMemo(
    () => formatData(authdata?.transactions),
    [authdata?.transactions]
  );

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

  useEffect(() => {
    if (!authdata?.userDetails?.pin) {
      setContent({ child: <SetupPin nav={navigation} />, height: 350 });
      setShowModal(true);
    }
  }, []);

  const onRefreshFunc = useCallback(() => {
    setRefreshing(true);
    getDashboardData();
  }, []);

  const onsubmitfindmerchant = async (amount) => {
    if (amount > authdata?.userDetails?.walletBal) {
      return errorAlert(null, "amount is greater than wallet");
    }
    navigation.navigate("withdrawcash_screen", { amount });
  };

  const findmerchant = async () => {
    setWithdrawLoading(true);
    const response = await axiosCustom.get("/request/accepted");
    setWithdrawLoading(false);

    if (response.data && response.data.data.length > 0) {
      return navigation.navigate("withdrawcash_screen", {
        info: response?.data?.data[0],
        amount: 0,
      });
    }
    return navigation.navigate("amounttosend_screen", {
      buttontext: "Withdraw Cash",
      headtext: `Balance : N${walletbalance}`,
      onsubmit: onsubmitfindmerchant,
    });
  };

  const switchModals = (value) => {
    switch (value) {
      case 0:
        setContent({
          child: <ProfileSetup nav={navigation} />,
          height: SIZES.height - 150,
        });
        setShowModal((s) => !s);
        break;
      case 2:
        setContent({ child: <FTTransfer />, height: 360 });
        setShowModal((s) => !s);
        break;
      case 3:
        findmerchant();
        break;
      case 4:
        setContent({ child: <FTBillPayment />, height: 330 });
        setShowModal((s) => !s);
        break;

      default:
        break;
    }
  };

  return (
    <FTTabWrapper
      pH={0}
      bgColor={COLORS.white3}
      showModal={showModal}
      setShowModal={setShowModal}
      modalChildren={content.child}
      modalHeight={content.height}
    >
      <FTLoader loading={withdrawLoading} />
      <View style={headerContainer}>
        <View style={profileContainer}>
          <FTUserImage size={45} />
          <View style={profileNameContainer}>
            <Text style={profileName}>
              Hi, {nameToShow(authdata?.userDetails?.fullName)}✌🏽
            </Text>
            {authdata?.userDetails?.username && (
              <Text style={profileUsername}>
                @{authdata?.userDetails?.username}
              </Text>
            )}
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate("notification_screen")}
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
        <ActiveCashWithdrawal />
        <FTQuickactions onpress={switchModals} />
        <SetupProfile onPress={() => switchModals(0)} />
        <FTConversations />

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

              let isLast = index + 1 !== histories.length;
              return (
                <>
                  <FTTransactionhistory
                    index={index}
                    date={time}
                    datas={data}
                    key={time}
                  />
                  {isLast && <FTHorizontaline marginV={15} />}
                </>
              );
            })
          )}
        </View>
      </ScrollView>
    </FTTabWrapper>
  );
};

export default HomeScreen;
