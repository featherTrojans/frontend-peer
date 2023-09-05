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
  StatusBar,
} from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

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
  FTOtherImage,
} from "../components";
import { COLORS, FONTS, SIZES, fontsize, icons, images } from "../constants";

import { AuthContext } from "../context/AuthContext";
import axiosCustom from "../httpRequests/axiosCustom";

import formatData from "../utils/fomatTrans";

import { nameToShow } from "../utils/nameSplitter";
import { HomeScreenStyles } from "../assets/styles/screens";
import { useNavigation } from "@react-navigation/native";

import useChats from "../hooks/useChats";
import Customstatusbar from "./shared/Customstatusbar";

const {
  headerContainer,
  profileContainer,
  profileName,
  profileNameContainer,
  profileUsername,
  notificationBell,
  scrollaction,
  scrollactionText,
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
  scrollActionImage,
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
} = icons;
const { Transferimage, Withdrawimage, Billsimage } = images;
const scrollactions = [
  {
    bg: "#EDF3EB",
    text: "Withdraw cash from business and agents near you.",
    image: Withdrawimage,
    modal: 3,
  },
  {
    bg: "#F3EEFB",
    text: "Transfer money to feather users and bank accounts.",
    image: Transferimage,
    modal: 2,
  },
  {
    bg: "#D2EAFD",
    text: "Pay Bills with speed and ease, at good rates.",
    image: Billsimage,
    modal: 4,
  },
];

const QuickActions = ({ onpress }) => {
  console.log("Qucik action rerendeing");

  function Scrollaction({
    bg,
    text,
    image,
    index,
    modal,
  }: {
    bg: string;
    text: string;
    image: any;
    index: number;
    modal: number;
  }) {
    let isLast = index + 1 === scrollactions.length;
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={() => onpress(modal)}>
        <View
          style={[
            scrollaction,
            { backgroundColor: bg, marginRight: !isLast ? 16 : 0 },
          ]}
        >
          <Image
            style={scrollActionImage}
            source={image}
            defaultSource={image}
          />
          <Text style={scrollactionText}>{text}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ marginVertical: 15, paddingHorizontal: 15 }}
    >
      {scrollactions.map((scrollaction, index) => {
        let { bg, text, image, modal } = scrollaction;
        return (
          <Scrollaction
            bg={bg}
            text={text}
            image={image}
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
  const { allchatdata, loading } = useChats();
  const navigation = useNavigation();

  // let threechats = allchatdata.slice(0, 3);

  return (
    <View style={[conversationWrap]}>
      <View style={conversationHeader}>
        <View style={recentIconWrap}>
          {/* icon */}
          <Recentconvicon />
          <Text style={recentconvText}>Conversations</Text>
        </View>
        {/* <Text style={numberOfUnread}>You have 3 unreads</Text> */}
      </View>

      <FTHorizontaline marginV={15} />

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {allchatdata.map((item) => {
          return (
            <View style={{ marginHorizontal: 10 }}>
              <FTOtherImage
                size={45}
                imageurl={item?.userInfo?.imageUrl}
                memojiImage={item?.userInfo?.memoji}
                fullname={item?.userInfo?.fullName}
                onpress={() => {
                  navigation.navigate("chatsdm_screen", {
                    userInfo: item?.userInfo,
                  });
                }}
              />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const SetupProfile = ({ onPress }) => {
  const { authdata } = useContext(AuthContext);
  const level = authdata?.userDetails?.userLevel;

  let isProfileSetupCompleted =
    !!authdata?.userDetails?.gender &&
    !!authdata?.userDetails?.username &&
    level >= 3 &&
    level >= 2 &&
    !!authdata?.userDetails?.pin &&
    (authdata?.userDetails?.imageUrl || authdata?.userDetails?.isMemoji);

  if (isProfileSetupCompleted) {
    return null;
  }

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
            agentinfo: info,
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
        authdata?.userDetails?.imageUrl || authdata?.userDetails?.isMemoji,
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
        <Text style={{ textTransform: "capitalize" }}>
          {nameToShow(authdata?.userDetails?.fullName)}
        </Text>
        ,{`\n`}Complete your profile!
      </Text>
      <Text style={completedSetup}>Completed {completedProfileSetup} / 6</Text>

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
      <View style={{ flex: 1 }}></View>
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

  const switchModals = (value) => {
    switch (value) {
      case 0:
        setContent({
          child: <ProfileSetup nav={navigation} />,
          height: SIZES.height - 150,
        });
        setShowModal((s) => !s);
        setShowTabs(false);
        break;
      case 2:
        setContent({ child: <FTTransfer />, height: 270 });
        setShowModal((s) => !s);
        setShowTabs(false);
        break;
      case 3:
        setContent({ child: <FTWithdraw />, height: 270 });
        setShowModal((s) => !s);
        setShowTabs(false);
        break;
      case 4:
        setContent({ child: <FTBillPayment />, height: 330 });
        setShowModal((s) => !s);
        setShowTabs(false);
        break;

      default:
        break;
    }
  };

  return (
    <FTTabWrapper
      pH={0}
      bgColor={COLORS.white3}
      modalChildren={content.child}
      showModal={showModal}
      setShowModal={setShowModal}
      modalHeight={content.height}
    >
      <View style={headerContainer}>
        <View style={profileContainer}>
          <FTUserImage size={45} />
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
        <QuickActions onpress={switchModals} />
        <SetupProfile onPress={() => switchModals(0)} />
        <Conversations />

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
