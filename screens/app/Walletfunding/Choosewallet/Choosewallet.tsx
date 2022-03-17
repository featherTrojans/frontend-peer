import {
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback,
  Platform,
} from "react-native";
import React, { useState } from "react";
import Modal from "react-native-modal";
import { COLORS, FONTS, fontsize, icons } from "../../../../constants";
import { styles } from "./Choosewallet.styles";
import Globalmodal from "../../../shared/Globalmodal/Globalmodal";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import { Backheader } from "../../../../components";

const { Backarrow, People, Debitcard, Arrowright, Forwardarrow } = icons;

const Choosewallet = ({ navigation }) => {
  const [isModalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Globalmodal
        showState={isModalVisible}
        onBgPress={() => setModalVisible(!isModalVisible)}
        btnFunction={() => console.log("Hellow")}
      >
        <View style={{ alignItems: "center" }}>
          <View
            style={{
              width: 100,
              height: 100,
              backgroundColor: COLORS.grey1,
              borderRadius: 50,
            }}
          />

          <Text
            style={{
              textAlign: "center",
              marginHorizontal: 40,
              marginVertical: 40,
              ...fontsize.bsmall,
              ...FONTS.regular,
            }}
          >
            You have successfully funded your “PRIMARY WALLET” with{" "}
            <Text style={{ ...fontsize.bsmall, ...FONTS.bold }}>
              NGN 30,500.00
            </Text>
          </Text>
        </View>
      </Globalmodal>

      <Backheader title="Add Cash" />

      <View style={{marginVertical: 16}}>
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple(COLORS.lightBlue, false)}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("WalletPin")}
            style={styles.walletTypeContainer}
          >
            {/* Image */}
            <View>
              <Debitcard />
            </View>
            <View style={styles.walletTypeInfoContainer}>
              <View style={styles.walletTopSection}>
                <Text style={styles.walletTopText}>
                  Debit card, Bank or USSD
                </Text>
                <Forwardarrow />
              </View>
              <View
                style={{
                  marginTop: 8,
                }}
              >
                <Text style={styles.walletBottomText2}>
                  Secured by{" "}
                  <Text style={styles.walletBottomText2sub}>Paystack.</Text>
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </TouchableNativeFeedback>

        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple(COLORS.lightBlue, false)}
        >
          <View style={styles.walletTypeContainer}>
            {/* Image */}
            <View>
              <Debitcard />
            </View>
            <View style={styles.walletTypeInfoContainer}>
              <View style={styles.walletTopSection}>
                <Text style={styles.walletTopText}>Feather Agents</Text>
                <Forwardarrow />
              </View>
              <View
                style={{
                  marginTop: 8,
                }}
              >
                <Text style={styles.walletBottomText2}>
                  Secured by{" "}
                  <Text style={styles.walletBottomText2sub}>
                    Feather Africa, Inc.
                  </Text>
                </Text>
              </View>
            </View>
          </View>
        </TouchableNativeFeedback>

        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple(COLORS.lightBlue, false)}
        >
          <View style={styles.walletTypeContainer}>
            {/* Image */}
            <View>
              <People />
            </View>
            <View style={styles.walletTypeInfoContainer}>
              <View style={styles.walletTopSection}>
                <Text style={styles.walletTopText}>
                  Request from family & Friends
                </Text>
                <Forwardarrow />
              </View>
              <View style={styles.walletBottomTextBg}>
                <Text style={styles.walletBottomText}>Coming Soon</Text>
              </View>
            </View>
          </View>
        </TouchableNativeFeedback>

        {/* Second Block */}
      </View>
    </View>
  );
};

export default Choosewallet;
