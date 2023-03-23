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
  Emptycomponent,
  Horizontaline,
  Transactionhistory,
  Viewbalance,
} from "../../../components";
import { COLORS, FONTS, fontsize, icons } from "../../../constants";

import { AuthContext } from "../../../context/AuthContext";
import axiosCustom from "../../../httpRequests/axiosCustom";

import { styles } from "./Home.styles";

import Customstatusbar from "../../shared/Customstatusbar";
import DoubleTapToClose from "../../shared/DoubleBack";

import formatData from "../../../utils/fomatTrans";
import { getPeriod } from "../../../utils/getDayPeriod";
import useAlert from "../../../utils/useAlerts";
import { nameToShow } from "../../../utils/nameSplitter";

const {
  Bell,
  Featherdefault,
  Historyicon,
  Recentconvicon,
  Setupprofileicon,
  Balanceicon
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

const Scrollactions = () => {
  function Scrollaction({
    bg,
    text,
    icon,
    index
  }: {
    bg: string;
    text: string;
    icon: string;
    index: number
  }) {
    const isLast = index+1 === scrollactions.length
    return (
      <View style={[styles.scrollaction, { backgroundColor: bg, marginRight: isLast ? 0 : 16 }]}>
        <Text style={styles.scrollactionText}>{text}</Text>
      </View>
    );
  }

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      bounces={false}
    >
      {scrollactions.map(({ bg, text, icon }, index) => {
        return <Scrollaction bg={bg} text={text} icon={icon} key={index} index={index} />;
      })}
    </ScrollView>
  );
};

const Conversations = () => {
  return (
    <View style={styles.conversationWrap}>
      <View style={styles.conversationHeader}>
        <View style={styles.recentIconWrap}>
          {/* icon */}
          <Recentconvicon />
          <Text style={styles.recentconvText}>Recent Conversations</Text>
        </View>
        <Text style={styles.numberOfUnread}>
          {" "}
          <Text style={{ ...FONTS.bold }}>2</Text> Unread
        </Text>
      </View>

      <Horizontaline marginV={15} />

      <View style={{ flexDirection: "row" }}>
        <View
          style={{
            width: 32,
            height: 32,
            backgroundColor: COLORS.grey1,
            borderRadius: 32 / 2,
            marginRight: 10,
          }}
        />
        <View
          style={{
            width: 32,
            height: 32,
            backgroundColor: COLORS.grey1,
            borderRadius: 32 / 2,
            marginRight: 10,
          }}
        />
        <View
          style={{
            width: 32,
            height: 32,
            backgroundColor: COLORS.grey1,
            borderRadius: 32 / 2,
          }}
        />
      </View>
    </View>
  );
};

const SetupProfile = () => {
  return (
    <View style={styles.setupProfile}>
      <View style={styles.setupHeadSection}>
        <View style={styles.setupIconWrap}>
          {/* icon */}
          <Setupprofileicon />
          <Text style={styles.setupText}>Setup Your Profile</Text>
        </View>
      </View>

      <Horizontaline marginV={15} />

      <Text style={styles.setupInfoText}>
        Complete your profile today to enjoy all the benefits of feather without
        limits.<Text style={styles.setupInfoSubText}> Go to profile page.</Text>
      </Text>
    </View>
  );
};

const Home = ({ navigation, route }: { navigation: any; route: any }) => {
  const { setAuthData, authdata } = useContext(AuthContext);
  const histories = formatData(authdata?.transactions);
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
    <View style={[styles.container, { paddingTop: getStatusBarHeight(true) }]}>
      <Customstatusbar />
      <View style={styles.headerContainer}>
        <View style={styles.profileContainer}>
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

          <View style={styles.profileNameContainer}>
            <Text style={styles.profileName}>
              Hi, {nameToShow(authdata?.userDetails?.fullName)}✌🏽
            </Text>
            <Text style={styles.profileUsername}>
              @{authdata?.userDetails?.username}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate("Notifications")}
          style={styles.notificationBell}
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
        <Viewbalance />

        <Scrollactions />

        <Conversations />

        <SetupProfile />

        <View style={styles.transactionWrap}>
          <View style={styles.transactionHeader}>
            <View style={styles.transactionIconWrap}>
              {/* icons */}
              <Historyicon />
              <Text style={styles.transactionText}>Transactions</Text>
            </View>
            <Text style={styles.viewAll}>View All</Text>
          </View>

          <Horizontaline marginV={14} />
          {histories.length === 0 ? (
            <Emptycomponent
              size={110}
              msg="Padi, you have not performed any 
            transactions yet. Transact Now"
            />
          ) : (
            histories.map((history, index) => {
              const {data, time} = history
              return (
                <Transactionhistory
                index={index}
                date={time}
                datas={data}
                key={time}
              /> 
              )
            })
          )}
        </View>
        <DoubleTapToClose />
      </ScrollView>
    </View>
  );
};

export default Home;


{/* <Transactionhistory
    index={index}
    date={historytime}
    datas={data}
    key={time} */}