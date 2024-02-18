import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
  ChoosefeatheruserScreenStyles,
  SendtobankScreenStyles,
} from "../assets/styles/screens";
import {
  FTEmptycomponent,
  FTIconwithtitleandinfo,
  FTLoader,
  FTSearchinput,
  FTTitlepagewrapper,
} from "../components";
import { COLORS, icons } from "../constants";
import axiosCustom from "../httpRequests/axiosCustom";
import amountFormatter from "../utils/formatMoney";
import { useAlert } from "../hooks";
import { useNavigation } from "@react-navigation/native";
import useBeneficiary from "../hooks/useBeneficiary";

const { listHeaderText } = ChoosefeatheruserScreenStyles;

const { Smallphoneicon, Nigerialogoicon, Whitebankicon } = icons;

const {} = SendtobankScreenStyles;

const BENEFICIARY_TYPE = "transferbank";

const ListHeader = ({ amount }) => {
  const navigation = useNavigation();
  return (
    <>
      <FTIconwithtitleandinfo
        title="Send to a new bank"
        info="Start a new transfer to a bank"
        onPress={() => navigation.navigate("choosebank_screen", { amount })}
        bG={COLORS.blue16}
        Icon={Whitebankicon}
        mB={40}
        badge={<Nigerialogoicon />}
      />
      <Text style={listHeaderText}>Send Beneficiaries</Text>
    </>
  );
};

const SendtobankScreen = ({ route, navigation }) => {
  const { errorAlert } = useAlert();
  const amount = route.params?.amount;
  const [loading, setLoading] = useState(false);

  const [filteredbeneficiaries, setFilteredbeneficiaries] = useState([]);
  const [search, setSearch] = useState("");
  const { beneficiaries, loading: beneficiary_loading } = useBeneficiary(
    BENEFICIARY_TYPE,
    "account_number"
  );

  useEffect(() => {
    setFilteredbeneficiaries(beneficiaries);
  }, [beneficiaries]);
  const handleToSendToBeneficiary = async (bank) => {
    try {
      setLoading(true);

      const response = await axiosCustom({
        method: "post",
        url: "/account/get",
        data: {
          account_number: bank.account_number,
          bank_name: bank?.bank_name,
        },
      });

      const acctdata = response?.data?.data;

      const action = async (pin) => {
        console.log(Number(amount));
        try {
          await axiosCustom.post("/withdraw", {
            amount: Number(amount),
            account_code: acctdata?.account_code,
            userPin: pin,
          });
          navigation.navigate("transactionsuccess_screen");
        } catch (err) {
          throw err;
        }
      };

      const summaryinfo = {
        amount: amountFormatter(amount),
        transactionDatas: [
          {
            leftSide: "Recipient Name",
            rightSide: acctdata?.account_name || "er",
          },
          {
            leftSide: "Recipient Bank",
            rightSide: acctdata?.account_number || "454",
          },
          {
            leftSide: "Charges",
            rightSide: `N${amountFormatter("50")}`,
          },
          {
            leftSide: "Total to be deducted",
            rightSide: `N${amountFormatter(Number(amount) + 50)}`,
          },
        ],
      };
      navigation.navigate("transactionsummary_screen", {
        action,
        summaryinfo,
        userInfo: bank,
      });
    } catch (err) {
      errorAlert(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (text) => {
    console.log(text, "here is the search");
    // name and account no
    // const newbeneferiacy = beneficiaries.filter((item) => {
    //   let lowitem = text.toLowerCase();
    //   return (
    //     item?.account_name?.toLowerCase().includes(lowitem) ||
    //     item?.account_number?.toLowerCase().includes(lowitem)
    //   );
    // });
    // setFilteredbeneficiaries(newbeneferiacy);
  };

  return (
    <FTTitlepagewrapper title="Send to bank account">
      <FTSearchinput
        value={search}
        onChange={() => console.log("yes")}
        placeholder="Search bank account"
      />
      <FTLoader loading={loading} />
      <FlatList
        data={filteredbeneficiaries}
        showsVerticalScrollIndicator={false}
        bounces={false}
        ItemSeparatorComponent={() => <View style={{ height: 28 }} />}
        renderItem={({ item }) => {
          return (
            <FTIconwithtitleandinfo
              title={item?.account_name}
              info={item?.account_number}
              onPress={() => handleToSendToBeneficiary(item)}
              bG={COLORS.white}
              imageUrl={item?.imageUrl}
            />
          );
        }}
        ListEmptyComponent={
          <FTEmptycomponent
            msg="Padi, you don't have any beneficiary"
            showTransact={false}
          />
        }
        ListHeaderComponent={<ListHeader amount={amount} />}
      />
    </FTTitlepagewrapper>
  );
};

export default SendtobankScreen;

const styles = StyleSheet.create({});
