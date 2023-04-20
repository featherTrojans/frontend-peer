import React, { useRef, useEffect, useContext, useState } from "react";
import { View, Text, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import * as Location from "expo-location";
import { LocationContext } from "../../../context/LocationContext";
import { getCurrentLocation } from "../../../utils/customLocation";
// import {} from "../../../constants/icons"
const { width, height } = Dimensions.get("screen");

// type coordstype = {
//     latitude?:number;
//     longitude?:number;
// }

const Map = ({ tolocation = "" }) => {
  const { coords } = useContext(LocationContext);
  const [destinationCoords, setDestinationCoords] = useState({});
  console.log(coords, destinationCoords);
  const mapRef = useRef(null);
  useEffect(() => {
    getLocationCoords(tolocation);
  }, [tolocation]);
  useEffect(() => {
    //    if(!coords.latitude || !destinationCoords.latitude ) return false
    if (mapRef.current) {
      mapRef.current.fitToSuppliedMarkers(["peer", "agent"], {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
      });
    }
  }, [coords?.latitude, destinationCoords?.latitude]);

  const getLocationCoords = async (address) => {
    const destinationobj = await Location.geocodeAsync(address);

    if (destinationobj.length > 0) {
      const destination = destinationobj[0];
      setDestinationCoords(destination);
    }
  };

  if (!destinationCoords?.latitude) {
    return null;
  }

  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: width,
        height: height,
      }}
    >
      <MapView
        mapType="mutedStandard"
        ref={mapRef}
        style={{ flex: 1 }}
        // onMapReady={() => {mapRef?.current?.fitToSuppliedMarkers(['peer','agent'],{ edgePadding:
        //     {top: 50,
        //       right: 50,
        //       bottom: 50,
        //       left: 50}

        //   })}}

        provider="google"
        initialRegion={{
          latitude: coords?.latitude,
          longitude: coords?.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
      >
        {coords.latitude && (
          <Marker
            coordinate={{
              latitude: coords?.latitude,
              longitude: coords?.longitude,
            }}
            title={"Peer"}
            description={"Peer"}
            identifier="peer"
            pinColor={"red"}
          />
        )}
        {coords?.latitude && destinationCoords?.latitude && (
          <MapViewDirections
            origin={coords}
            destination={{
              latitude: Number(destinationCoords.latitude),
              longitude: Number(destinationCoords.longitude),
            }}
            strokeWidth={5}
            strokeColor="blue"
            apikey={"AIzaSyAgzIQS3AE66cvobouyA_hD4L62iMWsYT4"}
          />
        )}
        {coords.latitude && destinationCoords.latitude && (
          <Marker
            coordinate={{
              latitude: Number(destinationCoords.latitude),
              longitude: Number(destinationCoords.longitude),
            }}
            title={"agent"}
            description={"agent"}
            identifier="agent"
            pinColor={"blue"}
          />
        )}
      </MapView>
    </View>
  );
};

export default Map;
