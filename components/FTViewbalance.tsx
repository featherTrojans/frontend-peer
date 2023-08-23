import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
  Pressable,
} from "react-native";
import React, { useContext, useState } from "react";
import { COLORS, FONTS, fontsize, icons } from "../constants";
import { AuthContext } from "../context/AuthContext";
import amountFormatter from "../utils/formatMoney";
import { useNavigation } from "@react-navigation/native";
import { RFValue } from "react-native-responsive-fontsize";
import Horizontaline from "./FTHorizontaline";
import axiosCustom from "../httpRequests/axiosCustom";
import useAlert from "../hooks/useAlerts";
import FTLoader from "./FTLoader";
import { FTViewbalanceStyles } from "../assets/styles/components";
import { useCustomModal } from "../hooks";
import { navigation } from "../utils";

const {
  container,
  topContainer,
  primaryText,
  underLine,
  addCashBg,
  addCashText,
  bottomContainer,
  balanceText,
  balanceAmount,
} = FTViewbalanceStyles;

const { Eyecrossed, Balanceicon } = icons;

const Viewbalance = ({}) => {
  const { authdata, showAmount, setShowAmount } = useContext(AuthContext);
  const { errorAlert } = useAlert();

  const onsubmit = (amount) => {
    const action = async () => {
      const response = await axiosCustom.post("/pay", { amount: amount });
      navigation.navigate("customweb_screen", {
        url: response.data.data.authorization_url,
        reference: response.data.data.reference,
        amount: amount,
      });
    };
    navigation.navigate("walletfunding_screen", { action });
  };
  return (
    <>
      <View style={container}>
        {/* {loading && <FTLoader />} */}

        {/* Top part of the block */}
        <View style={topContainer}>
          <View style={{ flex: 1, marginRight: 20 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Balanceicon />
              <Text style={primaryText}>My Balances</Text>
            </View>
            <View style={underLine} />
          </View>

          <TouchableOpacity
            style={addCashBg}
            activeOpacity={0.8}
            onPress={() => navigation.navigate("walletfunding_screen")}
          >
            <Text style={addCashText}>Add Cash</Text>
          </TouchableOpacity>
        </View>
        {/* Bottom part of the block */}
        <View style={bottomContainer}>
          {/* Left text */}
          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: RFValue(15),
              }}
            >
              <Text style={balanceText}>Primary Wallet</Text>
              <Pressable
                hitSlop={16}
                onPress={() => setShowAmount(!showAmount)}
              >
                <Eyecrossed />
              </Pressable>
            </View>

            <Text style={balanceAmount}>
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
