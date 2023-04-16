import * as Location from "expo-location";
import getpermission from "./getpermission";

export const getCurrentLocation = async () => {
  let locationText: any = "";
  let locationaddress: any = [];
  let location: any = {};
  try {
    location = await getpermission(
      "Location",
      "Allow Feather access to your location to find the nearest agent close to you",
      "location",
      async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("Permission to access location was denied");
          return;
        }
        return await Location.getCurrentPositionAsync({ accuracy: 6 });
      }
    );

    console.log("SHOULD BE INSIDE HERE", location);
    Location.setGoogleApiKey("AIzaSyAi-mitwXb4VYIZo9p-FXCwzMeHSsknCnY");
    locationaddress = await Location.reverseGeocodeAsync(location.coords, {
      useGoogleMaps: true,
    });
    console.log(locationaddress[0], "location address");
    locationText = `${locationaddress[0].name}, ${locationaddress[0].city}`;
  } catch (err) {
    console.log(err, "ERROROROROR");
  }
  return {
    coordinates: location.coords,
    address: locationText,
    locationObj: locationaddress[0],
  };
};

export const getCoordinateFromAddress = async (addresstext: string) => {
  Location.setGoogleApiKey("AIzaSyAi-mitwXb4VYIZo9p-FXCwzMeHSsknCnY");
  const coords = await Location.geocodeAsync(addresstext, {
    useGoogleMaps: true,
  });
  return coords[0];
};
