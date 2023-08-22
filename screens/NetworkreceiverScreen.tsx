import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import {
  ChoosefeatheruserScreenStyles,
  NetworkreceiverScreenStyles,
} from "../assets/styles/screens";
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
const { listHeaderText } = ChoosefeatheruserScreenStyles;

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

  const ListHeader = () => {
    return (
      <>
        <FTSearchinput placeholder="Search Phone Number" />
        <FTIconwithtitleandinfo
          bG={COLORS.green2}
          title="Send to self"
          info={authdata?.userDetails?.phoneNumber}
          onPress={() =>
            navigation.navigate("airtimeordata_screen", { userinfo })
          }
          Icon={Sendtoselficon}
          mB={40}
        />
        <Text style={listHeaderText}>My Beneficiaries</Text>
      </>
    );
  };

  return (
    <FTTitlepagewrapper title="Choose Receiver">
      <FlatList
        data={contactsResolved}
        showsVerticalScrollIndicator={false}
        bounces={false}
        ItemSeparatorComponent={() => <View style={{ height: 28 }} />}
        renderItem={({ item: feathercontacts }) => {
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
        }}
        ListHeaderComponent={ListHeader}
      />
    </FTTitlepagewrapper>
  );
};

export default NetworkreceiverScreen;

const styles = StyleSheet.create({});
