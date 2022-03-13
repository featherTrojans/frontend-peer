import React from "react";
import { StyleSheet, Text, View, StatusBar, TouchableOpacity } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetFlatList,
} from "@gorhom/bottom-sheet";
import { COLORS, FONTS, fontsize, icons } from "../../../constants";
import { styles } from "./Settings.styles";

const {
  Defaultuseravatar,
  Ratingstar,
  Memoji1,
  Upgradeicon,
  Forwardarrow,
  Memoji2,
  Lockicon,
  Shareappicon,
  Supporticon,
  Feathersmallicon,
} = icons;

type IconwithtitleProps = {
  bg: string,
  icon: jSX.Element,
  title: string,
  onpress: () => void
}

const Iconwithtitle = ({ bg, icon, title, onpress }: IconwithtitleProps) => {
  return (
    <TouchableOpacity style={[styles.alignedContainer, styles.iconWithTitleContainer]} activeOpacity={0.6} onPress={onpress}>
      <View style={styles.alignedContainer}>
        {/* icons */}
        <View style={[styles.iconBg, { backgroundColor: bg }]}>{icon}</View>
        <Text style={styles.iconTitle}>{title}</Text>
      </View>
      <Forwardarrow />
    </TouchableOpacity>
  );
};

const handleOpenWithWebBrowser = () => {
  WebBrowser.openBrowserAsync('https://www.feather.africa');
};

const handleOpenWithLinking = () => {
  Linking.openURL('https://www.feather.africa');
};



const Settings = ({navigation}) => {
  return (
    <View style={styles.container}>
      <StatusBar />
      <View>
        <Text style={styles.settingText}>Settings</Text>
      </View>

      <View style={styles.profileContainer}>
        <View style={{ alignItems: "center" }}>
          {/* Avatar */}
          <View style={styles.avatarBg}>
            <Defaultuseravatar />
          </View>
          {/* name */}
          <Text style={styles.profileName}>Sarah Jones</Text>
          <Text style={styles.profileUsername}>@freshsaint</Text>
          {/* username */}
        </View>
        <View style={styles.profileExtraContainer}>
          <View style={styles.alignedContainer}>
            <Ratingstar />
            <Text style={styles.ratingText}>3.5</Text>
          </View>

          {/* starter plan */}
          <View style={styles.alignedContainer}>
            <Memoji1 />
            <Text style={styles.levelText}>Starter clan</Text>
          </View>
          {/* upgrade btn */}
          <View style={styles.alignedContainer}>
            <Upgradeicon />
            <Text style={styles.upgradeText}>Upgrade</Text>
          </View>
        </View>
      </View>

      <BottomSheet snapPoints={["50%", "75%"]}>
        <BottomSheetScrollView
          contentContainerStyle={{
            backgroundColor: COLORS.white,
            paddingHorizontal: 15,
            // paddingTop: 25,
            // marginBottom: 45
            paddingBottom: 45,
          }}
        >
          <Iconwithtitle
            bg="#CECCCC"
            icon={<Memoji2 />}
            title="My Profile"
            onpress={() => navigation.navigate("Editprofile")}
          />
          <Iconwithtitle
            bg="#E5FAF6"
            icon={<Lockicon />}
            title="Security & Privacy"
            onpress={() => navigation.navigate("Securityprivacy")}
          />
          <Iconwithtitle
            bg="#FFF5E5"
            icon={<Shareappicon />}
            title="Share Feather App"
            onpress={() => console.log("My profile")}
          />
          <Iconwithtitle
            bg="#F1E5FF"
            icon={<Supporticon />}
            title="Support / Help Desk"
            onpress={() => handleOpenWithWebBrowser()}
          />
          <Iconwithtitle
            bg="#E6ECFF"
            icon={<Feathersmallicon />}
            title="About Feather"
            onpress={() => handleOpenWithLinking()}
          />

          <View style={styles.horizontalLine} />

          <View style={{marginLeft: 20}}>
            <Text style={{...fontsize.small, ...FONTS.bold, marginBottom: 35, color: COLORS.pink1}}>Sign Out</Text>
            <Text style={{...fontsize.small, ...FONTS.medium}}>Rate App</Text>
          </View>
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  );
};

export default Settings;
