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
import React, { useState, useEffect } from "react";
import { images, icons, COLORS, fontsize, FONTS } from "../../../../constants";
import { styles } from "./Availablelisting.styles";
import Map from "../../../shared/map/Map";
import * as Location from "expo-location";
import axiosCustom from "../../../../httpRequests/axiosCustom";

const { Backarrow, Forwardarrow, Requestee1, Requestee2, Requestee3 } = icons;
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

const listingtypes = ["peers", "businesses", "agents"];

const Availablelisting = ({ navigation, route }: any) => {
  const { amount } = route.params;

  const [coords, setCoords] = useState({});
  const [agents, setAgents] = useState([]);
  const [locationSide, setLocationSide] = useState({});
  const [activeType, setActiveType] = useState('peers')
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({ accuracy: 6 });
      setCoords(location.coords);
      Location.setGoogleApiKey("AIzaSyA4C5Ezt6h_4Po4PX0jrnzrAchAolScS9k");
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
    const { fullName, duration } = profile;
    return (
      <TouchableOpacity
        style={styles.userContainer}
        activeOpacity={0.8}
        onPress={() =>
          navigation.navigate("Withdrawpreview", {
            amount,
            userInfo: {
              agent: "Afiz global",
              agentUsername: "afiztech",
            },
          })
        }
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
      <Map coords={coords} />
      <View>
        <Backarrow />
      </View>

      <BottomSheet
        snapPoints={["50%", "90%"]}
        style={{ paddingHorizontal: 15 }}
      >
        {/* <View style={styles.listingTypeContainer}>
            {listingtypes.map((listingtype, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.typeBg,
                  active === listingtype && styles.isActive,
                ]}
                onPress={() => setActive(listingtype)}
              >
                <Text
                  style={[
                    styles.typeText,
                    active === listingtype && styles.isActiveColor,
                  ]}
                >
                  {listingtype}
                </Text>
              </TouchableOpacity>
            ))}
          </View> */}

        <View>
          <View>
            <Text style={styles.listingType}>Peers.</Text>
            <Text style={styles.listingTypeInfo}>
              Get cash easily from individuals and businesses around you, peers
              are likely to negotiate charges.
            </Text>
          </View>

          <View style={{marginVertical: 32, flexDirection: 'row'}}>
            <TouchableOpacity style={{marginRight: 24}}>
              <Text style={styles.listingTypesText}>Peers</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.listingTypesText}>Agents</Text>
            </TouchableOpacity>
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
