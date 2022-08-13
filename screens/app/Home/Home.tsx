import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useRef,
} from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  ScrollView,
  FlatList,
  // SafeAreaView,
  TouchableOpacity,
  RefreshControl,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import LottieView from "lottie-react-native";
import * as Animatable from "react-native-animatable";
import { ifIphoneX, getStatusBarHeight } from "react-native-iphone-x-helper";
import { useIsFocused, useScrollToTop } from "@react-navigation/native";

import {
  InitialsBg,
  Service,
  Transactionhistory,
  Viewbalance,
} from "../../../components";
import { COLORS, FONTS, fontsize, icons } from "../../../constants";
import { AuthContext } from "../../../context/AuthContext";
import axiosCustom from "../../../httpRequests/axiosCustom";
import formatData from "../../../utils/fomatTrans";
import { styles } from "./Home.styles";
import { customNavigation } from "../../../utils/customNavigation";
import { TabActions, useLinkTo } from "@react-navigation/native";
import Customstatusbar from "../../shared/Customstatusbar";
import { sendSchedulePushNotification } from "../../../utils/pushNotifications";
import DoubleTapToClose from "../../shared/DoubleBack";
import { connectFirestoreEmulator } from "firebase/firestore";
import { RFValue } from "react-native-responsive-fontsize";
import { nameToShow } from "../../../utils/nameToShow";
import { getPeriod } from "../../../utils/getDayPeriod";



const {
  Profilepics,
  Bell,
  Arrowright,
  Eyecrossed,
  Withdraw,
  Paybills,
  Transfer,
  Deposit,
  Smalluseravatar,
  Withdrawicon,
  Depositicon,
  Newtransfericon,
  Paybillicon,
  Goldenstaricon,
  Dollaricon,
  Patternbg,
  Cryinganimate,
} = icons;

const walletOptions = [
  {
    icon: <Withdrawicon />,
    title: "Withdraw",
    link: "Withdraw",
    iconBg: "#E0EDD8",
  },
  {
    icon: <Depositicon />,
    title: "Deposit",
    link: "Depositupdate",
    iconBg: "#D2EAFD",
  },
  {
    icon: <Newtransfericon />,
    title: "Transfer",
    link: "Transfercash",
    iconBg: "#FCF3D1",
  },
  {
    icon: <Paybillicon />,
    title: "Paybills",
    link: "Paybills",
    iconBg: "#E3CCFF",
  },
];

const Home = ({ navigation }: { navigation: any }) => {
  const { setAuthData, authdata, messageToken, userColor, userDefaultImage } =
    useContext(AuthContext);
  // const [info, setInfo] = useState({});
  const histories = formatData(authdata?.transactions);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [extractedToken, setExtractedToken] = useState();
  const scrollViewRef = useRef(null);

  const linkTo = useLinkTo();
  const isFocused = useIsFocused();
  const jumpToHistory = TabActions.jumpTo("History");
  const jumpToSettings = TabActions.jumpTo("Settings");
  const jumpToNewtransactions = TabActions.jumpTo("Transactions");



  const toTop = () => {
    scrollViewRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };

  if (isFocused) {
    toTop();
  }

  const getDashboardData = async () => {
    // console.log("I am fetching again from home");

    setLoading(true);
    try {
      const response = await axiosCustom.get("/dashboard");
      // setInfo(response?.data?.data);
      setAuthData(response?.data?.data);
      // console.log(response.data)
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

  const EmptyComponent = () => {
    return (
      <View style={styles.emptyContainer}>
        {/* Crying icons */}
        <LottieView
          source={Cryinganimate}
          autoPlay
          loop
          style={{ width: 190, height: 190 }}
        />
        <View style={{ marginHorizontal: 50 }}>
          <Text style={styles.emptyText}>
            Padi, you have not performed any transactions yet.{" "}
            <Text
              style={styles.transactNow}
              onPress={() => navigation.dispatch(jumpToNewtransactions)}
            >
              Transact Now
            </Text>
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: getStatusBarHeight(true) }]}>
      <Customstatusbar />

      <View style={styles.headerContainer}>
        {/* user profile and notification icon */}
        <View style={styles.profileContainer}>
          <TouchableOpacity
            onPress={() => navigation.dispatch(jumpToSettings)}
            activeOpacity={0.8}
          >
            {userDefaultImage()}
            {/* <InitialsBg sideLength={51} name={authdata?.userDetails?.fullName} bg={userColor} /> */}
          </TouchableOpacity>

          <View style={styles.profileNameContainer}>
            <Text style={styles.profileName}>
              {getPeriod()}, {nameToShow(authdata?.userDetails?.fullName)}✌🏽
            </Text>
            <Text style={styles.profileUsername}>
              @{authdata?.userDetails?.username}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate("Notifications")}
        >
          <Bell />
        </TouchableOpacity>
      </View>

      {/* Start of the block */}
      {/*  */}

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
        {/* Balance and sub pages */}
        <View style={styles.walletBlock}>
          <Viewbalance />
          <View style={styles.walletOptionsContainer}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  ...fontsize.smallest,
                  ...FONTS.medium,
                  color: COLORS.black,
                }}
              >
                Padi, what do you want to do today?
              </Text>
              <View
                style={{ width: 4, height: 4, backgroundColor: COLORS.black }}
              />
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 30,
              }}
            >
              {walletOptions.map(
                (
                  {
                    icon,
                    title,
                    link,
                    iconBg,
                  }: {
                    icon: JSX.Element;
                    title: string;
                    link: string;
                    iconBg: string;
                  },
                  index
                ) => (
                  <Animatable.View
                    animation="bounceIn"
                    delay={index * 100}
                    key={title}
                  >
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => navigation.navigate(link)}
                      style={styles.optionContainer}
                    >
                      <View
                        style={[
                          styles.optionIconBg,
                          { backgroundColor: iconBg },
                        ]}
                      >
                        {icon}
                      </View>
                      <Text style={styles.optionTitle}>{title}</Text>
                    </TouchableOpacity>
                  </Animatable.View>
                )
              )}
            </View>
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          bounces={false}
        >
          <View
            style={[
              styles.informationblockwrap,
              { backgroundColor: "#8456FF" },
            ]}
          >
            <View style={styles.informationiconswrap}>
              <Goldenstaricon />
              <View style={{ marginRight: 3.4 }} />
              <Goldenstaricon />
              <View style={{ marginRight: 3.4 }} />
              <Goldenstaricon />
            </View>

            <Text style={styles.informationblocktext}>
              Earn N10 each time you rate a successful withdraw transaction{" "}
            </Text>
          </View>

          <View
            style={[
              styles.informationblockwrap,
              { backgroundColor: "#5676FF", marginRight: 0 },
            ]}
          >
      
            <View style={styles.informationiconswrap}>
              <Dollaricon />
            </View>
            <Text style={styles.informationblocktext}>
              Start your beta side hustle by making cash available for people to
              withdraw
            </Text>
          </View>
        </ScrollView>

        {/* End of the block */}

        {/* Transaction history lists header*/}
        <View style={{ flex: 1 }}>
          <View style={styles.transactionHeader}>
            <Text style={styles.transactionHistory}>Transaction History</Text>
            <TouchableOpacity
              onPress={() => navigation.dispatch(jumpToHistory)}
            >
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>


          {/*  */}
          {histories.length === 0 ? (
            <EmptyComponent />
          ) : (
            histories.map((history:{time: string, data:
             any}, index) => (
              <Transactionhistory
                index={index}
                date={history.time}
                datas={history.data}
                key={history.time}
              />
            ))
          )}
        </View>
        <DoubleTapToClose />
      </ScrollView>
    </View>
  );
};

export default Home;
