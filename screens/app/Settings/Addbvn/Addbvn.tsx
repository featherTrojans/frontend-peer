import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useState, useContext } from "react";
import { COLORS, FONTS, fontsize, icons } from "../../../../constants";
import Customstatusbar from "../../../shared/Customstatusbar";
import axiosCustom from "../../../../httpRequests/axiosCustom";
import { Loader } from "../../../../components";
import showerror from "../../../../utils/errorMessage";
import { useToast } from "react-native-toast-notifications";
import { AuthContext } from "../../../../context/AuthContext";

const { Bvnlock, Whitebackarrow } = icons;

const Addbvn = ({navigation}) => {
  const { authdata, setAuthData } = useContext(AuthContext);
  const [bvn, setBvn] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSucess] = useState(false)
  const toast = useToast()
  const handleSubmit = async () => {
    setLoading(true);
    try{
      const response = await axiosCustom.post("user/upgrade",{bvn});
      //otp screen or back to seetings
      console.log(response);
      setSucess(true);
      setAuthData({...authdata, userDetails:{...authdata.userDetails, userLevel:2}})

      setTimeout(()=>{
        navigation.navigate("Settings")
      },1000)
    }catch(err){
      showerror(toast, err)
      console.log(err.response);
    }finally{
      setLoading(false);
    }
  }
  return (
    <SafeAreaView style={{ backgroundColor: COLORS.blue6, flex: 1 }}>
      {loading && <Loader />}  
      <Customstatusbar />
      {success && (<View style={{backgroundColor:"green", 
      padding:20, 
      borderRadius: 15,
      position:"absolute", width:"94%", marginHorizontal: "3%", marginTop: 40, zIndex:2}}>
        <Text style={{color:"#fff"}}>Upgrade succesful</Text>
      </View>)}
      <View style={{ paddingHorizontal: 16, marginTop: 30 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* back arrow */}
          <Pressable
          onPress={() => navigation.goBack()}
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? COLORS.blue8 : COLORS.blue6,
              },
              {width: 30, height: 30,borderRadius: 30/2, justifyContent: "center", alignItems: "center"}
            ]}
          >
            <Whitebackarrow />
          </Pressable>

          <View
            style={{
              padding: 12,
              backgroundColor: COLORS.blue8,
              borderRadius: 20,
            }}
          >
            <Text
              style={{
                ...fontsize.smallest,
                ...FONTS.regular,
                color: COLORS.white,
                lineHeight: 24,
              }}
            >
              No BVN?{" "}
              <Text style={{ ...FONTS.bold, color: COLORS.green1 }}> Skip</Text>
            </Text>
          </View>
        </View>

        <View style={{ marginTop: 50 }}>
          <Text
            style={{
              ...fontsize.big,
              ...FONTS.bold,
              lineHeight: 37,
              color: COLORS.white,
              marginBottom: 22,
            }}
          >
            Enter your BVN
          </Text>
          <Text
            style={{
              ...fontsize.bmsmall,
              ...FONTS.regular,
              color: COLORS.white,
            }}
          >
            We use your BVN to verify your identity and create an account number
            for you to receive money easily.
          </Text>
        </View>

        <View style={{ marginTop: 57 }}>
          <Text style={{ color: COLORS.white }}>
            Bank Verification Number (11-digits)
          </Text>
          <TextInput
            style={{
              borderBottomWidth: 0.5,
              borderColor: COLORS.inputBorderColor,
              height: 58,
              color: COLORS.white,
            }}
            value={bvn}
            onChangeText={(text:string)=>setBvn(text)}
            placeholder="Enter BVN"
            placeholderTextColor={COLORS.inputBorderColor}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingVertical: 18,
            borderRadius: 8,
            backgroundColor: COLORS.blue8,
            paddingHorizontal: 20,
            marginTop: 26,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                width: 24,
                height: 24,
                backgroundColor: COLORS.white,
                borderRadius: 24 / 2,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Bvnlock />
            </View>
            <Text
              style={{
                marginLeft: 15,
                color: COLORS.white,
                ...fontsize.small,
                ...FONTS.regular,
              }}
            >
              Why we need your BVN
            </Text>
          </View>
          <Text
            style={{
              color: COLORS.white,
              ...fontsize.xsmallest,
              ...FONTS.regular,
            }}
          >
            View
          </Text>
        </View>

        <View style={{ marginTop: 38 }}>
          <TouchableOpacity
            style={{
              paddingVertical: 21,
              backgroundColor: COLORS.green2,
              borderRadius: 5,
            }}
            activeOpacity={0.8}
            onPress={handleSubmit}
          >
            <Text
              style={{
                textAlign: "center",
                color: COLORS.white,
                ...fontsize.small,
                ...FONTS.medium,
              }}
            >
              Continue
            </Text>
          </TouchableOpacity>

          <Text
            style={{
              textAlign: "center",
              marginTop: 42,
              color: COLORS.white,
              ...fontsize.smallest,
              lineHeight: 24,
              ...FONTS.regular,
            }}
          >
            Secured by VFD Microfinance Bank
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Addbvn;

const styles = StyleSheet.create({});
