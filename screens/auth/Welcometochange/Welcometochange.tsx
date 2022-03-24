import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import * as WebBrowser from 'expo-web-browser';
import { COLORS, FONTS, fontsize, icons } from "../../../constants";
const { Feathertextlogo, Markedicon } = icons;



const handleOpenWithWebBrowser = () => {
  WebBrowser.openBrowserAsync('https://www.Feather.africa/terms');
};

const Welcometochange = ({navigation, route}) => {
  const {token, username, fromm} = route.params

  return (
    <ScrollView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <View
        style={{
          flex: 0.4,
          backgroundColor: COLORS.grey12,
          paddingHorizontal: 15,
          paddingTop: 30,
          paddingBottom: 60,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Feathertextlogo />
          <Text
            style={{
              marginLeft: 10,
              ...fontsize.bmedium,
              ...FONTS.bold,
              color: COLORS.blue6,
            }}
          >
            feather.
          </Text>
        </View>

        <View style={{}}>
        <Text
            style={{
              marginTop: 50,
              ...fontsize.big,
              ...FONTS.bold,
              lineHeight: 37,
            }}
          >
            Padi, ready to chill 
            </Text>
          <Text
            style={{
              ...fontsize.big,
              ...FONTS.bold,
              lineHeight: 37,
            }}
          >
            with the{" "}
            <Text style={{ color: COLORS.blue6, position: "relative" }}>
              big boys?
            </Text>
            😎
          </Text>
          <View style={{ position: "absolute", bottom: -30, right: 100 }}>
            <Markedicon />
          </View>
        </View>
      </View>

      <View style={{ paddingHorizontal: 15, flex: 0.8 }}>
        <View style={{ marginTop: 46, marginBottom: 54.5 }}>
          <Text
            style={{
              ...fontsize.bsmall,
              ...FONTS.regular,
              marginBottom: 13,
              color: COLORS.grey2,
            }}
          >
            Your default username is
          </Text>
          <Text style={{ ...fontsize.medium, ...FONTS.bold }}>{username}</Text>
          <Text
            style={{
              marginVertical: 32,
              ...fontsize.bsmall,
              ...FONTS.regular,
              lineHeight: 24,
            }}
          >
            Enjoy transaction flexibility, receive payments from other feather
            users with your username.
          </Text>
          <Text
            style={{ ...fontsize.bsmall, ...FONTS.regular, marginBottom: 13 }}
          >
            You can always change this by navigating to
          </Text>
          <Text
            style={{ ...fontsize.bsmall, ...FONTS.medium, color: COLORS.grey5 }}
          >
            Settings -{">"} My Profile -{">"} Edit Username
          </Text>
        </View>
        <View style={{ height: 0.5, backgroundColor: COLORS.lineColor4 }} />

        <View style={{ marginTop: 55, marginBottom: 52 }}>
          <Text
            style={{
              textAlign: "center",
              ...fontsize.bsmall,
              ...FONTS.regular,
              lineHeight: 24,
              marginHorizontal: 5,
            }}
          >
            <Text style={{ color: COLORS.pink1 }}>*</Text>We take your security
            and privacy serious, Kindly setup your pin to continue on the app
          </Text>
        </View>

        <TouchableOpacity onPress={()=>navigation.navigate("Securepin",{token:token, fromm})} style={{backgroundColor: COLORS.blue6, height: 62, justifyContent: "center", alignItems: "center", borderRadius: 10, marginTop: 42, marginBottom: 38}}>
            <Text style={{color: COLORS.white, ...fontsize.smallest, ...FONTS.bold, textTransform: "uppercase"}}>Setup transaction pin</Text>
        </TouchableOpacity>
        
        <View style={{flexDirection:"row", alignItems:"center", justifyContent:"center", marginBottom:20}}>
         <Text style={{textAlign: "center", ...fontsize.small, ...FONTS.regular, lineHeight: 24}}>Need Help?{" "} 
          </Text>
          <TouchableOpacity onPress={()=>handleOpenWithWebBrowser()}>
            <Text style={{...fontsize.small, ...FONTS.bold, color: COLORS.blue6}}>Learn More</Text>
           </TouchableOpacity>
        </View>
        
      </View>
    </ScrollView>
  );
};

export default Welcometochange;
