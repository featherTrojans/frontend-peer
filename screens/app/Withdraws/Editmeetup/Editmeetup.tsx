import {
  StyleSheet,
  Text,
  TextInput,
  View,
  StatusBar,
  TextInputComponent,
  TouchableOpacity,
} from "react-native";
import React, { useContext } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { styles } from "./Editmeetup.styles";
import { COLORS, FONTS, fontsize, icons } from "../../../../constants";
import { Bottombtn } from "../../../../components";
import { LocationContext } from "../../../../context/LocationContext";
import { navigationRef } from "../../../../utils/customNavigation";
import Customstatusbar from "../../../shared/Customstatusbar";
import { SafeAreaView } from "react-native-safe-area-context";

const { Cancelicon, Meetupdot, Clearinput } = icons;

// predefine the places

const Editmeetup = ({ navigation }) => {
  const { setCoords } = useContext(LocationContext);
  return (
    <SafeAreaView style={styles.container}>
      <Customstatusbar />

      <View style={{ paddingHorizontal: 15, flex: 1 }}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.goBack()}
          >
            <Cancelicon />
          </TouchableOpacity>
          <Text style={styles.headerText}>Edit Meetup Point</Text>
        </View>

        <GooglePlacesAutocomplete
          renderRightButton={() => <Clearinput />}
          renderLeftButton={() => <Meetupdot />}
          placeholder="Search"
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            setCoords({
              latitude: details?.geometry?.location.lat,
              longitude: details?.geometry?.location.lng,
              locationText: data.description,
            });
          }}
          fetchDetails={true}
          styles={{
            textInputContainer: {
              ...styles.textInputContainer,
            },
            textInput: {
              ...styles.textInput,
            },
          }}
          query={{
            key: "AIzaSyAi-mitwXb4VYIZo9p-FXCwzMeHSsknCnY",
            language: "en",
          }}
        />
      </View>
      <Bottombtn title="UPDATE MEETUP" onpress={() => navigation.goBack()} />
    </SafeAreaView>
  );
};

// AIzaSyDhDAe0glRcZmtVzImperx0GlC4Oez5kLg
export default Editmeetup;
