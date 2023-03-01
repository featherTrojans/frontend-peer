import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import {
  Backheader,
  Headerandsubheader,
  Horizontaline,
  Mainwrapper,
} from "../../../components";
import { COLORS, FONTS, fontsize, icons } from "../../../constants";
import { withdrawstyles } from "./Withdrawal.styles";

const { Paymerchanticon, Searchmerchanticon } = icons;

const Withdrawal = ({ navigation }) => {
  return (
    <Mainwrapper>
      <Backheader />

      <View style={withdrawstyles.subcontainer}>
        <View style={{ paddingHorizontal: 15 }}>
          <Headerandsubheader />
        </View>

        <View style={withdrawstyles.withdrawOptionWrap}>
          <Text style={withdrawstyles.withdrawOptionText}>
            Withdraw Options
          </Text>

          <View style={withdrawstyles.withdrawOptionContain}>
            <Pressable style={withdrawstyles.withdrawOption}>
              <View style={withdrawstyles.withdrawOptionIconBg}>
                <Paymerchanticon />
              </View>
              <View style={{ marginLeft: 14 }}>
                <Text style={withdrawstyles.withdrawOptionTitle}>
                  Pay Merchant (Agent/Business)
                </Text>
                <Text style={withdrawstyles.withdrawOptionValue}>
                  Withdraw from feather verified merchants
                </Text>
              </View>
            </Pressable>

            <Horizontaline marginV={20} />

            <Pressable
              onPress={() => navigation.navigate("Withdrawlisting")}
              style={withdrawstyles.withdrawOption}
            >
              <View style={withdrawstyles.withdrawOptionIconBg}>
                <Searchmerchanticon />
              </View>
              <View style={{ marginLeft: 14 }}>
                <Text style={withdrawstyles.withdrawOptionTitle}>
                  Search Merchants
                </Text>
                <Text style={withdrawstyles.withdrawOptionValue}>
                  Find merchants around you to withdraw.
                </Text>
              </View>
            </Pressable>

            <Horizontaline marginV={20} />

            <Text style={withdrawstyles.needMoreInfo}>
              Need more Information?{" "}
              <Text style={withdrawstyles.learnMore}>Learn More</Text>
            </Text>
          </View>
        </View>
      </View>
    </Mainwrapper>
  );
};

export default Withdrawal;

const styles = StyleSheet.create({});
