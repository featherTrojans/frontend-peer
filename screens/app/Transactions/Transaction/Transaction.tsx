import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, Text, View, FlatList, RefreshControl, Platform } from "react-native";
import LottieView from "lottie-react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

import { Bottombtn, Transactionhistory } from "../../../../components";
import { COLORS, icons } from "../../../../constants";
import axiosCustom from "../../../../httpRequests/axiosCustom";
import formatData from "../../../../utils/fomatTrans";

import { styles } from "./Transaction.styles";

const { Cryinganimate } = icons;

const DATA = [
  {
    transId: "WZsOkF2oWw",
    initialBal: "2570",
    amount: "150",
    finalBal: "2420",
    description: "#150 transferred to OBA",
    from: "EZEKO",
    to: "OBA",
    direction: "out",
    createdAt: "2022-02-15T16:51:40.000Z",
  },
  {
    transId: "JFox9iGSKJ",
    initialBal: "2420",
    amount: "150",
    finalBal: "2570",
    description: "#150 transferred from EZEKO",
    from: "EZEKO",
    to: "EZEKO",
    direction: "in",
    createdAt: "2022-01-31T23:56:07.000Z",
  },
  {
    transId: "FnF7XtyXrb",
    initialBal: "2570",
    amount: "150",
    finalBal: "2420",
    description: "#150 transferred to EZEKO",
    from: "EZEKO",
    to: "EZEKO",
    direction: "out",
    createdAt: "2022-01-31T23:56:00.000Z",
  },
  {
    transId: "eZx81A14GE",
    initialBal: "2420",
    amount: "150",
    finalBal: "2570",
    description: "#150 transferred from EZEKO",
    from: "EZEKO",
    to: "EZEKO",
    direction: "in",
    createdAt: "2022-01-31T23:54:40.000Z",
  },
  {
    transId: "QLkpxlyiSL",
    initialBal: "2570",
    amount: "150",
    finalBal: "2420",
    description: "#150 transferred to EZEKO",
    from: "EZEKO",
    to: "EZEKO",
    direction: "out",
    createdAt: "2022-01-31T23:54:39.000Z",
  },
  {
    transId: "LdJexVcIIW",
    initialBal: "2420",
    amount: "150",
    finalBal: "2570",
    description: "#150 transferred from EZEKO",
    from: "EZEKO",
    to: "EZEKO",
    direction: "in",
    createdAt: "2022-01-31T23:52:49.000Z",
  },
  {
    transId: "lirXTEm7Zs",
    initialBal: "2720",
    amount: "150",
    finalBal: "2570",
    description: "#150 transferred to ELON",
    from: "EZEKO",
    to: "ELON",
    direction: "out",
    createdAt: "2022-01-31T23:48:07.000Z",
  },
];






const EmptyComponent = () => {
  return (
    <View style={styles.emptyListContainer}>
      {/* Crying icons */}
      {/* <Cryingicon /> */}
      <LottieView
        source={Cryinganimate}
        autoPlay
        loop
        style={{ width: 190, height: 190 }}
      />
      <View style={styles.textContainer}>
        <Text style={styles.emptyContainerText}>
          Padi, you have not performed any transactions yet.{" "}
          <Text style={styles.emptyContainerSubText}>Transact Now</Text>
        </Text>
      </View>
    </View>
  );
};

const Transactions = ({ navigation }: any) => {
  const [transactions, setTransations] = useState();
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
  
    // const updateMessageToken = async (expoToken: string) => {
    //   try {
    //    await  axiosCustom.post("/auth/token/create", { messageToken: expoToken });
    //     console.log(authdata, "Here is the datas")
    //   } catch (err) {
    //     console.log(err.response);
    //   }
    // };


    const registerForPushNotificationsAsync = async () => {
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
        Notifications.setNotificationChannelAsync("transactions", {
          name: "trasanctions",
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#FF231F7C",
        });
      }
  
      return token;
    }


  useEffect(() => {

    registerForPushNotificationsAsync()
    .then((token) => {
      setExpoPushToken(token);
    });

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        // console.log(response);
      });

    // welcomeNotifications()
    updateMessageToken(expoPushToken)

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

    //Instant Notifications
  async function sendPushNotification(expoPushToken) {
    const message = {
      to: expoPushToken,
      sound: "default",
      title: "From Feather",
      body: "Testing the push notification",
      data: { someData: "goes here" },
      channelId: 'transactions',
    };

    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
  }



  useEffect(() => {
    getAllTransactions();
  }, []);

  const getAllTransactions = async () => {
    try {
      setLoading(true);
      const response = await axiosCustom.get("/transactions");
      // console.log(response);
      setTransations(response?.data?.data?.transactions);
      console.log(transactions)

    } catch (err) {
      console.log(err.response);
    } finally {
      setLoading(true);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    getAllTransactions();
  };

  const Listheader = () => {
    return (
      <View style={styles.listHeaderContainer}>
        <View>
          <Text style={styles.leftsideHeader}>What you’ve been up to</Text>
        </View>
        {/* <View>
          <Text style={styles.rightsideHeader}>See All</Text>
        </View> */}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* heading */}
      <View style={styles.contentContainer}>
        <Text style={styles.headerText}>History</Text>

        <View style={styles.listContainer}>
          {DATA.length > 0 && <Listheader />}

          <FlatList
            style={{ paddingTop: 10 }}
            data={formatData(transactions)}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
                progressBackgroundColor="white"
                colors={["#003AD6"]}
                tintColor={"#003AD6"}
              />
            }
            // refreshing={refreshing}
            // onRefresh={handleRefresh}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }: any) => (
              <Transactionhistory date={item.time} datas={item.data} />
            )}
            keyExtractor={(item) => item.time}
            ListEmptyComponent={<EmptyComponent />}
          />
        </View>
      </View>

      {/* <Bottombtn
        title="+ NEW TRANSACTIONS"
        onpress={() =>navigation.navigate("Newtransactions")}
      /> */}
    </View>
  );
};

export default Transactions;
