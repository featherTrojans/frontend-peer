import { StyleSheet, Text, View, StatusBar } from "react-native";
import React, { ReactElement } from "react";
import { styles } from "./Chatshome.styles";
import { COLORS, FONTS, fontsize, icons } from "../../../../constants";
import { ScrollView } from "react-native-gesture-handler";

const { Chatsearchicon } = icons;

const Eachprofile = ({
  name,
  username,
}: {
  name: string;
  username: string;
}) => {
  return (
    <View style={styles.eachprofileContainer}>
      <View style={styles.profileAvatar}></View>

      <View style={styles.nameAndUsername}>
        <Text style={styles.eachProfileName}>{name}</Text>
        <Text>{username}</Text>
      </View>
    </View>
  );
};

const Chat = ({
  name,
  time,
  message,
  online,
  image,
}: {
  name: string;
  time: string;
  message: string;
  online: boolean;
  image?: ReactElement;
}) => {
  return (
    <View style={styles.chatContainer}>
      <View style={styles.chatAvatar}>
        {online && <View style={styles.chatStatusDot} />}
        {/* Image */}
      </View>
      <View style={styles.chatInfo}>
        <View style={styles.chatNameAndTime}>
          <Text style={styles.chatName}>{name}</Text>
          {/* Name */}
          {/* time */}
          <Text style={styles.chatTime}>{time}</Text>
        </View>
        <View>
          {/* hint message */}
          <Text style={styles.chatHintMessage}>{message}</Text>
        </View>
      </View>
    </View>
  );
};

const Chatshome = () => {
  return (
    <View style={styles.container}>
      <StatusBar />
      {/* Header texts and search icon */}
      <View style={styles.topHeader}>
        <View style={styles.chatTextContainer}>
          <Text style={styles.chatText}>Chats</Text>
          <View style={styles.amountOfChatsContainer}>
            <Text style={styles.amountOfChats}>176</Text>
          </View>
        </View>
        <View>
          <Chatsearchicon />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginTop: 5, marginBottom: 37 }}>
          <View>
            <Text style={styles.secondSubHeader}>
              Feather Users In Your Contact
            </Text>
          </View>
          <ScrollView
            contentContainerStyle={{ marginTop: 25, paddingHorizontal: 9 }}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            <Eachprofile name="Tayo Aina" username="@ttayodom22" />
            <Eachprofile name="Mabel Njoku" username="@sexystallionjj" />
            <Eachprofile name="Olu Michael" username="@michael217" />
            <Eachprofile name="Jaiye Williams" username="@williamsbb" />
            <Eachprofile name="Enoma Samuel" username="@samuelenoma" />
            <Eachprofile name="Stacy Ugbeda" username="@samuelenoma" />
            <Eachprofile name="Mabel Njoku" username="@sexystallionjj" />

            <View style={styles.seeMoreContainer}>
              <View style={styles.seeMoreBg}>
                <View style={{ flexDirection: "row" }}>
                  <View style={styles.seeMoreDots} />
                  <View style={styles.seeMoreDots} />
                  <View style={[styles.seeMoreDots, { marginRight: 0 }]} />
                </View>
              </View>

              <Text style={styles.seeMoreText}>See More</Text>
            </View>
          </ScrollView>
        </View>

        <View>
          <View style={styles.chatHeader}>
            <Text style={styles.chatHeaderText}>Recent Chats</Text>
          </View>

          <ScrollView>
            <Chat
              name="Stephene Adegoke"
              time="09:34am"
              message="Hey Oga mii, trust all is well, I called you ..."
              online={true}
            />
            <Chat
              name="Michael Olateju"
              time="08:20am"
              message="Hi, Trust you are doing good ..."
              online={true}
            />
            <Chat
              name="Mabel Njoku"
              time="09:34am"
              message="Hey Oga mii, trust all is well, I called you ..."
              online={false}
            />
            <Chat
              name="Enoma Samuel"
              time="09:34am"
              message="Hey Oga mii, trust all is well, I called you ..."
              online={false}
            />
            <Chat
              name="Olu Michael"
              time="09:34am"
              message="Hey Oga mii, trust all is well, I called you ..."
              online={true}
            />
            <Chat
              name="Jaiye Williams"
              time="09:34am"
              message="Hey Oga mii, trust all is well, I called you ..."
              online={true}
            />
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

export default Chatshome;
