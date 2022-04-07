import { StyleSheet, Text, View, StatusBar, ScrollView } from "react-native";
import React, { useContext } from "react";
import { styles } from "./Requestsummary.styles";
import {
  Backheader,
  Bottombtn,
  Priceandcharges,
  Sendingandreceive,
} from "../../../../components";
import { FONTS, fontsize } from "../../../../constants";
import Customstatusbar from "../../../shared/Customstatusbar";
import { AuthContext } from "../../../../context/AuthContext";


const Requestsummary = ({navigation, route}) => {
  const {authdata} = useContext(AuthContext);
  const {requestInfo} = route.params
  // console.log(requestInfo);
  return (
    <View style={styles.container}>
      <Customstatusbar />


      <Backheader title="Request Summary" />
      <ScrollView style={{flex: 1}}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <Sendingandreceive senderName={authdata?.userDetails?.fullName} receiverName={requestInfo?.agent || requestInfo?.user?.agent || "A Z"} title="Wallet Credit" />
        <Priceandcharges amount={requestInfo?.amount} charges={requestInfo?.charges} />
      </View>

      <View style={styles.saferulesContainer}>
        <Text style={styles.saferuleText}>
          1. It is advisable that you meet-up in an open or public place.
        </Text>
        <Text style={styles.saferuleText}>
          2. Ensure that the cash given to you is certified as “in good condition” by you.
        </Text>
        <Text style={styles.saferuleText}>
        3. Make sure you complete payment as soon as cash is received.
        </Text>
      </View>
      </ScrollView>


        <Bottombtn title="I Understand, Proceed" onpress={() => navigation.push("Summary",{requestInfo})}/>
      
    </View>
  );
};

export default Requestsummary;
