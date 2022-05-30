import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from "./Chatshome.styles";
import { useNavigation } from '@react-navigation/native';
import useContact from '../../../../utils/customContact';
import axiosCustom from '../../../../httpRequests/axiosCustom';
import { InitialsBg } from '../../../../components';

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
        <View style={styles.profileAvatar}>
        <InitialsBg sideLength={56} name={name || "0 0"} />
        </View>
  
        <View style={styles.nameAndUsername}>
          <Text style={styles.eachProfileName}>{name}</Text>
          <Text>{username}</Text>
        </View>
      </TouchableOpacity>
    );
  };


const Contact = () => {
    const [contactsResolved, setContactResolved] = useState([])
    const {contacts} = useContact()
    useEffect(()=>{
        const allcontacts = []
        contacts.forEach((contact)=>{
          const numbersArr = []
          contact?.phoneNumbers?.forEach((phone)=>{
            const number =  phone.number.replace(/\s+/g, '')
            if(!numbersArr.includes(number)){
              numbersArr.push(number)
            }
          })
          for(let num of numbersArr){
              if(num){
                  allcontacts.push(num)
                }
          }
        })
        // console.log(allcontacts)
        getAllContactInFeather(allcontacts)
      },[])
    
    
      const getAllContactInFeather = async (allcontacts)=>{
          try{
              const response = await axiosCustom.post("/user/multiple",{numbers:allcontacts})
              setContactResolved(response.data.data)
          }catch(err){
            console.log(err.response)
          }
      }

    return (
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
    )
}

export default Contact

