import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { COLORS, images, icons, fontsize, FONTS } from "../../../../constants";
import {
  Bottombtn,
  Iconwithdatas,
  Requesterdetails,
} from "../../../../components";
import { styles } from "../Withdrawpreview/Withdrawpreview.styles";
import Map from "../../../shared/map/Map";
import { LocationContext } from "../../../../context/LocationContext";
import {
  getCoordinateFromAddress,
  getCurrentLocation,
} from "../../../../utils/customLocation";
import Customstatusbar from "../../../shared/Customstatusbar";
import axiosCustom from "../../../../httpRequests/axiosCustom";
import {
  chatOnWhatsapp,
  makePhoneCall,
  sendMessage,
} from "../../../../utils/userDeviceFunctions";
import { Swipeable } from "react-native-gesture-handler";
import { useToast } from "react-native-toast-notifications";
import showerror from "../../../../utils/errorMessage";

const {
  Forwardarrow,
  Meetupdot,
  Renegotiateicon,
  Chaticon,
  Smsicony,
  Phoneicony,
  Cancelicony,
  Makerequestarrowright,
  Orangecheckmark,
  Dropswitch,
} = icons;
const { Locationmap } = images;

const Acceptedwithdraw = ({ navigation, route }) => {
  const toast = useToast();
  const { requestInfo } = route.params;
  const { setCoords, setDestinationCoords } = useContext(LocationContext);
  const [toggleShow, setToggleShow] = useState(true);
  const [userinfo, setUserinfo] = useState({ phoneNumber: "" });
  const [loading, setLoading] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);

  useEffect(() => {
    // update both map, meeting point and  Agent point
    // console.log(requestInfo, "Here is the accepted withdrawal response");
    // console.log(userinfo, "here is the user info");
    getLocation();
  }, []);

  useEffect(() => {
    getAdditionalUserInfo();
  }, []);

  const getAdditionalUserInfo = async () => {
    try {
      const response = await axiosCustom.get(
        `/user/${requestInfo.agentUsername}`
      );
      setUserinfo(response?.data?.data);

      // console.log(response, "Response again");
    } catch (err) {}
  };
  const getLocation = async () => {
    try {
      setLocationLoading(true);
      const { coordinates, address } = await getCurrentLocation();
      setCoords({ ...coordinates, locationText: address });
      // get the other destination
      // const adddresscoord = await getCoordinateFromAddress(requestInfo.meetupPoint);
      // setDestinationCoords({...adddresscoord,locationText: requestInfo.meetupPoint,});
    } catch (err) {
    } finally {
      setLocationLoading(false);
    }
  };

  // const leftActions = (progress, dragX) => {
  //   const scale = dragX.interpolate({
  //     inputRange: [0, 200],
  //     outputRange: [0, 5],
  //     extrapolate: "clamp",
  //   });
  //   return (
  //     <View style={{ flex: 1, justifyContent: "center" }}>
  //       <Animated.View
  //         style={{
  //           padding: 10,
  //           backgroundColor: COLORS.blue6,
  //           width: 10,
  //           height: 10,
  //           transform: [{ scale }],
  //         }}
  //       ></Animated.View>
  //     </View>
  //   );
  // };

  // const swipedLeftFunction = () => {
  //   // console.log("We want to make redirct or proceed to make the payment");
  // };

  const handleCancelRequest = async () => {
    setLoading(true);
    try {
      await axiosCustom({
        method: "DELETE",
        url: "/request/cancel",
        data: {
          reference: requestInfo.reference,
          reasonForCancel: "agent declining withdraw request",
        },
      });
      navigation.navigate("Home");
    } catch (err) {
      showerror(toast, err);
    } finally {
      setLoading(false);
    }
  };

  if (locationLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator color="#000" size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Customstatusbar />
      <Map />
      <View style={styles.previewContainer}>
        <View style={{ paddingHorizontal: 25 }}>
          {toggleShow ? (
            <View>
              <View style={styles.detailsProfile}>
                <Requesterdetails
                  name={requestInfo?.agentUsername}
                  distance="3kms"
                  duration={12}
                />

                <Orangecheckmark />
              </View>

              <View style={{ marginTop: 20 }}>
                <Text style={styles.amountText}>Amount</Text>
                <Text style={styles.amountPrice}>
                  NGN {requestInfo.amount}{" "}
                  <Text style={styles.amountBaseCharge}>
                    + {requestInfo.charges} (negotiation charge)
                  </Text>{" "}
                </Text>
                <Text style={styles.baseChargeNegotiate}>
                  *Base Charges can be negotiated
                </Text>
              </View>

              <View style={styles.meetupContainer}>
                <Text style={styles.meetUpText}>Meetup Point</Text>
                <View style={styles.meetupLocationContainer}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Meetupdot />
                    <Text style={styles.locationText}>
                      {requestInfo?.meetupPoint}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          ) : (
            <View>
              <Iconwithdatas
                icon={<Phoneicony />}
                title="Phone"
                details="Phone call to communicate"
                onpress={() => makePhoneCall(userinfo?.phoneNumber)}
              />
              <Iconwithdatas
                icon={<Smsicony />}
                title="SMS"
                details="Send a text to communicate"
                onpress={() => sendMessage(userinfo?.phoneNumber, "")}
              />
              <Iconwithdatas
                icon={<Chaticon />}
                title="Chat"
                details="Discuss conversations via chat"
                onpress={() =>
                  chatOnWhatsapp(
                    userinfo.phoneNumber,
                    `Hi ${requestInfo?.agent}, I made a cash request of ${requestInfo?.amount} to you on Feather`
                  )
                }
              />
              <Iconwithdatas
                icon={<Cancelicony />}
                title="Cancel Request "
                details="Cancel this transaction"
                onpress={handleCancelRequest}
              />
            </View>
          )}

          <View style={styles.bottomBtnContainer}>
            {/* The accepted button */}
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                style={styles.bottomMakeRequestBtn}
                activeOpacity={0.8}
                onPress={() =>
                  navigation.push("Requestsummary", { requestInfo })
                }
              >
                {/* <Swipeable renderLeftActions={leftActions} onSwipeableLeftOpen={swipedLeftFunction}> */}
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View style={styles.makeRequestCircle}>
                    <Makerequestarrowright />
                  </View>

                  <View style={{ marginHorizontal: 16 }}></View>
                  <Text style={styles.requestText}>MAKE PAYMENT</Text>
                </View>
                {/* </Swipeable> */}
              </TouchableOpacity>
            </View>
            {/* The accepted button done */}

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.blackBtn}
              onPress={() => setToggleShow(!toggleShow)}
            >
              <Dropswitch />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Acceptedwithdraw;
