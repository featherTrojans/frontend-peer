import * as Location from "expo-location";

export const getCurrentLocation = async () => {
  let locationText: any = "";
  let locationaddress: any = [];
  let location: any = {};
  try {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");
      return;
    }
    location = await Location.getCurrentPositionAsync({ accuracy: 6 });

    Location.setGoogleApiKey("AIzaSyAi-mitwXb4VYIZo9p-FXCwzMeHSsknCnY");
    locationaddress = await Location.reverseGeocodeAsync(location.coords, {
      useGoogleMaps: true,
    });

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
