import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
} from "react-native";
import React, { useContext, useState } from "react";
import { COLORS, FONTS, fontsize, icons } from "../../constants";
import { viewbalancestyles } from "./Viewbalance.styles";
import { AuthContext } from "../../context/AuthContext";
import amountFormatter from "../../utils/formatMoney";
import { useNavigation } from "@react-navigation/native";
import { RFValue } from "react-native-responsive-fontsize";

const { Eyecrossed, Arrowright } = icons;

const Viewbalance = ({ navigate }: any) => {
  const navigation = useNavigation();
  const { authdata, showAmount, setShowAmount } = useContext(AuthContext);

  return (
    <View style={viewbalancestyles.container}>
      {/* Top part of the block */}
      <View style={viewbalancestyles.topContainer}>
        <View style={{ flex: 1, marginRight: 20 }}>
          <Text style={viewbalancestyles.primaryText}>Primary Wallet</Text>
          <View style={viewbalancestyles.underLine} />
        </View>

        <TouchableOpacity
          style={viewbalancestyles.addCashBg}
          activeOpacity={0.8}
          onPress={() => navigation.navigate("Addcash")}
        >
          <Text style={viewbalancestyles.addCashText}>Add Cash</Text>
        </TouchableOpacity>
      </View>
      {/* Bottom part of the block */}
      <View style={viewbalancestyles.bottomContainer}>
        {/* Left text */}
        <View>

          <View style={{flexDirection: "row", alignItems: "center", marginBottom: RFValue(6)}}>
          <Text style={viewbalancestyles.balanceText}>Feather Balance</Text>
          <TouchableOpacity
          onPress={() => setShowAmount(!showAmount)}
          activeOpacity={0.8}
        >
          <Eyecrossed />
        </TouchableOpacity>
          </View>
          
          <Text style={viewbalancestyles.balanceAmount}>
            NGN {showAmount ? amountFormatter(authdata?.walletBal) : "******"}
          </Text>
        </View>

        {/* Eye icon */}
        
      </View>
    </View>
  );
};

export default Viewbalance;
