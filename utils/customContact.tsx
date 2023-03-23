import * as Contacts from 'expo-contacts';
import React, { useEffect, useState } from 'react';
import axiosCustom from '../httpRequests/axiosCustom';

const useContact = () =>{
    const [contacts, setContacts] = useState<any[]>([])
    const [contactsResolved, setContactResolved] = useState([]);
    const [loading, setLoading] = useState(false);


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
      const allcontacts: string[] = [];
      contacts.forEach((contact) => {
        const numbersArr: string[] = [];
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
      setLoading(true)
      try {
        const response = await axiosCustom.post("/user/multiple", {
          numbers: allcontacts,
        });
        setContactResolved(response.data.data);
      } catch (err) {
        // console.log(err.response)
      }finally{
        setLoading(false)
      }
    };
    
    return {contacts, contactsResolved, loading}
}

export default useContact