import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import React, {useState, useContext} from "react";
import { styles } from "./Withdrawpreview.styles";
import { COLORS, FONTS, fontsize, images, icons } from "../../../../constants";
import { Bottombtn, Loader, Requesterdetails } from "../../../../components";
import showerror from "../../../../utils/errorMessage";
import { useToast } from "react-native-toast-notifications";
import axiosCustom from "../../../../httpRequests/axiosCustom";
import Map from "../../../shared/map/Map";
import amountFormatter from "../../../../utils/formatMoney";
import { LocationContext } from "../../../../context/LocationContext";
import Customstatusbar from "../../../shared/Customstatusbar";

const { Locationmap } = images;
const { Forwardarrow, Editicon, Meetupdot } = icons;

const Withdrawpreview = ({navigation, route}: any) => {
  const toast = useToast()
  const {userInfo, amount, baseCharge } = route.params
  const [loading, setLoading] = useState(false)
  const {coords,destinationCoords} = useContext(LocationContext)
  return (  
    <View style={styles.container}>
      <Map />
      <Customstatusbar />
      
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
                name={userInfo.fullName}
                distance={userInfo.distance}
                duration={userInfo.duration}
              />

              {/* <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.numberOfBadge}>203</Text>
                <Forwardarrow />
              </View> */}
            </View>

            {/* This part will disappear after clicking on continue */}
            <View style={{ marginTop: 20 }}>
              <Text style={styles.amountText}>Amount</Text>
              <Text style={styles.amountPrice}>
                NGN {amountFormatter(amount)}
                <Text style={styles.amountBaseCharge}>
                  + {amountFormatter(String(baseCharge))} (Base Charge)
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
                  <Text style={styles.locationText}>{coords?.locationText}</Text>
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
