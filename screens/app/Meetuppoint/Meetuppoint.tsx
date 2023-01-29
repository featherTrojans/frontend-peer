import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Backheader, Custombutton, Mainwrapper } from "../../../components";
import { COLORS, FONTS, fontsize, icons } from "../../../constants";
import { LocationContext } from "../../../context/LocationContext";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Toast from "react-native-toast-message";

const { Cancelicon, Meetupdot, Clearinput } = icons;

const Meetuppoint = ({navigation, route}) => {
  const withdrawInfo = route.params;
  const { setCoords } = useContext(LocationContext);
  const [locationdata, setLocationdata] = useState({})
  const [locationdetails, setLocationdetails] = useState({})
  const handleSetMeetup = ()=>{
    setCoords({
      latitude: locationdetails?.geometry?.location.lat,
      longitude: locationdetails?.geometry?.location.lng,
      locationText: locationdata.description,
    });
    navigation.navigate("Availablelisting",{amount:"",activate:withdrawInfo}) 
  }
  useEffect(()=>{
    Toast.hide()
  },[])
  return (
    <Mainwrapper>
        <Backheader title="Meetup Point" />
      
      <View style={{ paddingHorizontal: 15, flex: 1 }}>
        <View
          style={{
            borderRadius: 5,
            // paddingHorizontal: 15,
            flexDirection: "row",
            alignItems: "center"
          }}
        >
             <GooglePlacesAutocomplete
          // renderRightButton={() => <Clearinput />}
          renderLeftButton={() => <Meetupdot />}
          placeholder="Search"
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            setLocationdata(data)
            setLocationdetails(details)
          }}
          fetchDetails={true}
          styles={{
            textInputContainer: {
              
              height: 53,
              borderRadius: 10,
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 14,
              backgroundColor: COLORS.white,
            },
            textInput: {
              flex: 1,
              paddingHorizontal: 13,
              ...fontsize.smallest,
              ...FONTS.medium,
              marginTop: 4
            },
          }}
          query={{
            key: 'AIzaSyAgzIQS3AE66cvobouyA_hD4L62iMWsYT4',
            language: "en",
          }}
        />
        </View>
        <View style={{ flex: 1 }} />
        <View style={{ marginBottom: 20 }}>
          <Custombutton
            btntext="Yeah, Set Meetup point"
            onpress={handleSetMeetup}
          />
        </View>
      </View>
    </Mainwrapper>
  );
};

export default Meetuppoint;

const styles = StyleSheet.create({});
