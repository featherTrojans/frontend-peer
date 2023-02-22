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
import Horizontaline from "../Horizontaline/Horizontaline";
import axiosCustom from "../../httpRequests/axiosCustom";
import useAlert from "../../utils/useAlerts";
import Loader from "../Loader/Loader";


const {
  Eyecrossed,
  Balanceicon
} = icons;

const Viewbalance = ({ navigate }: any) => {
  const navigation = useNavigation();
  const { authdata, showAmount, setShowAmount } = useContext(AuthContext);
  const [amount, setAmount] = useState("")
  const [loading, setLoading] = useState(false);
  const {errorAlert} = useAlert()



  
  // const handleFundWallet = async (amt) => {
  //   setLoading(true); 
  //   try {
  //     setAmount(amt)
  //     const response = await axiosCustom.post("/pay", { amount:amt });
      
  //     navigation.navigate("CustomWebView", {
  //       url: response.data.data.authorization_url,
  //       reference: response.data.data.reference,
  //       amount: amt,
  //     });
  //   } catch (err) {
  //     errorAlert(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <>
    <View style={viewbalancestyles.container}>
        {loading && <Loader />}
  




      {/* Top part of the block */}
      <View style={viewbalancestyles.topContainer}>
        <View style={{ flex: 1, marginRight: 20 }}>
          <View style={{flexDirection: "row", alignItems: "center"}}>
            <Balanceicon />
          <Text style={viewbalancestyles.primaryText}>My Balances</Text>
          </View>
          <View style={viewbalancestyles.underLine} />
        </View>

        <TouchableOpacity
          style={viewbalancestyles.addCashBg}
          activeOpacity={0.8}
          onPress={() => console.log("Add Cash")}
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
              marginBottom: RFValue(15),
            }}
          >
            <Text style={viewbalancestyles.balanceText}>Primary Wallet</Text>
            <Pressable
            hitSlop={16}
              onPress={() => setShowAmount(!showAmount)}
            >
              <Eyecrossed />
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
