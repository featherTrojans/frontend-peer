import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import * as Haptics from 'expo-haptics';
import { COLORS, images, icons, fontsize, FONTS, SIZES } from "../../../../constants";
import {
  Bottombtn,
  Iconwithdatas,
  Requesterdetails,
} from "../../../../components";
import { styles } from "../Withdrawpreview/Withdrawpreview.styles";
import Map from "../../../shared/map/Map";
import { LocationContext } from "../../../../context/LocationContext";
import {
  getCoordinateFromAddress,
  getCurrentLocation,
} from "../../../../utils/customLocation";
import Customstatusbar from "../../../shared/Customstatusbar";
import axiosCustom from "../../../../httpRequests/axiosCustom";
import {
  chatOnWhatsapp,
  makePhoneCall,
  sendMessage,
} from "../../../../utils/userDeviceFunctions";
import { PanGestureHandler, Swipeable } from "react-native-gesture-handler";
// import { useToast } from "react-native-toast-notifications";
import showerror from "../../../../utils/errorMessage";
import Animated, { Extrapolate, interpolate, runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { RFValue } from "react-native-responsive-fontsize";
import { SafeAreaView } from "react-native-safe-area-context";

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


const BUTTON_WIDTH =  SIZES.width - 50 - 62 -14;
const BUTTON_HEIGHT = RFValue(62);
const BUTTON_PADDING = 10;
const SWIPEABLE_DIMENSIONS = BUTTON_HEIGHT - 2 * BUTTON_PADDING;
const H_WAVE_RANGE = SWIPEABLE_DIMENSIONS + 2 * BUTTON_PADDING;
const H_SWIPE_RANGE = BUTTON_WIDTH - 2 * BUTTON_PADDING - SWIPEABLE_DIMENSIONS;





const Acceptedwithdraw = ({ navigation, route }) => {
  // const toast = useToast();
  const { requestInfo } = route.params;
  const X = useSharedValue(0)
  const { setCoords, setDestinationCoords } = useContext(LocationContext);
  const [toggleShow, setToggleShow] = useState(true);
  const [userinfo, setUserinfo] = useState({ phoneNumber: "" });
  const [loading, setLoading] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  const [toggledSwipe, setToggledSWipe] = useState(false)
  
  useEffect(() => {
    // update both map, meeting point and  Agent point
    // console.log(requestInfo, "Here is the accepted withdrawal response");
    // console.log(userinfo, "here is the user info");
    getLocation();
  }, []);

  useEffect(() => {
    getAdditionalUserInfo();

  }, []);

  useEffect(() => {
    if(toggledSwipe){
      navigation.push("Requestsummary", { requestInfo })
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
    }
    return () => {
      setToggledSWipe(false)
    }
  },[toggledSwipe])
  useEffect(()=>{
    getAgentInfo()
  },[requestInfo])
  
  const getAgentInfo = async ()=>{
    try{
      const response = await axiosCustom.get(`/user/${requestInfo.agentUsername}`)
      console.log(response)
      setUserinfo(response.data)
    }catch(err){
    }
  }

  const getAdditionalUserInfo = async () => {
    try {
      const response = await axiosCustom.get( 
        `/user/${requestInfo.agentUsername}`
      );
      setUserinfo(response?.data?.data);

      // console.log(response, "Response again");
    } catch (err) {}
  };
  const getLocation = async () => {
    try {
      setLocationLoading(true);
      const { coordinates, address } = await getCurrentLocation();
      setCoords({ ...coordinates, locationText: address });
      // get the other destination
      // const adddresscoord = await getCoordinateFromAddress(requestInfo.meetupPoint);
      // setDestinationCoords({...adddresscoord,locationText: requestInfo.meetupPoint,});
    } catch (err) {
    } finally {
      setLocationLoading(false);
    }
  };

  const toChatInApp = ()=>{
    navigation.navigate("Chatsdm",{ userInfo: userinfo})
  }

  

  const animatedGestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.completed = toggledSwipe
    },
    onActive: (e, ctx) => {
      let newValue;

      if(ctx.completed){
        newValue = H_SWIPE_RANGE + e.translationX
      }
      else{
        X.value = e.translationX;
      }
      if(newValue >=0 && newValue <= H_SWIPE_RANGE){
        X.value = newValue;
      }
     
      
    },
    onEnd: () => {
      if(X.value < BUTTON_WIDTH/2 - SWIPEABLE_DIMENSIONS/2 ){
        X.value = withSpring(0)
       runOnJS(setToggledSWipe)(false)
      }
      else{
        X.value = withSpring(H_SWIPE_RANGE)
        runOnJS(setToggledSWipe)(true)
      }
    }
  });
  const animatedStyle =  {
    swipeable: useAnimatedStyle(() => {
      return {
        transform: [{translateX: X.value}] 
      }
    }),
    swipeText: useAnimatedStyle(() => {
      return {
        opacity: interpolate(X.value, [0, H_SWIPE_RANGE], [0.8, 0], Extrapolate.CLAMP),
        transform: [{
          translateX: interpolate(X.value, [0, H_SWIPE_RANGE], [0, BUTTON_WIDTH/2 - SWIPEABLE_DIMENSIONS],Extrapolate.CLAMP)
        }]
      }
    })
  }



  const handleCancelRequest = async () => {
    setLoading(true);
    try {
      await axiosCustom({
        method: "DELETE",
        url: "/request/cancel",
        data: {
          reference: requestInfo.reference,
          reasonForCancel: "agent declining withdraw request",
        },
      });
      navigation.navigate("Home");
    } catch (err) {
      // showerror(toast, err);
    } finally {
      setLoading(false);
    }
  };

  if (locationLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator color="#003AD6" size="large" />
      </View>
    );
  }
 

  return (
    <SafeAreaView style={styles.container}>
      <Customstatusbar />
      <Map />
      <View style={styles.previewContainer}>
        <View style={{ paddingHorizontal: 25 }}>
          {toggleShow ? (
            <View>
              <View style={styles.detailsProfile}>
                <Requesterdetails
                  name={requestInfo?.agent}
                  // distance="3kms"
                  duration={"12 mins"}
                />

                <Orangecheckmark />
              </View>

              <View style={{ marginTop: 20 }}>
                <Text style={styles.amountText}>Amount</Text>
                <Text style={styles.amountPrice}>
                  NGN {requestInfo.amount}{" "}
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
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Meetupdot />
                    <Text style={styles.locationText}>
                      {requestInfo?.meetupPoint}
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
                onpress={() => makePhoneCall(userinfo?.phoneNumber)}
              />
              <Iconwithdatas
                icon={<Smsicony />}
                title="SMS"
                details="Send a text to communicate"
                onpress={() => sendMessage(userinfo?.phoneNumber, "")}
              />
              <Iconwithdatas
                icon={<Chaticon />}
                title="Chat"
                details="Discuss conversations via chat"
                onpress={toChatInApp}
              />
              <Iconwithdatas
                icon={<Cancelicony />}
                title="Cancel Request "
                details="Cancel this transaction"
                onpress={handleCancelRequest}
              />
            </View>
          )}

          <View style={styles.bottomBtnContainer}>
            {/* The accepted button */}
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                style={{
                  width: BUTTON_WIDTH,
                  height: BUTTON_HEIGHT,
                  padding: BUTTON_PADDING,
                  backgroundColor: COLORS.green2,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 10,
                  marginRight: 14
                }}
                activeOpacity={1}
                // onPress={() =>
                //   navigation.push("Requestsummary", { requestInfo })
                // }
              >
                <PanGestureHandler onGestureEvent={animatedGestureHandler}>
                  <Animated.View style={[styles.makeRequestCircle,animatedStyle.swipeable]}>
                    <Makerequestarrowright />
                  </Animated.View>
                </PanGestureHandler>
                <Animated.Text style={[styles.requestText, animatedStyle.swipeText]}>SWIPE TO PAY</Animated.Text> 

                {/* <View style={{ marginHorizontal: 16 }}></View>
                  */}
              </TouchableOpacity>
            </View>
            {/* The accepted button done */}

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
    </SafeAreaView>
  );
};

export default Acceptedwithdraw;
