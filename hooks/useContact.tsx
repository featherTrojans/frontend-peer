import * as Contacts from "expo-contacts";
import { useEffect, useState } from "react";
import axiosCustom from "../httpRequests/axiosCustom";
import getpermission from "./getpermission";
import { getDataFromStorage, setDataInstorage } from "../utils";

const purifyData = (roughcontact): [any] => {
  const set = new Set();
  const result: any = [];
  for (let contactresponse of roughcontact) {
    const contacts = contactresponse?.data?.data;

    for (let contact of contacts) {
      if (!set.has(contact.userUid)) {
        set.add(contact.userUid);
        result.push({
          userUid: contact.userUid,
          username: contact.username,
          fullName: contact.fullName,
          phoneNumber: contact.phoneNumber,
          email: contact.email,
        });
      }
    }
  }
  return result;
};

const useContact = () => {
  const [contacts, setContacts] = useState<any[]>([]);
  const [contactsResolved, setContactResolved] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // check if exist, get if it exist

    getDataFromStorage("contacts").then((savedcontact) => {
      if (savedcontact) {
        setContactResolved(savedcontact);
        setLoading(false);
      }
    });
  }, []);

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
      "Allow access to your phone contacts with Feather to unlock broader possibilities for finding other users via their contact and initiating cash transactions with them as well as in app conversations",
      Contacts
    );

    if (status) {
      const { data } = await Contacts.getContactsAsync();
      datacontact = data;
    }

    setContacts(datacontact);
  };

  const getAllContactInFeather = async (allcontacts) => {
    try {
      const loop = Math.ceil(allcontacts.length / 100);

      const allpromises = [];
      for (let i = 0; i < loop; i++) {
        let start = i * 100;
        let end = start + 100;
        const nowcontact = allcontacts.slice(start, end);
        const promisechild = axiosCustom.post("/user/multiple", {
          numbers: nowcontact,
        });
        allpromises.push(promisechild);
      }
      const response = await Promise.all(allpromises);
      const result = purifyData(response);

      setContactResolved(result);
      if (result.length > 0) {
        await setDataInstorage("contacts", result);
      }
    } catch (err) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return { contacts, contactsResolved, loading };
};

export default useContact;
