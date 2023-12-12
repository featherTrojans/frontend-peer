import React, { createContext, FC, useContext, useState } from "react";
import Featherdefault from "../assets/icons/Featherdefault";

const AuthContext = createContext<any>({});

const AuthProvider: FC = ({ children }) => {

  const [authdata, setAuthData] = useState({});
  const [allowBiometrics, setAllowBiometrics] = useState(false);
  const [token, setToken] = useState("");
  const [messageToken, setMessageToken] = useState("");
  const [showAmount, setShowAmount] = useState<boolean>(true);
  const [agentInfo, setAgentInfo] = useState(null)
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
        setAgentInfo
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
