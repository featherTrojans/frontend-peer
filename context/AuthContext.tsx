import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useState,
} from "react";
import Featherdefault from "../assets/icons/Featherdefault";
import { db } from "../utils/firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
  query,
  orderBy,
  updateDoc,
} from "firebase/firestore";
const AuthContext = createContext<any>({});

const AuthProvider: FC = ({ children }) => {
  const [authdata, setAuthData] = useState({});
  const [allowBiometrics, setAllowBiometrics] = useState(false);
  const [token, setToken] = useState("");
  const [messageToken, setMessageToken] = useState("");
  const [showAmount, setShowAmount] = useState<boolean>(true);
  const [agentInfo, setAgentInfo] = useState(null);

  useEffect(() => {
    let unsub = () => {};

    if (authdata?.userDetails?.userUid) {
      unsub = onSnapshot(
        doc(db, "wallet", authdata?.userDetails?.userUid),
        (doc) => {
          if (doc.exists()) {
            const document = doc.data();
            setAuthData({
              ...authdata,
              userDetails: {
                ...authdata.userDetails,
                walletBal: document?.walletBal,
              },
              walletBal: document?.walletBal,
            });
          }
        }
      );
    }
    return () => {
      unsub();
    };
  }, [authdata?.userDetails?.userUid]);

  return (
    <AuthContext.Provider
      value={{
        authdata,
        setAuthData,
        token,
        setToken,
        messageToken,
        setMessageToken,
        showAmount,
        setShowAmount,
        allowBiometrics,
        setAllowBiometrics,
        agentInfo,
        setAgentInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
