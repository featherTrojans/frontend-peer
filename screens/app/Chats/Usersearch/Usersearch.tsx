import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  ScrollView,
  FlatList,
  TouchableOpacity
} from "react-native";
import React, { useState } from "react";
import { styles } from "./Usersearch.styles";
import { COLORS, FONTS, fontsize, icons } from "../../../../constants";
import { StringSchema } from "yup";
import { SafeAreaView } from "react-native-safe-area-context";
import Eachprofile from "../Chatshome/EachProfile";
import { InitialsBg } from "../../../../components";
import { useNavigation } from "@react-navigation/native";


const { Backarrow, Chatsearchicon, Backarrowgrey } = icons;

const SingleUser = ({
  userInfo,
  name,
  username,
}: {
  userInfo?: any;
  name: string;
  username: string;
}) => {
  const navigate = useNavigation()
  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.userSearchContainer}  onPress={()=>navigate.navigate("Chatsdm",{userInfo})}>
      <View style={styles.userSearchData}>
        {/* To Replace this with the user image */}
        <View style={styles.userSearchImage}>
          <InitialsBg sideLength={56} name={name || "0 0"} />
        </View>
        <View style={{ marginLeft: 14 }}>
          <Text style={styles.userSearchName}>{name}</Text>
          <Text style={styles.userSearchUsername}>{username}</Text>
        </View>
      </View>
      <Backarrowgrey />
    </TouchableOpacity>
  );
};

const Usersearch = ({navigation, route}) => {
  const phoneContact = route?.params?.phoneContact;
  console.log(phoneContact, "This is a contact")
  const [active, setActive] = useState("username");

  const activeStyle = active === "username" && styles.activeTypeBtn;
  const activeTextStyle = active === "username" && styles.activeTypeBtnText;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <View style={styles.headerSection}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Backarrow />
          <Text style={styles.searchText}>Search</Text>
        </View>
        <Chatsearchicon />
      </View>

      <View style={[styles.mainContainer]}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={[styles.typeBtn, activeStyle]}>
            <Text style={[styles.typeBtnText, activeTextStyle]}>Username</Text>
          </View>
          <View style={[styles.typeBtn]}>
            <Text style={[styles.typeBtnText]}>Phone Contact</Text>
          </View>
        </View>

        <View style={{ marginTop: 20, marginBottom: 28 }}>
          <TextInput
            placeholder="Search phone numbers"
            placeholderTextColor={COLORS.placeHolder2}
            style={styles.textInput}
          />
        </View>
        <Text style={styles.listHeader}>Feather Users In Your Contact</Text>  
        <FlatList
          data={phoneContact}
          bounces={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ marginTop: 25, paddingHorizontal: 9 }}
          renderItem={({item, index}) => {
            const contact = item
            return (
              <SingleUser userInfo={contact} name={contact.fullName} username={`@${contact.username}`} key={index} />
            )
          }}  
        />
      </View>
    </SafeAreaView>
  );
};

export default Usersearch;
