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
  const {setCoords,coords, setDestinationCoords} = useContext(LocationContext)
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
      Location.setGoogleApiKey("AIzaSyAi-mitwXb4VYIZo9p-FXCwzMeHSsknCnY");
      let locationaddress = await Location.reverseGeocodeAsync(
        location.coords,
        { useGoogleMaps: true }
        );
        setLocationSide(locationaddress[0]);
        let locationText = `${locationaddress[0].name}, ${locationaddress[0].city}`
        setCoords({...location.coords,locationText:locationText});
      getAllAgents(locationaddress[0].city!, locationaddress[0].name!);
    })();
  }, []);

  const getAllAgents = async (city: string, name: string) => {
    let locationText = `${name}, ${city}`
    try {
      const response = await axiosCustom.post("/status/find", {
        amount: amount,
        location: locationText,
      });
      console.log(response,"success")
      setAgents(response.data.data);
      
    } catch (err) {
      
    }
  };

  const agentsdata = [{
      fullName: "Ayobami Lawal",
      duration: "1 hr" ,
      username:"dudeth",
      latitude: "7.487",
      longitude: "4.53",
      locationText: "Abeokuta"
  }]
  
  const Singleuser = ({ profile }: any) => {
    const { fullName, duration, username } = profile;

    const handleAgentSelect = ()=>{
      // adding Location context
      setDestinationCoords(profile)
        navigation.navigate("Withdrawpreview", {
            amount,
            userInfo: profile,
          })
    }

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

      <BottomSheet
        snapPoints={["50%", "90%"]}
        style={{ paddingHorizontal: 15 }}
      >
       

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
          data={agentsdata}
          renderItem={({ item }) => <Singleuser profile={item} />}
          keyExtractor={(item) => item.reference}
        />
      </BottomSheet>
    </View>
  );
};

export default Availablelisting;
