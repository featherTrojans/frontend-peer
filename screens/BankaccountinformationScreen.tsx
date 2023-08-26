import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { BankaccountinformationScreenStyles } from "../assets/styles/screens";
import {
  FTCustombutton,
  FTDetailsModal,
  FTInput,
  FTTitlepagewrapper,
} from "../components";
import { useForm } from "react-hook-form";
import { VALIDATION, navigation } from "../utils";
import { icons } from "../constants";
import { useAlert } from "../hooks";
import axiosCustom from "../httpRequests/axiosCustom";
import amountFormatter from "../utils/formatMoney";

const {} = BankaccountinformationScreenStyles;
const { Blacksendicon } = icons;

const BankaccountinformationScreen = ({ route }) => {
  const bankvalue = route?.params?.bankvalue;
  const bankimage = route?.params?.bankimage;
  const amount = route?.params?.amount;
  const { control, handleSubmit } = useForm({ mode: "all" });
  const [showModal, setShowModal] = useState(false);
  const [content, setContent] = useState<any>({ child: null });
  const [accountInformation, setAccountInformation] = useState({});
  const [loading, setLoading] = useState(false);
  const { errorAlert } = useAlert();

  const switchModals = (value, acctdata) => {
    const action = async (pin) => {
      try {
        await axiosCustom.post("/withdraw", {
          amount: Number(amount),
          account_code: acctdata?.account_code,
          userPin: pin,
        });
        navigation.navigate("transactionsuccess_screen");
      } catch (err) {
        console.log(err.response);
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
          rightSide: "250",
        },
        {
          leftSide: "Total to be sent",
          rightSide: `N${Number(amount) + 250}`,
        },
      ],
    };

    switch (value) {
      case 0:
        setContent({
          child: (
            <FTDetailsModal
              modalTitle="Bank Details"
              title={acctdata?.account_name}
              info={acctdata?.account_number + "-" + acctdata?.bank_name}
              onPress={() =>
                navigation.navigate("transactionsummary_screen", {
                  action,
                  summaryinfo,
                })
              }
              imageUrl={bankimage}
              bG={""}
            />
          ),
        });
        setShowModal((s) => !s);
        break;

      default:
        break;
    }
  };

  const onSubmit = async (datas) => {
    console.log(datas);

    setLoading(true);
    try {
      const response = await axiosCustom({
        method: "post",
        url: "/account/get",
        data: { account_number: datas.accountNumber, bank_name: bankvalue },
      });
      console.log(response.data, "this");
      setAccountInformation(response?.data?.data);
      switchModals(0, response?.data?.data);
    } catch (err) {
      setAccountInformation({});
      errorAlert(err);
    }
    setLoading(false);
  };
  return (
    <FTTitlepagewrapper
      title="Bank account information"
      modalChildren={content.child}
      showModal={showModal}
      setShowModal={setShowModal}
      modalHeight={276}
    >
      <FTInput
        placeholderText="Enter Number"
        label="Enter destination bank account"
        name="accountNumber"
        control={control}
        textInputProps={{
          maxLength: 11,
          keyboardType: "number-pad",
          returnKeyType:"done"
        }}
        rules={VALIDATION.ACCOUNT_NUMBER_INPUT_VALIDATION}
        mB={20}
        mT={20}
      />
      <FTCustombutton btntext="Continue" onpress={handleSubmit(onSubmit)} />
    </FTTitlepagewrapper>
  );
};

export default BankaccountinformationScreen;

const styles = StyleSheet.create({});
