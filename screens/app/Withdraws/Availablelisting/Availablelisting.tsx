import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetFlatList,
} from "@gorhom/bottom-sheet";
import React, { useState, useEffect, useContext } from "react";
import { images, icons, COLORS, fontsize, FONTS } from "../../../../constants";
import { styles } from "./Availablelisting.styles";
import Map from "../../../shared/map/Map";
import * as Location from "expo-location";
import axiosCustom from "../../../../httpRequests/axiosCustom";
import { LocationContext } from "../../../../context/LocationContext";

const { Backarrow, Forwardarrow, Requestee1, Requestee2, Requestee3, Onmapicon } = icons;
const { Mapimage } = images;

const USERDATAS = [
  {
    image: <Requestee1 />,
    name: "Thomas Uzoechina",
    distance: 30,
    noOfBadges: 19,
  },
  {
    image: <Requestee3 />,
    name: "Malik Abubarkar",
    distance: 30,
    noOfBadges: 19,
  },
  {
    image: <Requestee2 />,
    name: "Oreoluwa Badmus",
    distance: 17,
    noOfBadges: 18,
  },
];

const listingtypes = ["peers", "agents"];

const Availablelisting = ({ navigation, route }: any) => {
  const { amount } = route.params;
  const { setCoords, coords, setDestinationCoords } =
    useContext(LocationContext);
  const [agents, setAgents] = useState([]);
  const [locationSide, setLocationSide] = useState({});
  const [activeType, setActiveType] = useState("peers");

  let height = "10%"
  const checkCurrentHeight = () => {
    if(height == "10%"){
      let height =  "50%"
    }
  }







  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({ accuracy: 6 });
      setCoords(location.coords);
      Location.setGoogleApiKey("AIzaSyAi-mitwXb4VYIZo9p-FXCwzMeHSsknCnY");
      let locationaddress = await Location.reverseGeocodeAsync(
        location.coords,
        { useGoogleMaps: true }
      );
      console.log(locationaddress);
      setLocationSide(locationaddress[0]);
      await getAllAgents(locationaddress[0].city!, locationaddress[0].region!);
    })();
  }, []);

  const getAllAgents = async (city: string, region: string) => {
    try {
      const response = await axiosCustom.post("/status/find", {
        amount: amount,
        location: "ikeja",
      });
      setAgents(response.data.data);
      console.log(response);
    } catch (err) {
      console.log(err.response);
    }
  };
  const Singleuser = ({ profile, onpress }: any) => {
    const { fullName, duration, username } = profile;

    const handleAgentSelect = () => {
      // adding Location context
      setDestinationCoords(profile);
      navigation.navigate("Withdrawpreview", {
        amount,
        userInfo: {
          agent: fullName,
          agentUsername: username,
        },
      });
    };
    return (
      <TouchableOpacity
        style={styles.userContainer}
        activeOpacity={0.8}
        onPress={handleAgentSelect}
      >
        <View style={styles.detailsContainer}>
          {/* Image */}

          <View style={styles.infoContainer}>
            <Text style={styles.userName}>{fullName}</Text>
            <View style={styles.otherInfo}>
              <Text style={styles.distance}>~{duration} away</Text>
            </View>
          </View>
        </View>
        <View>
          <Forwardarrow />
        </View>
      </TouchableOpacity>
    );
  };

  const [active, setActive] = useState("peers");
  return (
    <View style={{ flex: 1 }}>
      <Map />
      <View>
        <Backarrow />
      </View>

      {/* <TouchableOpacity 
      style={{width: 62, height: 62, backgroundColor: COLORS.black, position: "absolute", bottom: 100, right: 34, justifyContent: 'center', alignItems: 'center', borderRadius: 62/2, }} 
      activeOpacity={0.8}
      onPress={() => checkCurrentHeight()}
      >
          <Onmapicon />
      </TouchableOpacity> */}

      <BottomSheet
        index={0}
        snapPoints={["10%", "50%", "90%"]}
        style={{ paddingHorizontal: 15 }}
        // enablePanDownToClose={true}
      >
        <View>
          <View>
            <Text style={styles.listingType}>{activeType === "peers" ? "Peers" : "Agents"}.</Text>
            <Text style={styles.listingTypeInfo}>
              {activeType === 'peers' ? 
                "Get cash easily from individuals and businesses around you, peers are likely to negotiate charges."
                :
                "Get cash easily from feather agents as well as POS money agents around you, very fast."
            }

            </Text>
          </View>

          <View style={{ marginVertical: 32, flexDirection: "row", }}>
            {listingtypes.map((listingtype) => {
              const isActive = listingtype === activeType;
              return (
                <TouchableOpacity
                  onPress={() => setActiveType(listingtype)}
                  style={{
                    marginRight: 24,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={[
                      styles.listingTypesText,
                      isActive && { color: COLORS.blue6 },
                    ]}
                  >
                    {listingtype}
                  </Text>
                  {activeType === listingtype && (
                    <View
                      style={{
                        width: 10,
                        height: 2,
                        backgroundColor: COLORS.blue6,
                      }}
                    />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <BottomSheetFlatList
          showsVerticalScrollIndicator={false}
          data={agents}
          renderItem={({ item }) => <Singleuser profile={item} />}
          keyExtractor={(item) => item.reference}
        />
      </BottomSheet>
    </View>
  );
};

export default Availablelisting;
