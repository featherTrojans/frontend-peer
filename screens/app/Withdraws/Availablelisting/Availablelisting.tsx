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
import * as Location from "expo-location";
import axiosCustom from "../../../../httpRequests/axiosCustom";
import { LocationContext } from "../../../../context/LocationContext";
import { getCurrentLocation } from "../../../../utils/customLocation";
import Customstatusbar from "../../../shared/Customstatusbar";
import { InitialsBg } from "../../../../components";

const {
  Backarrow,
  Forwardarrow,
  Requestee1,
  Requestee2,
  Requestee3,
  Onmapicon,
  Loadinglocationanimate,
  Cryinganimate
} = icons;
const { Mapimage } = images;

const listingtypes = ["peers", "agents"];

const Availablelisting = ({ navigation, route }: any) => {
  const { amount } = route.params;
  const { setCoords, setDestinationCoords } = useContext(LocationContext);
  const [agents, setAgents] = useState([]);
  const [activeType, setActiveType] = useState("peers");
  const [active, setActive] = useState("peers");
  const [loading, setLoading] = useState(true);
  const [locationLoading, setLocationLoading] = useState(false);

  useEffect(() => {
    getLocation();
  }, []);

  //This function is to get the user locations
  const getLocation = async () => {
    try {
      setLocationLoading(true);
      const { coordinates, address } = await getCurrentLocation();
      setCoords({ ...coordinates, locationText: address });
      getAllAgents(address);
    } catch (err) {
    } finally {
      setLocationLoading(false);
    }
  };

  //This fucntion is to get the agents datas
  const getAllAgents = async (address: string) => {
    try {
      // setLoading(true);
      const response = await axiosCustom.post("/status/find", {
        amount: amount,
        location: address,
      });
      console.log(response.data.data);
      setAgents(response.data.data);
    } catch (err) {
      console.log(err.response);
    } finally {
      setLoading(false);
    }
  };

  ///This is for the single user component
  const Singleuser = ({ profile }: any) => {
    const { fullName, duration } = profile;
    const handleAgentSelect = () => {
      // adding Location context
      setDestinationCoords(profile);
      navigation.navigate("Withdrawpreview", { amount, userInfo: profile });
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
    <View style={{ flex: 1 }}>
      <Customstatusbar />
      <Map />
      <View>
        <Backarrow />
      </View>

   

      {locationLoading ? (
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <View
            style={{
              flex: 0.25,
              backgroundColor: COLORS.white,
              borderTopLeftRadius: 22,
              borderTopRightRadius: 22,
              paddingHorizontal: 15,
              paddingTop: 15,
            }}
          >
            <LottieView
              source={Loadinglocationanimate}
              autoPlay
              loop
              style={{ margin: 0, height: 15 }}
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
        <BottomSheet
          index={0}
          snapPoints={["35%", "90%"]}
          style={{ paddingHorizontal: 15 }}
          // enablePanDownToClose={true}
        >
          {agents.length > 0 ? (
            <>
              <View>
                <View>
                  <Text style={styles.listingType}>
                    {activeType === "peers" ? "Peers" : "Agents"}.
                  </Text>
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
            <View style={{justifyContent: "center", alignItems: "center"}}>
              <LottieView  source={Cryinganimate} autoPlay loop style={{width: 145, height: 145}}/>

              <Text style={{marginHorizontal: 52, textAlign: "center", ...fontsize.small, ...FONTS.regular, lineHeight: 22, color: COLORS.grey10}}>Sorry we couldn’t find anyone to fulfil your request, kindly request a lower amount or try again later.</Text>
            </View>
          )}
        </BottomSheet>
      )}
    </View>
  );
};

export default Availablelisting;
