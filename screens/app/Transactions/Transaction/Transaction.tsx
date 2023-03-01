import React, { useEffect, useMemo, useState } from "react";
import {
  Text,
  View,
  RefreshControl,
  ActivityIndicator,
  Animated,
  Pressable,
} from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import {
  Emptycomponent,
  Horizontaline,
  Transactionhistory,
} from "../../../../components";
import { COLORS, FONTS, fontsize, icons } from "../../../../constants";
import axiosCustom from "../../../../httpRequests/axiosCustom";
import formatData from "../../../../utils/fomatTrans";

import { styles } from "./Transaction.styles";
import Customstatusbar from "../../../shared/Customstatusbar";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import useCustomModal from "../../../../utils/useCustomModal";

const {
  Withdrawicon,
  Transfericon,
  Paybillicon,
  Fundwalleticon,
  Walletactionicon,
  Historyicon,
} = icons;

const Transactions = ({ navigation }: any) => {
  const [transactions, setTransations] = useState();
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const { openModal, CustomModal } = useCustomModal();

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

  const options = [
    {
      title: "Withdraw",
      Icon: Withdrawicon,
      color: "#E5FAF6",
      action: () => navigation.navigate("Withdrawal"),
    },
    {
      title: "Transfer",
      Icon: Transfericon,
      color: "#FFE3E3",
      action: openModal,
    },
    {
      title: "Bills",
      Icon: Paybillicon,
      color: "#D2EAFD",
      action: () => console.log("Paybills"),
    },
    {
      title: "Fund",
      Icon: Fundwalleticon,
      color: "#F1E5FF",
      action: () => console.log("Fund"),
    },
  ];
  const snapPoints = useMemo(() => ["45%", "65%", "98%"], []);

  return (
    <View style={[styles.container, { paddingTop: getStatusBarHeight(true) }]}>
      <View style={styles.contentContainer}>
        <Customstatusbar />

        <CustomModal>
          <View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text
                style={{
                  ...fontsize.smaller,
                  ...FONTS.semibold,
                  color: COLORS.blue9,
                }}
              >
                Transfer Cash
              </Text>
              <View style={{ alignItems: "flex-end" }}>
                <Text
                  style={{
                    ...fontsize.xsmallest,
                    ...FONTS.regular,
                    color: COLORS.blue9,
                  }}
                >
                  Primary Wallet Balance
                </Text>
                <Text
                  style={{
                    ...fontsize.smaller,
                    ...FONTS.bold,
                    color: COLORS.blue6,
                    marginTop: 9,
                  }}
                >
                  N332,500.50
                </Text>
              </View>
            </View>

            <View style={{ marginTop: 40 }}>
              <View style={{ flexDirection: "row" }}>
                <View
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 36 / 2,
                    backgroundColor: COLORS.lightBlue2,
                  }}
                >
                  {/* icons */}
                </View>
                <View style={{ marginLeft: 18 }}>
                  <Text>To Feather Wallet</Text>
                  <Text>Send cash to other feather users.</Text>
                </View>
              </View>

              <Horizontaline marginV={22} />
            </View>
          </View>
        </CustomModal>

        <View style={styles.optionsContainer}>
          <View style={styles.leftheaderWrapper}>
            <View style={styles.leftHeader}>
              {/* icons */}
              <Walletactionicon />
              <Text style={styles.walletActions}>Wallet Actions</Text>
            </View>

            <Text style={styles.balance}>
              Balance:
              <Text style={styles.balanceAmount}> N24,458,890 </Text>
            </Text>
          </View>
          <Horizontaline marginV={14} />

          <View style={styles.optionWrapper}>
            {options.map(({ title, color, Icon, action }, index) => {
              return (
                <Pressable
                  onPress={action}
                  style={styles.optionBlock}
                  key={index}
                >
                  <View style={[styles.eachOption, { backgroundColor: color }]}>
                    <Icon />
                  </View>
                  <Text style={styles.eachOptionTitle}>{title}</Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <BottomSheet
          index={0}
          snapPoints={snapPoints}
          style={{
            paddingHorizontal: 24,
          }}
        >
          <View style={styles.bottomsheetHeader}>
            <View style={styles.historyIconWrap}>
              {/* icons */}
              <Historyicon />
              <Text style={styles.historyText}>History</Text>
            </View>

            <Text style={styles.viewAll}>View All</Text>
          </View>

          <Horizontaline marginV={24} />

          <View style={styles.listContainer}>
            {loading ? (
              <View style={styles.loaderWrapper}>
                <ActivityIndicator size="large" color={COLORS.blue6} />
              </View>
            ) : (
              <>
                <Animated.FlatList
                  data={formatData(transactions)}
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
                  keyExtractor={(item: { time: string }) => item.time}
                  ListEmptyComponent={
                    <Emptycomponent
                      size={135}
                      msg="Padi, you have not performed any transactions yet. "
                    />
                  }
                />
              </>
            )}
          </View>
        </BottomSheet>
      </View>
    </View>
  );
};

export default Transactions;
