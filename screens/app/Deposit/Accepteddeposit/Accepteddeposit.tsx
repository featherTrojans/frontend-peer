import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ImageBackground,
} from "react-native";
import React from "react";
import { COLORS, images, icons, fontsize, FONTS } from "../../../../constants";
import {
  Bottombtn,
  Iconwithdatas,
  Requesterdetails,
} from "../../../../components";
import { styles } from "../../Withdraws/Withdrawpreview/Withdrawpreview.styles";
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
} = icons;
const { Locationmap } = images;

const Accepteddeposit = () => {
  return (
    <View style={styles.container}>
      <StatusBar />
      <ImageBackground
        source={Locationmap}
        resizeMode="cover"
        style={{ flex: 1, position: "relative" }}
      >
        <View style={styles.previewContainer}>
          <View style={{ paddingHorizontal: 25 }}>
            {false ? (
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
                    NGN 65,000.00{" "}
                    <Text style={styles.depositAmountBaseCharge}>
                      + 1,500.00 (Base Charge)
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
                        Forks ‘n’ Fingers, Obafemi Awolowo University Campus,
                        Ile-Ife{" "}
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
              <View style={styles.bottomAcceptBtn}>
                <Text style={styles.cancelText}>RECEIVE PAYMENT</Text>
              </View>
              <View style={styles.blackBtn}></View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Accepteddeposit;
