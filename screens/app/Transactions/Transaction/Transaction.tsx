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
  Animated,
} from "react-native";
import LottieView from "lottie-react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useIsFocused, useScrollToTop } from "@react-navigation/native";
import { TabActions, useLinkTo } from "@react-navigation/native";

import {
  Backheader,
  Bottombtn,
  Mainwrapper,
  Transactionhistory,
} from "../../../../components";
import { COLORS, icons, SIZES } from "../../../../constants";
import axiosCustom from "../../../../httpRequests/axiosCustom";
import formatData from "../../../../utils/fomatTrans";

import { styles } from "./Transaction.styles";
import Customstatusbar from "../../../shared/Customstatusbar";
import { RFValue } from "react-native-responsive-fontsize";
import { SafeAreaView } from "react-native-safe-area-context";
import { ifIphoneX, getStatusBarHeight } from "react-native-iphone-x-helper";




const { Cryinganimate } = icons;

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
  const [pageVerticalOffset, setPageVerticalOffset] = useState<number>(0);
  const jumpToNewtransactions = TabActions.jumpTo("Transactions");
  const PAGE_OFFSET_THRESHOLD = SIZES.height;
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
          style={{ width: RFValue(155), height: RFValue(155) }}
        />
        <View style={styles.textContainer}>
          <Text style={styles.emptyContainerText}>
            Padi, you have not performed any transactions yet.{" "}
          </Text>
        </View>
      </View>
    );
  };

  useEffect(() => {
    getAllTransactions();
  }, []);

  const getAllTransactions = async () => {
    try {
      setLoading(true);
      const response = await axiosCustom.get("/transactions");
      setTransations(response?.data?.data?.transactions);
      console.log(transactions, "unfiltered");
      console.log(formatData(transactions), "filtered");
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

  return (
    <Mainwrapper bottom={false}>
      <Backheader title="History" showArrow={false} />
      <View style={styles.contentContainer}>

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
              <Animated.FlatList
                ref={flatlistRef}
                // style={{ paddingTop: 10 }}
                data={formatData(transactions)}
                // scrollEventThrottle={16}
                onScroll={(event) => {
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
      </View>
    </Mainwrapper>
  );
};

export default Transactions;
