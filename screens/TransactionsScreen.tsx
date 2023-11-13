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
import { useAlert } from "../hooks";

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
  const [withdrawLoading, setWithdrawLoading] = useState(false);
  const walletbalance = amountFormatter(authdata?.userDetails?.walletBal);
  const { errorAlert } = useAlert();

  const onsubmitfindmerchant = async (amount) => {
    if (amount > authdata?.userDetails?.walletBal) {
      return errorAlert(null, "amount is greater than wallet");
    }
    navigation.navigate("withdrawcash_screen", amount);
  };

  const findmerchant = async () => {
    setWithdrawLoading(true);
    const response = await axiosCustom.get("/request/accepted");
    setWithdrawLoading(false);
    if (response.data && response.data.data.length > 0) {
      return navigation.navigate("withdrawcash_screen", {
        agentinfo: response?.data?.data[0],
        amount: 0,
      });
    }
    return navigation.navigate("amounttosend_screen", {
      buttontext: "Withdraw Cash",
      headtext: `Balance : N${walletbalance}`,
      onsubmit: onsubmitfindmerchant,
    });
  };

  const switchModals = (value) => {
    switch (value) {
      case 0:
        setContent({ child: <FTTransfer />, height: 360 });
        setShowModal((s) => !s);
        break;
      case 1:
        findmerchant();
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
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={action}
                style={optionBlock}
                key={index}
              >
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
