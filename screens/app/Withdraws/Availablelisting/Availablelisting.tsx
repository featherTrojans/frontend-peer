import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Animated,
  Easing,
  FlatList,
} from "react-native";
import React, { useState, useEffect, useContext, useRef } from "react";
import LottieView from "lottie-react-native";

import {
  icons,
  COLORS,
  fontsize,
  FONTS,
  SIZES,
} from "../../../../constants";
import Map from "../../../shared/map/Map";
import axiosCustom from "../../../../httpRequests/axiosCustom";
import { LocationContext } from "../../../../context/LocationContext";
import { getCurrentLocation } from "../../../../utils/customLocation";
import Customstatusbar from "../../../shared/Customstatusbar";
import { Backheader, Horizontaline, Negotiatecharge, Successmodal } from "../../../../components";
import { doesIncludeActiveStates } from "../../../../utils/utils";
import { SafeAreaView } from "react-native-safe-area-context";
import Requestuser from "../../../shared/RequestUser";
import useCustomModal from "../../../../utils/useCustomModal";
import Withdrawinfo from "../../../../components/Modals/Withdrawinfo";
import RequestSummary from "../../../../components/Modals/RequestSummary";
import useAlert from "../../../../utils/useAlerts";
import Toast from "react-native-toast-message";
const {
  Listingsdrop,
  Emptyicon,
  Loadinglocationanimate,
  Cryinganimate
} = icons;

const datas = [
  {
    title: "Peers",
    data: [] 
  },
  {
    title: "Agents",
    data: [],
  },
];

interface agent {
  "amount": string,
  "duration": string,
  "fullName": string,
  "latitude": string,
  "locationText": string,
  "longitude": string,
  "reference": string,
  "username": string,
}

const Availablelisting = ({ navigation, route }: any) => {
  const amount = route.params?.amount;
  const activate = route.params?.activate;
  const { setCoords,coords, setDestinationCoords } = useContext(LocationContext);
  const {blueAlert} = useAlert()
  const [agents, setAgents] = useState([]);
  const [charge, setCharge] = useState(0);
  const [negotiatecharge, setNegotiateCharge] = useState(0);
  const [activeType, setActiveType] = useState("peers");
  const [loading, setLoading] = useState(true);
  const [locationLoading, setLocationLoading] = useState(false);
  const animatedHeight = useRef(new Animated.Value(0)).current;
  const [isShow, setIsShow] = useState(false);
  const scrollX = useRef<any>(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList>(null);
  const dotLength = Animated.divide(scrollX, SIZES.width);
  const [activeAgent, setActiveAgent] = useState<agent | {}>({})
  const [viewIndex, setViewIndex] = useState<number>(0);
  const [info, setInfo] = useState("More")
  const { CustomModal ,openModal, closeModal} = useCustomModal()
  const { CustomModal:TransationSummaryModal ,openModal: openTransactionSummaryModal, closeModal:closeTransactionSummeryModal} = useCustomModal()
  const { CustomModal:NegotiateChargeModal ,openModal: openNegotiateChargeModal, closeModal:closeNegotiateChargeModal} = useCustomModal()
  const {CustomModal:SuccessModalContainer, openModal: openSuccessModal, closeModal: closeSuccessModal} =  useCustomModal()
  console.log(coords,"*******CORDS********")

  const onViewChangeRef = useRef<
    ({ viewableItems, changed }: { viewableItems: any; changed: any }) => void
  >(({ viewableItems, changed }) => {
    setViewIndex(viewableItems[0]?.index);
  });


  useEffect(()=>{
    if(activate){
      handleSelectAgent(route.params?.activate)
    }
  },[activate])
  useEffect(()=>{
    blueAlert("Get cash easily from certified agents around you competitive transaction charges and fees")

    return () =>{
      Toast.hide()
    }
  },[])


  // This function is to toggle the listings height
  const toggleHeight = () => {
    if (isShow == true) {
      Animated.timing(animatedHeight, {
        toValue: 1,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: false, // <-- neccessary
      }).start(() => {
        setIsShow(false);
        setInfo("Less")
      });
    } else {
      Animated.timing(animatedHeight, {
        toValue: 0,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: false, // <-- neccessary
      }).start(() => {
        setIsShow(true);
        setInfo("More")
      });
    }
  };
  
  const newHeight = animatedHeight.interpolate({
    inputRange: [0, 1],
    outputRange: ["50%", "100%"], // Variness in height
  });

  const rotateX = animatedHeight.interpolate({
    inputRange: [0, 1],
    outputRange: ["180deg", "0deg"], // <-- value that larger than your content's height
  });

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    setDestinationCoords({});
    try {
      setLocationLoading(true);
      const { coordinates, address, locationObj } = await getCurrentLocation();
      if (!doesIncludeActiveStates(locationObj)) {
        navigation.replace("Updatedeposit", { from: "withdrawal" });
      }
      setCoords({ ...coordinates, locationText: address });
      await getAllAgents(address);
    } catch (err) {
    } finally {
      setLocationLoading(false);
    }
  };

  
  const getAllAgents = async (address: string) => {
    try {
      setLoading(true);
      const response = await axiosCustom.post("/status/find", {
        amount: Number(amount),
        location: address,
      });
      setAgents(response.data.data);
      setCharge(response.data.charges)
      console.log(response)
    } catch (err) {
      console.log(err.response);
    } finally {
      setLoading(false);
    }
  };


  const handleSelectAgent = (agentobj)=>{
    setActiveAgent(agentobj)
    openModal()
  }

  const handleNextNegotiateCharge = (amount)=>{
    closeNegotiateChargeModal();
    setNegotiateCharge(amount);
    openTransactionSummaryModal()
  }

  const handleNextRequestSummary = ()=>{
    closeTransactionSummeryModal()
    closeNegotiateChargeModal()
    closeModal()
    openSuccessModal()
  }


  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: COLORS.white, marginBottom: 20 }}
    >
      
      <CustomModal>
        <Withdrawinfo withdrawInfo={activeAgent} closeModal={closeModal} openNextModal={()=> {closeModal(); openNegotiateChargeModal()}}/>
      </CustomModal>

      <NegotiateChargeModal>
        <Negotiatecharge info={{...activeAgent,charges:charge}} withdrawAmount={amount} openNextModal={handleNextNegotiateCharge} />
      </NegotiateChargeModal>

      <TransationSummaryModal>
        <RequestSummary amount={amount} openNextModal={handleNextRequestSummary} withdrawInfo={activeAgent} baseCharge={charge} addedFee={negotiatecharge} />
      </TransationSummaryModal>

      <SuccessModalContainer>
        <Successmodal btnText="Yeah, proceed" successMsg="Cash request successful" btnFunction={()=>{closeSuccessModal(); navigation.navigate("Home")}} />
      </SuccessModalContainer>
      <Customstatusbar />
      {!coords?.latitude ?null: <Map /> }



      <Backheader title="Withdraw" />

      
      
      {(locationLoading || loading) ? (
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <View
            style={{
              flex: 0.25,
              backgroundColor: COLORS.white,
              borderTopLeftRadius: 22,
              borderTopRightRadius: 22,
              paddingHorizontal: 15,
              paddingTop: 15,
              alignItems: "center",
            }}
          >
            <LottieView
              source={Loadinglocationanimate}
              autoPlay
              loop
              style={{ height: 14, width: "100%" }}
            />
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  marginTop: 34,
                  marginHorizontal: 52,
                  textAlign: "center",
                  lineHeight: 22,
                  ...fontsize.small,
                  ...FONTS.regular,
                  color: COLORS.grey10,
                }}
              >
                Please be patient while we find peers, businesses and agents
                around you to fulfil your request.
              </Text>
            </View>
          </View>
        </View>
      ) : (
        <>

          <View style={{ flex: 1, justifyContent: "flex-end" }}>
            <Animated.View
              style={{
                height: newHeight,
                backgroundColor: COLORS.white,
                marginHorizontal: 15,
                borderRadius: 15,
                padding: 15,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 25,
                  alignItems: 'center'
                }}
              >
                <Text style={{...fontsize.smaller, ...FONTS.medium, color: COLORS.blue9}}>{viewIndex === 0 ? "Peers" : "Agents"}</Text>
                <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center',  padding: 4}} onPress={toggleHeight}>
                  <Text style={{marginRight: 8, ...fontsize.smaller, ...FONTS.medium, color: COLORS.purple4}}>View {info}</Text>
                  <Animated.View
                       style={[
                        {
                         
                          transform: [{ rotateX }],
                        },
                      ]}
                  >
                    <Listingsdrop />
                  </Animated.View>
                </TouchableOpacity>
              </View>

              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                snapToAlignment="center"
                pagingEnabled
                bounces={false}
                data={datas}
                nestedScrollEnabled
                renderItem={({ item, index }) => {
                  const isLast = datas.length === index + 1;
                  let data = agents;
                  if(isLast){
                    data = []
                  }
                  return (
                    <ScrollView
                      nestedScrollEnabled
                      showsVerticalScrollIndicator={false}
                    >
                      {data.length > 0 ? (
                        data.map((info, index) => {
                          const isLastItem = data.length === index + 1;
                          return (
                            <TouchableOpacity
                              key={index}
                              activeOpacity={0.8}
                              style={{
                                flex: 1,
                                width: SIZES.width - 65,
                                marginRight: 5,
                              }}
                              onPress={()=>handleSelectAgent(info)}
                            >
                              <Requestuser hideAmount details={{name:info?.fullName, amount:info?.amount, duration:info?.duration}} />
                              {!isLastItem && <Horizontaline marginV={21} />}
                            </TouchableOpacity>
                          );
                        })
                      ) : (
                        <View
                          style={{
                            // backgroundColor: "blue",
                            flex: 1,
                            height: 200,
                            width: SIZES.width - 60,
                            marginBottom: 10,
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          {/* <Emptyicon /> */}
                          <LottieView
                            source={Cryinganimate}
                            autoPlay
                            loop
                            style={{ height: 120, width: 120 }}
                          />
                          <Text style={{marginTop: 20, paddingHorizontal: 40, textAlign: 'center', lineHeight: 20, ...fontsize.smallest, ...FONTS.regular}}>Padi, you don’t have any accepted withdrawal requests.</Text>
                        </View>
                      )}
                    </ScrollView>
                  );
                }}
                onViewableItemsChanged={onViewChangeRef.current}
                onScroll={Animated.event(
                  [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                  { useNativeDriver: false }
                )}
                keyExtractor={(item) => item.title}
              />

              {/* Dots for scroll indicators */}
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  paddingTop: 10,
                }} 
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: 38,

                  }}
                >
                  {Array(2)
                    .fill(1)
                    .map((item, index) => {
                      const dotPosition = Animated.divide(
                        scrollX,
                        SIZES.width - 60
                      );

                      const dotColor = dotPosition.interpolate({
                        inputRange: [index - 1, index, index + 1],
                        outputRange: [COLORS.grey3, COLORS.black, COLORS.grey3],
                        extrapolate: "clamp",
                      });
                      const dotWidth = dotPosition.interpolate({
                        inputRange: [index - 1, index, index + 1],
                        outputRange: [8, 20, 8],
                        extrapolate: "clamp",
                      });
                      return (
                        <Animated.View
                          key={index}
                          style={[
                            {
                              height: 8,
                              borderRadius: 8 / 2,
                              backgroundColor: dotColor,
                              width: dotWidth,
                            },
                          ]}
                        />
                      );
                    })}
                </View>
              </View>
            </Animated.View>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default Availablelisting;
