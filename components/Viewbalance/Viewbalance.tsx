import { StyleSheet, Text, View } from "react-native";
import React,{useContext} from "react";
import { COLORS, FONTS, fontsize, icons } from "../../constants";
import { styles } from "./Viewbalance.styles";
import { AuthContext } from "../../context/AuthContext";

const { Eyecrossed, Arrowright } = icons;

const Viewbalance = () => {
  const {authdata} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      {/* Top part of the block */}
      <View style={styles.topContainer}>
        <View>
          <Text style={styles.primaryText}>Primary Wallet</Text>
          <View style={styles.underLine} />
        </View>
        <View style={styles.addCashBg}>
          <Text style={styles.addCashText}>Add Cash</Text>
          <Arrowright />
        </View>
      </View>
      {/* Bottom part of the block */}
      <View style={styles.bottomContainer}>
        {/* Left text */}
        <View>
          <Text style={styles.balanceText}>Balance</Text>
          <Text style={styles.balanceAmount}>NGN {authdata?.walletBal}</Text>
        </View>

        {/* Eye icon */}
        <Eyecrossed />
      </View>
    </View>
  );
};

export default Viewbalance;
