import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { CarddisclosureScreenStyles } from "../assets/styles/screens";
import { FTCustombutton, FTTitlepagewrapper } from "../components";
import { navigation } from "../utils";
import axiosCustom from "../httpRequests/axiosCustom";
import { AuthContext } from "../context/AuthContext";

const { texttitle } = CarddisclosureScreenStyles;

const CarddisclosureScreen = () => {
  const { authdata } = useContext(AuthContext);
  const action = async (pin) => {
    try {
      // await axiosCustom.post("/auth/pin/verify", {
      //   user_pin: pin,
      //   pin: pin,
      // });
      // await createcard();
      navigation.navigate("cardcreatesuccess_screen");
    } catch (err) {
      throw err;
    } finally {
    }
  };

  const createcard = async () => {
    const data = {
      address: {
        address: authdata.address,
        city: authdata.city,
        state: authdata.state,
        country: authdata.country,
        postal_code: authdata.postal_code,
        house_no: authdata.house_no,
      },
      identity: {
        id_type: authdata.id_type,
        id_no: authdata.id_no,
        id_image: authdata.id_image,
      },
    };
    try {
      const response = await axiosCustom.post("user/card/create", data);
    } catch (err) {
      throw err;
    }
  };
  return (
    <FTTitlepagewrapper>
      <View style={{ flex: 1 }}>
        <Text style={texttitle}>Card disclosure</Text>
      </View>
      <FTCustombutton
        btntext="I understand Proceed"
        onpress={() => {
          navigation.navigate("pin_screen", { action });
        }}
        bg="#000"
      />
    </FTTitlepagewrapper>
  );
};

export default CarddisclosureScreen;

const styles = StyleSheet.create({});
