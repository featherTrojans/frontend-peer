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
  SafeAreaView,
  TouchableOpacity,
  RefreshControl,
  Platform,
} from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import LottieView from "lottie-react-native";
import { Service, Transactionhistory, Viewbalance } from "../../../components";
import { COLORS, FONTS, fontsize, icons } from "../../../constants";
import { AuthContext } from "../../../context/AuthContext";
import axiosCustom from "../../../httpRequests/axiosCustom";
import formatData from "../../../utils/fomatTrans";
import { styles } from "./Home.styles";
import { customNavigation } from "../../../utils/customNavigation";

const {
  Profilepics,
  Bell,
  Arrowright,
  Eyecrossed,
  Withdraw,
  Paybills,
  Transfer,
  Deposit,
  Cryinganimate,
} = icons;

const walletOptions = [
  {
    icon: <Withdraw />,
    title: "Withdraw",
    link: "Withdraw",
  },
  {
    icon: <Deposit />,
    title: "Deposit",
    link:"Depositupdate"
  },
  {
    icon: <Transfer />,
    title: "Transfer",
    link: "Transfercash",
  },
  {
    icon: <Paybills />,
    title: "Paybills",
    link: "Choosewallet",
  },
];

const Home = ({ navigation }: { navigation: any }) => {
  const { setAuthData, authdata } = useContext(AuthContext);
  // const [info, setInfo] = useState({});
  const histories = formatData(authdata?.transactions);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  ///States for the push notifications
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
        // console.log(response);
      });

      // welcomeNotifications()

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  //Instant Notifications
  // async function sendPushNotification(expoPushToken) {
  //   const message = {
  //     to: expoPushToken,
  //     sound: "default",
  //     title: "From Feather",
  //     body: "Testing the push notification",
  //     data: { someData: "goes here" },
  //   };

  //   await fetch("https://exp.host/--/api/v2/push/send", {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Accept-encoding": "gzip, deflate",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(message),
  //   });
  // }

    async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Welcome to feather! ✌🏽",
        body: "Hey Paddy, Love to have you here",
        data: { data: "Learn More about us" },
      },
      trigger: { seconds: 5 },
    });
  }

  const welcomeNotifications  = async () => {
    await schedulePushNotification();

  }

  //Scheduled Notifications

  //Calling the schedule Notification Sample
  //   <Button
  //   title="Press to schedule a notification"
  //   onPress={async () => {
  //     await schedulePushNotification();
  //   }}
  // />





  async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        console.log("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      console.log("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  }

  useEffect(() => {
    getDashboardData();
  }, []);

  const getDashboardData = async () => {
    console.log("I am fetching again");
    setLoading(true);
    try {
      const response = await axiosCustom.get("/dashboard");
      // setInfo(response?.data?.data);
      setAuthData(response?.data?.data);
    } catch (err) {
      console.log(err.response);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

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
            <Text style={styles.transactNow}>Transact Now</Text>
          </Text>
        </View>
      </View>
    );
  };

  const nameToShow = (value: string) => {
    if (value?.split(" ").length > 1) {
      return value?.split(" ")[1];
    } else {
      return value;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <View style={styles.headerContainer}>
        {/* user profile and notification icon */}
        <View style={styles.profileContainer}>
          <Profilepics />
          <View style={styles.profileNameContainer}>
            <Text style={styles.profileName}>
              Welcome, {nameToShow(authdata?.fullName)}✌🏽
            </Text>
            <Text style={styles.profileUsername}>@{authdata?.username}</Text>
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.navigate("Notifications")}
        >
          <Bell />
        </TouchableOpacity>
      </View>

      {/* Wallet info and details */}

      {/* Start of the block */}
      {/*  */}

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefreshFunc}
            progressBackgroundColor="white"
            colors={["#003AD6"]}
            tintColor={"#003AD6"}
          />
        }
      >
        <View style={styles.walletBlock}>
          <Viewbalance navigate={() => navigation.navigate("Addcash")} />
          <View style={styles.walletOptionsContainer}>
            {walletOptions.map(
              ({
                icon,
                title,
                link,
              }: {
                icon: JSX.Element;
                title: string;
                link: string;
              }) => (
                <TouchableOpacity
                  onPress={() => navigation.navigate(link)}
                  style={styles.optionContainer}
                  activeOpacity={0.8}
                >
                  <View style={styles.optionIconBg}>
                    {/* Icon will be inside this */}
                    {icon}
                  </View>
                  <Text style={styles.optionTitle}>{title}</Text>
                </TouchableOpacity>
              )
            )}
          </View>
        </View>

        {/* End of the block */}

        {/* Transaction history lists header*/}
        <View style={{ flex: 1 }}>
          <View style={styles.transactionHeader}>
            <View>
              <Text style={styles.transactionHistory}>Transaction History</Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.push("Transactions")}
            >
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>

          {histories.length === 0 ? (
            <EmptyComponent />
          ) : (
            histories.map((history) => (
              <Transactionhistory date={history.time} datas={history.data} />
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
