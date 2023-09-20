import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Text,
  View,
  RefreshControl,
  ActivityIndicator,
  Animated,
  Pressable,
  TouchableOpacity,
} from "react-native";

import {
  FTBillPayment,
  FTWithdraw,
  FTTransfer,
  FTEmptycomponent,
  FTIconwithbg,
  FTTabWrapper,
  FTTransactionhistory,
  FTHorizontaline,
  FTTransact,
} from "../components";

import { COLORS, icons } from "../constants";
import axiosCustom from "../httpRequests/axiosCustom";
import formatData from "../utils/fomatTrans";

import { TransactionScreenStyles } from "../assets/styles/screens";
import { AuthContext } from "../context/AuthContext";
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
  Paybillicon,
  Fundwalleticon,
  Walletactionicon,
  Transfersicon,
} = icons;

const TransactionsScreen = ({ navigation }) => {
  const { setShowTabs, authdata } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [content, setContent] = useState<any>({ child: null, height: 266 });

  const switchModals = (value) => {
    switch (value) {
      case 0:
        setContent({ child: <FTTransfer />, height: 270 });
        setShowModal((s) => !s);
        break;
      case 1:
        setContent({ child: <FTWithdraw />, height: 270 });
        setShowModal((s) => !s);
        break;
      case 2:
        setContent({ child: <FTBillPayment />, height: 330 });
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
              <TouchableOpacity activeOpacity={0.8} onPress={action} style={optionBlock} key={index}>
                <FTIconwithbg onpress={action} Icon={Icon} bG={color} />
                <Text style={eachOptionTitle}>{title}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <FTTransact />
    </FTTabWrapper>
  );
};

export default TransactionsScreen;
