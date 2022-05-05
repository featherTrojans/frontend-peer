import { StyleSheet, Text, View, StatusBar,TouchableOpacity } from "react-native";
import React, { ReactElement, useEffect, useState, useContext } from "react";
import { styles } from "./Chatshome.styles";
import { useNavigation } from "@react-navigation/native";
import axiosCustom from "../../../../httpRequests/axiosCustom";

type chatProps = {
  userId: string
}

const Chat = ({userId}:chatProps) => {
  console.log(userId)
    const navigate = useNavigation()
    const [userInfo, setUserInfo] = useState({})
    useEffect(()=>{
        getUser()
    },[])
    const getUser = async ()=>{
        try{
            const response = await axiosCustom.get(`/user/${userId}`, {headers:{token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJpcHM5aUtaNWlQIiwidXNlcm5hbWUiOiJkdWRlIiwiZW1haWwiOiJCQU1JQVlPOTBAR01BSUwuQ09NIiwiZnVsbE5hbWUiOiJMQVdBTCBBWU9CQU1JIiwiaWF0IjoxNjUxMDgwNTc2LCJleHAiOjE2NTEwODc3NzZ9.ZpcZ9HNo1y-AyBsKNUUlJLYF09ovN42-qen9JfXMTk4"}})
            setUserInfo(response.data.data)
        }catch(err){
          console.log(err.response)
        }
    }
    return (
      // <TouchableOpacity onPress={()=>navigate.navigate("Chatsdm")} style={styles.chatContainer}>
      <TouchableOpacity
       onPress={()=>navigate.navigate("Chatsdm",{userId:userId, userInfo})}
       style={styles.chatContainer}>
        <View style={styles.chatAvatar}>
          {/* {online && <View style={styles.chatStatusDot} />} */}
          {/* Image */}
        </View>
        <View style={styles.chatInfo}>
          <View style={styles.chatNameAndTime}>
            <Text style={styles.chatName}>{userInfo.fullName}</Text>
            {/* Name */}
            {/* time */}
            <Text style={styles.chatTime}>9:34</Text>
          </View>
          <View>
            {/* hint message */}
            <Text style={styles.chatHintMessage}>Hey Oga mi, trust all is well, I called you</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  export default Chat