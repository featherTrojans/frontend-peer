import { StyleSheet, Text, View, StatusBar } from "react-native";
import React, { ReactElement, useEffect, useState , useContext} from "react";
import { styles } from "./Chatshome.styles";
import { COLORS, FONTS, fontsize, icons } from "../../../../constants";
import { ScrollView } from "react-native-gesture-handler";
import Customstatusbar from "../../../shared/Customstatusbar";
import { db } from "../../../../firebase";
import { doc, collection, getDoc, getDocs, collectionGroup, QueryDocumentSnapshot, DocumentData, query, where, onSnapshot } from "firebase/firestore";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../../../../context/AuthContext";
import Chat from "./Chat";
import useContact from "../../../../utils/customContact";
import axiosCustom from "../../../../httpRequests/axiosCustom";

const { Chatsearchicon } = icons;

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
        number: "08167569588"
      }
    ]
  }
]

const Eachprofile = ({
  name,
  username,
  userInfo
}: {
  name: string;
  username: string;
  userInfo: any
}) => {
  const navigate = useNavigation()

  return (
    <TouchableOpacity style={styles.eachprofileContainer}
    onPress={()=>navigate.navigate("Chatsdm",{userInfo})}>
      <View style={styles.profileAvatar}></View>

      <View style={styles.nameAndUsername}>
        <Text style={styles.eachProfileName}>{name}</Text>
        <Text>{username}</Text>
      </View>
    </TouchableOpacity>
  );
};


const Chatshome = () => {
  const {authdata} = useContext(AuthContext);
  // const {contacts} = useContact()
  const [chats, setChats] = useState<any>([])
  const [chattwos, setChattwos] = useState<any>([])
  const [contactsResolved, setContactResolved] = useState([])
  // find the detail of the user name by checking the reference
  const authId = authdata?.userDetails?.userUid

  // console.log(contacts)

  useEffect(()=>{
    getAllChats()
  },[])

  // snapshot1
  useEffect(()=>{
    const chatsRef = collection(db,"chatstwo")
      const chatQuery1 = query(chatsRef, where("id1","==",authId))
    const unsub = onSnapshot(chatQuery1 , (docs) => {
      const newdata = []
      docs.forEach((change) => { 
            newdata.push(change.data())
      });
      setChattwos(newdata)
    });

    return ()=>{
      unsub()
    }
  },[])

  // snapshot2
  useEffect(()=>{
    const chatsRef = collection(db,"chatstwo")
    const chatQuery1 = query(chatsRef, where("id2","==",authId))
    const unsub = onSnapshot(chatQuery1 , (docs) => {
      const newdata = []
      docs.forEach((change) => { 
            newdata.push(change.data())
      });
      setChats(newdata)
    });

    return ()=>{
      unsub()
    }
  },[])
  
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
        return axiosCustom.get(`/user/${num}`)
      }
    })
    getAllContactInFeather(pendingrequests)
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
    const feathercontact =  []
    resolvedContacts.forEach((cont)=>{
      if(cont.status === "fulfilled"){
        feathercontact.push(cont?.value?.data?.data)
      }
    })
    setContactResolved(feathercontact)
  }

  const getAllChats = async ()=>{
    try{
      // auery first where 
      const chatsRef = collection(db,"chatstwo")
      const chatQuery1 = query(chatsRef, where("id1","==",authId))
      const chatQuery2 = query(chatsRef, where("id2","==",authId))
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
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
    <View style={styles.container}>
      <Customstatusbar />
      {/* Header texts and search icon */}
      <View style={styles.topHeader}>
        <View style={styles.chatTextContainer}>
          <Text style={styles.chatText}>Chats</Text>
          <View style={styles.amountOfChatsContainer}>
            <Text style={styles.amountOfChats}>{chats.length + chattwos.length}</Text>
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
            {contactsResolved.map((contact)=>{
              return <Eachprofile userInfo={contact} name={contact.fullName} username={`@${contact.username}`} />
            })}

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
                let userid = chat.id1 !== authId? chat.id1 : chat.id2 
                return (<Chat key={userid} userId= {userid} chatinfo={chat}/>)
              })
            }
            {
              chattwos.map((chat)=>{
                let userid = chat.id1 !== authId? chat.id1 : chat.id2 
                return (<Chat key={userid} userId= {userid} chatinfo={chat}/>)
              })
            }
          </ScrollView>
        </View>
      </ScrollView>
    </View>
    </SafeAreaView>
  );
};

export default Chatshome;
