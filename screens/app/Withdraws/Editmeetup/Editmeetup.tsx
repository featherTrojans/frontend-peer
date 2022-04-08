import { StyleSheet, Text, TextInput, View, StatusBar, TextInputComponent } from "react-native";
import React,{useContext} from "react";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { styles } from "./Editmeetup.styles";
import { COLORS, FONTS, fontsize, icons } from "../../../../constants";
import { Bottombtn } from "../../../../components";
import { LocationContext } from "../../../../context/LocationContext";
import { navigationRef } from "../../../../utils/customNavigation";
import Customstatusbar from "../../../shared/Customstatusbar";

const { Cancelicon, Meetupdot, Clearinput } = icons;



// predefine the places 

const Editmeetup = ({navigation}) => {
    const {setCoords} = useContext(LocationContext)
    return (
        <View style={styles.container}>
            <Customstatusbar />
            <View
                style={styles.headerContainer}
            >
                <Cancelicon />
                <Text style={styles.headerText}>
                    Edit Meetup Point
                </Text>
            </View>

            {/* <View style={styles.textInputContainer}>
                <Meetupdot />
                <TextInput
                    style={styles.textInput}
                />

                <Clearinput />
            </View> */}
            <GooglePlacesAutocomplete
            placeholder='Search'
            onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                setCoords({
                    latitude:details?.geometry?.location.lat,
                    longitude:details?.geometry?.location.lng,
                    locationText: data.description
                })
            }}
            fetchDetails={true}
            styles={{
                textInputContainer:{
                    borderColor: COLORS.borderColor3,
                    borderWidth: 0.5,
                    height: 56,
                    borderRadius: 10,
                    // flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    paddingLeft: 14,
                    paddingRight: 20,
                },
                textInput:{
                    // flex: 1,
                    paddingHorizontal: 13,
                    ...fontsize.smaller,
                    ...FONTS.medium,
                }
                }
            }
            query={{
                key: 'AIzaSyAi-mitwXb4VYIZo9p-FXCwzMeHSsknCnY',
                language: 'en',
            }}
            />
            <Bottombtn 
                title="UPDATE MEETUP"
                onpress={()=>navigation.goBack()}
            />
        </View>
    );
};

// AIzaSyDhDAe0glRcZmtVzImperx0GlC4Oez5kLg
export default Editmeetup;
