import * as Contacts from "expo-contacts";
import React, { useEffect, useState } from "react";
import axiosCustom from "../httpRequests/axiosCustom";
import getpermission from "./getpermission";

const useContact = () => {
  const [contacts, setContacts] = useState<any[]>([]);
  const [contactsResolved, setContactResolved] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const data = await getpermission(
        "Contact",
        "Allow Feather access to your contacts to enable you see which of your contacts also uses feather, so you can chat them and perform cash transactions with them",
        "contact",
        async () => {
          const { status } = await Contacts.requestPermissionsAsync();
          if (status === "granted") {
            const { data } = await Contacts.getContactsAsync();
            return data;
          }
          return [];
        }
      ).catch((err) => {});
      setContacts(data);
    })();
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

  const getAllContactInFeather = async (allcontacts) => {
    setLoading(true);
    try {
      const response = await axiosCustom.post("/user/multiple", {
        numbers: allcontacts,
      });
      setContactResolved(response.data.data);
    } catch (err) {
      // console.log(err.response)
    } finally {
      setLoading(false);
    }
  };

  return { contacts, contactsResolved, loading };
};

export default useContact;
