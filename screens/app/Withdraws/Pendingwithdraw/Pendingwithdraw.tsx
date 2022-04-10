import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import React, {useContext, useEffect, useState} from "react";
import { COLORS, images, icons, fontsize, FONTS } from "../../../../constants";
import {
  Bottombtn,
  Iconwithdatas,
  Requesterdetails,
} from "../../../../components";
import { styles } from "../Withdrawpreview/Withdrawpreview.styles";
import Map from "../../../shared/map/Map";
import { getCoordinateFromAddress, getCurrentLocation } from "../../../../utils/customLocation";
import { LocationContext } from "../../../../context/LocationContext";
import Customstatusbar from "../../../shared/Customstatusbar";
import { chatOnWhatsapp } from "../../../../utils/userDeviceFunctions";
// import { styles } from './Pendingwithdraw.styles'
// Bottombtn;

const { Forwardarrow, Meetupdot, Renegotiateicon, Chaticon, Dropswitch } = icons;
const { Locationmap } = images;

const Pendingwithdraw = ({navigation, route}) => {
  const {setCoords, setDestinationCoords} = useContext(LocationContext)
  const {requestInfo} = route.params;
  const [toggleShow, setToggleShow] = useState(true);
  const [locationLoading, setLocationLoading] = useState(false);
  
  useEffect(()=>{
    // update both map, meeting point and  Agent point
    getLocation()
  }, []);
  
  
  const getLocation = async () => {
    try{
      setLocationLoading(true)
      const {coordinates, address} = await getCurrentLocation()
      setCoords({...coordinates,locationText:address});
      // get the other destination
      // const adddresscoord = await getCoordinateFromAddress(requestInfo.meetupPoint)
      // setDestinationCoords({...adddresscoord, locationText:requestInfo.meetupPoint })
    }catch(err){
    }finally{
      setLocationLoading(false)
    }
  }

  if(locationLoading){
    return(
      <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
        <ActivityIndicator  color="#003AD6" size="large" />
       </View>
      )
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
                    name={requestInfo.agent}
                    // distance="3kms"
                    duration={"12 mins"}
                  />
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    {/* <Text style={styles.numberOfBadge}>203</Text> */}
                    <Forwardarrow />
                  </View>
                </View>

                <View style={{ marginTop: 20 }}>
                  <Text style={styles.amountText}>Amount</Text>
                  <Text style={styles.amountPrice}>
                    NGN {requestInfo?.amount}{" "}
                    <Text style={styles.amountBaseCharge}>
                      + {+requestInfo?.charges + +requestInfo?.negotiatedFee } (negotiation charge)
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
                  icon={<Chaticon />}
                  title="Chat"
                  details="Discuss conversations via chat"
                  onpress={() => chatOnWhatsapp(requestInfo.phoneNumber,`Hi ${requestInfo.agent}, I made a cash request of ${requestInfo.amount} to you on Feather`)}
                />
                <Iconwithdatas
                  icon={<Renegotiateicon />}
                  title="Renegotiate Charges "
                  details="Send in a new charge for this request"
                  onpress={() => navigation.navigate("Negotiate",{requestInfo})}
                />
              </View>
            )}

            <View style={styles.bottomBtnContainer}>
              <TouchableOpacity 
              style={styles.bottomCancelBtn} 
              activeOpacity={0.8} 
              onPress={() => navigation.navigate("Cancelrequest",{reference: requestInfo.reference})}
              >
                <Text style={styles.cancelText}>CANCEL REQUEST</Text>
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

export default Pendingwithdraw;
