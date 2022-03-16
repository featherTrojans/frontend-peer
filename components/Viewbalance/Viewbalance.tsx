import { StyleSheet, Text, View, TouchableOpacity, TouchableNativeFeedback } from "react-native";
import React, { useContext, useState } from "react";
import { COLORS, FONTS, fontsize, icons } from "../../constants";
import { styles } from "./Viewbalance.styles";
import { AuthContext } from "../../context/AuthContext";
import amountFormatter from "../../utils/formatMoney";
import { useNavigation } from "@react-navigation/native";


const { Eyecrossed, Arrowright } = icons;

const Viewbalance = ({ navigate }: any) => {


  const navigation = useNavigation()
  const { authdata, showAmount, setShowAmount } = useContext(AuthContext);

  // const [showAmount, setShowAmount] = useState(true)



  return (
    <View style={styles.container}>
      {/* Top part of the block */}
      <View style={styles.topContainer}>
        <View>
          <Text style={styles.primaryText}>Primary Wallet</Text>
          <View style={styles.underLine} />
        </View>


        <TouchableOpacity style={styles.addCashBg} activeOpacity={0.8} onPress={() => navigation.navigate("Addcash")}>
          <Text style={styles.addCashText}>Add Cash</Text>
          <Arrowright />
        </TouchableOpacity>

      </View>
      {/* Bottom part of the block */}
      <View style={styles.bottomContainer}>
        {/* Left text */}
        <View>
          <Text style={styles.balanceText}>Balance</Text>
          {/* <Text style={styles.balanceAmount}>NGN {amountFormatter(authdata?.walletBal)}</Text> */}
          <Text style={styles.balanceAmount}>NGN  {showAmount ? amountFormatter(authdata?.walletBal) : "******"}</Text>

        </View>

        {/* Eye icon */}
        <TouchableOpacity onPress={() => setShowAmount(!showAmount)} activeOpacity={0.8}>
          <Eyecrossed />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Viewbalance;
