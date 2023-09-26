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
  const [transactions, setTransations] = useState();

  useEffect(() => {
    getAllTransactions();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    getAllTransactions();
  };

  const getAllTransactions = async () => {
    try {
      setLoading(true);
      const response = await axiosCustom.get("/transactions");
      setTransations(response?.data?.data?.transactions);
    } catch (err) {
    } finally {
      setLoading(false);
      setRefreshing(false);
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
              ListEmptyComponent={
                <FTEmptycomponent
                  size={135}
                  msg="Padi, you have not performed any transactions yet. "
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
