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
  Iconandinfo,
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
  Walletblueicon,
  Bankblueicon,
  Paymerchanticon, Searchmerchanticon
} = icons;

const Transactions = ({ navigation }) => {
  const [transactions, setTransations] = useState();
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const {openModal: openWithdrawModal, closeModal: closeWithdrawModal, CustomModal: WithdrawModal} = useCustomModal()
  const { openModal: openTransferModal, closeModal: closeTransferModal, CustomModal: TransferModal } = useCustomModal();

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
  const snapPoints = useMemo(() => ["45%", "65%", "98%"], []);

  const reNavigate = (screenName: String) => {
    closeTransferModal();
    closeWithdrawModal()
    navigation.navigate(screenName);
  };

  return (
    <View style={[styles.container, { paddingTop: getStatusBarHeight(true) }]}>
      <View style={styles.contentContainer}>
        <Customstatusbar />


        {/* Transfer Modal */}
        <TransferModal>
          <View>
            <View style={styles.transferTypeModalHeader}>
              <Text style={styles.transferCashText}>Transfer Cash</Text>

              <View style={{ alignItems: "flex-end" }}>
                <Text style={styles.primaryWalletText}>
                  Primary Wallet Balance
                </Text>

                <Text style={styles.primaryWalletBalanceText}>N332,500.50</Text>
              </View>
            </View>

            <View style={{ marginTop: 40 }}>
              <Iconandinfo
                action={() => reNavigate("Feathertransfer")}
                title="To Feather Wallet"
                info="Send cash to other feather users."
                Icon={Walletblueicon}
              />
              <Horizontaline marginV={22} />
              <Iconandinfo
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
              <Text style={styles.transferCashText}>Withdraw Options</Text>

            <View style={{ marginTop: 40 }}>
              <Iconandinfo
                action={() => reNavigate("Paymerchant")}
                title="Pay Merchant (Agent/Business)"
                info="Withdraw from feather verified merchants"
                Icon={Paymerchanticon}
              />
              <Horizontaline marginV={22} />
              <Iconandinfo
                action={() => reNavigate("Withdrawlisting")}
                title="Search Merchants"
                info="Find merchants around you to withdraw."
                Icon={Searchmerchanticon}
              />
            </View>
          </View>
        </WithdrawModal>



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

        {/* <BottomSheet
          index={0}
          snapPoints={snapPoints}
          style={{
            paddingHorizontal: 24,
          }}
        > */}
        <View
        
        style={{
          flex: 1,
          paddingHorizontal: 24,
          backgroundColor: COLORS.white,
          paddingTop: 28,
          borderRadius: 20
        }}
        >
        

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
          </View>
        {/* </BottomSheet> */}
      </View>
    </View>
  );
};

export default Transactions;
