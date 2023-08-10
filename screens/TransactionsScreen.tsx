import React, { useEffect, useMemo, useState } from "react";
import {
  Text,
  View,
  RefreshControl,
  ActivityIndicator,
  Animated,
  Pressable,
} from "react-native";
import {
  FTEmptycomponent,
  FTHorizontaline,
  FTIconandinfo,
  FTTabWrapper,
  FTTransactionhistory,
} from "../components";

import { COLORS, icons } from "../constants";
import axiosCustom from "../httpRequests/axiosCustom";
import formatData from "../utils/fomatTrans";

import { getStatusBarHeight } from "react-native-iphone-x-helper";

import Customstatusbar from "./shared/Customstatusbar";
import { TransactionScreenStyles } from "../assets/styles/screens";
import { useCustomModal } from "../hooks";

const {
  container,
  contentContainer,
  listContainer,
  optionsContainer,
  leftheaderWrapper,
  leftHeader,
  walletActions,
  balance,
  balanceAmount,
  optionWrapper,
  optionBlock,
  eachOption,
  eachOptionTitle,
  bottomsheetHeader,
  historyIconWrap,
  historyText,
  viewAll,
  loaderWrapper,
  transferCashText,
  transferTypeModalHeader,
  primaryWalletBalanceText,
  primaryWalletText,
} = TransactionScreenStyles;

const {
  Withdrawicon,
  Transfericon,
  Paybillicon,
  Fundwalleticon,
  Walletactionicon,
  Historyicon,
  Walletblueicon,
  Bankblueicon,
  Paymerchanticon,
  Searchmerchanticon,
} = icons;

const TransactionsScreen = ({ navigation }) => {
  const [transactions, setTransations] = useState();
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const {
    openModal: openWithdrawModal,
    closeModal: closeWithdrawModal,
    CustomModal: WithdrawModal,
  } = useCustomModal();
  const {
    openModal: openTransferModal,
    closeModal: closeTransferModal,
    CustomModal: TransferModal,
  } = useCustomModal();

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
      action: openWithdrawModal,
    },
    {
      title: "Transfer",
      Icon: Transfericon,
      color: "#FFE3E3",
      action: openTransferModal,
    },
    {
      title: "Bills",
      Icon: Paybillicon,
      color: "#D2EAFD",
      action: () => navigation.navigate("Billsandutility"),
    },
    {
      title: "Fund",
      Icon: Fundwalleticon,
      color: "#F1E5FF",
      action: () => console.log("Fund"),
    },
  ];

  const reNavigate = (screenName: String) => {
    closeTransferModal();
    closeWithdrawModal();
    navigation.navigate(screenName);
  };

  return (
    <FTTabWrapper>

        {/* Transfer Modal */}
        <TransferModal>
          <View>
            <View style={transferTypeModalHeader}>
              <Text style={transferCashText}>Transfer Cash</Text>

              <View style={{ alignItems: "flex-end" }}>
                <Text style={primaryWalletText}>Primary Wallet Balance</Text>

                <Text style={primaryWalletBalanceText}>N332,500.50</Text>
              </View>
            </View>

            <View style={{ marginTop: 40 }}>
              <FTIconandinfo
                action={() => reNavigate("Feathertransfer")}
                title="To Feather Wallet"
                info="Send cash to other feather users."
                Icon={Walletblueicon}
              />
              <FTHorizontaline marginV={22} />
              <FTIconandinfo
                action={() => reNavigate("Banktransfer")}
                title="To Bank Account"
                info="Transfer money to any bank in Nigeria."
                Icon={Bankblueicon}
              />
            </View>
          </View>
        </TransferModal>

        {/* Withdrawal Modal */}
        <WithdrawModal>
          <View>
            <Text style={transferCashText}>Withdraw Options</Text>

            <View style={{ marginTop: 40 }}>
              <FTIconandinfo
                action={() => reNavigate("Paymerchant")}
                title="Pay Merchant (Agent/Business)"
                info="Withdraw from feather verified merchants"
                Icon={Paymerchanticon}
              />
              <FTHorizontaline marginV={22} />
              <FTIconandinfo
                action={() => reNavigate("Withdrawlisting")}
                title="Search Merchants"
                info="Find merchants around you to withdraw."
                Icon={Searchmerchanticon}
              />
            </View>
          </View>
        </WithdrawModal>

        <View style={optionsContainer}>
          <View style={leftheaderWrapper}>
            <View style={leftHeader}>
              {/* icons */}
              <Walletactionicon />
              <Text style={walletActions}>Wallet Actions</Text>
            </View>

            <Text style={balance}>
              Balance:
              <Text style={balanceAmount}> N24,458,890 </Text>
            </Text>
          </View>
          <FTHorizontaline marginV={14} />

          <View style={optionWrapper}>
            {options.map(({ title, color, Icon, action }, index) => {
              return (
                <Pressable onPress={action} style={optionBlock} key={index}>
                  <View style={[eachOption, { backgroundColor: color }]}>
                    <Icon />
                  </View>
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
