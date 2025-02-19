import { StyleSheet, Text, View, StatusBar } from "react-native";
import React, { useContext, useState } from "react";
import { styles } from "./Negotiate.style.";
import { COLORS, FONTS, fontsize, icons } from "../../../constants";
import {
  Bottombtn,
  Keyboard,
  Loader,
  Numberbtn,
  Sendingandreceive,
} from "../../../components";
import axiosCustom from "../../../httpRequests/axiosCustom";
import Globalmodal from "../../shared/Globalmodal/Globalmodal";
import { LocationContext } from "../../../context/LocationContext";
import Customstatusbar from "../../shared/Customstatusbar";
import { AuthContext } from "../../../context/AuthContext";
import { plusBase } from "../../../utils/utils";
import { RFValue } from "react-native-responsive-fontsize";
import { SafeAreaView } from "react-native-safe-area-context";
import useAlert from "../../../utils/useAlerts";
const { Backarrow, SecureDot } = icons;

const Negotiate = ({ navigation, route }) => {
  const { requestInfo } = route.params;
  const { authdata } = useContext(AuthContext);
  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "00", "0"];
  const [loading, setLoading] = useState(false);
  const [charges, setCharges] = useState<string>(requestInfo.negotiatedFee);
  const [showmodal, setShowModal] = useState(false);
  const { errorAlert } = useAlert();

  const amountFormatter = (value: string) => {
    return (
      Number(value)
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, "$&,") || "0.00"
    );
  };

  const handleRemoveAmount = () => {
    if (charges.length > 0) {
      const newdata = charges.substring(0, charges.length - 1);
      setCharges(newdata);
    }
  };
  const handleSetAmount = (value: string) => {
    setCharges((oldamount) => {
      let newamount = oldamount.concat(value);
      if (Number(newamount)) {
        return newamount;
      }
      return oldamount;
    });
  };

  const handleSubmit = async () => {
    if (Number(charges) <= 0) {
      errorAlert(
        undefined,
        "sorry you have to input a fair amount to continue"
      );
      return;
    }
    try {
      setLoading(true);
      const response = await axiosCustom.put("/request/negotiate", {
        negotiatedFee: charges,
        reference: requestInfo.reference,
      });
      setShowModal(true);
    } catch (err) {
      errorAlert(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={styles.container}>
        {loading && <Loader />}

        <Customstatusbar />

        <Globalmodal
          showState={showmodal}
          btnFunction={() => navigation.navigate("Home")}
        >
          <View style={{ alignItems: "center" }}>
            <Text style={{ alignSelf: "flex-start" }}>Request Summary</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginVertical: RFValue(20),
              }}
            >
              <Sendingandreceive
                senderName={authdata?.userDetails?.fullName}
                receiverName={
                  requestInfo?.fullName || requestInfo?.user?.fullName || "A Z"
                }
                title="Wallet Credit"
              />
              {/* <View
                style={{
                  width: 80,
                  height: 80,
                  backgroundColor: COLORS.grey1,
                  borderRadius: 40,
                  marginHorizontal:10
                }}
                />
                <View
                style={{
                  width: 80,
                  height: 80,
                  backgroundColor: COLORS.grey1,
                  borderRadius: 40,
                  marginHorizontal:10
                }}
              /> */}
            </View>
            <Text style={{ ...fontsize.bmedium, ...FONTS.bold }}>
              Base charges has been succesfully changed
            </Text>
            <Text
              style={{
                backgroundColor: "#F2F5FF",
                paddingVertical: RFValue(10),
                paddingHorizontal: RFValue(20),
                borderRadius: RFValue(30),
                marginVertical: RFValue(15),
              }}
            >
              Withdraw Charges:
              <Text style={{ ...FONTS.bold }}>
                NGN {amountFormatter(charges)}
              </Text>
            </Text>
            {/* <Text style={{textAlign: "center",marginHorizontal: 40,marginVertical: 40,...fontsize.bsmall,...FONTS.regular,}}>
                Note that the  above can be negotiated by <Text style={{...FONTS.bold}}> {userInfo.username}</Text>
              </Text> */}
          </View>
        </Globalmodal>
        <View style={{ flex: 1, backgroundColor: COLORS.white }}>
          <View style={styles.mainContainer}>
            <View style={[styles.backArrowConteiner, { marginLeft: 15 }]}>
              <Backarrow />
            </View>

            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionText}>
                Add or reduce the charges to negotiate
              </Text>
              <Text style={styles.enterPinText}>Enter Amount</Text>
            </View>
            <View style={{ flex: 1, justifyContent: "center" }}>
              <View style={{ alignItems: "center" }}>
                <View style={styles.amountcont}>
                  <Text style={styles.amountTxt}>
                    {" "}
                    <Text style={{ color: COLORS.grey5 }}>N</Text>{" "}
                    {amountFormatter(charges)}
                  </Text>
                </View>
              </View>

              <Keyboard
                array={[...numbers]}
                setDigit={handleSetAmount}
                removeDigit={handleRemoveAmount}
              />
            </View>
          </View>
          <Bottombtn title="PROCEED" onpress={handleSubmit} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Negotiate;
