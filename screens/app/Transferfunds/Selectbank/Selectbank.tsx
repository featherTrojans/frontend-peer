import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  Backheader,
  Custombutton,
  Horizontaline,
  Input,
  Mainwrapper,
} from "../../../../components";
import { COLORS, FONTS, fontsize, icons } from "../../../../constants";
import { electrictystyles } from "../../Billpayments/Electricity/Electricitytype/Electricitytype.styles";
import useCustomModal from "../../../../utils/useCustomModal";
import axiosCustom from "../../../../httpRequests/axiosCustom";
import useAlert from "../../../../utils/useAlerts";
import { nameSplitter } from "../../../../utils/nameSplitter";
import { nameToShow } from "../../../../utils/nameToShow";
import TransferCashBank from "../../../../components/Modals/TransferCashBank";
import amountFormatter from "../../../../utils/formatMoney";

const { Ashicon, Briefcaseicon, Forwardarrow } = icons;

const listOfbanks = [
  {
    value: "ACCESS",
    name: "Access Bank",
    logo: "https://firebasestorage.googleapis.com/v0/b/feather-340809.appspot.com/o/application_assets%2FAccess%20Bank%20PLC%20Logo%20(2).png?alt=media&token=386e3b4c-f645-408b-89cb-0b3e7cfe9322",
  },
  {
    value: "ECOBANK",
    name: "Ecobank",
    logo: "https://firebasestorage.googleapis.com/v0/b/feather-340809.appspot.com/o/application_assets%2FEcobank%20Logo%20(1).png?alt=media&token=09741faa-a4cc-454a-952b-dbf4071784f8",
  },
  {
    value: "FCMB",
    name: "First City Monument Bank",
    logo: "https://firebasestorage.googleapis.com/v0/b/feather-340809.appspot.com/o/application_assets%2FFirst%20City%20Monument%20Bank%20Ltd%20Logo%20(1).png?alt=media&token=24d59412-c43f-49cf-bf03-2a42cada86a2",
  },
  {
    value: "FIRST",
    name: "First Bank",
    logo: "https://firebasestorage.googleapis.com/v0/b/feather-340809.appspot.com/o/application_assets%2FFirst%20Bank%20Nigeria%20Logo%20(1).png?alt=media&token=c5699cab-aece-48fe-954e-578e534c942b",
  },
  {
    value: "FIDELITY",
    name: "Fidelity Bank",
    logo: "https://firebasestorage.googleapis.com/v0/b/feather-340809.appspot.com/o/application_assets%2FFidelity%20Bank%20Nigeria%20Logo%20(1).png?alt=media&token=b7ad1461-de90-4311-94d2-d2287f3d99fa",
  },
  {
    value: "GTB",
    name: "Guaranty Trust Bank",
    logo: "https://firebasestorage.googleapis.com/v0/b/feather-340809.appspot.com/o/application_assets%2FGuaranty%20Trust%20Bank%20Logo%20(1).png?alt=media&token=d9a0af12-48d9-4ded-a612-543502ebc658",
  },
  {
    value: "HERITAGE",
    name: "Heritage Bank",
    logo: "https://firebasestorage.googleapis.com/v0/b/feather-340809.appspot.com/o/application_assets%2FHeritage%20Bank%20PLC%20Logo%20(1).png?alt=media&token=1ca06796-6dac-43aa-91f6-66c9cc4d9fee",
  },
  {
    value: "JAIZ",
    name: "Jaiz Bank PLC",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSiQ7OKpP8Eys6O2KgXQLs80w6Gv1aO7NpXw&usqp=CAU",
  },
  {
    value: "KEYSTONE",
    name: "Keystone Bank",
    logo: "https://firebasestorage.googleapis.com/v0/b/feather-340809.appspot.com/o/application_assets%2FKeystone%20Bank%20Limited%20Logo%20(1).png?alt=media&token=2916f8dd-3300-4388-b8fd-0eaf49c0edfc",
  },
  {
    value: "KUDA",
    name: "Kuda Microfinance Bank",
    logo: "https://firebasestorage.googleapis.com/v0/b/feather-340809.appspot.com/o/application_assets%2FKuda%20Bank%20Logo%20(1).png?alt=media&token=7e282329-f902-4814-83e6-948ab38d8261",
  },
  {
    value: "Opay(PAYCOM)",
    name: "Paycom",
    logo: "https://firebasestorage.googleapis.com/v0/b/feather-340809.appspot.com/o/application_assets%2FidW2zUwfi4.png?alt=media&token=06c3e6c8-6eaf-45ad-af32-edae6f00b27e",
  },
  {
    value: "Moniepoint MFB",
    name: "Moniepoint",
    logo: "https://firebasestorage.googleapis.com/v0/b/feather-340809.appspot.com/o/application_assets%2Fmoniepoint.png?alt=media&token=0f2820ec-c043-4820-ae21-7e5c06185d84",
  },
  {
    value: "PalmPay",
    name: "PalmPay",
    logo: "https://firebasestorage.googleapis.com/v0/b/feather-340809.appspot.com/o/application_assets%2Fpalmpay.png?alt=media&token=e82c7a0b-da32-46f6-8121-9e38165fd0b7",
  },
  {
    value: "POLARIS",
    name: "Polaris Bank (Skye Bank PLC)",
    logo: "https://firebasestorage.googleapis.com/v0/b/feather-340809.appspot.com/o/application_assets%2FPolaris%20Bank%20Logo%20(1).png?alt=media&token=b25a8580-0c2b-4c31-ae77-ab66712f7216",
  },
  {
    value: "PROVIDUS",
    name: "Providus Bank",
    logo: "https://firebasestorage.googleapis.com/v0/b/feather-340809.appspot.com/o/application_assets%2FProvidus-Bank-Logo.png?alt=media&token=f6d17675-97d5-45bf-916b-aec50f6af9c1",
  },
  {
    value: "STANBIC",
    name: "Stanbic IBTC Bank",
    logo: "https://firebasestorage.googleapis.com/v0/b/feather-340809.appspot.com/o/application_assets%2FStanbic%20IBTC%20Bank%20Logo%20(1).png?alt=media&token=c8261d8b-aff9-43cb-9bd5-3f69bcf0a025",
  },
  {
    value: "STERLING",
    name: "Sterling Bank PLC",
    logo: "https://firebasestorage.googleapis.com/v0/b/feather-340809.appspot.com/o/application_assets%2FSterling%20Bank%20Plc%20Logo%20(1).png?alt=media&token=ea1cac35-74e2-468c-8aed-cf60a357303b",
  },

  {
    value: "TAJ",
    name: "TAJ",
    logo: "https://firebasestorage.googleapis.com/v0/b/feather-340809.appspot.com/o/application_assets%2Ftajbank-logo-xlarge-1024x426.png?alt=media&token=491f11db-a73d-4e31-be5d-572bcdf1c1ee",
  },
  {
    value: "UBA",
    name: "United Bank of Africa",
    logo: "https://firebasestorage.googleapis.com/v0/b/feather-340809.appspot.com/o/application_assets%2FUnited%20Bank%20for%20Africa%20Logo%20(1).png?alt=media&token=5dd8b1cf-89db-496b-9bb8-11dcd857291e",
  },
  {
    value: "UNION",
    name: "Union Bank of Nigeria",
    logo: "https://firebasestorage.googleapis.com/v0/b/feather-340809.appspot.com/o/application_assets%2FUnion%20Bank%20Nigeria%20Logo%20(1).png?alt=media&token=cd2bd225-8ea9-481f-933d-188550bda056",
  },
  {
    value: "VFD",
    name: "VFD Microfinance Bank",
    logo: "https://firebasestorage.googleapis.com/v0/b/feather-340809.appspot.com/o/application_assets%2Fvfd.png?alt=media&token=edb7d867-00fc-4de0-b117-c2b0395965cb",
  },
  {
    value: "WEMA",
    name: "Alat by Wema",
    logo: "https://firebasestorage.googleapis.com/v0/b/feather-340809.appspot.com/o/application_assets%2FWema%20Bank%20Logo%20(1).png?alt=media&token=4d398853-504c-4cac-84ff-cd6de0d83c36",
  },
  {
    value: "ZENITH",
    name: "Zenith Bank Plc",
    logo: "https://firebasestorage.googleapis.com/v0/b/feather-340809.appspot.com/o/application_assets%2FZenith%20Bank%20Logo%20(1).png?alt=media&token=3624b4f7-cf2c-4afc-a684-55bcc7e267df",
  },
];

const Eachoption = ({ type, image, value, setBank, openModal }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={electrictystyles.eachoption}
      onPress={() => {
        setBank(value);
        openModal();
      }}
    >
      <View style={electrictystyles.logoandtitlewrap}>
        <Image
          style={{ width: 34, height: 34, borderRadius: 34 / 2 }}
          resizeMethod="scale"
          resizeMode="cover"
          source={{
            uri: image,
          }}
        />
        <Text style={electrictystyles.optiontitle}>{type}</Text>
      </View>
      <Forwardarrow />
    </TouchableOpacity>
  );
};

const Selectbank = ({ navigation, route }) => {
  const amount = route.params;
  console.log("------------------------DEBUG--------------------------");
  console.log(amount);
  const { CustomModal, openModal, closeModal } = useCustomModal();
  const {
    CustomModal: TransactiondetailsModal,
    openModal: openTransactionDetailsModal,
    closeModal: closeTransactionDetailsModal,
  } = useCustomModal();
  const [bank, setBank] = useState({ name: "", logo: "", value: "" });
  const [accountInformation, setAccountInformation] = useState({});

  const handleNextBankCash = (bankinfo) => {
    setAccountInformation(bankinfo);
    closeModal();
    openTransactionDetailsModal();
  };

  const handleTransferToFeather = async (pin) => {
    try {
      await axiosCustom.post("/withdraw", {
        amount: Number(amount),
        account_code: accountInformation?.account_code,
        userPin: pin,
      });
      return "Your cash transaction was successful";
    } catch (err) {
      throw err;
    }
  };

  return (
    <Mainwrapper>
      <Backheader title="Select Bank" />
      <CustomModal>
        <TransferCashBank
          bank={bank}
          handleNext={handleNextBankCash}
          amount={amount}
        />
      </CustomModal>
      <TransactiondetailsModal>
        <View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <View
              style={{
                width: 48,
                height: 48,
                borderRadius: 48 / 2,
                marginBottom: 22,
                backgroundColor: COLORS.blue9,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: COLORS.white }}>
                {nameSplitter(accountInformation?.account_name || "  ")}
              </Text>
            </View>
            <Text
              style={{
                color: COLORS.blue9,
                ...fontsize.small,
                ...FONTS.medium,
                lineHeight: 27,
              }}
            >
              {accountInformation?.account_name}
            </Text>
            {/* <Text style={{...fontsize.smallest, color: COLORS.halfBlack}}>@{userinfo?.username}</Text> */}
          </View>
          <View style={{ marginVertical: 36 }}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text
                style={{
                  ...fontsize.smallest,
                  ...FONTS.regular,
                  color: COLORS.blue9,
                  lineHeight: 27,
                }}
              >
                Amount to send
              </Text>
              <Text
                style={{
                  ...fontsize.smallest,
                  ...FONTS.regular,
                  color: COLORS.blue9,
                  lineHeight: 27,
                }}
              >
                N{amountFormatter(`${amount}`)}
              </Text>
            </View>
            <Horizontaline marginV={21} />
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text
                style={{
                  ...fontsize.smallest,
                  ...FONTS.regular,
                  color: COLORS.blue9,
                  lineHeight: 27,
                }}
              >
                Charges
              </Text>
              <Text
                style={{
                  ...fontsize.smallest,
                  ...FONTS.regular,
                  color: COLORS.purple4,
                  lineHeight: 27,
                }}
              >
                +N10.00
              </Text>
            </View>
            <Horizontaline marginV={21} />
            <Text
              style={{ ...fontsize.smallest, lineHeight: 27, ...FONTS.regular }}
            >
              Total Amount to send to{" "}
              {nameToShow(accountInformation?.account_name || "  ")}
            </Text>
            <Text
              style={{
                ...fontsize.smaller,
                ...FONTS.bold,
                color: COLORS.green1,
              }}
            >
              N{amountFormatter(`${Number(amount) + 10}`)}
            </Text>
          </View>
          <Custombutton
            btntext="Great, Proceed"
            onpress={() => {
              closeModal();
              closeTransactionDetailsModal();
              navigation.navigate("Transferpin", {
                info: {
                  username: bank.name,
                  fullName: accountInformation?.account_name,
                  amount,
                },
                onpress: handleTransferToFeather,
              });
            }}
          />
        </View>
      </TransactiondetailsModal>
      <View style={{ paddingHorizontal: 15 }}>
        <View
          style={{
            backgroundColor: COLORS.white,
            paddingHorizontal: 20,
            paddingBottom: 10,
            paddingTop: 22,
            borderRadius: 15,
          }}
        >
          <Text
            style={{
              ...fontsize.smaller,
              ...FONTS.medium,
              color: COLORS.blue9,
              lineHeight: 27,
            }}
          >
            Choose your destination bank
          </Text>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 120 }}
          >
            {listOfbanks.map(({ name, logo, value }, index) => {
              const isLast = listOfbanks.length === index + 1;
              return (
                <View key={index}>
                  <Eachoption
                    openModal={openModal}
                    setBank={setBank}
                    type={name}
                    image={logo}
                    value={{ name, logo, value }}
                  />
                  {!isLast && <Horizontaline marginV={0} />}
                </View>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </Mainwrapper>
  );
};

export default Selectbank;

const styles = StyleSheet.create({});
