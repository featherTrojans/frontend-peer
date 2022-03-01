import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { styles } from "./Withdrawpreview.styles";
import { COLORS, FONTS, fontsize, images, icons } from "../../../../constants";
import { Bottombtn, Requesterdetails } from "../../../../components";

const { Locationmap } = images;
const { Forwardarrow, Editicon, Meetupdot } = icons;

const Withdrawpreview = ({navigation}: any) => {
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
            {/* Confirm meetup text will show after clikcing continue*/}
            {/* <Text
              style={{ marginBottom: 26, ...fontsize.bsmall, ...FONTS.medium }}
            >
              Confirm Meetup Point
            </Text> */}

            <View style={styles.detailsProfile}>
              <Requesterdetails
                name="Destiny Babalola"
                distance="3kms"
                duration={12}
              />

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {/* Badge icon */}
                <Text style={styles.numberOfBadge}>203</Text>
                {/* Number of badges */}
                <Forwardarrow />
              </View>
            </View>

            {/* This part will disappear after clicking on continue */}
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

            {/* Meetup point will show after clicking the continuee*/}

            <View style={styles.meetupContainer}>
              <Text style={styles.meetUpText}>Meetup Point</Text>
              <View style={styles.meetupLocationContainer}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Meetupdot />
                  <Text style={styles.locationText}>Forks and Fingers</Text>
                </View>

                <TouchableOpacity onPress={() => navigation.navigate("Editmeetup") }>
                  <Editicon />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <Bottombtn
            title="CONTINUE"
            onpress={() => console.log("Continue btn clicked")}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

export default Withdrawpreview;
