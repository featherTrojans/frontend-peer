import * as Location from "expo-location";



export const getCurrentLocation = async ()=>{
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");
      return;
    }    
    let location = await Location.getCurrentPositionAsync({ accuracy: 6 });
    Location.setGoogleApiKey("AIzaSyAi-mitwXb4VYIZo9p-FXCwzMeHSsknCnY");
    let locationaddress = await Location.reverseGeocodeAsync(location.coords,{ useGoogleMaps: true });
    console.log(locationaddress[0])
    let locationText = `${locationaddress[0].name}, ${locationaddress[0].city}`
    return {coordinates:location.coords, address: locationText, locationObj: locationaddress[0]}
}


export const getCoordinateFromAddress = async (addresstext: string)=>{
    Location.setGoogleApiKey("AIzaSyAi-mitwXb4VYIZo9p-FXCwzMeHSsknCnY");
    const coords = await Location.geocodeAsync(addresstext,{useGoogleMaps:true})
    return coords[0]
}