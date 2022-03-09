import { StyleSheet, Text, TextInput, View, StatusBar, TextInputComponent } from "react-native";
import React from "react";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { styles } from "./Editmeetup.styles";
import { COLORS, FONTS, fontsize, icons } from "../../../../constants";

const { Cancelicon, Meetupdot, Clearinput } = icons;



// predefine the places 

const Editmeetup = () => {
    return (
        <View style={styles.container}>
            <StatusBar />
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
                console.log(data, details);
            }}
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
                key: 'AIzaSyA4C5Ezt6h_4Po4PX0jrnzrAchAolScS9k',
                language: 'en',
            }}
            />
        </View>
    );
};

// AIzaSyDhDAe0glRcZmtVzImperx0GlC4Oez5kLg
export default Editmeetup;
