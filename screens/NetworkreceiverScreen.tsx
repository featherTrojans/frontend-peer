import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import {
  ChoosefeatheruserScreenStyles,
  NetworkreceiverScreenStyles,
} from "../assets/styles/screens";
import {
  FTEmptycomponent,
  FTIconwithtitleandinfo,
  FTSearchinput,
  FTTitlepagewrapper,
} from "../components";

import { COLORS, icons } from "../constants";
import { AuthContext } from "../context/AuthContext";
import useContact from "../hooks/useContact";
import { nameCapitalize } from "../utils/nameSplitter";

const { Sendtoselficon, Whiteaddicon } = icons;

const {} = NetworkreceiverScreenStyles;
const { listHeaderText } = ChoosefeatheruserScreenStyles;

const NetworkreceiverScreen = ({ route, navigation }) => {
  const network = route?.params?.network;
  const { authdata } = useContext(AuthContext);
  const [filtercontact, setFiltercontact] = useState([]);
  const [search, setSearch] = useState("");
  const { contacts, contactsResolved, loading: loadingcontacts } = useContact();
  const userinfo = {
    fullName: authdata?.userDetails?.fullName,
    username: authdata?.userDetails?.username,
    phoneNumber: authdata?.userDetails?.phoneNumber,
    imageUrl: authdata?.userDetails?.imageUrl,
    network: network,
  };

  const handlesearch = (text) => {
    setSearch(text);
    const filtered = contactsResolved.filter((contact) => {
      return (
        contact?.phoneNumber?.toLowerCase()?.includes(search?.toLowerCase()) ||
        contact?.fullName?.toLowerCase()?.includes(search?.toLowerCase())
      );
    });
    setFiltercontact(filtered);
  };

  useEffect(() => {
    setFiltercontact(contactsResolved);
  }, [contactsResolved, loadingcontacts]);

  const ListHeader = () => {
    return (
      <>
        <FTIconwithtitleandinfo
          bG={COLORS.green2}
          title="Send to self"
          info={userinfo?.phoneNumber}
          onPress={() =>
            navigation.navigate("airtimeordata_screen", { userinfo })
          }
          Icon={Sendtoselficon}
          mB={24}
        />
        <FTIconwithtitleandinfo
          bG={COLORS.grey10}
          title="Send to a new number"
          // info={userinfo?.phoneNumber}
          onPress={() =>
            navigation.navigate("airtimeordatanumber_screen", { network })
          }
          Icon={Whiteaddicon}
          mB={40}
        />
        <Text style={listHeaderText}>My Contacts</Text>
      </>
    );
  };

  return (
    <FTTitlepagewrapper title="Choose Receiver">
      <FTSearchinput
        value={search}
        onChange={handlesearch}
        placeholder="Search contact via Name or Phone Number"
        textInputProps={{
          returnKeyType: "done",
        }}
      />
      <FlatList
        data={filtercontact}
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
              bG={""}
              title={
                feathercontacts?.fullName
                  ? nameCapitalize(feathercontacts?.fullName)
                  : feathercontacts?.fullName
              }
              info={feathercontacts?.phoneNumber}
              profile={true}
              userInfo={{
                imageurl: feathercontacts?.imageUrl,
                memojiImage: feathercontacts?.memoji,
                fullname: feathercontacts?.fullName,
              }}
              onPress={() =>
                navigation.navigate("airtimeordata_screen", { userinfo })
              }
            />
          );
        }}
        ListEmptyComponent={() => {
          return !loadingcontacts ? (
            <FTEmptycomponent
              msg={`Oops, ${
                loadingcontacts ? "yes" : "No"
              } feather user on your  contact list`}
              showTransact={false}
            />
          ) : (
            <ActivityIndicator size="small" color={COLORS.blue9} />
          );
        }}
        ListHeaderComponent={ListHeader}
      />
    </FTTitlepagewrapper>
  );
};

export default NetworkreceiverScreen;

const styles = StyleSheet.create({});
