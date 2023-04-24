import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import {
  Backheader,
  Mainwrapper,
  Custombutton,
  Transactionsummarytwo,
  Transactionpin,
  Chooseamountmodal,
} from "../../../components";
import { COLORS, FONTS, fontsize, icons } from "../../../constants";
import useCustomModal from "../../../utils/useCustomModal";

const { Newlogo } = icons;

interface withdrawobj {
  reference: string;
  amount: string;
  charges: string;
  total: string;
  negotiatedFee: string;
  agent: string;
  agentUsername: string;
  phoneNumber: string;
  status: string;
  meetupPoint: string;
  createdAt: string;
  agentImage: null;
}

enum comingFromEnum {
  withdrawPending,
  withdrawAccepted,
  depositPending,
  depositAccepted,
}

const Safetycautions = ({ navigation, route }) => {
  const info = route.params.info as withdrawobj;
  const comingFrom = route.params.comingFrom as comingFromEnum;
  const [negotiatedamount, setnegotiatedamount] = useState(0);
  const { CustomModal, closeModal, openModal } = useCustomModal();
  const {
    CustomModal: AmountModal,
    closeModal: closeAmountModal,
    openModal: openAmountModal,
  } = useCustomModal();
  const {
    CustomModal: PinModal,
    closeModal: pinCloseModal,
    openModal: pinOpenModal,
  } = useCustomModal();

  const handleNexttwo = (charge) => {
    setnegotiatedamount(charge);
    closeAmountModal();
    openModal();
  };

  const handleNext = () => {
    closeModal();
    navigation.navigate("WithdrawPin", {
      info: info,
      charge: negotiatedamount,
    });
  };

  return (
    <Mainwrapper>
      <Backheader title="Safety Precautions" />
      <AmountModal>
        <Chooseamountmodal
          headerText="Pls input the charge agreed between you and the merchant"
          onpress={(amount) => {
            handleNexttwo(amount);
          }}
        />
      </AmountModal>
      <CustomModal>
        <Transactionsummarytwo
          info={{ ...info, negotiatedFee: negotiatedamount }}
          openNextModal={handleNext}
          fromWithdraw={
            comingFromEnum.withdrawAccepted == comingFrom ? true : false
          }
        />
      </CustomModal>
      <PinModal>
        <Transactionpin info={info} />
      </PinModal>

      <View style={{ paddingHorizontal: 15, flex: 1 }}>
        <Newlogo />

        <View style={{ marginTop: 36 }}>
          <Text style={{ ...fontsize.bbsmall, ...FONTS.medium }}>
            Hey! Safety First.{" "}
            <Text style={{ color: COLORS.blue6 }}>Money Next.</Text>
          </Text>
          <Text
            style={{
              ...fontsize.smaller,
              marginTop: 20,
              ...FONTS.regular,
              color: COLORS.grey2,
              lineHeight: 20,
            }}
          >
            We take the security and safety of our customers very seriously,
            kindly ensure you adhere to the safety advices below before
            proceeding.
          </Text>
        </View>

        <View style={{ marginTop: 48 }}>
          <Text
            style={{
              ...fontsize.small,
              ...FONTS.regular,
              color: COLORS.blue9,
              lineHeight: 24,
            }}
          >
            1. It is advisable that you meet-up in an open or public place.
          </Text>

          <Text
            style={{
              ...fontsize.small,
              ...FONTS.regular,
              color: COLORS.blue9,
              lineHeight: 24,
              marginTop: 20,
            }}
          >
            2. Ensure that the cash you are about to give is complete and
            certified as “good” by the withdrawer.
          </Text>

          <Text
            style={{
              ...fontsize.small,
              ...FONTS.regular,
              color: COLORS.blue9,
              lineHeight: 24,
              marginTop: 20,
            }}
          >
            3. Make sure that the user inputs transaction PIN on your device
            personally, do not assist anyone with inputting the transaction PIN.
          </Text>
        </View>
      </View>
      <View style={{ paddingHorizontal: 15, paddingBottom: 20 }}>
        <Text
          style={{
            textAlign: "center",
            marginBottom: 30,
            ...fontsize.smallest,
            ...FONTS.regular,
            color: COLORS.grey16,
            lineHeight: 24,
          }}
        >
          For more information visit{" "}
          <Text style={{ color: COLORS.blue9 }}>www.feather.africa/faq</Text>
        </Text>
        <Custombutton
          btntext="I Understand, Proceed"
          bg={COLORS.blue9}
          onpress={openAmountModal}
        />
      </View>
    </Mainwrapper>
  );
};

export default Safetycautions;

const styles = StyleSheet.create({});
