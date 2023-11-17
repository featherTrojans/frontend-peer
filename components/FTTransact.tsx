import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useMemo, useState, memo, useCallback } from "react";
import { FTEmptycomponent, FTHorizontaline, FTTransactionhistory } from ".";
import Animated from "react-native-reanimated";
import { RefreshControl } from "react-native-gesture-handler";
import { COLORS } from "../constants";
import formatData from "../utils/fomatTrans";
import axiosCustom from "../httpRequests/axiosCustom";

const FTTransact = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [transactions, setTransations] = useState([]);
  const [page, setPage] = useState(1);
  useEffect(() => {
    getAllTransactions(1);
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    getAllTransactions(1);
  };

  const getAllTransactions = async (page) => {
    try {
      setLoading(true);
      const response = await axiosCustom.get(
        `/transactions?page=${page}&data=2`
      );
      const tranc = response?.data?.data?.transactions;
      console.log(tranc, "tranc");
      if (tranc.length > 0) {
        console.log("another once");
        setTransations([...transactions, ...tranc]);
        setPage(page + 1);
      }
    } catch (err) {
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const getAllTransactionsByPage = async (page) => {
    try {
      const response = await axiosCustom.get(
        `/transactions?page=${page}&data=20`
      );
      const tranc = response?.data?.data?.transactions;
      console.log(tranc, "tranc");
      if (tranc.length > 0) {
        console.log("another once");
        setTransations([...transactions, ...tranc]);
        setPage(page + 1);
      }
    } catch (err) {
    } finally {
    }
  };

  const histories: any[] = useMemo(
    () => formatData(transactions),
    [transactions]
  );

  const renderEachTransaction = useCallback(({ item, index }) => {
    return (
      <>
        <FTTransactionhistory
          date={item.time}
          datas={item.data}
          index={index}
        />
        <FTHorizontaline marginV={15} />
      </>
    );
  }, []);

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 24,
        backgroundColor: COLORS.white,
        paddingTop: 28,
        borderRadius: 20,
      }}
    >
      <View
        style={{
          flex: 1,
        }}
      >
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
              data={histories}
              initialNumToRender={10}
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
              renderItem={renderEachTransaction}
              keyExtractor={(item: { time: string }) => item.time}
              onEndReachedThreshold={0.5}
              onEndReached={() => getAllTransactionsByPage(page)}
              ListEmptyComponent={
                <FTEmptycomponent
                  size={135}
                  msg="Padi, you have not performed any transactions yet. "
                  showTransact={false}
                />
              }
            />
          </>
        )}
      </View>
    </View>
  );
};

export default memo(FTTransact);

const styles = StyleSheet.create({});
