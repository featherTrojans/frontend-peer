import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SearchmerchantidScreenStyles } from "../assets/styles/screens";
import {
  FTCustombutton,
  FTHeaderandsubheader,
  FTIconwithtitleandinfo,
  FTInput,
  FTTitlepagewrapper,
} from "../components";
import { useForm } from "react-hook-form";
import { COLORS, FONTS, fontsize, icons } from "../constants";
import { VALIDATION } from "../utils";
import { useAlert } from "../hooks";
import axiosCustom from "../httpRequests/axiosCustom";
import amountFormatter from "../utils/formatMoney";
const {} = SearchmerchantidScreenStyles;
const { Bluecardicon } = icons;

const SearchmerchantidScreen = ({ route, navigation }) => {
  const amount = route?.params?.amount;
  const { errorAlert } = useAlert();
  const { control, handleSubmit } = useForm({ mode: "all" });
  const [showModal, setShowModal] = useState(false);
  const [content, setContent] = useState<any>({ child: null, height: 200 });
  const [loading, setLoading] = useState(false);
  const [merchantinfo, setmerchantinfo] = useState({});

  const action = async (pin) => {
    try {
      await axiosCustom.post("/merchant/transfer", {
        amount: Number(amount),
        transferTo: merchantinfo.merchantid,
        userPin: pin,
      });
      navigation.navigate("transactionsuccess_screen");
    } catch (err) {
      throw err;
    }
  };
  const closeModalAndRedirect = () => {
    const summaryinfo = {
      amount: amount,
      transactionDatas: [
        {
          leftSide: "Merchant Name",
          rightSide: merchantinfo?.business_name,
        },
        {
          leftSide: "Merchant ID",
          rightSide: merchantinfo?.merchantid,
        },
        {
          leftSide: "Charges",
          rightSide: "free",
        },
        {
          leftSide: "Total to be sent",
          rightSide: `N${amountFormatter(amount)}`,
        },
      ],
    };
    setShowModal(false);
    navigation.navigate("transactionsummary_screen", { action, summaryinfo });
  };

  const ModalContent = ({ merchantinfo }) => {
    return (
      <View style={{ backgroundColor: "#fff" }}>
        <Text
          style={{
            ...fontsize.xsmallest,
            ...FONTS.semibold,
            color: COLORS.blue9,
          }}
        >
          Merchant Details
        </Text>
        <View style={{ marginVertical: 35 }}>
          <FTIconwithtitleandinfo
            title={merchantinfo?.business_name}
            info={`${merchantinfo?.freeWithdrawal} Transactions`}
            onPress={() => console.log("Yes")}
            Icon={Bluecardicon}
            bG="red"
          />
        </View>
        <FTCustombutton btntext="Continue" onpress={closeModalAndRedirect} />
      </View>
    );
  };

  const switchModals = (value) => {
    switch (value) {
      case 0:
        setContent({
          child: <ModalContent merchantinfo={merchantinfo} />,
          height: 270,
        });
        setShowModal((s) => !s);
        break;

      default:
        break;
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axiosCustom.get(
        `/merchant/detail/${data.merchantid}`
      );
      console.log(response.data.data, "Merchnat info");
      setmerchantinfo({ merchantid: data.merchantid, ...response.data.data });
      switchModals(0);
    } catch (err) {
      errorAlert(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FTTitlepagewrapper
      title="Merchant ID"
      modalChildren={content.child}
      showModal={showModal}
      setShowModal={setShowModal}
      modalHeight={content.height}
    >
      <FTHeaderandsubheader
        header="Enter Merchant ID"
        subHeader="The merchant ID, is the unique Identifier that is assigned to a merchant to receive payments"
      />

      <FTInput
        label="Merchant ID"
        mT={40}
        placeholderText="Enter 10 digit ID"
        name="merchantid"
        rules={VALIDATION.MERCHANTID_VALIDATION}
        control={control}
        textInputProps={{
          keyboardType: "number-pad",
          returnKeyType: "done",
          maxLength: 11,
        }}
      />
      <View style={{ flex: 1 }}></View>

      <FTCustombutton btntext="Continue" onpress={handleSubmit(onSubmit)} />
    </FTTitlepagewrapper>
  );
};

export default SearchmerchantidScreen;

const styles = StyleSheet.create({});
