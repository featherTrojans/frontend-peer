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
import { styles } from "../Withdrawpreview/Withdrawpreview.styles";
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
} = icons;
const { Locationmap } = images;

const Acceptedwithdraw = () => {
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
            {true ? (
              <View>
                <View style={styles.detailsProfile}>
                  <Requesterdetails
                    name="Destiny Babalola"
                    distance="3kms"
                    duration={12}
                  />

                  <Orangecheckmark />
                </View>

                <View style={{ marginTop: 20 }}>
                  <Text style={styles.amountText}>Amount</Text>
                  <Text style={styles.amountPrice}>
                    NGN 65,000.00{" "}
                    <Text style={styles.amountBaseCharge}>
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
                      <Text style={styles.locationText}>Forks and Fingers</Text>
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
              <View style={styles.bottomMakeRequestBtn}>
                <View
                  style={{
                    width: 40,
                    height: 40,
                    backgroundColor: COLORS.green2,
                    borderRadius: 20,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Makerequestarrowright />
                </View>
                <View style={{ marginHorizontal: 16 }}></View>
                <Text style={styles.requestText}>MAKE PAYMENT</Text>
              </View>
              <View style={styles.blackBtn}></View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Acceptedwithdraw;
