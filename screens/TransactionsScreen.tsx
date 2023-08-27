import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  Text,
  View,
  RefreshControl,
  ActivityIndicator,
  Animated,
  Pressable,
} from "react-native";
import {
  FTBillPayment,
  FTWithdraw,
  FTTransfer,
  FTAddcash,
  FTEmptycomponent,
  FTIconwithbg,
  FTTabWrapper,
  FTTransactionhistory,
} from "../components";

import { COLORS, icons } from "../constants";
import axiosCustom from "../httpRequests/axiosCustom";
import formatData from "../utils/fomatTrans";

import { TransactionScreenStyles } from "../assets/styles/screens";
import { AuthContext } from "../context/AuthContext";
import { redirectTo } from "../utils";
import amountFormatter from "../utils/formatMoney";

const {
  listContainer,
  optionsContainer,
  leftheaderWrapper,
  leftHeader,
  walletActions,
  balance,
  balanceAmount,
  optionWrapper,
  optionBlock,
  eachOptionTitle,
  loaderWrapper,
} = TransactionScreenStyles;

const {
  Withdrawicon,
  Fundwallet,
  Paybillicon,
  Fundwalleticon,
  Walletactionicon,
  Historyicon,
  Transfersicon,
  Walletblueicon,
  Bankblueicon,
  Paymerchanticon,
  Searchmerchanticon,
  Cableicon,
  Electricityicon,
  Airtimeicon,
  Debitcardicon,
} = icons;

const TransactionsScreen = ({ navigation }) => {
  const { setShowTabs, authdata } = useContext(AuthContext);
  const [transactions, setTransations] = useState();
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);
  const [content, setContent] = useState<any>({ child: null, height: 266 });

  useEffect(() => {
    getAllTransactions();



    return () => {
      console.log("yes")
    }

 
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


  const switchModals = (value) => {
    switch (value) {
      case 0:
        setContent({ child: <FTTransfer />, height: 300 });
        setShowModal((s) => !s);
        break;
      case 1:
        setContent({ child: <FTWithdraw />, height: 300 });
        setShowModal((s) => !s);
        break;
      case 2:
        setContent({ child: <FTBillPayment />, height: 360 });
        setShowModal((s) => !s);
        break;
      default:
        break;
    }
  };

  const options = [
    {
      title: "Withdraw",
      Icon: Withdrawicon,
      color: COLORS.Tblue2,
      action: () => switchModals(1),
    },
    {
      title: "Transfer",
      Icon: Transfersicon,
      color: COLORS.Tred,
      action: () => switchModals(0),
    },
    {
      title: "Bills",
      Icon: Paybillicon,
      color: COLORS.Tpurple2,
      action: () => switchModals(2),
    },
    {
      title: "Add Cash",
      Icon: Fundwalleticon,
      color: COLORS.Tgreen2,
      action: () => navigation.navigate("walletfunding_screen"),
    },
  ];

  return (
    <FTTabWrapper
      modalChildren={content.child}
      showModal={showModal}
      setShowModal={setShowModal}
      modalHeight={content.height}
      bgColor={COLORS.white3}
    >
      <View style={optionsContainer}>
        <View style={leftheaderWrapper}>
          <View style={leftHeader}>
            {/* icons */}
            <Walletactionicon />
            <Text style={walletActions}>Wallet Actions</Text>
          </View>

          <Text style={balance}>
            Balance:{" "}
            <Text style={balanceAmount}>
              N{amountFormatter(authdata?.userDetails?.walletBal)}
            </Text>
          </Text>
        </View>

        <View style={optionWrapper}>
          {options.map(({ title, color, Icon, action }, index) => {
            return (
              <Pressable onPress={action} style={optionBlock} key={index}>
                <FTIconwithbg Icon={Icon} bG={color} />
                <Text style={eachOptionTitle}>{title}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <View
        style={{
          flex: 1,
          paddingHorizontal: 24,
          backgroundColor: COLORS.white,
          paddingTop: 28,
          borderRadius: 20,
        }}
      >
        <View style={listContainer}>
          {loading ? (
            <View style={loaderWrapper}>
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
                  <FTTransactionhistory
                    date={item.time}
                    datas={item.data}
                    index={index}
                  />
                )}
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
    </FTTabWrapper>
  );
};

export default TransactionsScreen;
