import { StyleSheet, Text, TextInput, View, StatusBar } from "react-native";
import React from "react";
import { styles } from "./Editmeetup.styles";
import { COLORS, FONTS, fontsize, icons } from "../../../../constants";

const { Cancelicon, Meetupdot, Clearinput } = icons;

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

            <View style={styles.textInputContainer}>
                <Meetupdot />
                <TextInput
                    style={styles.textInput}
                />
                <Clearinput />
            </View>
        </View>
    );
};

export default Editmeetup;
