import React, { createContext, FC, useContext, useState } from "react";
import Featherdefault from "../assets/icons/Featherdefault";

const AuthContext = createContext<any>({});

const AuthProvider: FC = ({ children }) => {
  const [userColor, setUSerColor] = useState("#E5EBFB");

  const [authdata, setAuthData] = useState({});

  const [allowBiometrics, setAllowBiometrics] = useState(false);

  const userDefaultImage = () => {
    return <Featherdefault />;
  };

  const [token, setToken] = useState("");
  const [showTabs, setShowTabs] = useState(true)

  const [messageToken, setMessageToken] = useState("");

  const [showAmount, setShowAmount] = useState<boolean>(true);
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
        userColor,
        userDefaultImage,
        allowBiometrics,
        showTabs,
        setShowTabs,
        setAllowBiometrics,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
