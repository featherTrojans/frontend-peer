import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  StatusBar,
} from "react-native";
import React from "react";
import { styles } from "./Withdrawpreview.styles";
import { COLORS, FONTS, fontsize, images, icons } from "../../../../constants";
import { Bottombtn } from "../../../../components";

const { Locationmap } = images;
const { Forwardarrow, Editicon, Meetupdot } = icons;

const Withdrawpreview = () => {
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
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {/* Details */}
                <View style={styles.imageBorder}>
                  {/* To replace this with the user image */}
                  <View
                    style={{
                      width: "100%",
                      height: "100%",
                      backgroundColor: COLORS.grey4,
                      borderRadius: 30,
                    }}
                  />
                </View>

                <View style={{ marginLeft: 15 }}>
                  <Text style={styles.profileName}>Destiny Babalola</Text>
                  <Text style={styles.distanceDuration}>
                    3 kms away | 12 mins
                  </Text>
                </View>
              </View>
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
            {/* <View>
                <Text style={{...fontsize.small, ...FONTS.regular}}>Meetup Point</Text>
                <View style={{marginTop: 20, flexDirection: 'row',  justifyContent: 'space-between'}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Meetupdot />
                        <Text style={{...fontsize.bbsmall, ...FONTS.medium, marginLeft: 12}}>Forks and Fingers</Text>
                    </View>
                        <Editicon />
                </View>
            </View> */}


            
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
