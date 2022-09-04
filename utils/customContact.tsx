import * as Contacts from 'expo-contacts';
import React, { useEffect, useState } from 'react';
import axiosCustom from '../httpRequests/axiosCustom';

const useContact = () =>{
    const [contacts, setContacts] = useState([])
    const [contactsResolved, setContactResolved] = useState([]);



    useEffect(() => {
        (async () => {
          const { status } = await Contacts.requestPermissionsAsync();
          if(status === 'granted'){
            const { data } = await Contacts.getContactsAsync();
            setContacts(data)
          }
        })();
    }, []);    

    // console.log(contacts)

    useEffect(() => {
      const allcontacts = [];
      contacts.forEach((contact) => {
        const numbersArr = [];
        contact?.phoneNumbers?.forEach((phone) => {
          const number = phone.number.replace(/\s+/g, "");
          if (!numbersArr.includes(number)) {
            numbersArr.push(number);
          }
        });
        for (let num of numbersArr) {
          if (num) {
            allcontacts.push(num);
          }
        }
      });
      getAllContactInFeather(allcontacts);
    }, [contacts]);

    const getAllContactInFeather = async (allcontacts) => {
      try {
        const response = await axiosCustom.post("/user/multiple", {
          numbers: allcontacts,
        });
        setContactResolved(response.data.data);
      } catch (err) {
        // console.log(err.response)
      }
    };
    


    console.log('------------------------I FEAR O--------------------------');
    console.log(contacts)
    console.log('------------------------I FESR o--------------------------');
    return {contacts, contactsResolved}
}

export default useContact