import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { NetworkreceiverScreenStyles } from "../assets/styles/screens";
import {
  FTIconwithtitleandinfo,
  FTSearchinput,
  FTTitlepagewrapper,
} from "../components";
import { navigation, redirectTo } from "../utils";
import { COLORS, icons } from "../constants";
import { AuthContext } from "../context/AuthContext";
import useContact from "../hooks/useContact";

const { Sendtoselficon } = icons;

const {} = NetworkreceiverScreenStyles;

const NetworkreceiverScreen = ({ route }) => {
  const network = route?.params?.network;
  const { authdata } = useContext(AuthContext);
  const { contacts, contactsResolved, loading: loadingcontacts } = useContact();

  const userinfo = {
    fullName: authdata?.userDetails?.fullName,
    username: authdata?.userDetails?.username,
    phoneNumber: authdata?.userDetails?.phoneNumber,
    imageUrl: authdata?.userDetails?.imageUrl,
    network: network,
  };

  // const renderContacts = ()=>{

  //   const contacinfo = []
  //   contacts.forEach((contact)=>{
  //     const newcontact:[] = contact?.phoneNumbers?.map((phone)=>{
  //       return (
  //         <FTIconwithtitleandinfo
  //         bG={COLORS.green2}
  //         title="Send to self"
  //         info={phone.phoneNumber}
  //         onPress={() => redirectTo("airtimeordata_screen")}
  //         Icon={Sendtoselficon}
  //       />
  //       )
  //     })

  //     contacinfo.push(...newcontact)
  //   })
  //   return contacinfo
  // }
  return (
    <FTTitlepagewrapper title="Choose Receiver">
      <FTSearchinput placeholder="Search Phone Number" />
      <FTIconwithtitleandinfo
        bG={COLORS.green2}
        title="Send to self"
        info={authdata?.userDetails?.phoneNumber}
        onPress={() =>
          navigation.navigate("airtimeordata_screen", { userinfo })
        }
        Icon={Sendtoselficon}
      />
      <View>
        <Text style={{ marginVertical: 30 }}>My Contacts</Text>
        <ScrollView>
          {contactsResolved.map((feathercontacts) => {
            const userinfo = {
              fullName: feathercontacts?.fullName,
              username: feathercontacts?.username,
              phoneNumber: feathercontacts?.phoneNumber,
              imageUrl: feathercontacts?.imageUrl,
              network: network,
            };
            return (
              <FTIconwithtitleandinfo
                bG={COLORS.green2}
                title={feathercontacts?.fullName}
                info={feathercontacts?.username}
                onPress={() =>
                  navigation.navigate("airtimeordata_screen", { userinfo })
                }
                Icon={Sendtoselficon}
                imageUrl={feathercontacts?.imageUrl}
              />
            );
          })}
        </ScrollView>
      </View>
    </FTTitlepagewrapper>
  );
};

export default NetworkreceiverScreen;

const styles = StyleSheet.create({});
