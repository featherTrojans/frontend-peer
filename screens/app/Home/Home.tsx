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
import LottieView from "lottie-react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { useIsFocused } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { Transactionhistory, Viewbalance } from "../../../components";
import { COLORS, FONTS, fontsize, icons, images } from "../../../constants";
import { AuthContext } from "../../../context/AuthContext";
import axiosCustom from "../../../httpRequests/axiosCustom";
import formatData from "../../../utils/fomatTrans";
import { styles } from "./Home.styles";
import { TabActions, useLinkTo } from "@react-navigation/native";
import Customstatusbar from "../../shared/Customstatusbar";
import DoubleTapToClose from "../../shared/DoubleBack";
import { nameToShow } from "../../../utils/nameToShow";
import { getPeriod } from "../../../utils/getDayPeriod";
import HomeWallet from "./HomeWallet";
import useAlert from "../../../utils/useAlerts";

const {
  Bell,

  Goldenstaricon,
  Dollaricon,

  Featherdefault,

  Cryinganimate,
} = icons;
const { Wavvy } = images;

const Amountbtn = ({ amountText }) => {
  return (
    <View>
      <Text style={{ ...fontsize.smaller, ...FONTS.regular }}>
        N{amountText}
      </Text>
    </View>
  );
};

const Home = ({ navigation, route }: { navigation: any; route: any }) => {
  const { setAuthData, authdata } = useContext(AuthContext);
  // const [info, setInfo] = useState({});
  const histories = formatData(authdata?.transactions);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [extractedToken, setExtractedToken] = useState();
  const scrollViewRef = useRef<any>();
  const linkTo = useLinkTo();
  const isFocused = useIsFocused();
  const jumpToHistory = TabActions.jumpTo("History");
  const jumpToSettings = TabActions.jumpTo("Settings");
  const jumpToNewtransactions = TabActions.jumpTo("Transactions");
  const { updateAlert } = useAlert();

  const toTop = () => {
    scrollViewRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };

  if (isFocused) {
    toTop();
  }

  useEffect(() => {
    if (isFocused && authdata.userDetails.userLevel <= 1) {
      updateAlert("Update your profile");
      console.log(route, "here is my current route");
    } else {
      Toast.hide();
    }
  }, [isFocused]);

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
          style={{ padding: 8, borderRadius: 20 }}
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
          <HomeWallet />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          bounces={false}
        >
          <View
            style={[
              styles.informationblockwrap,
              {
                backgroundColor: "#8456FF",
                position: "relative",
                overflow: "hidden",
                flex: 1,
              },
            ]}
          >
            <View
              style={{
                position: "absolute",
                top: 0,
                left: -140,
                bottom: 0,
                right: 20,
              }}
            >
              <Image
                source={Wavvy}
                style={{ width: "200%", height: "100%", opacity: 0.06 }}
              />
            </View>
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
            <View
              style={{
                position: "absolute",
                top: 0,
                left: -140,
                bottom: 0,
                right: 20,
              }}
            >
              <Image
                source={Wavvy}
                style={{ width: "200%", height: "100%", opacity: 0.06 }}
              />
            </View>
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
            histories.map((history: { time: string; data: any }, index) => (
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
