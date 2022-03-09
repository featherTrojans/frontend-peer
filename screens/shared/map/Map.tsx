import React, { useState, useEffect } from 'react'
import { View, Text, Dimensions } from 'react-native'
import MapView, {Marker} from 'react-native-maps';

import * as Location from 'expo-location';
// import {} from "../../../constants/icons"
const {width, height} = Dimensions.get("screen")

// type coordstype = {
//     latitude?:number;
//     longitude?:number;
// }

const Map = ({coords}) => {
   
    return (
        <View style={{position:"absolute", top:0, left:0, width:width, height:height}}>
            { (coords.latitude && coords.longitude) ?<MapView 
                mapType="mutedStandard"
                style={{flex: 1}}
                initialRegion={{
                    latitude: coords?.latitude,
                    longitude: coords?.longitude,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                }}>
                    <Marker
                    coordinate={{latitude:coords?.latitude, longitude:coords?.longitude}}
                    title={"marker"}
                    description={"description"}
                    />
                </MapView>
                : null
            }
        </View>
    )
}

export default Map
