import React, { useRef, useEffect, useContext, useState } from 'react'
import { View, Text, Dimensions } from 'react-native'
import MapView, {Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import * as Location from 'expo-location';
import { LocationContext } from '../../../context/LocationContext';
import { getCurrentLocation } from '../../../utils/customLocation';
// import {} from "../../../constants/icons"
const {width, height} = Dimensions.get("screen")

// type coordstype = {
//     latitude?:number;
//     longitude?:number;
// }

const Map = ({}) => {
    
   const {coords , destinationCoords} = useContext(LocationContext);
   
    console.log(coords, "COORDS")
    console.log(destinationCoords, "destinationCoords")
   const mapRef = useRef(null)
    // console.log("the map object",mapRef.current)
   useEffect(() => {
    //    if(!coords.latitude || !destinationCoords.latitude ) return false
    if(mapRef.current){
        //    console.log("should run again")
           mapRef.current.fitToSuppliedMarkers(['peer','agent'],{
               edgePadding:{top:50, right: 50, bottom: 50, left: 50}
            })   
        }
    }, [coords?.latitude, destinationCoords?.latitude])


    
    if(coords == undefined || coords == null){
        return null
    }
    
    if(destinationCoords == undefined || destinationCoords == null){
        return null
    }

    return (
        <View style={{position:"absolute", top:0, left:0, width:width, height:height}}>
            <MapView 
                mapType="mutedStandard"
                ref={mapRef}
                style={{flex: 1}}
                // onMapReady={() => {mapRef?.current?.fitToSuppliedMarkers(['peer','agent'],{ edgePadding: 
                //     {top: 50,
                //       right: 50,
                //       bottom: 50,
                //       left: 50}
              
                //   })}}
                initialRegion={{
                    latitude: coords?.latitude ,
                    longitude: coords?.longitude,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                }}>
                    {
                        coords.latitude && <Marker
                        coordinate={{latitude:coords?.latitude, longitude:coords?.longitude}}
                        title={"Peer"}
                        description={"Peer"}
                        identifier="peer"
                        pinColor={'red'}
                        />
                    }
                    {
                        (coords?.latitude && destinationCoords?.latitude) && <MapViewDirections
                            origin={coords}
                            
                            destination={{latitude:Number(destinationCoords.latitude),
                                longitude:Number(destinationCoords.longitude)}}
                            strokeWidth={4}
                            strokeColor="blue"
                            apikey={"AIzaSyAi-mitwXb4VYIZo9p-FXCwzMeHSsknCnY"}
                         />
                    }
                    {
                        (coords.latitude && destinationCoords.latitude) && <Marker
                        coordinate={{latitude:Number(destinationCoords.latitude),
                            longitude:Number(destinationCoords.longitude)}}
                        title={"agent"}
                        description={"agent"}
                        identifier="agent"
                        pinColor={'blue'}
                        />
                    }
                </MapView>
               
        </View>
    )
}

export default Map
