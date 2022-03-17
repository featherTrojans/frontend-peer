import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    ImageBackground,
    TouchableOpacity
  } from "react-native";
  import React, {useContext, useEffect, useState} from "react";
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
import axiosCustom from "../../../../httpRequests/axiosCustom";
import showerror from "../../../../utils/errorMessage";
import { useToast } from "react-native-toast-notifications";
import { getCoordinateFromAddress, getCurrentLocation } from "../../../../utils/customLocation";
import Customstatusbar from "../../../shared/Customstatusbar";
//   import { styles } from "../Withdrawpreview/Withdrawpreview.styles";
// styles
  // import { styles } from './Pendingwithdraw.styles'
  // Bottombtn;
  
  const { Forwardarrow, Meetupdot, Renegotiateicon, Chaticon, Ratingstar, Phoneicony, Smsicony, Cancelicony, Dropswitch} = icons;
  const { Locationmap } = images;
  
  const Pendingdeposit = ({navigation, route}) => {
    const toast = useToast()
    const {requestInfo} = route.params
    const {setCoords, setDestinationCoords} = useContext(LocationContext)
    const [toggleShow, setToggleShow] = useState(true);
    const [loading, setLoading] = useState(false)
    
    useEffect(()=>{
      // update both map, meeting point and  Agent point
      getLocation()
    }, []);
  
    const getLocation = async () => {
        const {coordinates, address} = await getCurrentLocation()
        setCoords({...coordinates,locationText:address});
        // get the other destination
        const adddresscoord = await getCoordinateFromAddress(requestInfo.meetupPoint)
        setDestinationCoords({...adddresscoord, locationText:requestInfo.meetupPoint })
    }
  
  
    const handleAcceptRequest = async () =>{
      setLoading(true)
      try{
        await axiosCustom.put(`/request/accept/${requestInfo.reference}`)
        navigation.navigate("Home")
      }catch(err){
        showerror(toast,err)
      }finally{
        setLoading(false)
      }
    }

    return (
      <View style={styles.container}>
        <Customstatusbar />
        {loading && <Loader />}
        <Map />
          <View style={styles.previewContainer}>
            <View style={{ paddingHorizontal: 25 }}>
              {toggleShow ? (
                <View>
                  <View style={styles.detailsProfile}>
                    <Requesterdetails
                      name={requestInfo?.user?.fullName}
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
                        <Text style={styles.depositLocationText}>{requestInfo.meetupPoint}</Text>
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
                    icon={<Renegotiateicon />}
                    title="Renegotiate Charges "
                    details="Send in a new charge for this request"
                    onpress={() => console.log("Redirect to Negotiate")}
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
                <TouchableOpacity style={styles.bottomAcceptBtn} onPress={handleAcceptRequest}>
                  <Text style={styles.cancelText}>ACCEPT REQUEST</Text>
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
  
  export default Pendingdeposit;
  