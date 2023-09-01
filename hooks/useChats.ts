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

function useChats() {
  const { authdata } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [chats, setChats] = useState<any>([]);
  const [chattwos, setChattwos] = useState<any>([]);
  const authId = authdata?.userDetails?.userUid;

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
      const newdata = [];
      docs.forEach((change) => {
        newdata.push(change.data());
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
      const newdata = [];
      docs.forEach((change) => {
        newdata.push(change.data());
      });
      setChats(newdata);
    });
    setLoading(false);
    return () => {
      unsub();
    };
  }, []);

  return { loading, chats, chattwos };
}

export default useChats;
