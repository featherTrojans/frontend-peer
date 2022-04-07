import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { COLORS, images, icons, fontsize, FONTS } from "../../../../constants";
import {
  Bottombtn,
  Iconwithdatas,
  Loader,
  Requesterdetails,
} from "../../../../components";
import { styles } from "../../Withdraws/Withdrawpreview/Withdrawpreview.styles";
import Map from "../../../shared/map/Map";
import { LocationContext } from "../../../../context/LocationContext";
import {
  getCoordinateFromAddress,
  getCurrentLocation,
} from "../../../../utils/customLocation";
import Customstatusbar from "../../../shared/Customstatusbar";
import {
  chatOnWhatsapp,
  makePhoneCall,
  sendMessage,
} from "../../../../utils/userDeviceFunctions";
import { useToast } from "react-native-toast-notifications";
import axiosCustom from "../../../../httpRequests/axiosCustom";
import showerror from "../../../../utils/errorMessage";
import { RFValue } from "react-native-responsive-fontsize";
//   import { styles } from "../Withdrawpreview/Withdrawpreview.styles";
// styles
// import { styles } from './Pendingwithdraw.styles'
// Bottombtn;

const {
  Forwardarrow,
  Meetupdot,
  Renegotiateicon,
  Chaticon,
  Ratingstar,
  Phoneicony,
  Smsicony,
  Cancelicony,
  Dropswitch,
} = icons;
const { Locationmap } = images;

const Accepteddeposit = ({ navigation, route }) => {
  const toast = useToast();
  const { requestInfo } = route.params;
  const { setCoords, setDestinationCoords } = useContext(LocationContext);
  const [toggleShow, setToggleShow] = useState(true);
  const [loading, setLoading] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);

  useEffect(() => {
    // update both map, meeting point and  Agent point
    
    getLocation()
  }, []);

  const getLocation = async () => {
    setDestinationCoords({})
      setCoords({})
    try{
      setLocationLoading(true)
      const {coordinates, address} = await getCurrentLocation()
      setCoords({...coordinates,locationText:address});
      // get the other destination
      const adddresscoord = await getCoordinateFromAddress(
        requestInfo.meetupPoint
      );
      setDestinationCoords({
        ...adddresscoord,
        locationText: requestInfo.meetupPoint,
      });
    } catch (err) {
    } finally {
      setLocationLoading(false);
    }
  };

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

  const handleRedirect = () => {
    navigation.push("Depositpin", { requestInfo });
  };

  if (locationLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator color={COLORS.blue6} size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {loading && <Loader />}
      <Customstatusbar />
      <Map />
      <View style={styles.previewContainer}>
        <View style={{ paddingHorizontal: 25 }}>
          {toggleShow ? (
            <View>
              <View style={styles.detailsProfile}>
                <Requesterdetails
                  name={requestInfo?.user?.fullName}
                  // distance="3kms"
                  duration={"12 mins"}
                />

                {/* <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Ratingstar />
                  <Text style={styles.numberOfBadge}>3.5</Text>
                </View> */}
              </View>

              <View style={{ marginTop: RFValue(20) }}>
                <Text style={styles.amountText}>Amount</Text>
                <Text style={styles.amountPrice}>
                  NGN {requestInfo.amount}{" "}
                  <Text style={styles.depositAmountBaseCharge}>
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
                    <Text style={styles.depositLocationText}>
                      {requestInfo.meetupPoint}
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
                onpress={() => makePhoneCall(requestInfo.user.phoneNumber)}
              />

              <Iconwithdatas
                icon={<Smsicony />}
                title="SMS"
                details="Send a text to communicate"
                onpress={() => sendMessage(requestInfo.user.phoneNumber, "")}
              />

              <Iconwithdatas
                icon={<Chaticon />}
                title="Chat"
                details="Discuss conversations via chat"
                onpress={() => chatOnWhatsapp(requestInfo.user.phoneNumber,`Hi ${requestInfo.user.fullName}, I saw you made a cash request of ${requestInfo.amount} on Feather`)}
              />

              <Iconwithdatas
                icon={<Cancelicony />}
                title="Decline Request "
                details="Say no to this transaction"
                onpress={handleCancelRequest}
              />
            </View>
          )}

          <View style={styles.bottomBtnContainer}>
            <TouchableOpacity
              style={styles.bottomAcceptBtn}
              activeOpacity={0.8}
              onPress={handleRedirect}
            >
              <Text style={styles.cancelText}>RECEIVE PAYMENT</Text>
            </TouchableOpacity>
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

export default Accepteddeposit;
