import { StyleSheet, Text, View, StatusBar,TouchableOpacity } from "react-native";
import React, { ReactElement, useEffect, useState, useContext } from "react";
import { styles } from "./Chatshome.styles";
import { useNavigation } from "@react-navigation/native";
import axiosCustom from "../../../../httpRequests/axiosCustom";
import moment from "moment";
import { InitialsBg } from "../../../../components";

type chatProps = {
  userId: string,
  chatinfo:any
}

const Chat = ({userId, chatinfo}:chatProps) => {  
    const navigate = useNavigation()
    const [userInfo, setUserInfo] = useState({})
    useEffect(()=>{
        getUser()
    },[])
    const getUser = async ()=>{
        try{
            const response = await axiosCustom.get(`/user/${userId}`)
            setUserInfo(response.data.data)
        }catch(err){
          console.log(err.response)
        }
    }
    return (
      // <TouchableOpacity onPress={()=>navigate.navigate("Chatsdm")} style={styles.chatContainer}>
      <TouchableOpacity
      activeOpacity={0.8}
       onPress={()=>navigate.navigate("Chatsdm",{userInfo})}
       style={styles.chatContainer}>
        <View style={styles.chatAvatar}>
          <InitialsBg sideLength={56} name={userInfo?.fullName || "0 0"} />
        </View>
        <View style={styles.chatInfo}>
          <View style={styles.chatNameAndTime}>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.chatName}>{userInfo?.fullName}</Text>
            <Text style={styles.chatTime}>{moment(chatinfo?.createdAt).format('LT')}</Text>
          </View>
          <View>
            <Text style={styles.chatHintMessage}>{chatinfo?.lastMessage}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };


const AllChats = ({chats, chattwos, authId})=>{
    return (
      <>
        {
          chats.map((chat)=>{
            let userid = chat.id1 !== authId? chat.id1 : chat.id2 
            return (<Chat key={userid} userId= {userid} chatinfo={chat} />)
          })
        }
        {
          chattwos.map((chat)=>{
            let userid = chat.id1 !== authId? chat.id1 : chat.id2 
            return (<Chat key={userid} userId= {userid} chatinfo={chat}/>)
          })
        }
      </>
    )
  }

export default AllChats