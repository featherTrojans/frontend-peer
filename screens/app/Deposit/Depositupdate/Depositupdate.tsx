import { StyleSheet, Text, View, StatusBar } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { styles } from "./Depositupdate.styles";
import moment from "moment";
import { Backheader, Bottombtn, Viewbalance } from "../../../../components";
import LottieView from "lottie-react-native";
import { COLORS, FONTS, fontsize, icons } from "../../../../constants";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import amountFormatter from "../../../../utils/formatMoney";
import { AuthContext } from "../../../../context/AuthContext";
import axiosCustom from "../../../../httpRequests/axiosCustom";
import Customstatusbar from "../../../shared/Customstatusbar";
const {
  TransferIcon,
  Location,
  Accountbalanceicon,
  Trendingupright,
  Viewrequesteye,
  Cryinganimate,
} = icons;

const Emptyrequest = () => {
  return (
    <View style={styles.emptyListContainer}>
      {/* Crying icons */}
      <LottieView
        source={Cryinganimate}
        autoPlay
        loop
        style={{ width: 190, height: 190 }}
      />
      {/* Information text */}
      <Text style={styles.emptyListText}>
        Padi, you have not performed any cash deposits today, Start Now.
      </Text>
    </View>
  );
};

const StatusUpdate = ({ status, navigation }: any) => {
  const { authdata } = useContext(AuthContext);
  return (<>
  <Customstatusbar />
      <View style={{ flex: 1 }}>
        <View style={styles.contentContainer}>
          <View style={styles.topSection}>
            {/* Icons */}
            <TransferIcon />
            <View>
              <Text style={styles.lastAmountText}>Last Amount Update</Text>
              <Text style={styles.updatedTimeText}>
                Updated {moment(status.time).calendar()}
              </Text>
            </View>
            <Text style={styles.lastAmountPrice}>
              NGN {amountFormatter(status.amount)}
            </Text>
          </View>
          <View style={styles.horizontalLine} />
          <View>
            <View style={styles.locationIconandText}>
              {/* icons */}
              <Location />
              <Text style={styles.location}>{status.locationText}</Text>
            </View>
            <View style={styles.expirationContainer}>
              <Text style={styles.expirationText}>
                Expires {moment(status.time).add(1, "days").calendar()}
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("Depositinput")}
              >
                <Text style={styles.updateText}>Update</Text>
              </TouchableOpacity>
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
            <Text style={styles.iconValue}>
              N {amountFormatter(`${authdata?.walletBal - status?.amount}`)}
            </Text>
          </View>

        {/* <View style={styles.horizontalLine} /> */}
        {/* <View style={styles.detailsRow}>
          <View style={styles.iconAndTitle}>
            <Trendingupright />
            <Text style={styles.iconTitle}>My Earnings last 24hrs</Text>
          </View>
          <Text style={styles.iconValue}>N32,920.00</Text>
        </View> */}
      </View>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Deposit");
        }}
        style={styles.bottomBtn}
      >
        <View style={styles.eyeiconBg}>
          <Viewrequesteye />
        </View>
        <Text style={styles.viewRequestText}>
          View Cash Requests {/*(15)*/}
        </Text>
      </TouchableOpacity>
      </View>
    </>
  );
};

const Depositupdate = ({navigation}) => {
  
  const [status, setStatus] =  useState(null)
  useEffect(()=>{
    getFromStorage()
    // get Status from the database
    // getDepositStatus()
  },[])


  const getDepositStatus = async ()=>{
    try{
      const response = await axiosCustom.get("/status/get")
      console.log(response.data)
    }catch(err){
      // maybe show the error
    }
  }
  
  const getFromStorage = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@depositstatus");
      console.log(jsonValue);
      if (jsonValue) {
        const parseVal = JSON.parse(jsonValue);
        // check time and reset status if time has pass
        if (parseVal.time + 1000 * 60 * 60 * 24 > Date.now()) {
          setStatus(parseVal);
        } else {
          await AsyncStorage.removeItem("@depositstatus");
        }
      }
    }catch(err){
    }
  }

  return (
    <View style={styles.container}>
      <Backheader title="Deposit" />

      <View style={{ flex: 1, paddingHorizontal: 15 }}>
        <Viewbalance  />
        {status ? (
          <StatusUpdate status={status} navigation={navigation} />
        ) : (
          <>
            <View style={{ flex: 1 }}>
              <Emptyrequest />
            </View>
          </>
        )}
      </View>
      <Bottombtn
        title="Create New Status"
        onpress={() => navigation.navigate("Depositinput")}
      />
    </View>
  );
};

export default Depositupdate;
