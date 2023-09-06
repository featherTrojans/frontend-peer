import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";

import { db } from "../utils/firebase";
import axiosCustom from "../httpRequests/axiosCustom";

function useChats() {
  const { authdata } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [chats, setChats] = useState<any>([]);
  const [chattwos, setChattwos] = useState<any>([]);
  const [allchatdata, setallchatdata] = useState<any>([]);
  const authId = authdata?.userDetails?.userUid;

  // userid = item.id1 !== authId ? item.id1 : item.id2;
  // snapshot1
  useEffect(() => {
    setLoading(true);
    const chatsRef = collection(db, "chatstwo");
    const chatQuery1 = query(
      chatsRef,
      where("id1", "==", authId),
      orderBy("createdAt", "desc")
    );
    const unsub = onSnapshot(chatQuery1, (docs) => {
      setallchatdata([]);
      const newdata = [];
      docs.forEach((change) => {
        newdata.push(change.data());
      });

      // axios fetch for everything here
      newdata.forEach((data) => {
        const userid = data.id1 !== authId ? data.id1 : data.id2;
        fetchandstorechat(userid, data);
      });
      setChattwos(newdata);
    });
    setLoading(false);
    return () => {
      unsub();
    };
  }, []);

  // snapshot2
  useEffect(() => {
    setLoading(true);
    const chatsRef = collection(db, "chatstwo");
    const chatQuery1 = query(
      chatsRef,
      where("id2", "==", authId),
      orderBy("createdAt", "desc")
    );
    const unsub = onSnapshot(chatQuery1, (docs) => {
      setallchatdata([]);
      const newdata = [];
      docs.forEach((change) => {
        newdata.push(change.data());
      });
      newdata.forEach((data) => {
        const userid = data.id1 !== authId ? data.id1 : data.id2;
        fetchandstorechat(userid, data);
      });
      setChats(newdata);
    });
    setLoading(false);
    return () => {
      unsub();
    };
  }, []);

  const fetchandstorechat = async (userId, chatdata) => {
    try {
      const response = await axiosCustom.get(`/user/${userId}`);
      const userInfo = response.data.data;
      chatdata.userInfo = userInfo;
      setallchatdata((oldchats) => [...oldchats, chatdata]);
    } catch (err) {
      const response = await axiosCustom.get(`/merchant/detail/${userId}`);
      const userInfo = response.data.data;
      chatdata.userInfo = userInfo;
      setallchatdata((oldchats) => [...oldchats, chatdata]);
    }
  };

  // console.log("FULL BIBLICAL", allchatdata, "FULL BIBLICAL");
  return { loading, chats, chattwos, allchatdata };
}

export default useChats;
