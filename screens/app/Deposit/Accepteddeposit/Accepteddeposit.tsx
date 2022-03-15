import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ImageBackground,
  TouchableOpacity
} from "react-native";
import React, {useContext, useState} from "react";
import { COLORS, images, icons, fontsize, FONTS } from "../../../../constants";
import {
  Bottombtn,
  Iconwithdatas,
  Requesterdetails,
} from "../../../../components";
import { styles } from "../../Withdraws/Withdrawpreview/Withdrawpreview.styles";
import Map from "../../../shared/map/Map";
import { LocationContext } from "../../../../context/LocationContext";
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
  Dropswitch
} = icons;
const { Locationmap } = images;

const Accepteddeposit = ({navigation, route}) => {
  const {requestInfo} = route.params
  const [toggleShow, setToggleShow] = useState(true);
  const {coords} = useContext(LocationContext)

  return (
    <View style={styles.container}>
      <StatusBar />
        <Map />
        <View style={styles.previewContainer}>
          <View style={{ paddingHorizontal: 25 }}>
            {toggleShow ? (
              <View>
                <View style={styles.detailsProfile}>
                  <Requesterdetails
                    name="Destiny Babalola"
                    distance="3kms"
                    duration={12}
                  />

                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Ratingstar />
                    <Text style={styles.numberOfBadge}>3.5</Text>
                  </View>
                </View>

                <View style={{ marginTop: 20 }}>
                  <Text style={styles.amountText}>Amount</Text>
                  <Text style={styles.amountPrice}>
                    NGN {requestInfo.amount}{" "}
                    <Text style={styles.depositAmountBaseCharge}>
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
                      <Text style={styles.depositLocationText}>
                        {requestInfo.meetup}
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
                  onpress={() => console.log("Redirect to Chat")}
                />
                <Iconwithdatas
                  icon={<Smsicony />}
                  title="SMS"
                  details="Send a text to communicate"
                  onpress={() => console.log("Redirect to Negotiate")}
                />
                <Iconwithdatas
                  icon={<Chaticon />}
                  title="Chat"
                  details="Discuss conversations via chat"
                  onpress={() => console.log("Redirect to Chat")}
                />

                <Iconwithdatas
                  icon={<Cancelicony />}
                  title="Decline Request "
                  details="Say no to this transaction"
                  onpress={() => console.log("Redirect to Negotiate")}
                />
              </View>
            )}

            <View style={styles.bottomBtnContainer}>
              <TouchableOpacity style={styles.bottomAcceptBtn} activeOpacity={0.8} onPress={() => navigation.navigate("Depositpin")}>
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
