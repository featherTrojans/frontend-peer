import { StyleSheet, Text, View, StatusBar } from "react-native";
import React from "react";
import { styles } from "./Depositupdate.styles";
import { Backheader, Viewbalance } from "../../../../components";
import { COLORS, FONTS, fontsize, icons } from "../../../../constants";
const {
  TransferIcon,
  Location,
  Accountbalanceicon,
  Trendingupright,
  Viewrequesteye,
} = icons;

const Depositupdate = () => {
  return (
    <View style={styles.container}>
      <StatusBar />
      <Backheader title="Deposit" />
      <Viewbalance />

      <View style={{ flex: 1 }}>
        <View style={styles.contentContainer}>
          <View style={styles.topSection}>
            {/* Icons */}
            <TransferIcon />
            <View>
              <Text style={styles.lastAmountText}>Last Amount Update</Text>
              <Text style={styles.updatedTimeText}>
                Updated yesterday, 12:33pm
              </Text>
            </View>
            <Text style={styles.lastAmountPrice}>NGN 100,000</Text>
          </View>

          <View style={styles.horizontalLine} />

          <View>
            <View style={styles.locationIconandText}>
              {/* icons */}
              <Location />
              <Text style={styles.location}>Ajayi-Thompson, Ile-ife, Osun</Text>
            </View>
            <View style={styles.expirationContainer}>
              <Text style={styles.expirationText}>
                Expires 21 Mar. 22, 12:33pm
              </Text>
              <Text style={styles.updateText}>Update</Text>
            </View>
          </View>
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.detailsRow}>
            <View style={styles.iconAndTitle}>
              {/* Icons */}
              <Accountbalanceicon />
              <Text style={styles.iconTitle}>Balance</Text>
            </View>
            <Text style={styles.iconValue}>N13,750</Text>
          </View>

          <View style={styles.horizontalLine} />
          <View style={styles.detailsRow}>
            <View style={styles.iconAndTitle}>
              {/* Icons */}
              <Trendingupright />
              <Text style={styles.iconTitle}>My Earnings last 24hrs</Text>
            </View>
            <Text style={styles.iconValue}>N32,920.00</Text>
          </View>
        </View>
      </View>

      <View style={styles.bottomBtn}>
        <View style={styles.eyeiconBg}>
          <Viewrequesteye />
        </View>
        <Text style={styles.viewRequestText}>View Cash Requests (15)</Text>
      </View>
    </View>
  );
};

export default Depositupdate;
