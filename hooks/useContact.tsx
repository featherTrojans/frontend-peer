import * as Contacts from "expo-contacts";
import { useEffect, useState } from "react";
import axiosCustom from "../httpRequests/axiosCustom";
import getpermission from "./getpermission";

const useContact = () => {
  const [contacts, setContacts] = useState<any[]>([]);
  const [contactsResolved, setContactResolved] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getcontactpermission();
  }, []);

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

  const getcontactpermission = async () => {
    let datacontact: any = [];
    const status = await getpermission(
      "Grant “Feather” access to your contacts",
      "This will allow you to find friends and family using Feather with ease. The app uploads your contact list to the server but does not use the contact list sent to us for any other use than to provide you with users on your contact list using the app",
      Contacts
    );

    if (status) {
      const { data } = await Contacts.getContactsAsync();
      datacontact = data;
    }
    setContacts(datacontact);
  };
  const getAllContactInFeather = async (allcontacts) => {
    setLoading(true);
    try {
      const response = await axiosCustom.post("/user/multiple", {
        numbers: allcontacts,
      });
      console.log(response.data.data, 'here is the data from the contact')
      setContactResolved(response.data.data);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  return { contacts, contactsResolved, loading };
};

export default useContact;
