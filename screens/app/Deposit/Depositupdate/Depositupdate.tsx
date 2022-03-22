import { StyleSheet, Text, View, StatusBar } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { styles } from "./Depositupdate.styles";
import moment from "moment";
import {
  Backheader,
  Bottombtn,
  Loader,
  Viewbalance,
} from "../../../../components";
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
  Viewcashrequesticon,
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
  return (
    <>
      <Customstatusbar />
      <View style={{ flex: 1 }}>
        <View style={[styles.contentContainer]}>
          <View style={styles.topSection}>
            {/* Icons */}
            <View style={{ flexDirection: "row" }}>
              <TransferIcon />
              <View style={{ marginLeft: 24 }}>
                <Text style={styles.lastAmountText}>Last Amount Update</Text>
                <Text style={styles.updatedTimeText}>
                  Updated {moment(status.time).calendar()}
                </Text>
              </View>
            </View>

            <Text style={styles.lastAmountPrice}>
              NGN {amountFormatter(status.status[0].amount)}
            </Text>
          </View>

          <View style={styles.horizontalLine} />

          <View>
            <View style={styles.locationIconandText}>
              {/* icons */}
              <Location />
              <Text style={styles.location}>
                {status.status[0].locationText}
              </Text>
            </View>

            <View style={styles.expirationContainer}>
              <Text style={styles.expirationText}>
                Expires{" "}
                {moment(status.status[0].createdAt).add(1, "days").calendar()}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Depositinput", {
                    type: "update",
                    reference: status.status[0].reference,
                  })
                }
              >
                <Text style={styles.updateText}>Update</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.detailsRow}>
            <View style={styles.iconAndTitle}>
              <Accountbalanceicon />
              <Text style={styles.iconTitle}>Balance</Text>
            </View>
            <Text style={styles.iconValue}>
              N{" "}
              {amountFormatter(
                `${status.status[0].amount - status.totalEarnings}`
              )}
            </Text>
          </View>
          <View style={styles.horizontalLine} />
          <View style={styles.detailsRow}>
            <View style={styles.iconAndTitle}>
              <Trendingupright />
              <Text style={styles.iconTitle}>My Earnings last 24hrs</Text>
            </View>
            <Text style={styles.iconValue}>
              N {amountFormatter(status.totalEarnings)}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Deposit");
          }}
          style={styles.bottomBtn}
          activeOpacity={0.8}
        >
          <View style={{flexDirection: "row", alignItems: "center"}}>
            <View style={styles.eyeiconBg}>
              <Viewrequesteye />
            </View>
            <Text style={styles.viewRequestText}>
              View Cash Requests (
              {status.pendingRequests.length + status.acceptedRequests.length})
            </Text>
          </View>

          <Viewcashrequesticon />
        </TouchableOpacity>
      </View>
    </>
  );
};

const Depositupdate = ({ navigation }) => {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // getFromStorage();
    // get Status from the database
    getDepositStatus();
  }, []);

  const getDepositStatus = async () => {
    try {
      setLoading(true);
      const response = await axiosCustom.get("/status/get");
      
      setStatus(response.data.data);
    } catch (err) {
      // maybe show the error
    } finally {
      setLoading(false);
    }
  };

  // const getFromStorage = async () => {
  //   try {
  //     const jsonValue = await AsyncStorage.getItem("@depositstatus");
  //     console.log(jsonValue);
  //     if (jsonValue) {
  //       const parseVal = JSON.parse(jsonValue);
  //       // check time and reset status if time has pass
  //       if (parseVal.time + 1000 * 60 * 60 * 24 > Date.now()) {
  //         setStatus(parseVal);
  //       } else {
  //         await AsyncStorage.removeItem("@depositstatus");
  //       }
  //     }
  //   } catch (err) {}
  // };

  return (
    <View style={styles.container}>
      <Backheader title="Deposit" />
      {loading && <Loader />}
      <View style={{ flex: 1 }}>
        <View style={{ paddingHorizontal: 15 }}>
          <Viewbalance />
        </View>

        {status?.status?.length > 0 ? (
          <StatusUpdate status={status} navigation={navigation} />
        ) : (
          <>
            <View style={{ flex: 1 }}>
              <Emptyrequest />
            </View>

            <Bottombtn
              title="Create New Status"
              onpress={() =>
                navigation.navigate("Depositinput", {
                  type: "create",
                  reference: null,
                })
              }
            />
          </>
        )}
      </View>
    </View>
  );
};

export default Depositupdate;
