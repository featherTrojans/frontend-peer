import { StyleSheet, Text, View, StatusBar } from "react-native";
import React, { ReactElement, useEffect, useState } from "react";
import { styles } from "./Chatshome.styles";
import { COLORS, FONTS, fontsize, icons } from "../../../../constants";
import { ScrollView } from "react-native-gesture-handler";
import Customstatusbar from "../../../shared/Customstatusbar";
import { db } from "../../../../firebase";
import { doc, collection, getDoc, getDocs, collectionGroup, QueryDocumentSnapshot, DocumentData } from "firebase/firestore";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";

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
  const navigate = useNavigation()
  return (
    // <TouchableOpacity onPress={()=>navigate.navigate("Chatsdm")} style={styles.chatContainer}>
    <TouchableOpacity style={styles.chatContainer}>
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
    </TouchableOpacity>
  );
};

const Chatshome = () => {
  const [chats, setChats] = useState<any>([])
  // find the detail of the user name by checking the reference
  useEffect(()=>{
    getAllChats()
  },[])

  const getAllChats = async ()=>{
    try{
      const chatsRef = collection(db,"chats","dudeid","fellowchats")
      // const querysnaps = await getDoc(chatsRef)
      // console.log(querysnaps.length)
      const chatsdata = await getDocs(chatsRef)
      const chatsarr = chatsdata.docs;
      setChats(chatsarr)
      // console.log(chatsdata.docs)
    }catch(err){

    }
  }
  return (
    <View style={styles.container}>
      <Customstatusbar />
      {/* Header texts and search icon */}
      <View style={styles.topHeader}>


        <View style={styles.chatTextContainer}>
          <Text style={styles.chatText}>Chats</Text>
          <View style={styles.amountOfChatsContainer}>
            <Text style={styles.amountOfChats}>{chats.length}</Text>
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
            {/* {chats.map(chat=>(<Chat
              name={chat.id}
              time="09:34am"
              message={chat.data().lastchat}
              online={true}
            />))} */}
            <Chat
              name="Stephene Adegok"
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
