import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetFlatList,
} from "@gorhom/bottom-sheet";
import React, { useState, useEffect, useContext } from "react";
import LottieView from "lottie-react-native";

import { images, icons, COLORS, fontsize, FONTS } from "../../../../constants";
import { styles } from "./Availablelisting.styles";
import Map from "../../../shared/map/Map";
import * as Location from "expo-Obj";
import axiosCustom from "../../../../httpRequests/axiosCustom";
import { LocationContext } from "../../../../context/LocationContext";
import { getCurrentLocation } from "../../../../utils/customLocation";
import Customstatusbar from "../../../shared/Customstatusbar";
import { InitialsBg } from "../../../../components";
import Comingsoonagent from "../../../../assets/Lottie/animations/comingSoonAgent.json";
import { doesIncludeActiveStates } from "../../../../utils/utils";
import { SafeAreaView } from "react-native-safe-area-context";

const {
  Backarrow,
  Forwardarrow,
  Requestee1,
  Requestee2,
  Requestee3,
  Onmapicon,
  Forwardarrowblue,
  Loadinglocationanimate,
  Cryinganimate,
  Comingsoonagentanimate,
} = icons;
const { Mapimage } = images;

const listingtypes = ["peers", "agents"];

const Availablelisting = ({ navigation, route }: any) => {
  const { amount } = route.params;
  const { setCoords, setDestinationCoords } = useContext(LocationContext);
  const [agents, setAgents] = useState([]);
  const [charge, setCharge] = useState(0);
  const [activeType, setActiveType] = useState("peers");
  const [loading, setLoading] = useState(true);
  const [locationLoading, setLocationLoading] = useState(false);

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    setDestinationCoords({})
    try {
      setLocationLoading(true);
      const { coordinates, address, locationObj } = await getCurrentLocation();
      if(!doesIncludeActiveStates(locationObj)){
        navigation.replace("Updatedeposit",{from:"withdrawal"})
      }
      setCoords({ ...coordinates, locationText: address });
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
    } catch (err) {
      console.log(err.response);
    } finally {
      setLoading(false);
    }
  };

  const toggleActiveType = () => {
    if (activeType === "peers") {
      setActiveType("agents");
    } else if (activeType === "agents") {
      setActiveType("peers");
    }
  };

  ///This is for the single user component
  const Singleuser = ({ profile }: any) => {
    const { fullName, duration } = profile;
    const handleAgentSelect = () => {
      // adding Location context
      setDestinationCoords(profile);
      navigation.navigate("Withdrawpreview", { amount, userInfo: profile, baseCharge: charge });
    };
    return (
      <TouchableOpacity
        style={styles.userContainer}
        activeOpacity={0.8}
        onPress={handleAgentSelect}
      >
        <View style={styles.detailsContainer}>
          {/* Image */}
          <InitialsBg sideLength={44} name={fullName} />
          <View style={styles.infoContainer}>
            <Text style={styles.userName}>{fullName}</Text>
            <Text style={styles.distance}>~{duration} away</Text>
          </View>
        </View>
        <Forwardarrow />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <Customstatusbar />
      <Map />
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.goBack()}
        style={{
          width: 25,
          height: 25,
          borderRadius: 5,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: COLORS.blue6,
          marginLeft: 15,
        }}
      >
        <Backarrow />
      </TouchableOpacity>

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
          {activeType == "peers" ? (
            <BottomSheet
              index={0}
              snapPoints={["35%", "90%"]}
              style={{ paddingHorizontal: 15 }}
              // enablePanDownToClose={true}
            >
              {/* agents.length > 0  */}
              {agents.length > 0 ? (
                <>
                  <View>
                    <View>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: 22,
                        }}
                      >
                        <Text style={styles.listingType}>
                          {activeType === "peers" ? "Peers" : "Agents"}.
                        </Text>

                        <TouchableOpacity
                          onPress={toggleActiveType}
                          activeOpacity={0.8}
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          <Text
                            style={{
                              ...fontsize.small,
                              ...FONTS.medium,
                              color: COLORS.blue6,
                              marginRight: 9,
                            }}
                          >
                            {activeType === "peers" ? "Agents" : "Peers"}
                          </Text>
                          <Forwardarrowblue />
                        </TouchableOpacity>
                      </View>
                      <Text style={styles.listingTypeInfo}>
                        {activeType === "peers"
                          ? "Get cash easily from individuals and businesses around you, peers are likely to negotiate charges."
                          : "Get cash easily from feather agents as well as POS money agents around you, very fast."}
                      </Text>
                    </View>
                    {/* {loading && <ActivityIndicator color="black" size={50} />} */}
                  </View>

                  <BottomSheetFlatList
                    showsVerticalScrollIndicator={false}
                    data={agents}
                    renderItem={({ item }) => <Singleuser profile={item} />}
                    keyExtractor={(item) => item.reference}
                  />
                </>
              ) : (
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <LottieView
                    source={Cryinganimate}
                    autoPlay
                    loop
                    style={{ width: 145, height: 145 }}
                  />

                  <Text
                    style={{
                      marginHorizontal: 52,
                      textAlign: "center",
                      ...fontsize.small,
                      ...FONTS.regular,
                      lineHeight: 22,
                      color: COLORS.grey10,
                    }}
                  >
                    Sorry we couldn’t find anyone to fulfil your request, kindly
                    request a lower amount or try again later.
                  </Text>
                </View>
              )}
            </BottomSheet>
          ) : (
            <BottomSheet
              index={0}
              snapPoints={["60%"]}
              style={{ paddingHorizontal: 15 }}
              // enablePanDownToClose={true}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 22,
                }}
              >
                <Text style={styles.listingType}>
                  {activeType === "peers" ? "Peers" : "Agents"}.
                </Text>

                <TouchableOpacity
                  onPress={toggleActiveType}
                  activeOpacity={0.8}
                  style={{ flexDirection: "row", alignItems: "center" }}
                >
                  <Text
                    style={{
                      ...fontsize.small,
                      ...FONTS.medium,
                      color: COLORS.blue6,
                      marginRight: 9,
                    }}
                  >
                    {activeType === "peers" ? "Agents" : "Peers"}
                  </Text>
                  <Forwardarrowblue />
                </TouchableOpacity>
              </View>
              <Text style={styles.listingTypeInfo}>
                Get cash easily from individuals and businesses around you,
                peers are likely to negotiate charges.
              </Text>

              <View style={{ alignItems: "center" }}>
                <LottieView
                  source={require("../../../../assets/Lottie/animations/comingSoonAgent.json")}
                  autoPlay
                  loop
                  style={{ width: 236, height: 236 }}
                />

                <Text
                  style={{
                    ...fontsize.small,
                    ...FONTS.regular,
                    textAlign: "center",
                    marginHorizontal: 62,
                  }}
                >
                  Agents are coming to your area very soon, you will be notified
                  once ready.
                </Text>
              </View>
            </BottomSheet>
          )}
        </>
      )}
    </SafeAreaView>
  );
};

export default Availablelisting;
