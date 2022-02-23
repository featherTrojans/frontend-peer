import { StyleSheet, Text, View, ScrollView, StatusBar } from "react-native";
import React from "react";
import { styles } from "./Deposit.styles";
import { Backheader, Iconwithdatas, Viewbalance } from "../../../components";
import { icons } from "../../../constants";
import { TouchableOpacity } from "@gorhom/bottom-sheet";

const { Withdrawicon, Depositicon, SadEmoji , TransferIcon, Location} = icons;
const Deposit = () => {
    return (
        <View style={styles.container}>
          <StatusBar />
          <Backheader title="Deposit" />
          <Viewbalance />
          {/* <View style={styles.body}>
              <View style={{marginTop: -40}}>
                <SadEmoji />
              </View>
            <Text style={styles.bodytext}>
                Padi, you have not performed any cash deposits today, Start now.
            </Text>
          </View>
          <View style={styles.btnBg}>
                <Text style={styles.btnText}>Create New Status</Text>
            </View> */}
            <View style={styles.update}>
                <View style={styles.update__amount}>
                    <TransferIcon />
                    <View style={styles.update__amounttext}>
                        <Text >
                            Last Amount Update
                        </Text>
                        <Text>
                            Updated yesterday, 12:33pm
                        </Text>
                    </View>
                    <Text style={styles.amt}>
                        NGN 100,00
                    </Text>
                </View>
                <View style={styles.location}>
                    <View style={styles.location__place}>
                        <Location />
                        <Text style={styles.location__text}>Ajayi-Thompson, Ile-ife, Osun</Text>
                    </View>
                    <View style={styles.expiresbox}>
                        <Text style={styles.expires}>Expires 21 Mar.22, 12:33pm</Text>
                        <TouchableOpacity style={styles.expires__btn}>
                            <Text style={styles.expires__text}>Update</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
      );
}

export default Deposit
