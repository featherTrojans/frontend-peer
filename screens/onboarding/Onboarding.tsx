import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { OnboardingScreenNavigationProps } from "../../types";
import { COLORS } from '../../constants';

const Onboarding = ({navigation}: OnboardingScreenNavigationProps) => {
    return (
        <View>
            <Text>This is the onboarding</Text>
            <TouchableOpacity style={{width: 50, height: 50, backgroundColor: COLORS.black}} onPress={() => navigation.navigate("Login")}>
                <Text style={{color: COLORS.white}}>A</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Onboarding

const styles = StyleSheet.create({})
