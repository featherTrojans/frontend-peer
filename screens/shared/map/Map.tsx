import React, { useRef, useEffect, useContext } from 'react'
import { View, Text, Dimensions } from 'react-native'
import MapView, {Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import * as Location from 'expo-location';
import { LocationContext } from '../../../context/LocationContext';
// import {} from "../../../constants/icons"
const {width, height} = Dimensions.get("screen")

// type coordstype = {
//     latitude?:number;
//     longitude?:number;
// }

const Map = ({}) => {
   const {coords , destinationCoords} = useContext(LocationContext);
   const mapRef = useRef()
    console.log("the map object",mapRef.current)
   useEffect(() => {
       if(!coords.latitude || !destinationCoords.latitude ) return false

       if(mapRef.current){

        //    mapRef?.current?.fitToSuppliedMakers(['peer','agent'],{
        //        edgePadding:{top:50, right: 50, bottom: 50, left: 50}
        //     })   
        }
        }, [coords, destinationCoords])
    return (
        <View style={{position:"absolute", top:0, left:0, width:width, height:height}}>
            { (coords.latitude && coords.longitude) ?<MapView 
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
                    latitude: coords?.latitude,
                    longitude: coords?.longitude,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                }}>
                    <Marker
                    coordinate={{latitude:coords?.latitude, longitude:coords?.longitude}}
                    title={"Peer"}
                    description={"Peer"}
                    identifier="peer"
                    />
                    {
                        (coords.latitude && destinationCoords.latitude) && <MapViewDirections
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
                        />
                    }
                </MapView>
                : null
            }
        </View>
    )
}

export default Map
