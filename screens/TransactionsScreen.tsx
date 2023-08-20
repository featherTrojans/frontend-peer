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
  FTEmptycomponent,
  FTHorizontaline,
  FTIconandinfo,
  FTIconwithbg,
  FTIconwithtitleandinfo,
  FTTabWrapper,
  FTTransactionhistory,
} from "../components";

import { COLORS, icons } from "../constants";
import axiosCustom from "../httpRequests/axiosCustom";
import formatData from "../utils/fomatTrans";

import { TransactionScreenStyles } from "../assets/styles/screens";
import { AuthContext } from "../context/AuthContext";
import { navigation, redirectTo } from "../utils";

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
  const { setShowTabs } = useContext(AuthContext);
  const [transactions, setTransations] = useState();
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);
  const [content, setContent] = useState<any>({ child: null, height: 266 });

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
  const closeModalAndRedirect = (redirectScreenName) => {
    redirectTo(redirectScreenName);
    // setShowTabs(true)
    // setShowModal(false)
  };

  const TransferModal = () => {
    const onsubmitToFeatherWallet = async (amount) => {
      navigation.navigate("choosefeatheruser_screen");
    };
    const onsubmitToBankAccount = async (amount) => {
      navigation.navigate("choosefeatheruser_screen");
    };

    return (
      <View>
        <View style={transferTypeModalHeader}>
          <Text style={transferCashText}>Transfer Cash</Text>

          <View style={{ alignItems: "flex-end" }}>
            <Text style={primaryWalletText}>Primary Wallet Balance</Text>

            <Text style={primaryWalletBalanceText}>N332,500.50</Text>
          </View>
        </View>

        <View style={{ marginTop: 40 }}>
          <FTIconwithtitleandinfo
            title="To Feather Wallet"
            info="Send cash to other feather users."
            Icon={Walletblueicon}
            onPress={() =>
              navigation.navigate("amounttosend_screen", {
                nextScreen: "choosefeatheruser_screen",
                onsubmit: onsubmitToBankAccount,
              })
            }
            bG={COLORS.Tblue}
          />

          <FTHorizontaline marginV={15} />
          <FTIconwithtitleandinfo
            title="To Bank Account"
            info="Transfer money to any bank in Nigeria."
            Icon={Bankblueicon}
            onPress={() =>
              navigation.navigate("amounttosend_screen", {
                nextScreen: "choosefeatheruser_screen",
                onsubmit: onsubmitToFeatherWallet,
              })
            }
            bG={COLORS.Tyellow}
          />
        </View>
      </View>
    );
  };

  const WithdrawModal = () => {
    return (
      <View>
        <Text style={transferCashText}>Withdraw Options</Text>

        <View style={{ marginTop: 40 }}>
          <FTIconwithtitleandinfo
            title="Pay Known Merchant"
            info="Withdraw from feather verified merchants"
            Icon={Paymerchanticon}
            onPress={() => closeModalAndRedirect("withdrawcash_screen")}
            bG={COLORS.Tyellow}
          />

          <FTHorizontaline marginV={15} />
          <FTIconwithtitleandinfo
            title="Find Merchants"
            info="Find merchants around you to withdraw."
            Icon={Searchmerchanticon}
            onPress={() => closeModalAndRedirect("searchmerchantid_screen")}
            bG={COLORS.Tpurple}
          />
        </View>
      </View>
    );
  };

  const BillpaymentsModal = () => {
    return (
      <View>
        <Text style={transferCashText}>Bill Payments</Text>

        <View style={{ marginTop: 40 }}>
          <FTIconwithtitleandinfo
            title="Mobile Airtime & Data"
            info="Airtime and data from your network."
            Icon={Airtimeicon}
            onPress={() => closeModalAndRedirect("choosenetwork_screen")}
            bG={COLORS.Tblue3}
          />

          <FTHorizontaline marginV={15} />
          <FTIconwithtitleandinfo
            title="Electricity & Utility"
            info="Pay your power bills easily"
            Icon={Electricityicon}
            onPress={() => closeModalAndRedirect("choosebiller_screen")}
            bG={COLORS.Tyellow}
          />
          <FTHorizontaline marginV={15} />

          <FTIconwithtitleandinfo
            title="Cable TV Subscriptions"
            info="Pay your cable tv subscriptions"
            Icon={Cableicon}
            onPress={() => closeModalAndRedirect("choosecable_screen")}
            bG={COLORS.Tgreen}
          />
        </View>
      </View>
    );
  };

  const AddCashModal = () => {
    const onsubmit = async (amount) => {
      const response = await axiosCustom.post("/pay", { amount: amount });

      navigation.navigate("customweb_screen", {
        url: response.data.data.authorization_url,
        reference: response.data.data.reference,
        amount: amount,
      });
    };
    return (
      <View>
        <Text style={transferCashText}>Add Cash</Text>

        <View style={{ marginTop: 40 }}>
          <FTIconwithtitleandinfo
            title="Debit card, Bank or USSD"
            info="Secured by Paystack."
            Icon={Debitcardicon}
            onPress={() =>
              navigation.navigate("amounttosend_screen", {
                nextScreen: "choosefeatheruser_screen",
                onsubmit,
              })
            }
            bG={COLORS.Tblue3}
          />

          <FTHorizontaline marginV={15} />
          <FTIconwithtitleandinfo
            title="Feather Agents"
            info="Coming Soon!"
            Icon={Debitcardicon}
            onPress={() => console.log("Feather agents")}
            bG={COLORS.Tblue3}
          />

          <FTHorizontaline marginV={15} />
          <FTIconwithtitleandinfo
            title="Request from family & friends"
            info="Coming Soon!"
            Icon={Debitcardicon}
            onPress={() => console.log("Feather agents")}
            bG={COLORS.Tblue3}
          />
        </View>
      </View>
    );
  };

  const switchModals = (value) => {
    switch (value) {
      case 0:
        setContent({ child: <TransferModal />, height: 300 });
        setShowModal((s) => !s);
        setShowTabs(false);
        break;
      case 1:
        setContent({ child: <WithdrawModal />, height: 300 });
        setShowModal((s) => !s);
        setShowTabs(false);
        break;
      case 2:
        setContent({ child: <BillpaymentsModal />, height: 360 });
        setShowModal((s) => !s);
        setShowTabs(false);
        break;
      case 3:
        setContent({ child: <AddCashModal />, height: 360 });
        setShowModal((s) => !s);
        setShowTabs(false);
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
      action: () => switchModals(3),
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
            Balance:
            <Text style={balanceAmount}> N24,458,890 </Text>
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
