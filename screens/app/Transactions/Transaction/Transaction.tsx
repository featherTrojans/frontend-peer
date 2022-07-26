import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  RefreshControl,
  Platform,
  ActivityIndicator,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated
} from "react-native";
import LottieView from "lottie-react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useIsFocused, useScrollToTop } from "@react-navigation/native";
import { TabActions, useLinkTo } from "@react-navigation/native";

import { Bottombtn, Transactionhistory } from "../../../../components";
import { COLORS, icons, SIZES } from "../../../../constants";
import axiosCustom from "../../../../httpRequests/axiosCustom";
import formatData from "../../../../utils/fomatTrans";

import { styles } from "./Transaction.styles";
import Customstatusbar from "../../../shared/Customstatusbar";
import { RFValue } from "react-native-responsive-fontsize";
import { SafeAreaView } from "react-native-safe-area-context";
import { ifIphoneX, getStatusBarHeight } from "react-native-iphone-x-helper";

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

const Transactions = ({ navigation }: any) => {
  const [transactions, setTransations] = useState();
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const flatlistRef = useRef(null);

  ///States for the push notifications
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const isFocused = useIsFocused();
  const [pageVerticalOffset, setPageVerticalOffset] = useState<number>(0)
  const jumpToNewtransactions = TabActions.jumpTo("Transactions");
  const PAGE_OFFSET_THRESHOLD = SIZES.height
  const scrollX = useRef<any>(new Animated.Value(0)).current;

  const EmptyComponent = () => {
    return (
      <View style={styles.emptyListContainer}>
        {/* Crying icons */}
        {/* <Cryingicon /> */}
        <LottieView
          source={Cryinganimate}
          autoPlay
          loop
          style={{ width: RFValue(190), height: RFValue(190) }}
        />
        <View style={styles.textContainer}>
          <Text style={styles.emptyContainerText}>
            Padi, you have not performed any transactions yet.{" "}
            <Text
              style={styles.emptyContainerSubText}
              onPress={() => navigation.dispatch(jumpToNewtransactions)}
            >
              Transact Now
            </Text>
          </Text>
        </View>
      </View>
    );
  };

  const toTop = () => {
    flatlistRef.current?.scrollToOffset({ animated: true, offset: 0 });
  };

  if (isFocused) {
    toTop();
  }

  useEffect(() => {
    getAllTransactions();
  }, []);

  const getAllTransactions = async () => {
    try {
      setLoading(true);
      const response = await axiosCustom.get("/transactions");
      setTransations(response?.data?.data?.transactions);
    } catch (err) {
      console.log(err.response);
    } finally {
      setLoading(false);
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
    <View
      style={[styles.container, { paddingTop: getStatusBarHeight(true) + 30 }]}
    >
      {/* heading */}
      <View style={styles.contentContainer}>
        <Customstatusbar />

        <Text style={styles.headerText}>History</Text>

        <View style={styles.listContainer}>
          {loading ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ActivityIndicator size="large" color={COLORS.blue6} />
            </View>
          ) : (
            <>
              {DATA.length > 0 && <Listheader />}
              <Animated.FlatList
                ref={flatlistRef}
                style={{ paddingTop: 10 }}
                data={formatData(transactions)}
                // scrollEventThrottle={16}
                onScroll={event => {
                  setPageVerticalOffset(event.nativeEvent.contentSize.height);
                }}
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
                renderItem={({ item, index }: any) => (
                  <Transactionhistory
                    date={item.time}
                    datas={item.data}
                    index={index}
                  />
                )}
                keyExtractor={(item) => item.time}
                ListEmptyComponent={<EmptyComponent />}
              />
            </>
          )}
        </View>
{/* 
        {pageVerticalOffset > 1000 ? (
          <TouchableWithoutFeedback onPress={() => toTop()}>
          <View
            style={{
              width: RFValue(30),
              height: RFValue(30),
              borderRadius: RFValue(30 / 2),
              backgroundColor: COLORS.blue6,
              position: "absolute",
              right: 10,
              bottom: 20,
              // opacity: 0.2,
            }}
          />
        </TouchableWithoutFeedback>
        ): null} */}
        

      </View>
    </View>
  );
};

export default Transactions;
