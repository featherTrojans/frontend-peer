import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS, FONTS, fontsize, icons } from "../../../../constants";
import { styles } from "./Choosewallet.styles";

const { Backarrow, People, Debitcard, Arrowright, Forwardarrow } = icons;

const Choosewallet = () => {
  return (
    <View style={styles.container}>
      <View style={styles.backArrow}>
        <Backarrow />
        <Text style={styles.backArrowText}>Add Cash</Text>
      </View>

      <View>
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

        {/* Second Block */}
        <View style={styles.walletTypeContainer}>
          {/* Image */}
          <View>
            <Debitcard />
          </View>
          <View style={styles.walletTypeInfoContainer}>
            <View style={styles.walletTopSection}>
              <Text style={styles.walletTopText}>
                Request from family & Friends
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
        </View>
      </View>
    </View>
  );
};

export default Choosewallet;
