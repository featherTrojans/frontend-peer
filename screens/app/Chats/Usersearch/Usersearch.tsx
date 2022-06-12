import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { styles } from "./Usersearch.styles";
import { COLORS, FONTS, fontsize, icons } from "../../../../constants";
import { StringSchema } from "yup";
import { SafeAreaView } from "react-native-safe-area-context";


const { Backarrow, Chatsearchicon, Backarrowgrey } = icons;

const SingleUser = ({
  profilePics,
  name,
  username,
}: {
  profilePics?: string;
  name: string;
  username: string;
}) => {
  return (
    <View style={styles.userSearchContainer}>
      <View style={styles.userSearchData}>
        {/* To Replace this with the user image */}
        <View style={styles.userSearchImage} />

        <View style={{ marginLeft: 14 }}>
          <Text style={styles.userSearchName}>{name}</Text>
          <Text style={styles.userSearchUsername}>{username}</Text>
        </View>
      </View>
      <Backarrowgrey />
    </View>
  );
};

const Usersearch = () => {
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
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} bounces={false}>
          <Text style={styles.listHeader}>Feather Users In Your Contact</Text>

          {/*we will map through the list here and List out users in the contact */}
          <SingleUser name="Mabel Njoku" username="@sexystallionjj" />
          <SingleUser name="Jaiye Williams" username="@williamsbb" />
          <SingleUser name="Enoma Samuel" username="@williamsbb" />
          <SingleUser name="Stacy Ugbeda" username="@stashugbeda" />
          <SingleUser name="Blessing Okra" username="@blessingokorobida" />
          <SingleUser name="Okikiola Omotosho" username="@gyroscope" />
          <SingleUser name="Ayobami Saleem" username="@bamiayo" />
          <SingleUser name="Ayobami Saleem" username="@bamiayo" />
          <SingleUser name="Ayobami Saleem" username="@bamiayo" />
          <SingleUser name="Ayobami Saleem" username="@bamiayo" />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Usersearch;
