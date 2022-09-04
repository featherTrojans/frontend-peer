import { StyleSheet, Text, View, Image, Animated, Easing } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Svg, {G, Circle} from "react-native-svg" 
import {
  Backheader,
  Chooseamountmodal,
  Custombutton,
  Horizontaline,
  Mainwrapper,
  Successmodal,
} from "../../../../components";
import { COLORS, FONTS, fontsize, icons, images } from "../../../../constants";
import useCustomModal from "../../../../utils/useCustomModal";
import { getCurrentLocation } from "../../../../utils/customLocation";
import { doesIncludeActiveStates } from "../../../../utils/utils";
import axiosCustom from "../../../../httpRequests/axiosCustom";
import useAlert from "../../../../utils/useAlerts";

const { Newlogo } = icons;
const { Lagosbadge, Ogunbadge, Osunbadge, Oyobadge } = images;

const states = [
  {
    logo: Lagosbadge,
    state: "Lagos State",
  },
  {
    logo: Oyobadge,
    state: "Oyo State",
  },
  {
    logo: Osunbadge,
    state: "Osun State",
  },
  {
    logo: Ogunbadge,
    state: "Ogun State",
  },
];


const Depositstart = ({navigation, route}) => {
  const type = route.params.type;
  const reference = route.params.reference;
  const { CustomModal: PickstateModal, openModal, closeModal } = useCustomModal();
  const {CustomModal:AmountModal, openModal:openAmountModal, closeModal:closeAmountModal } = useCustomModal();
  const {CustomModal:SuccessContainerModal, openModal:openSuccessModal, closeModal: closeSuccessModal} = useCustomModal()
  const {CustomModal:LoadingModal, openModal:openLoadingModal, closeModal:closeLoadingModal} = useCustomModal()
  const {successAlert, errorAlert} = useAlert()
  const [locationLoading, setLocationLoading] = useState(false);
  const [coords, setCoords] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const halfCircle = 50
  const radius = 30
  const circleCircumference = 2* Math.PI * radius
  const animatedValue = useRef(new Animated.Value(0)).current




  useEffect(() => {
    Animated.loop(
      Animated.timing(
        animatedValue,
        {
         toValue: 1,
         duration: 2000,
         easing: Easing.linear,
         useNativeDriver: true
        }
      )
     ).start();
  }, [])

    


  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    try {
      setLocationLoading(true);
      const { coordinates, address, locationObj }: any =
        await getCurrentLocation();
      if (!doesIncludeActiveStates(locationObj)) {
        openModal()
      }
      setCoords({ ...coordinates, locationText: address });
    } catch (err) {
    } finally {
      setLocationLoading(false);
    }
  };

  const handleSubmit = async (amount) => {
    openLoadingModal();
    try {
      if (type === "create") {
        await axiosCustom.post("/status/create", {
          amount: Number(amount),
          longitude: coords.longitude,
          latitude: coords.latitude,
          locationText: coords.locationText,
        });
      } else {
        await axiosCustom.put("/status/update", {
          amount: Number(amount),
          longitude: coords.longitude,
          latitude: coords.latitude,
          locationText: coords.locationText,
          reference,
        });
      }
      closeLoadingModal()
      openSuccessModal()
      successAlert(`You have successfully updated your deposit status to ${amount}`, true)
    } catch (err) {
      errorAlert(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAmountChnage = (amount)=>{
    closeModal()
    closeAmountModal()
    handleSubmit(amount)
  }


  const rotation = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });


  return (
    <Mainwrapper>
      <Backheader title="Deposit" />
      <PickstateModal>
        <View>
          <Text
            style={{
              ...fontsize.smaller,
              ...FONTS.medium,
              color: COLORS.blue9,
            }}
          >
            Supported States
          </Text>
          <Text
            style={{
              ...fontsize.smallest,
              ...FONTS.regular,
              marginTop: 10,
              color: COLORS.grey16,
            }}
          >
            You will be notified when these features are available in your
            region
          </Text>

          <View style={{ marginTop: 30, marginBottom: 40 }}>
            {states.map(({ logo, state }, index) => {
                const isLast = states.length === index+1 
              return (
                <View key={index}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image
                      style={{ width: 35, height: 35, borderRadius: 35 / 2 }}
                      source={logo}
                    />
                    <Text
                      style={{
                        marginLeft: 12,
                        ...fontsize.smaller,
                        ...FONTS.medium,
                        lineHeight: 25,
                        color: COLORS.blue9,
                      }}
                    >
                      {state}
                    </Text>
                  </View>
                  {!isLast && <Horizontaline marginV={20} />}
                </View>
              );
            })}
          </View>
            <View style={{marginBottom: 20}}>
          <Custombutton btntext="Okay, Continue" onpress={() => console.log("hellow")}/>
          </View>
        </View>

      </PickstateModal>
      <AmountModal>
        <Chooseamountmodal headerText={'How much do you want to deposit'} onpress={handleAmountChnage} />
      </AmountModal>
      <LoadingModal>



        <View style={{alignItems: "center", paddingVertical: 0, paddingHorizontal:50}}>
            {/* Loading circle */}
          {/* <View style={{width:50, height:50, 
            marginBottom: 20,
             borderRadius: 25, borderWidth: 10, borderColor:"#000", backgroundColor:"transparent"}} /> */}

             <Animated.View style={{ transform: [{ rotate: rotation }], width: 50, height: 50 }}>
               <Svg width={50} height={50} viewBox={`0 0 ${halfCircle* 2} ${halfCircle* 2}`} >
                <G rotation="-90" origin={`${halfCircle}, ${halfCircle}`}>
                  <Circle 
                  cx="50%"
                  cy="50%"
                  stroke={COLORS.blue6}
                  strokeWidth={10}
                  r={radius}
                  fill="transparent"
                  strokeOpacity={0.2}
                  />
                  <Circle 
                  cx="50%"
                  cy="50%"
                  stroke={COLORS.blue6}
                  strokeWidth={10}
                  r={radius}
                  fill="transparent"
                  strokeDasharray={circleCircumference/3}
                  strokeLinecap="round"
                  />
 
                </G>
               </Svg>
             </Animated.View>







          <Text style={{textAlign:"center", color: COLORS.blue9,...FONTS.regular, ...fontsize.smaller, lineHeight: 20, marginTop: 28}}>Fetching your current location to create your deposit</Text>
        </View>
      </LoadingModal>
      <SuccessContainerModal>
            <Successmodal 
              btnText="Great, Continue" 
              successMsg="Your deposit status has been created successfully" btnFunction={()=>{navigation.navigate("Home")}} 
            />
      </SuccessContainerModal>
      
      
      <View style={{ paddingHorizontal: 15, flex: 1 }}>
        <Newlogo />

        <Text
          style={{
            marginTop: 36,
            marginBottom: 20,
            ...fontsize.bbsmall,
            ...FONTS.medium,
            color: COLORS.blue9,
          }}
        >
          Start earning today with deposits
        </Text>
        <Text
          style={{
            ...fontsize.smaller,
            ...FONTS.regular,
            lineHeight: 20,
            color: COLORS.grey2,
          }}
        >
          We take the security and safety of our customers very seriously,
          kindly ensure you adhere to the safety advices below before
          proceeding.
        </Text>
      </View>
      <View style={{ paddingHorizontal: 15 }}>
        <Custombutton btntext="Create Deposit" onpress={openAmountModal} />
      </View>
    </Mainwrapper>
  );
};

export default Depositstart;

const styles = StyleSheet.create({});
