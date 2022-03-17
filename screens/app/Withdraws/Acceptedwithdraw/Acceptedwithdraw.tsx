import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
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
import { getCoordinateFromAddress, getCurrentLocation } from "../../../../utils/customLocation";
import Customstatusbar from "../../../shared/Customstatusbar";
// import { styles } from './Pendingwithdraw.styles'
// Bottombtn;

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
  const {requestInfo} = route.params;
  const {setCoords, setDestinationCoords} = useContext(LocationContext)
  const [toggleShow, setToggleShow] = useState(true);

  useEffect(()=>{
    // update both map, meeting point and  Agent point
    console.log(requestInfo)
    getLocation()
  }, []);

  const getLocation = async () => {
      const {coordinates, address} = await getCurrentLocation()
      setCoords({...coordinates,locationText:address});
      // get the other destination
      const adddresscoord = await getCoordinateFromAddress(requestInfo.meetupPoint)
      setDestinationCoords({...adddresscoord, locationText:requestInfo.meetupPoint })
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
                    name={requestInfo.agentUsername}
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
                      + {requestInfo.charges} (Base Charge)
                    </Text>{" "}
                  </Text>
                  <Text style={styles.baseChargeNegotiate}>
                    *Base Charges can be negotiated
                  </Text>
                </View>

                <View style={styles.meetupContainer}>
                  <Text style={styles.meetUpText}>Meetup Point</Text>
                  <View style={styles.meetupLocationContainer}>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Meetupdot />
                      <Text style={styles.locationText}>{requestInfo?.meetupPoint}</Text>
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
                  onpress={() => console.log("Redirect to Phone")}
                />
                <Iconwithdatas
                  icon={<Smsicony />}
                  title="SMS"
                  details="Send a text to communicate"
                  onpress={() => console.log("Redirect to SMS")}
                />
                <Iconwithdatas
                  icon={<Chaticon />}
                  title="Chat"
                  details="Discuss conversations via chat"
                  onpress={() => console.log("Redirect to Chat")}
                />
                <Iconwithdatas
                  icon={<Cancelicony />}
                  title="Cancel Request "
                  details="Cancel this transaction"
                  onpress={() => console.log("Redirect to Cancel")}
                />
              </View>
            )}

            <View style={styles.bottomBtnContainer}>
              <TouchableOpacity
                style={styles.bottomMakeRequestBtn}
                activeOpacity={0.8}
                onPress={() => navigation.push("Requestsummary",{requestInfo})}
              >
                <View style={styles.makeRequestCircle}>
                  <Makerequestarrowright />
                </View>
                <View style={{ marginHorizontal: 16 }}></View>
                <Text style={styles.requestText}>MAKE PAYMENT</Text>
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

export default Acceptedwithdraw;
