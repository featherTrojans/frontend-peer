import {
    ActivityIndicator,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Button,
    TouchableOpacity,
  } from "react-native";
  import React, { useContext, useEffect, useState } from "react";
  
  import { COLORS, FONTS, fontsize, icons, SIZES } from "../../../../constants";
  import { Bottombtn, Loader, Sendingandreceive } from "../../../../components";
  import { styles } from "./DepositSummary.style";
  import { AuthContext } from "../../../../context/AuthContext";
  
  import amountFormatter from "../../../../utils/formatMoney";
  import Customstatusbar from "../../../shared/Customstatusbar";
import { RFValue } from "react-native-responsive-fontsize";
  const { Backarrow, Successcheckanimate } = icons;

const DepositSummary = ({navigation, route}) => {
    const {requestInfo} = route.params
    const { authdata } = useContext(AuthContext);
    return (
        <View style={styles.container}>
          {/* icon on the left and text in the middle */}
          <Customstatusbar />
          <View style={styles.backArrow}>
            <Backarrow />
            <View style={styles.backArrowTextContainer}>
              <Text style={styles.backArrowText}>Transaction Summary</Text>
            </View>
            <View />
          </View>
    
          <ScrollView>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
                <View style={{marginTop:RFValue(-38)}}>
              <Sendingandreceive
                senderName={authdata?.userDetails?.fullName}
                receiverName={
                  requestInfo?.user?.fullName || "A Z"
                }
                title="Wallet Debit"
              />
                </View>
    
              {/* text of notification */}
              <View style={styles.notifyingTextContainer}>
                <Text style={styles.notifyingText}>
                  You are initiating a payment transaction to{" "}
                  <Text style={styles.notifyingSubText}>{requestInfo?.user?.fullName}</Text>
                </Text>
              </View>
            </View>
            <View style={styles.tablesContainer}>
              {/* A table showin the transaction details */}
              <View>
                <View style={styles.tableContainer}>
                  <Text style={styles.tableTitle}>Receiver</Text>
                  <Text style={styles.tableValue}>
                    @{requestInfo?.user?.username}
                  </Text>
                </View>
                <View style={styles.bottomLine} />
              </View>
              <View>
                <View style={styles.tableContainer}>
                  <Text style={styles.tableTitle}>Cash to give</Text>
                  <Text style={styles.tableValue}>
                    NGN {amountFormatter(requestInfo?.amount)}
                  </Text>
                </View>
                <View style={styles.bottomLine} />
              </View>
              <View>
                <View style={styles.tableContainer}>
                  <Text style={styles.tableTitle}>Charges</Text>
                  <Text style={styles.tableValue}>
                    + NGN{" "}
                    {amountFormatter(
                      `${+requestInfo?.charges + +requestInfo?.negotiatedFee}`
                    )}
                  </Text>
                </View>
                <View style={styles.bottomLine} />
              </View>
              <View>
                <View style={styles.tableContainer}>
                  <Text style={styles.tableTitle}>Feather Commission</Text>
                  <Text style={styles.tableValue}>
                    - NGN {amountFormatter(`${requestInfo.amount / 100}`)}
                  </Text>
                </View>
                <View style={styles.bottomLine} />
              </View>
              <View style={styles.tableContainer}>
                <Text style={styles.tableTitle}>What you get</Text>
                <Text style={[styles.tableValue, { color: COLORS.blue6 }]}>
                  NGN {amountFormatter(`${requestInfo?.total - (requestInfo.amount / 100)}`)}
                </Text>
              </View>
            </View>
            <View style={styles.commissions}>
                <Text style={styles.commissionsText}>The Feather commision is 1% of the amount requested</Text>
            </View>
            {/* Continue button below */}
          </ScrollView>
          <Bottombtn title="CONTINUE" onpress={()=>navigation.push("Depositpin", { requestInfo })} />
    
          {/* <Bottombtn title="update" onpress={handlePrepareToTestUpdate}/> */}
          {/* <View>
            <View style={styles.btnBg}>
              <Text style={styles.btnText}>CONTINUE</1Text>
            </View>
          </View> */}
        </View>
      );
}

export default DepositSummary
