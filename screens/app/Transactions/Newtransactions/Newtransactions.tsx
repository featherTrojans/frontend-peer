import { Text, View, ScrollView } from "react-native";
import React, { useContext, useState } from "react";
import { styles } from "./Newtransactions.styles";
import {
  Backheader,
  Chooseamountmodal,
  Custombutton,
  Horizontaline,
  Iconwithdatas,
  Loader,
  Mainwrapper,
} from "../../../../components";
import { COLORS, FONTS, fontsize, icons } from "../../../../constants";
import Customstatusbar from "../../../shared/Customstatusbar";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import useCustomModal from "../../../../utils/useCustomModal";
import TransferCash from "../../../../components/Modals/TransferCash";
import Bluewalleticon from "../../../../assets/icons/Bluewalleticon";
import Bluebankicon from "../../../../assets/icons/Bluebankicon";
import amountFormatter from "../../../../utils/formatMoney";
import { AuthContext } from "../../../../context/AuthContext";
import { nameSplitter } from "../../../../utils/nameSplitter";
import { nameToShow } from "../../../../utils/nameToShow";
import axiosCustom from "../../../../httpRequests/axiosCustom";
import Debitcardicon from "../../../../assets/icons/Debitcardicon";
import Featheragenticon from "../../../../assets/icons/Featheragenticon";
import Familyrequesticon from "../../../../assets/icons/Familyrequesticon";
import useAlert from "../../../../utils/useAlerts";


const {
  Withdrawicon,
  Depositicon,
  Eyecrossed,
  TransferIcon,
  Newtransfericon,
  Fundwalleticon,
  Paybillicon,
} = icons;
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

const Newtransactions = ({ navigation }: any) => {
  const { setAuthData, authdata } = useContext(AuthContext);
  const [userinfo, setUserinfo] = useState<userObj | null>(null);
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const { errorAlert } = useAlert();
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
  const {
    CustomModal: AddCashModal,
    openModal,
    closeModal: closeAddCashModal,
  } = useCustomModal();
  const {
    CustomModal: ChooseamountModal,
    openModal: openBillAmountModal,
    closeModal: closeBillAmountModal,
  } = useCustomModal();

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

  const addcashoptions = [
    {
      icon: <Debitcardicon />,
      title: "Debit card, Bank or USSD",
      info: "Secured by Paystack.",
      action: () => {
        closeAddCashModal();
        openBillAmountModal();
      },
    },
    {
      icon: <Featheragenticon />,
      title: "Feather Agents",
      info: "Coming Soon!",
      infocolor: COLORS.purple2,
      action: () => console.log("Feather agents"),
    },
    {
      icon: <Familyrequesticon />,
      title: "Request from family & friends",
      info: "Coming Soon!",
      infocolor: COLORS.purple2,
      action: () => console.log("Family Request"),
    },
  ];

  const actions = [
    {
      icon: <Withdrawicon />,
      iconBg: "#E0EDD8",
      title: "Withdraw",
      details: "Get cash from feather users near you.",
      onpress: () => navigation.navigate("Withdraw"),
    },
    {
      icon: <Newtransfericon />,
      iconBg: "#FCF3D1",
      title: "Transfer",
      details: "Send cash to feather wallets and bank accounts.",
      onpress: () => openTransferModal(),
    },
    {
      icon: <Fundwalleticon />,
      iconBg: "#DEE0E5",
      title: "Fund Wallet",
      details: "Add Cash to your wallets easily",
      onpress: () => openModal(),
    },
    {
      icon: <Paybillicon />,
      iconBg: "#E3CCFF",
      title: "Paybills",
      details: "Purchase airtime & data, PayTV Subscriptions…",
      onpress: () => navigation.navigate("Paybills"),
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

  const handleFundWallet = async (amt) => {
    closeBillAmountModal();
    closeAddCashModal();
    setLoading(true);
    try {
      setAmount(amt);
      const response = await axiosCustom.post("/pay", { amount: amt });

      navigation.navigate("CustomWebView", {
        url: response.data.data.authorization_url,
        reference: response.data.data.reference,
        amount: amt,
      });
    } catch (err) {
      errorAlert(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Mainwrapper bottom={false}>
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

      {loading && <Loader />}
      {/* Choose amount modal */}
      <ChooseamountModal>
        <Chooseamountmodal
          headerText="How much do you want to fund?"
          onpress={handleFundWallet}
        />
      </ChooseamountModal>

      {/* Add cash modal */}
      <AddCashModal>
        <View>
          <View style={styles.headerWrapper}>
            <Text style={styles.addcashheadertext}>Add Cash Options</Text>
            <View>
              <Text style={styles.primarywallettext}>
                Primary Wallet Balance
              </Text>
              <Text style={styles.availablebalancetext}>
                N{amountFormatter(authdata?.walletBal)}
              </Text>
            </View>
          </View>

          {addcashoptions.map(
            ({ icon, title, info, infocolor, action }, index) => {
              const isLast = addcashoptions.length === index + 1;
              return (
                <View key={index}>
                  <Iconwithdatas
                    icon={icon}
                    title={title}
                    details={info}
                    iconBg={""}
                    onpress={action}
                    infocolor={infocolor}
                  />
                  {!isLast && <Horizontaline marginV={18} />}
                </View>
              );
            }
          )}
        </View>
      </AddCashModal>

      {/* <Customstatusbar /> */}
      <Backheader title="Transactions" showArrow={false} />

      <View style={{ flex: 1, paddingHorizontal: 15 }}>
        <ScrollView
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <View
            style={{
              backgroundColor: "white",
              paddingHorizontal: 15,
              paddingVertical: 20,
              borderRadius: 15,
            }}
          >
            <Text
              style={{
                marginBottom: 34,
                ...fontsize.smallest,
                ...FONTS.medium,
                color: COLORS.blue9,
              }}
            >
              Perform an action⚡
            </Text>

            {actions.map(({ icon, iconBg, title, details, onpress }, index) => {
              return (
                <View key={index}>
                  <Iconwithdatas
                    icon={icon}
                    iconBg={iconBg}
                    title={title}
                    details={details}
                    onpress={onpress}
                  />
                  {index + 1 !== actions.length && (
                    <View
                      style={{
                        marginVertical: 22,
                        backgroundColor: COLORS.grey2,
                        opacity: 0.2,
                        height: 0.5,
                      }}
                    />
                  )}
                </View>
              );
            })}
          </View>
        </ScrollView>
        {/* List of options */}
      </View>
    </Mainwrapper>
  );
};

export default Newtransactions;
