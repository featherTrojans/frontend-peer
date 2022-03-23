import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
// import { styles } from "./Changepassword.styles";
import { COLORS, FONTS, fontsize, icons } from "../../../../../constants";
import { Bottombtn, Inputinsettings, Loader } from "../../../../../components";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { styles } from "../Changepassword/Changepassword.styles";
import { useNavigation } from "@react-navigation/native";
import Customstatusbar from "../../../../shared/Customstatusbar";
import axiosCustom from "../../../../../httpRequests/axiosCustom";
import showerror from "../../../../../utils/errorMessage";
import { useToast } from "react-native-toast-notifications";

const { Backarrow } = icons;

const Changepin = () => {
  const toast = useToast()
  const navigation = useNavigation()
  const [loading, setLoading] = useState(false);
  const [oldpin, setOldpin] = useState("")
  const [newpin, setNewpin] = useState("")
  const [confirmpin, setConfirmpin] = useState("")
  const handleSubmit = async ()=>{
    // validation
    if(newpin.length !== 4 || oldpin.length !== 4 || confirmpin.length !== 4){
      return showerror(toast,null,"length of pin must be equal to 4")
    }
    if(newpin !== confirmpin){
      return showerror(toast,null,"new pin and confirm pin don't match")
    }
    try{
      setLoading(true)
      try{
        await axiosCustom.post("/auth/pin/verify", { user_pin: oldpin, pin: oldpin });
      }catch(err){
        console.log(err.response)
        setLoading(false)
        return showerror(toast,null,"current pin is incorrect")
      }
         await axiosCustom.put("/auth/pin/set", { pin: newpin, user_pin: newpin});
         navigation.navigate("Root")
    }catch(err){
      console.log(err.response)
      showerror(toast,null,"unable to reset pin, please try again later")
    }finally{
      setLoading(false)
    }
  }
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ flex: 1 }}>
        {loading && <Loader />}
      <View style={styles.mainHeaderContainer}>
        {/* Icons */}
        <Customstatusbar />
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            width: 25,
            height: 25,
            // backgroundColor: 'red',
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 25 / 2,
          }}
        >
          <Backarrow />
        </TouchableOpacity>
        <Text style={styles.mainHeaderText}>Security & Privacy</Text>
        <View />
      </View>

      <KeyboardAwareScrollView >
        <View
          style={{
            flex: 1,
            paddingHorizontal: 22,
            marginTop: 20,
            marginBottom: 42,
          }}
        >
          <Text style={styles.changePasswordText}>Change PIN</Text>

          <View style={{ marginTop: 42 }}>
            <Inputinsettings
              label="Current Transaction PIN"
              placeholder="Enter Pin"
              maxLength={4}
              value={oldpin}
              onChangeText={(text)=>setOldpin(text)}
              keyboardType={"numeric"}
            />
            <Inputinsettings
              label="New Transaction PIN "
              placeholder="Enter Pin"
              value={newpin}
              onChangeText={(text)=>setNewpin(text)}
              maxLength={4}
              keyboardType={"numeric"}
            />
            <Inputinsettings
              label="Confirm Transaction PIN"
              placeholder="Enter Pin"
              value={confirmpin}
              onChangeText={(text)=>setConfirmpin(text)}
              maxLength={4}
              keyboardType={"numeric"}
            />
          </View>
        </View>
        <Bottombtn
          title="Change Pin"
          onpress={handleSubmit}
        />
      </KeyboardAwareScrollView>
    </ScrollView>
  );
};

export default Changepin;
