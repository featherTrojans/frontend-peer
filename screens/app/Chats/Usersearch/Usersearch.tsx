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
import { Backheader, Custombutton, Horizontaline, InitialsBg, Mainwrapper } from "../../../../components";
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
        <View >
          <InitialsBg sideLength={34} name={name || "0 0"} />
        </View>
        <View style={{ marginLeft: 14 }}>
          <Text style={styles.userSearchName}>{name}</Text>
          <Text style={styles.userSearchUsername}>{username}</Text>
        </View>
      </View>
      {/* <Backarrowgrey /> */}
    </TouchableOpacity>
  );
};

const Usersearch = ({navigation, route}) => {
  const contactsResolved = route?.params;
  const [userinfo, getuserinfo, loadbounce, error] = useDebounce();
  console.log(userinfo,"found");
  const [filteredContact, setFilteredContact] = useState(contactsResolved);
  // const [userContact, setUserContact] = useState([phoneContact]);
  const [searchtext, setSearchText] = useState("");
  const [userSearch, setUserSearch] = useState("");
  const [active, setActive] = useState("username");

  console.log(contactsResolved, "here are the contacts");


  

  const handleChangeText = (text)=>{
    text = text.toLowerCase();
    console.log(text)
    setSearchText(text);
    setFilteredContact(
      contactsResolved.filter((contact)=> contact?.phoneNumber?.includes(text) || contact?.username?.toLowerCase().includes(text) || contact?.fullName?.toLowerCase().includes(text))
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
    <Mainwrapper >


      <Backheader title="Search Phone Number" />



      {/* <View style={styles.headerSection}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Backarrow />
          <Text style={styles.searchText}>Search</Text>
        </View>
        <Chatsearchicon />
      </View> */}

      <View style={[styles.mainContainer]}>



        {/* <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity activeOpacity={0.8} onPress={()=>setActive("username")} style={[styles.typeBtn, activeStyle]}>
            <Text style={[styles.typeBtnText, activeTextStyle]}>Username</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} onPress={()=>setActive("phonecontact")} style={[styles.typeBtn, activeStyleTwo]}>
            <Text style={[styles.typeBtnText, activeTextStyleTwo]}>Phone Contact</Text>
          </TouchableOpacity>
        </View> */}

        <View style={{ marginTop: 20, marginBottom: 28 }}>
          <TextInput
            placeholder={active === "phonecontact" ? "# Search phone numbers" : "@ Search username"}
            placeholderTextColor={COLORS.placeHolder2}
            style={[styles.textInput, {backgroundColor: COLORS.white}]}
            value={active === "phonecontact" ? searchtext : userSearch}
            onChangeText={ active === "phonecontact" ? handleChangeText : handleFindUsername}
          />
        </View>


        {/* { active === "phonecontact" && <Text style={styles.listHeader}>Feather Users In Your Contact</Text>  } */}
        { active === "phonecontact" ? 
        <FlatList
          data={filteredContact}
          bounces={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 9, paddingBottom: 20, backgroundColor: COLORS.white, borderRadius: 15}}

          renderItem={({item, index}) => {
            const contact = item
            const isLast = filteredContact.length === index+1
            return (
              <View key={index}>
                <SingleUser userInfo={contact} name={contact.fullName} username={`@${contact.username}`} />
                {!isLast && <Horizontaline marginV={0} />}
              </View>
            )
          }}  
          ListEmptyComponent={<View style={{justifyContent: "center",  alignItems: "center"}}>
            <LottieView source={Cryinganimate} style={{width: RFValue(100), height: RFValue(100)}}/>
            <Text style={{...fontsize.small, ...FONTS.regular, lineHeight: 25, color: COLORS.black, textAlign: "center"}}>Sorry, this contact is not a feather user</Text>        
          </View>
          }
          keyExtractor={(item) => item.username}
        />
        :
        userinfo?.fullName?<SingleUser userInfo={userinfo} name={userinfo?.fullName} username={`@${userinfo?.username}`} />: null}
        {loadbounce && <ActivityIndicator color="#000" size="small" />}
      </View>

          {/* Toggle button for the username or phoen number search */}
          <View style={{paddingHorizontal: 15, marginBottom: 20}}>

            {active !== "username" ? 
            <Custombutton 
            btntext="Search via Username"
            onpress={() => setActive("username")}
            bg={COLORS.blue13}
            />
            :
            <Custombutton 
            btntext="Search via Phone Number"
            onpress={()=> setActive("phonecontact")}
            bg={COLORS.blue12}
            />
            
          
          }
          

          </View>
      
    </Mainwrapper>
  );
};

export default Usersearch;
