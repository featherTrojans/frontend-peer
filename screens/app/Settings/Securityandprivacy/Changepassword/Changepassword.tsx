import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import { styles } from "./Changepassword.styles";
import { COLORS, FONTS, fontsize, icons } from "../../../../../constants";
import { Bottombtn, Inputinsettings, Loader } from "../../../../../components";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import Customstatusbar from "../../../../shared/Customstatusbar";
import { useToast } from "react-native-toast-notifications";
import showerror from "../../../../../utils/errorMessage";
import axiosCustom from "../../../../../httpRequests/axiosCustom";
import { AuthContext } from "../../../../../context/AuthContext";

const { Backarrow } = icons;

const Changepassword = () => {
  const toast = useToast();
  const {authdata} = useContext(AuthContext)
  const [loading, setLoading] = useState(false);
  const [oldpassword, setOldpassword] = useState("")
  const [newpassword, setNewpassword] = useState("")
  const [confirmpassword, setConfirmpassword] = useState("")

  const navigation = useNavigation()

  const handleSubmit = async ()=>{
    // validation
    if(!confirmpassword || !newpassword || !oldpassword){
      return showerror(toast,null,"all fields are required")
    }
    if(confirmpassword !== newpassword){
      return showerror(toast,null,"new password and confirm password don't match")
    }
    try{
      setLoading(true)
      await axiosCustom.put("/auth/password/changepassword", { oldpassword:oldpassword,newpassword:newpassword });
      navigation.navigate("Root")
    }catch(err){
      showerror(toast,err)
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
          <Text style={styles.changePasswordText}>Change Password</Text>

          <View style={{ marginTop: 42 }}>
            <Inputinsettings
              label="Current Password"
              placeholder="Enter Password"
              value={oldpassword}
              onChangeText={(text)=>setOldpassword(text)}
            />
            <Inputinsettings
              label="New Password"
              placeholder="Enter Password"
              value={newpassword}
              onChangeText={(text)=>setNewpassword(text)}
            />
            <Inputinsettings
              label="Confirm Password"
              placeholder="Enter Password"
              value={confirmpassword}
              onChangeText={(text)=>setConfirmpassword(text)}
            />
          </View>
        </View>
        <Bottombtn
          title="Change Password"
          onpress={handleSubmit}
        />
      </KeyboardAwareScrollView>
    </ScrollView>
  );
};

export default Changepassword;
