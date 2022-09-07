import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useContext, useState } from "react";
import { Backheader, Custombutton, Mainwrapper } from "../../../components";
import { COLORS, FONTS, fontsize, icons } from "../../../constants";
import { LocationContext } from "../../../context/LocationContext";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const { Cancelicon, Meetupdot, Clearinput } = icons;
const Meetuppoint = ({navigation}) => {
  const { setCoords } = useContext(LocationContext);
  const [locationdata, setLocationdata] = useState({})
  const [locationdetails, setLocationdetails] = useState({})
  const handleSetMeetup = ()=>{
    setCoords({
      latitude: locationdetails?.geometry?.location.lat,
      longitude: locationdetails?.geometry?.location.lng,
      locationText: locationdata.description,
    });
    navigation.goBack()
  }
  return (
    <Mainwrapper>
      <Backheader title="Meetup Point" />

      
      <View style={{ paddingHorizontal: 15, flex: 1 }}>
        <View
          style={{
            height: 53,
            borderRadius: 5,
            // paddingHorizontal: 15,
            flexDirection: "row",
            alignItems: "center"
          }}
        >
             <GooglePlacesAutocomplete
          renderRightButton={() => <Clearinput />}
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
            key: "AIzaSyBzIYA7wqNVTxq0LTO88-cIue_X9mXd5-w",
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
