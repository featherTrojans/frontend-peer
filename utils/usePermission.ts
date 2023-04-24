import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import getpermission from "./getpermission";
import * as Contacts from "expo-contacts";
import * as Location from "expo-location";

const usePermission = () => {
  useEffect(() => {
    getConatctPermission();
    getLocationPermission();
  }, []);

  const getConatctPermission = async () => {
    try {
      await getpermission(
        "Contact",
        "Allow Feather access to your contacts to enable you see which of your contacts also uses feather, so you can chat them and perform cash transactions with them",
        "contact",
        async () => {
          await Contacts.requestPermissionsAsync();
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const getLocationPermission = async () => {
    try {
      await getpermission(
        "Location",
        "Allow Feather access to your location to find the nearest agent close to you",
        "location",
        async () => {
          await Location.requestForegroundPermissionsAsync();
        }
      );
    } catch (err) {
      console.log(err);
    }
  };
};

export default usePermission;

const styles = StyleSheet.create({});
