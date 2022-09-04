import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Animated,
  Easing,
  FlatList,
} from "react-native";
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetFlatList,
} from "@gorhom/bottom-sheet";
import React, { useState, useEffect, useContext, useRef } from "react";
import LottieView from "lottie-react-native";

import {
  images,
  icons,
  COLORS,
  fontsize,
  FONTS,
  SIZES,
} from "../../../../constants";
import { styles } from "./Availablelisting.styles";
import Map from "../../../shared/map/Map";
import * as Location from "expo-Obj";
import axiosCustom from "../../../../httpRequests/axiosCustom";
import { LocationContext } from "../../../../context/LocationContext";
import { getCurrentLocation } from "../../../../utils/customLocation";
import Customstatusbar from "../../../shared/Customstatusbar";
import { Backheader, Horizontaline, InitialsBg, Negotiatecharge, Requesterinfo, Transactionsummary } from "../../../../components";
import Comingsoonagent from "../../../../assets/Lottie/animations/comingSoonAgent.json";
import { doesIncludeActiveStates } from "../../../../utils/utils";
import { SafeAreaView } from "react-native-safe-area-context";
import { getBottomSpace } from "react-native-iphone-x-helper";
import Requestuser from "../../../shared/RequestUser";
import useCustomModal from "../../../../utils/useCustomModal";
import Withdrawinfo from "../../../../components/Modals/Withdrawinfo";
import RequestSummary from "../../../../components/Modals/RequestSummary";

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
  const amount = route.params;
  const { setCoords, setDestinationCoords } = useContext(LocationContext);
  const [agents, setAgents] = useState([
    1, 2, 2.4, 5, 6, 4, 3, 2, 4, 3, 4, 2, 2, 2, 3, 4, 2, 4, 3, 2,
  ]);
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

  // i removed changed from the params passed to this useRef below
  const onViewChangeRef = useRef<
    ({ viewableItems, changed }: { viewableItems: any; changed: any }) => void
  >(({ viewableItems, changed }) => {
    setViewIndex(viewableItems[0]?.index);
  });

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
      // i commnet this line out cause i want to test
      await getAllAgents(address);
    } catch (err) {
    } finally {
      setLocationLoading(false);
    }
  };

  

  //This fucntion is to get the agents datas
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
    setNegotiateCharge(amount);
    openTransactionSummaryModal()

  }

  const handleNextRequestSummary = ()=>{
    closeTransactionSummeryModal()
    closeNegotiateChargeModal()
    closeModal()
    //open sucess modal
  }

  const toggleActiveType = () => {
    if (activeType === "peers") {
      setActiveType("agents");
    } else if (activeType === "agents") {
      setActiveType("peers");
    }
  };


  ///This is for the single user component
  const Singleuser = ({ profile }: any) => {
    // const { fullName, duration } = profile;
    const handleAgentSelect = () => {
      // adding Location context
      setDestinationCoords(profile);
      // navigation.navigate("Withdrawpreview", { amount, userInfo: profile, baseCharge: charge });
    };
    return (
      <TouchableOpacity
        style={styles.userContainer}
        activeOpacity={0.8}
        onPress={handleAgentSelect}
      >
        <Text>name of the user</Text>
        {/* <View style={styles.detailsContainer}>
          <InitialsBg sideLength={44} name={fullName} />
          <View style={styles.infoContainer}>
            <Text style={styles.userName}>{fullName}</Text>
            <Text style={styles.distance}>~{duration} away</Text>
          </View>
        </View>
        <Forwardarrow /> */}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: COLORS.white, marginBottom: 20 }}
    >
      
      <CustomModal>
        <Withdrawinfo withdrawInfo={activeAgent} openNextModal={openNegotiateChargeModal}/>
      </CustomModal>

      <NegotiateChargeModal>
        <Negotiatecharge openNextModal={handleNextNegotiateCharge} />
      </NegotiateChargeModal>

      <TransationSummaryModal>
        <RequestSummary openNextModal={handleNextRequestSummary} amount={amount} withdrawInfo={activeAgent} baseCharge={charge} addedFee={negotiatecharge} />
      </TransationSummaryModal>

      <Customstatusbar />
      <Map />



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
                              <Requestuser details={{name:info.fullName, amount:info.amount, duration:info.duration}} />
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
