import { StyleSheet, Text, View, StatusBar } from "react-native";
import React, { ReactElement, useEffect, useState, useContext } from "react";
import { styles } from "./Chatshome.styles";
import { COLORS, FONTS, fontsize, icons } from "../../../../constants";
import { ScrollView } from "react-native-gesture-handler";
import Customstatusbar from "../../../shared/Customstatusbar";
import { db } from "../../../../firebase";
import { doc, collection, getDoc, getDocs, collectionGroup, QueryDocumentSnapshot, DocumentData, query, where } from "firebase/firestore";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import useContact from "../../../../utils/customContact";
import Chat from "./Chats";
import axiosCustom from "../../../../httpRequests/axiosCustom";

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


const dataforcontacts = [
  {
    phoneNumbers:[
      {
        number: "081 6794 3849"
      },
      {
        number: "08167943849"
      }
    ]
  },
  {
    phoneNumbers:[
      {
        number: "07088780964"
      }
    ]
  },
  {
    phoneNumbers:[
      {
        number: "09037768252"
      }
    ]
  },
  {
    phoneNumbers:[
      {
        number: "09029428324"
      }
    ]
  },
  {
    phoneNumbers:[
      {
        number: "07089179087"
      }
    ]
  }
]

const Chatshome = () => {
  const [chats, setChats] = useState<any>([])
  // const {authdata} = useContext(AuthContext);
  const [contactsResolved, setContactResolved] = useState([])
  const {contacts} = useContact()
  const authid = "specc"

  useEffect(()=>{
    const pendingrequests =  dataforcontacts.map((contact)=>{
      const numbersArr = []
      contact?.phoneNumbers?.forEach((phone)=>{
        const number =  phone.number.replace(/\s+/g, '')
        if(!numbersArr.includes(number)){
          numbersArr.push(number)
        }
      })
      for(let num of numbersArr){
        console.log(num)
        return axiosCustom.get(`/user/${num}`,{headers:{token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJpcHM5aUtaNWlQIiwidXNlcm5hbWUiOiJkdWRlIiwiZW1haWwiOiJCQU1JQVlPOTBAR01BSUwuQ09NIiwiZnVsbE5hbWUiOiJMQVdBTCBBWU9CQU1JIiwiaWF0IjoxNjUxMDgwNTc2LCJleHAiOjE2NTEwODc3NzZ9.ZpcZ9HNo1y-AyBsKNUUlJLYF09ovN42-qen9JfXMTk4"}})
      }
    })
    getAllContactInFeather(pendingrequests)
  },[contacts])

  useEffect(()=>{
    getAllChats()
  },[])

  const getAllContactInFeather = async (pendingrequests)=>{
    Promise.allSettled = Promise.allSettled || ((promises) => Promise.all(
      promises.map(p => p
          .then(value => ({
              status: "fulfilled",
              value
          }))
          .catch(reason => ({
              status: "rejected",
              reason
          }))
      )
  ));
    const resolvedContacts =  await Promise.allSettled(pendingrequests)
    setContactResolved(resolvedContacts.filter(stat=> stat.status === "fulfilled"))
  }
  const getAllChats = async ()=>{
    try{
      // auery first where 
      const chatsRef = collection(db,"chatstwo")
      const chatQuery1 = query(chatsRef, where("id1","==",authid))
      const chatQuery2 = query(chatsRef, where("id2","==",authid))
      // console.log(querysnaps.length)
      const [chatdata1, chatdata2 ] = await Promise.all([getDocs(chatQuery1),getDocs(chatQuery2)])
      // const chatdata2 = await getDocs(chatQuery1)
      
      const allchats = []
      chatdata2.forEach((document)=>{
        allchats.push(document.data())
      })
      chatdata1.forEach((document)=>{
        allchats.push(document.data())      
      })
      setChats(allchats)
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
            {
              contactsResolved.map((contact)=><Eachprofile name="Tayo Aina" username="@ttayodom22" />)
            }
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
            {
              chats.map((chat)=>{
                let userid = chat.id1 !== authid? chat.id1 : chat.id2 
                return (<Chat key={userid} userId= {userid} />)
              })
            }
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

export default Chatshome;
