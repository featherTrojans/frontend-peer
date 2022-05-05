import * as Contacts from 'expo-contacts';
import React, { useEffect, useState } from 'react';

const useContact = () =>{
    const [contacts, setContacts] = useState([])
    useEffect(() => {
        (async () => {
          const { status } = await Contacts.requestPermissionsAsync();
          if(status === 'granted'){
            const { data } = await Contacts.getContactsAsync();
            setContacts(data)
          }
        })();
    }, []);    

    return {contacts}
}

export default useContact