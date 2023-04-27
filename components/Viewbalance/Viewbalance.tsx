import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
  Pressable
} from "react-native";
import React, { useContext, useState } from "react";
import { COLORS, FONTS, fontsize, icons } from "../../constants";
import { viewbalancestyles } from "./Viewbalance.styles";
import { AuthContext } from "../../context/AuthContext";
import amountFormatter from "../../utils/formatMoney";
import { useNavigation } from "@react-navigation/native";
import { RFValue } from "react-native-responsive-fontsize";
import useCustomModal from "../../utils/useCustomModal";
import { styles } from "../../screens/app/Home/Home.styles";
import Iconwithdatas from "../Iconwithdatas/Iconwithdatas";
import Horizontaline from "../Horizontaline/Horizontaline";
import Chooseamountmodal from "../Chooseamountmodal/Chooseamountmodal";
import axiosCustom from "../../httpRequests/axiosCustom";
import useAlert from "../../utils/useAlerts";
import Loader from "../Loader/Loader";


const {
  Eyecrossed,
  Arrowright,
Amounthideicon,
Amountshowicon,
  Debitcardicon,
  Featheragenticon,
  Familyrequesticon,
} = icons;

const Viewbalance = ({ navigate }: any) => {
  const navigation = useNavigation();
  const { authdata, showAmount, setShowAmount } = useContext(AuthContext);
  const { CustomModal: AddCashModal, openModal, closeModal: closeAddCashModal } = useCustomModal();
  const {CustomModal: ChooseamountModal, openModal: openAmountModal, closeModal: closeAmountModal} = useCustomModal()
  const [amount, setAmount] = useState("")
  const [loading, setLoading] = useState(false);
  const {errorAlert} = useAlert()
  const addcashoptions = [
    {
      icon: <Debitcardicon />,
      title: "Debit card, Bank or USSD",
      info: "Secured by Paystack.",
      action: () => {
        closeAddCashModal()
        openAmountModal()
      }
    },
    {
      icon: <Featheragenticon />,
      title: "Feather Agents",
      info: "Coming Soon!",
      infocolor: COLORS.purple2,
      action: () => console.log("Feather agents")
    },
    {
      icon: <Familyrequesticon />,
      title: "Request from family & friends",
      info: "Coming Soon!",
      infocolor: COLORS.purple2,
      action: () => console.log("Family Request")
    },
  ];
  const handleFundWallet = async (amt) => {
    closeAmountModal();
      closeAddCashModal();
    setLoading(true); 
    try {
      setAmount(amt)
      const response = await axiosCustom.post("/pay", { amount:amt });
      
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
    <>
    <View style={viewbalancestyles.container}>
        {loading && <Loader />}
      {/* Choose amount modal */}
      <ChooseamountModal>
          <Chooseamountmodal headerText="How much do you want to fund?" onpress={handleFundWallet}/>
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
              <Text style={styles.availablebalancetext}>N{amountFormatter(authdata?.walletBal)}</Text>
            </View>
          </View>

          {addcashoptions.map(({ icon, title, info, infocolor, action }, index) => {
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
          })}
        </View>
      </AddCashModal>


      {/* Top part of the block */}
      <View style={viewbalancestyles.topContainer}>
        <View style={{ flex: 1, marginRight: 20 }}>
          <Text style={viewbalancestyles.primaryText}>Primary Wallet</Text>
          <View style={viewbalancestyles.underLine} />
        </View>

        <TouchableOpacity
          style={viewbalancestyles.addCashBg}
          activeOpacity={0.8}
          onPress={openModal}
        >
          <Text style={viewbalancestyles.addCashText}>Add Cash</Text>
        </TouchableOpacity>
      </View>
      {/* Bottom part of the block */}
      <View style={viewbalancestyles.bottomContainer}>
        {/* Left text */}
        <View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: RFValue(6),
            }}
          >
            <Text style={viewbalancestyles.balanceText}>Feather Balance</Text>
            <Pressable
            hitSlop={16}
              onPress={() => setShowAmount(!showAmount)}
            >
              { showAmount ? <Amounthideicon /> : <Amountshowicon />}
            </Pressable>
          </View>

          <Text style={viewbalancestyles.balanceAmount}>
            NGN {showAmount ? amountFormatter(authdata?.walletBal) : "******"}
          </Text>
        </View>

        {/* Eye icon */}
      </View>
    </View>
    </>
  );
};

export default Viewbalance;
