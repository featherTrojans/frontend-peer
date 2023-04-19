import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import * as Animatable from "react-native-animatable";
import {
  Chooseamountmodal,
  Custombutton,
  Horizontaline,
  Iconwithdatas,
  Input,
} from "../../../components";
import { COLORS, FONTS, fontsize, icons, images } from "../../../constants";
import { AuthContext } from "../../../context/AuthContext";
import amountFormatter from "../../../utils/formatMoney";
import { nameSplitter } from "../../../utils/nameSplitter";
import { nameToShow } from "../../../utils/nameToShow";
import useCustomModal from "../../../utils/useCustomModal";
import { styles } from "./Home.styles";
import TransferCash from "../../../components/Modals/TransferCash";
import axiosCustom from "../../../httpRequests/axiosCustom";
import {
  handleOpenInBrowser,
  handleOpenWithLinking,
} from "../../../utils/handleOpenWithLinking";
import useAlert from "../../../utils/useAlerts";
import { ScrollView } from "react-native-gesture-handler";
const { Bluebankicon, Bluewalleticon } = icons;
const { Paybills, Transfer, withdraw } = images;

interface userObj {
  accountNo: string | null;
  address: null | string;
  createdAt: string;
  dateOfBirth: null | string;
  email: string;
  escrowBal: string;
  fullName: string;
  gender: null | string;
  imageUrl: null | string;
  isVerified: boolean;
  lga: null | string;
  messageToken: string;
  phoneNumber: string;
  refId: string;
  userLevel: number;
  userUid: string;
  username: string;
  walletBal: number;
}

const HomeWallet = () => {
  const [amount, setAmount] = useState(0);
  const { authdata } = useContext(AuthContext);
  const [userinfo, setUserinfo] = useState<userObj | null>(null);
  const { errorAlert } = useAlert();
  console.log("------------------------USERINFO--------------------------");
  console.log(userinfo);
  const {
    CustomModal: TransferModal,
    openModal: openTransferModal,
    closeModal: closeTransferModal,
  } = useCustomModal();
  const {
    CustomModal: AmountToBankModal,
    openModal: openBankAmountModal,
    closeModal: closeBankAmountModal,
  } = useCustomModal();
  const {
    CustomModal,
    openModal: openAmountModal,
    closeModal: closeAmountModal,
  } = useCustomModal();
  const {
    CustomModal: TransfercashInfoModal,
    openModal: openTransfercashInfoModal,
    closeModal: closeTransfercashinfoModal,
  } = useCustomModal();
  const {
    CustomModal: TransferdetailsModal,
    openModal: openTransferdetailsModal,
    closeModal: closeTransferdetailsModal,
  } = useCustomModal();

  const navigation = useNavigation();
  const walletOptions = [
    {
      icon: withdraw,
      title: "Withdraw cash from feather agents near you.",
      link: "Withdraw",
      iconBg: "#EDF3EB",
      onpress: () => navigation.navigate("Requesterinfo"),
    },
    {
      icon: Paybills,
      title: "Pay Bills with speed and ease, at good rates.",
      link: "Paybills",
      iconBg: "#D2EAFD",
      onpress: () => navigation.navigate("Paybills"),
    },
    {
      icon: Transfer,
      title: "Transfer money to feather users and bank accounts.",
      link: "Transfercash",
      iconBg: "#F3EEFB",
      onpress: () => openTransferModal(),
    },
  ];
  const transfercashoptions = [
    {
      icon: <Bluewalleticon />,
      title: "To Feather Wallet",
      info: "Send cash to any feather user at N0.00",
      action: () => {
        closeTransferModal();
        openAmountModal();
      },
    },
    {
      icon: <Bluebankicon />,
      title: "To Bank Account",
      info: "Transfer to any bank in Nigeria at N10.00",
      action: () => {
        closeTransferModal();
        openBankAmountModal();
      },
    },
  ];

  const handleTransferToFeather = async (userPin) => {
    try {
      await axiosCustom.post("/transfer", {
        amount: Number(amount),
        transferTo: userinfo?.username,
        userPin,
      });
      return "Your cash transfer was successful";
    } catch (err) {
      console.log(err.response);
      throw err;
    }
  };
  return (
    <View style={styles.walletOptionsContainer}>
      {/* Transfer Modal */}
      <TransferModal>
        <View>
          <View style={styles.headerWrapper}>
            <Text style={styles.addcashheadertext}>Transfer Cash</Text>
            <View>
              <Text style={styles.primarywallettext}>
                Primary Wallet Balance
              </Text>
              <Text style={styles.availablebalancetext}>
                N{amountFormatter(authdata?.walletBal)}
              </Text>
            </View>
          </View>

          {transfercashoptions.map(({ icon, title, info, action }, index) => {
            const isLast = transfercashoptions.length === index + 1;
            return (
              <View key={index}>
                <Iconwithdatas
                  icon={icon}
                  title={title}
                  details={info}
                  iconBg={COLORS.blue11}
                  onpress={action}
                />
                {!isLast && <Horizontaline marginV={18} />}
              </View>
            );
          })}
        </View>
      </TransferModal>

      {/* Chooose amount to send to bank amount  */}
      <AmountToBankModal>
        <Chooseamountmodal
          headerText="How much do you want to transfer now?"
          onpress={(amount) => {
            if (amount < 100) {
              return errorAlert(
                null,
                "You can't transfer amount less than 100 "
              );
            }
            closeBankAmountModal();
            navigation.navigate("Selectbank", amount);
          }}
        />
      </AmountToBankModal>

      {/* Choose amount to send feather modal */}
      <CustomModal>
        <Chooseamountmodal
          headerText="How much do you want to transfer?"
          onpress={(amount) => {
            setAmount(amount);
            closeAmountModal();
            openTransfercashInfoModal();
          }}
        />
      </CustomModal>

      {/* Transfer cash inputs modal */}
      <TransfercashInfoModal>
        <TransferCash
          closeTransfercashinfoModal={closeTransfercashinfoModal}
          onpress={(userinfo) => {
            openTransferdetailsModal();
            closeTransfercashinfoModal();
            setUserinfo(userinfo);
          }}
          amount={amount}
        />
      </TransfercashInfoModal>
      {/* CONFIRM MODAL  */}
      <TransferdetailsModal>
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
              <Text
                style={{
                  color: COLORS.white,
                  ...fontsize.bbsmall,
                  ...FONTS.medium,
                }}
              >
                {nameSplitter(userinfo?.fullName || "  ")}
              </Text>
            </View>
            <Text
              style={{
                color: COLORS.blue9,
                ...fontsize.small,
                ...FONTS.medium,
                lineHeight: 27,
                textTransform: "capitalize",
              }}
            >
              {userinfo?.fullName}
            </Text>
            <Text
              style={{
                ...fontsize.smallest,
                color: COLORS.halfBlack,
                ...FONTS.regular,
                textTransform: "capitalize",
              }}
            >
              @{userinfo?.username}
            </Text>
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
                N{amountFormatter(amount)}
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
                +N{amountFormatter(0)}
              </Text>
            </View>
            <Horizontaline marginV={21} />
            <Text
              style={{ ...fontsize.smallest, lineHeight: 27, ...FONTS.regular }}
            >
              Total Amount to send to {nameToShow(userinfo?.fullName || "  ")}
            </Text>
            <Text
              style={{
                ...fontsize.smaller,
                ...FONTS.bold,
                color: COLORS.green1,
              }}
            >
              N{amountFormatter(amount)}
            </Text>
          </View>
          <Custombutton
            btntext="Great, Proceed"
            onpress={() => {
              closeAmountModal();
              closeTransferdetailsModal();
              navigation.navigate("Transferpin", {
                info: { ...userinfo, amount },
                onpress: handleTransferToFeather,
              });
            }}
          />
        </View>
      </TransferdetailsModal>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {walletOptions.map(
          (
            {
              icon,
              title,
              link,
              iconBg,
              onpress,
            }: {
              icon: JSX.Element;
              title: string;
              link: string;
              iconBg: string;
              onpress: () => void;
            },
            index
          ) => (
            <Animatable.View
              animation="bounceIn"
              delay={index * 100}
              key={title}
              style={{ marginHorizontal: 5 }}
            >
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={onpress}
                style={[
                  styles.optionContainer,
                  {
                    width: 148,
                    height: 168,
                    backgroundColor: iconBg,
                    padding: 10,
                    paddingBottom: 20,
                    borderRadius: 20,
                    justifyContent: "flex-end",
                  },
                ]}
              >
                <ImageBackground
                  source={icon}
                  resizeMode="cover"
                  style={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    top: 0,
                    right: 0,
                  }}
                ></ImageBackground>

                <Text style={styles.optionTitle}>{title}</Text>
              </TouchableOpacity>
            </Animatable.View>
          )
        )}
      </ScrollView>
    </View>
  );
};

export default HomeWallet;
