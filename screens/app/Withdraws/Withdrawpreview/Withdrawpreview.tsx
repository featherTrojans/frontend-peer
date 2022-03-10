import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import React, {useState} from "react";
import { styles } from "./Withdrawpreview.styles";
import { COLORS, FONTS, fontsize, images, icons } from "../../../../constants";
import { Bottombtn, Loader, Requesterdetails } from "../../../../components";
import showerror from "../../../../utils/errorMessage";
import { useToast } from "react-native-toast-notifications";
import axiosCustom from "../../../../httpRequests/axiosCustom";
import Map from "../../../shared/map/Map";

const { Locationmap } = images;
const { Forwardarrow, Editicon, Meetupdot } = icons;

const Withdrawpreview = ({navigation, route}: any) => {
  const toast = useToast()
  const {userInfo, amount } = route.params
  const [loading, setLoading] = useState(false)
 
  return (
    <View style={styles.container}>
      <Map />
      {loading && <Loader />}
      <StatusBar />
      
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
            onpress={()=>navigation.navigate("WithdrawPin",{userInfo,amount})}
          />
        </View>
    </View>
  );
};

export default Withdrawpreview;
