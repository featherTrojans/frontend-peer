import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  ScrollView,
  FlatList,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import React, { useState } from "react";
import { styles } from "./Usersearch.styles";
import { COLORS, FONTS, fontsize, icons } from "../../../../constants";
import { StringSchema } from "yup";
import { SafeAreaView } from "react-native-safe-area-context";
import Eachprofile from "../Chatshome/EachProfile";
import { InitialsBg } from "../../../../components";
import { useNavigation } from "@react-navigation/native";
import useDebounce from "../../../../utils/debounce";
import LottieView from "lottie-react-native"
import { RFValue } from "react-native-responsive-fontsize";

const { Backarrow, Chatsearchicon, Backarrowgrey, Cryinganimate } = icons;

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
  const [userinfo, getuserinfo, loadbounce, error] = useDebounce();
  console.log(userinfo,"found");
  const [filteredContact, setFilteredContact] = useState(phoneContact);
  // const [userContact, setUserContact] = useState([phoneContact]);
  const [searchtext, setSearchText] = useState("");
  const [userSearch, setUserSearch] = useState("");
  const [active, setActive] = useState("username");

  const handleChangeText = (text)=>{
    text = text.toLowerCase();
    console.log(text)
    setSearchText(text);
    setFilteredContact(
      phoneContact.filter((contact)=> contact?.phoneNumber?.includes(text) || contact?.username?.toLowerCase().includes(text) || contact?.fullName?.toLowerCase().includes(text))
    )
  }

  const handleFindUsername = (text)=>{
    console.log(text);
    setUserSearch(text);
    getuserinfo(text);
  }

  const activeStyle = active === "username" && styles.activeTypeBtn;
  const activeTextStyle = active === "username" && styles.activeTypeBtnText;
  const activeStyleTwo = active !== "username" && styles.activeTypeBtn;
  const activeTextStyleTwo = active !== "username" && styles.activeTypeBtnText;

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
          <TouchableOpacity activeOpacity={0.8} onPress={()=>setActive("username")} style={[styles.typeBtn, activeStyle]}>
            <Text style={[styles.typeBtnText, activeTextStyle]}>Username</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} onPress={()=>setActive("phonecontact")} style={[styles.typeBtn, activeStyleTwo]}>
            <Text style={[styles.typeBtnText, activeTextStyleTwo]}>Phone Contact</Text>
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 20, marginBottom: 28 }}>
          <TextInput
            placeholder={active === "phonecontact" ? "# Search phone numbers" : "@ Search username"}
            placeholderTextColor={COLORS.placeHolder2}
            style={styles.textInput}
            value={active === "phonecontact" ? searchtext : userSearch}
            onChangeText={ active === "phonecontact" ? handleChangeText : handleFindUsername}
          />
        </View>
        { active === "phonecontact" && <Text style={styles.listHeader}>Feather Users In Your Contact</Text>  }
        { active === "phonecontact" ? <FlatList
          data={filteredContact}
          bounces={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ marginTop: 25, paddingHorizontal: 9 }}
          renderItem={({item, index}) => {
            const contact = item
            return (
              <SingleUser userInfo={contact} name={contact.fullName} username={`@${contact.username}`} key={index} />
            )
          }}  
          ListEmptyComponent={<View style={{justifyContent: "center",  alignItems: "center"}}>
            <LottieView source={Cryinganimate} style={{width: RFValue(190), height: RFValue(190)}}/>
            <Text style={{...fontsize.bsmall, ...FONTS.regular, lineHeight: 25, color: COLORS.black, textAlign: "center"}}>Sorry, this contact is not a feather user</Text>        
          </View>
          }
        />:userinfo?.fullName?<SingleUser userInfo={userinfo} name={userinfo?.fullName} username={`@${userinfo?.username}`} />: null}
        {loadbounce && <ActivityIndicator color="#000" size="small" />}
      </View>
    </SafeAreaView>
  );
};

export default Usersearch;
